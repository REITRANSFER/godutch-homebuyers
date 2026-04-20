const STORAGE_KEY = "utm_attribution"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const
const CLICK_ID_KEYS = ["fbclid", "gclid", "ttclid", "msclkid", "li_fat_id", "sclid", "epik"] as const
const ALL_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS]

export type AttributionPayload = Partial<Record<(typeof ALL_KEYS)[number], string>> & {
  landing_page?: string
  referrer?: string
  captured_at?: string
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY)
    const url = new URL(window.location.href)
    const params = url.searchParams

    const incoming: AttributionPayload = {}
    let hasAny = false
    for (const key of ALL_KEYS) {
      const v = params.get(key)
      if (v) {
        incoming[key] = v
        hasAny = true
      }
    }

    if (existing && !hasAny) return

    if (hasAny) {
      incoming.landing_page = url.origin + url.pathname
      incoming.referrer = document.referrer || ""
      incoming.captured_at = new Date().toISOString()
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming))
    } else if (!existing) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          landing_page: url.origin + url.pathname,
          referrer: document.referrer || "",
          captured_at: new Date().toISOString(),
        }),
      )
    }
  } catch {
  }
}

export function getAttribution(): AttributionPayload {
  if (typeof window === "undefined") return {}
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AttributionPayload) : {}
  } catch {
    return {}
  }
}
