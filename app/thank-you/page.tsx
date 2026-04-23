"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Phone, Clock, Shield } from "lucide-react"
import { FooterLinks } from "@/components/polar/footer-links"
import { getConfig } from "@/lib/config"

const config = getConfig()
const thankYouVideoUrl = process.env.NEXT_PUBLIC_THANK_YOU_VIDEO_URL || process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""

const faqVideos = [
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_1_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_1_LABEL || "How does the process work?" },
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_2_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_2_LABEL || "How fast can you close?" },
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_3_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_3_LABEL || "Do I need to make repairs?" },
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_4_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_4_LABEL || "Are there any fees or commissions?" },
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_5_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_5_LABEL || "How is my offer calculated?" },
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_6_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_6_LABEL || "What types of homes do you buy?" },
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_7_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_7_LABEL || "Can I sell if I'm behind on payments?" },
  { url: process.env.NEXT_PUBLIC_FAQ_VIDEO_8_URL || "", label: process.env.NEXT_PUBLIC_FAQ_VIDEO_8_LABEL || "What happens after I accept?" },
].filter(v => v.url)

export default function ThankYouPage() {
  const [activeFaq, setActiveFaq] = useState(0)

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
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">We will be in touch within 24 hours with your cash offer.</p>
        </div>
      </div>

      {thankYouVideoUrl && (
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D2F] mb-2 text-center">Who We Are For</h2>
            <p className="text-center text-[#5A6B7D] text-lg mb-8">A quick message from {config.companyName} about how we help homeowners.</p>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0]">
              <video src={thankYouVideoUrl} controls playsInline className="w-full" style={{ aspectRatio: "16/9", objectFit: "cover" }} />
            </div>
          </div>
        </section>
      )}

      {faqVideos.length > 0 && (
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D2F] mb-2 text-center">Frequently Asked Questions</h2>
            <p className="text-center text-[#5A6B7D] text-lg mb-8">Pick a topic and watch the video that answers your question.</p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {faqVideos.map((faq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveFaq(i)}
                  className="text-sm font-semibold px-4 py-2 rounded-full border transition-all"
                  style={
                    activeFaq === i
                      ? { backgroundColor: "var(--accent-brand)", borderColor: "var(--accent-brand)", color: "#fff" }
                      : { backgroundColor: "#fff", borderColor: "#e2e8f0", color: "#4b5563" }
                  }
                >
                  {faq.label}
                </button>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-black">
              <video
                key={faqVideos[activeFaq]?.url}
                src={faqVideos[activeFaq]?.url}
                controls
                playsInline
                className="w-full"
                style={{ aspectRatio: "16/9", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      )}

      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Happens Next</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { Icon: Clock, title: "We Review Your Info", desc: "Our team analyzes your property details and local market data." },
              { Icon: Phone, title: "We Call You", desc: "A team member will reach out within 24 hours with your fair cash offer." },
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
