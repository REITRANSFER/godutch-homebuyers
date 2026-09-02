import { NextResponse } from "next/server"

const submissionLog = new Map<string, { count: number; firstSubmit: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 60 * 60 * 1000
  const maxSubmissions = 3

  const entry = submissionLog.get(ip)
  if (!entry) {
    submissionLog.set(ip, { count: 1, firstSubmit: now })
    return false
  }

  if (now - entry.firstSubmit > window) {
    submissionLog.set(ip, { count: 1, firstSubmit: now })
    return false
  }

  entry.count++
  return entry.count > maxSubmissions
}

type LeadPayload = Record<string, unknown>

async function persistToSupabase(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const clientSlug = process.env.LEAD_CLIENT_SLUG || "godutch-homebuyers"
  if (!url || !key) return { ok: false, error: "supabase env missing" }

  const row = {
    client_slug: clientSlug,
    first_name: payload.firstName || payload.name || "",
    last_name: payload.lastName || "",
    email: payload.email || "",
    phone: payload.phone || "",
    address: payload.address || "",
    landing_page_url: payload.landing_page || "",
    utm_source: payload.utm_source || "",
    utm_medium: payload.utm_medium || "",
    utm_campaign: payload.utm_campaign || "",
    utm_term: payload.utm_term || "",
    utm_content: payload.utm_content || "",
    fbclid: payload.fbclid || "",
    gclid: payload.gclid || "",
    ttclid: payload.ttclid || "",
    sclid: payload.sclid || "",
    li_fat_id: payload.li_fat_id || "",
    epik: payload.epik || "",
    ip_address: payload.server_ip || payload.ip_address || "",
    survey_answers: payload,
    survey_version: "v2",
  }

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Prefer": "return=representation",
        "apikey": key,
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify(row),
    })
    if (!res.ok) {
      const text = await res.text()
      return { ok: false, error: `supabase ${res.status}: ${text.slice(0, 200)}` }
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: `supabase fetch failed: ${String(e).slice(0, 200)}` }
  }
}

async function fireWebhook(payload: LeadPayload): Promise<{ ok: boolean; status?: number; error?: string }> {
  const webhookUrl = process.env.WEBHOOK_URL
  if (!webhookUrl) return { ok: false, error: "WEBHOOK_URL not set" }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return { ok: false, status: res.status, error: `webhook ${res.status}` }
    return { ok: true, status: res.status }
  } catch (e) {
    return { ok: false, error: `webhook fetch failed: ${String(e).slice(0, 200)}` }
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      )
    }

    const data = await request.json()

    const phone = (data.phone || "").replace(/\D/g, "").replace(/^1/, "")
    if (phone.length !== 10) {
      return NextResponse.json({ success: false, error: "Invalid phone" }, { status: 400 })
    }

    const email = (data.email || "").trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 })
    }

    if (!(data.firstName || data.name || "").trim()) {
      return NextResponse.json({ success: false, error: "Name required" }, { status: 400 })
    }

    if (!(data.address || "").trim()) {
      return NextResponse.json({ success: false, error: "Address required" }, { status: 400 })
    }

    const payload = { ...data, server_ip: ip }

    const [supabaseResult, webhookResult] = await Promise.all([
      persistToSupabase(payload),
      fireWebhook(payload),
    ])

    if (!supabaseResult.ok) console.error("[submit] Supabase persist failed:", supabaseResult.error)
    if (!webhookResult.ok) console.error("[submit] Webhook failed:", webhookResult.error)

    // --- GoFunnel external webhook: forward the lead for gf_sid attribution ---
    try {
      const GF_CREDENTIAL_ID = process.env.GOFUNNEL_WEBHOOK_CREDENTIAL_ID || "2aafad59-e44b-4c4b-a21e-c61ca1551fc7"
      const GF_BEARER = process.env.GOFUNNEL_WEBHOOK_SECRET || "5d7b6fb8-6eb6-42d0-bf2a-876e553182f2"
      if (GF_CREDENTIAL_ID && GF_BEARER) {
        const gfCookie = request.headers.get("cookie") || ""
        const gfMatch = gfCookie.match(/(?:^|; )gf_sid=([^;]*)/)
        const gfSid = (data.gf_sid || (gfMatch ? decodeURIComponent(gfMatch[1]) : "") || "").toString().trim()
        const gfStr = (v: unknown) => (typeof v === "string" && v ? v : undefined)
        const gfName = ((data.name || "") as string).trim().split(/\s+/).filter(Boolean)
        const gfPayload = {
          type: "survey_submitted",
          email: email || undefined,
          phone: phone || undefined,
          firstName: gfStr(data.firstName) || gfName[0] || undefined,
          lastName: gfStr(data.lastName) || (gfName.length > 1 ? gfName.slice(1).join(" ") : undefined),
          sid: gfSid || undefined,
          formId: "godutch-homebuyers-survey",
          formTitle: "GoDutch Homebuyers Survey",
          // Subject property — the house the seller is selling. Read by
          // GoFunnel's real-estate property enrichment. NOT an identity
          // field: it never participates in lead matching.
          propertyAddress: gfStr(data.address),
          idempotencyKey: gfStr(data.meta_event_id),
          leadQuestions: {
            is_legal_owner: gfStr(data.isLegalOwner),
            listed_on_market: gfStr(data.listedOnMarket),
            property_type: gfStr(data.propertyType),
            timeline: gfStr(data.timeline),
            asking_price: gfStr(data.askingPrice),
            condition: gfStr(data.condition),
            reason: gfStr(data.reason),
          },
          data: {
            qualified: data.qualified === true,
            lead_score: data.lead_score,
            lead_quality: data.lead_quality,
            meta_event_id: data.meta_event_id,
            meta_event_name: data.meta_event_name,
            meta_value: data.meta_value,
            address: data.address,
            state: data.state,
            city: data.city,
            county: data.county,
            utm_source: data.utm_source,
            utm_medium: data.utm_medium,
            utm_campaign: data.utm_campaign,
            utm_content: data.utm_content,
            utm_term: data.utm_term,
            fbclid: data.fbclid,
            gclid: data.gclid,
            msclkid: data.msclkid,
            ttclid: data.ttclid,
            referrer: data.referrer,
            landing_page: data.landing_page,
          },
        }
        await fetch(`https://app.gofunnel.ai/api/v2/webhooks/external?credential_id=${GF_CREDENTIAL_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${GF_BEARER}` },
          body: JSON.stringify(gfPayload),
        }).catch(() => {})
      }
    } catch {}

    return NextResponse.json({
      success: true,
      persisted: supabaseResult.ok,
      webhook: webhookResult.ok,
    })
  } catch (e) {
    console.error("[submit] Handler error:", e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
