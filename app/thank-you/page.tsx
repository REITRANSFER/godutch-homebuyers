"use client"

import { useEffect } from "react"
import { CheckCircle2, Phone, Clock, Shield } from "lucide-react"
import { FooterLinks } from "@/components/polar/footer-links"
import { getConfig } from "@/lib/config"

const config = getConfig()
const thankYouVideoUrl = process.env.NEXT_PUBLIC_THANK_YOU_VIDEO_URL || process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""

const faqVideos = [
  process.env.NEXT_PUBLIC_FAQ_VIDEO_1_URL,
  process.env.NEXT_PUBLIC_FAQ_VIDEO_2_URL,
  process.env.NEXT_PUBLIC_FAQ_VIDEO_3_URL,
  process.env.NEXT_PUBLIC_FAQ_VIDEO_4_URL,
  process.env.NEXT_PUBLIC_FAQ_VIDEO_5_URL,
  process.env.NEXT_PUBLIC_FAQ_VIDEO_6_URL,
  process.env.NEXT_PUBLIC_FAQ_VIDEO_7_URL,
  process.env.NEXT_PUBLIC_FAQ_VIDEO_8_URL,
].filter(Boolean) as string[]

export default function ThankYouPage() {
  useEffect(() => {
    try { if (window.fbq) window.fbq("track", "Lead") } catch {}
  }, [])

  return (
    <main className="relative min-h-screen bg-gray-50">
      <div className="py-16 md:py-24" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--accent-brand) 10%, transparent), transparent)" }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/10">
            <CheckCircle2 className="h-8 w-8 text-[#22c55e]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl text-balance">Thank You for Your Submission!</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">We will be in touch within 24 hours, please take a minute to watch the below video.</p>
        </div>
      </div>

      {thankYouVideoUrl && (
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0]">
              <video src={thankYouVideoUrl} controls playsInline className="w-full" style={{ aspectRatio: "16/9", objectFit: "cover" }} />
            </div>
          </div>
        </section>
      )}

      {faqVideos.length > 0 && (
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D2F] mb-2 text-center">Frequently Asked Questions</h2>
            <p className="text-center text-[#5A6B7D] text-lg mb-10">Please watch the below 1min videos before our meeting.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqVideos.map((url, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-black">
                  <video
                    src={url}
                    controls
                    playsInline
                    className="w-full"
                    style={{ aspectRatio: "16/9", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Happens Next</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { Icon: Phone, title: "We Call You", desc: "For more details and to set up a time for us to see the property." },
              { Icon: Clock, title: "We get you an offer", desc: "In 24 hours." },
              { Icon: Shield, title: "You Decide", desc: "No pressure, no obligation. Accept only if the offer works for you." },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--accent-brand) 10%, transparent)" }}>
                  <Icon className="h-6 w-6" style={{ color: "var(--accent-brand)" }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Have Questions?</h2>
          <p className="mt-2 text-gray-600">Our team is ready to help you every step of the way.</p>
          <a href={`tel:${config.phoneHref}`} className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 text-lg font-semibold text-white transition-colors" style={{ backgroundColor: "var(--accent-brand)" }}>
            <Phone className="h-5 w-5" />
            Call {config.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="relative z-10 py-8"><FooterLinks /></div>
    </main>
  )
}
