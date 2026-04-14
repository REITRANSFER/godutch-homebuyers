"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FooterLinks } from "@/components/polar/footer-links"
import { captureTrackingData, getIPAddress } from "@/lib/tracking"
import { getConfig } from "@/lib/config"

const config = getConfig()

function formatPhoneNumber(value: string): string {
  let digits = value.replace(/\D/g, "")
  if (digits.startsWith("1")) digits = digits.slice(1)
  if (digits.length > 10) digits = digits.slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "").replace(/^1/, "")
  return digits.length === 10
}

function validateEmail(email: string): boolean {
  if (!email) return true // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function OptInPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [smsConsentTransactional, setSmsConsentTransactional] = useState(false)
  const [smsConsentMarketing, setSmsConsentMarketing] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formStartTime = useRef<number>(Date.now())
  const trackingRef = useRef(captureTrackingData())

  useEffect(() => {
    getIPAddress().then((ip) => { trackingRef.current.ip = ip })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!firstName.trim()) newErrors.firstName = "First name is required."
    if (!lastName.trim()) newErrors.lastName = "Last name is required."
    if (!validatePhone(phone)) newErrors.phone = "Please enter a valid 10-digit US phone number."
    if (email && !validateEmail(email)) newErrors.email = "Please enter a valid email address."
    if (!smsConsentTransactional && !smsConsentMarketing) newErrors.smsConsent = "Please check at least one box to receive text messages."

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Spam prevention
    const timeSpent = Date.now() - formStartTime.current
    if (timeSpent < 3000) { setIsSubmitted(true); return }
    if (honeypot) { setIsSubmitted(true); return }

    setIsSubmitting(true)

    try {
      const payload = {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        phone,
        email,
        smsConsentTransactional,
        smsConsentMarketing,
        smsConsentTimestamp: new Date().toISOString(),
        source: `${config.companyName} - SMS Opt-In`,
        submittedAt: new Date().toISOString(),
        ...trackingRef.current,
      }
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch {
      // continue to thank-you even if webhook fails
    }

    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/"><img src={config.logoUrl} alt={config.companyName} className="h-16 w-auto" /></Link>
          <Link href="/" className="text-sm font-medium transition-colors" style={{ color: "var(--accent-brand)" }}>&larr; Back to Home</Link>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        {isSubmitted ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "var(--accent-brand)" }}>
              <Check className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F1D2F] mb-2">You&apos;re signed up!</h1>
            <p className="text-[#5A6B7D] leading-relaxed mb-4">
              Thanks for opting in. You&apos;ll receive a confirmation text shortly. Reply STOP at any time to unsubscribe, or HELP for assistance.
            </p>
            <Link href="/" className="inline-block text-sm font-medium hover:underline" style={{ color: "var(--accent-brand)" }}>Return to home &rarr;</Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1D2F] mb-3">Sign Up for Text Updates</h1>
            <p className="text-base text-[#5A6B7D] leading-relaxed mb-8">
              Get your fair cash offer and property updates delivered directly to your phone. No spam. No pressure. Unsubscribe any time.
            </p>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0F1D2F] mb-1.5">First Name</label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setErrors({ ...errors, firstName: "" }) }}
                    className={`h-12 rounded-xl ${errors.firstName ? "border-red-500" : "border-gray-200"}`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F1D2F] mb-1.5">Last Name</label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setErrors({ ...errors, lastName: "" }) }}
                    className={`h-12 rounded-xl ${errors.lastName ? "border-red-500" : "border-gray-200"}`}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1D2F] mb-1.5">Mobile Phone Number</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(formatPhoneNumber(e.target.value)); setErrors({ ...errors, phone: "" }) }}
                  maxLength={14}
                  className={`h-12 rounded-xl ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                  placeholder="(832) 555-0000"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1D2F] mb-1.5">
                  Email <span className="text-[#94A3B8] font-normal">(optional)</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }) }}
                  className={`h-12 rounded-xl ${errors.email ? "border-red-500" : "border-gray-200"}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* SMS Consent - A2P 10DLC compliance (two separate checkboxes) */}
              <div className={`rounded-xl border p-4 space-y-4 ${errors.smsConsent ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsConsentTransactional}
                    onChange={(e) => { setSmsConsentTransactional(e.target.checked); setErrors({ ...errors, smsConsent: "" }) }}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#0891b2] focus:ring-[#0891b2]"
                  />
                  <span className="text-xs leading-relaxed text-gray-700">
                    I consent to receive non-marketing text messages from <strong>GoDutch Homebuyers LLC</strong> about appointment scheduling, appointment confirmations, reminders, and follow-ups. Message frequency may vary, message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsConsentMarketing}
                    onChange={(e) => { setSmsConsentMarketing(e.target.checked); setErrors({ ...errors, smsConsent: "" }) }}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#0891b2] focus:ring-[#0891b2]"
                  />
                  <span className="text-xs leading-relaxed text-gray-700">
                    I consent to receive marketing text messages, about special offers, discounts, and service updates, from <strong>GoDutch Homebuyers LLC</strong> at the phone number provided. Message frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
                  </span>
                </label>

                <p className="text-[11px] leading-relaxed text-gray-500 pt-2 border-t border-gray-200">
                  Consent is not a condition of any purchase or service. View our <Link href="/sms-terms" className="underline hover:text-gray-700">SMS Terms &amp; Conditions</Link> and <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>.
                </p>

                {errors.smsConsent && <p className="text-xs text-red-600">{errors.smsConsent}</p>}
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-base font-semibold rounded-xl text-white"
                style={{ backgroundColor: "var(--accent-brand)" }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Signing up...
                  </span>
                ) : (
                  "Sign Me Up for Text Updates"
                )}
              </Button>
            </form>

            {/* A2P 10DLC required disclosure block */}
            <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 p-6 text-sm text-[#5A6B7D] leading-relaxed space-y-3">
              <h2 className="text-base font-semibold text-[#0F1D2F]">About This SMS Program</h2>
              <p>
                <strong className="text-[#0F1D2F]">Who:</strong> Messages are sent by GoDutch Homebuyers LLC, 3120 Smith St Apt 847, Houston, TX 77006.
              </p>
              <p>
                <strong className="text-[#0F1D2F]">What you&apos;ll receive:</strong> Cash offer details for your property, appointment confirmations, reminders, and follow-up communications related to your inquiry.
              </p>
              <p>
                <strong className="text-[#0F1D2F]">Frequency:</strong> Message frequency varies. You can expect up to 5 messages per month.
              </p>
              <p>
                <strong className="text-[#0F1D2F]">Cost:</strong> Message and data rates may apply based on your wireless carrier.
              </p>
              <p>
                <strong className="text-[#0F1D2F]">Opt out:</strong> Reply <strong>STOP</strong> to any message to cancel. You&apos;ll receive a confirmation and no further messages.
              </p>
              <p>
                <strong className="text-[#0F1D2F]">Help:</strong> Reply <strong>HELP</strong> or email <a href="mailto:tom@godutchhomebuyers.com" className="underline hover:text-[#0F1D2F]">tom@godutchhomebuyers.com</a> for assistance.
              </p>
              <p>
                <strong className="text-[#0F1D2F]">Privacy:</strong> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. See our <Link href="/privacy" className="underline hover:text-[#0F1D2F]">Privacy Policy</Link> for details.
              </p>
              <p className="text-xs text-[#94A3B8] pt-2 border-t border-gray-200">
                Carriers are not liable for delayed or undelivered messages. Supported on all major US carriers (AT&amp;T, T-Mobile, Verizon, and others).
              </p>
            </div>
          </>
        )}
      </div>

      <FooterLinks />
    </main>
  )
}
