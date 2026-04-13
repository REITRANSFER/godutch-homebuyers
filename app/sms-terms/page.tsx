import { Metadata } from "next"
import Link from "next/link"
import { FooterLinks } from "@/components/polar/footer-links"
import { getConfig } from "@/lib/config"

const config = getConfig()

export const metadata: Metadata = {
  title: `${config.companyName} — SMS Terms & Conditions`,
}

export default function SmsTermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/"><img src={config.logoUrl} alt={config.companyName} className="h-16 w-auto" /></Link>
          <Link href="/" className="text-sm font-medium transition-colors" style={{ color: "var(--accent-brand)" }}>&larr; Back to Home</Link>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-[#0F1D2F] mb-2">{config.companyName} SMS Terms &amp; Conditions</h1>
        <p className="text-sm text-[#5A6B7D] mb-10">Last updated: April 13, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">1. Program Description</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            GoDutch Homebuyers LLC (&quot;{config.companyName},&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) offers an SMS messaging program to communicate with homeowners who have submitted a property inquiry through our website. By opting in to our SMS program, you consent to receive text messages from {config.companyName} related to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#5A6B7D] mt-3">
            <li>Your property inquiry and cash offer details</li>
            <li>Appointment confirmations and reminders</li>
            <li>Follow-up communications regarding your property</li>
            <li>Service updates and notifications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">2. Consent &amp; Opt-In</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            By providing your mobile phone number and submitting a property inquiry on our website, you expressly consent to receive SMS/MMS messages from {config.companyName} at the phone number you provided. Consent is not a condition of purchasing any goods or services. You may opt in by submitting your phone number through our website form.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">3. Message Frequency</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            Message frequency varies based on your inquiry and interaction with our team. Typically, you may receive up to 5 messages per month related to your property inquiry. Recurring messages may be sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">4. Message &amp; Data Rates</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            Message and data rates may apply. Your mobile carrier&apos;s standard messaging and data rates will apply to any messages you send or receive. {config.companyName} is not responsible for any charges incurred from your wireless provider.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">5. How to Opt Out</h2>
          <p className="text-[#5A6B7D] leading-relaxed mb-3">
            You may opt out of receiving SMS messages at any time by replying <strong className="text-[#0F1D2F]">STOP</strong> to any message you receive from us. Upon receiving your STOP request, you will receive a one-time confirmation message, and no further messages will be sent unless you re-opt in.
          </p>
          <p className="text-[#5A6B7D] leading-relaxed">
            Opting out of SMS messages will not affect any other communications from {config.companyName} (such as email or phone calls) unless you separately request to opt out of those channels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">6. How to Get Help</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            For help or questions about our SMS program, reply <strong className="text-[#0F1D2F]">HELP</strong> to any message, or contact us directly:
          </p>
          <div className="mt-3 space-y-1 text-[#5A6B7D]">
            <p><strong className="text-[#0F1D2F]">GoDutch Homebuyers LLC</strong></p>
            <p>3120 Smith St Apt 847, Houston, TX 77006</p>
            <p>Phone: <a href={`tel:${config.phoneHref}`} className="hover:underline" style={{ color: "var(--accent-brand)" }}>{config.phoneDisplay}</a></p>
            <p>Email: <a href="mailto:tom@godutchhomebuyers.com" className="hover:underline" style={{ color: "var(--accent-brand)" }}>tom@godutchhomebuyers.com</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">7. Supported Carriers</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            Our SMS program is supported by all major US wireless carriers, including AT&amp;T, T-Mobile, Verizon, Sprint, and others. However, carriers are not liable for delayed or undelivered messages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">8. Privacy &amp; Data Protection</h2>
          <p className="text-[#5A6B7D] leading-relaxed mb-3">
            We respect your privacy and are committed to protecting your personal information. When you opt in to our SMS program:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#5A6B7D]">
            <li>Your phone number is collected solely to deliver SMS messages related to your property inquiry.</li>
            <li><strong className="text-[#0F1D2F]">No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong></li>
            <li>All other categories exclude text messaging originator opt-in data and consent. This information will not be shared with any third parties.</li>
            <li>We may share your information with service providers who assist in delivering messages on our behalf, subject to confidentiality agreements.</li>
          </ul>
          <p className="text-[#5A6B7D] leading-relaxed mt-3">
            For complete details on how we handle your data, please review our <Link href="/privacy" className="hover:underline" style={{ color: "var(--accent-brand)" }}>Privacy Policy</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">9. Disclaimer</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            {config.companyName} provides this SMS program on an &quot;as is&quot; basis. We make no warranties regarding the availability, timeliness, or accuracy of SMS messages. Carriers are not liable for delayed or undelivered messages. Message delivery is subject to effective transmission from your wireless provider.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">10. Changes to These Terms</h2>
          <p className="text-[#5A6B7D] leading-relaxed">
            We reserve the right to modify these SMS Terms &amp; Conditions at any time. Changes will be effective upon posting to this page. Continued participation in the SMS program after changes are posted constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-8 rounded-lg bg-gray-50 p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-[#0F1D2F] mb-3">Quick Reference</h2>
          <div className="space-y-2 text-[#5A6B7D]">
            <p><strong className="text-[#0F1D2F]">Program:</strong> GoDutch Homebuyers LLC property inquiry communications</p>
            <p><strong className="text-[#0F1D2F]">Message Frequency:</strong> Up to 5 messages per month. Message frequency varies.</p>
            <p><strong className="text-[#0F1D2F]">Cost:</strong> Message and data rates may apply.</p>
            <p><strong className="text-[#0F1D2F]">Opt Out:</strong> Reply STOP to cancel.</p>
            <p><strong className="text-[#0F1D2F]">Help:</strong> Reply HELP or contact <a href="mailto:tom@godutchhomebuyers.com" className="hover:underline" style={{ color: "var(--accent-brand)" }}>tom@godutchhomebuyers.com</a></p>
            <p><strong className="text-[#0F1D2F]">Privacy:</strong> <Link href="/privacy" className="hover:underline" style={{ color: "var(--accent-brand)" }}>View Privacy Policy</Link></p>
          </div>
        </section>
      </div>
      <FooterLinks />
    </main>
  )
}
