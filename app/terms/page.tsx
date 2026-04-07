import { Metadata } from "next"
import Link from "next/link"
import { FooterLinks } from "@/components/polar/footer-links"
import { getConfig } from "@/lib/config"

const config = getConfig()

export const metadata: Metadata = {
  title: `${config.companyName} — Terms of Service`,
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/"><img src={config.logoUrl} alt={config.companyName} className="h-16 w-auto" /></Link>
          <Link href="/" className="text-sm font-medium transition-colors" style={{ color: "var(--accent-brand)" }}>\u2190 Back to Home</Link>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-[#0F1D2F] mb-2">{config.companyName} Terms of Service</h1>
        <p className="text-sm text-[#5A6B7D] mb-10">Last updated: March 24, 2026</p>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">1. Acceptance of Terms</h2><p className="text-[#5A6B7D] leading-relaxed">By accessing our website or submitting a property inquiry, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">2. Services Description</h2><p className="text-[#5A6B7D] leading-relaxed">{config.companyName} is a real estate investment company that makes cash offers to purchase residential properties. Submitting a property inquiry does not obligate either party to complete a transaction. Any offer made is subject to due diligence, property inspection, and final approval.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">3. User Representations</h2><p className="text-[#5A6B7D] leading-relaxed mb-3">By submitting a property inquiry, you represent that:</p><ul className="list-disc pl-6 space-y-2 text-[#5A6B7D]"><li>You are at least 18 years of age</li><li>You have the legal authority to sell the property</li><li>The information you provide is accurate and complete</li><li>You are not currently under a listing agreement with a real estate agent</li></ul></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">4. No Obligation</h2><p className="text-[#5A6B7D] leading-relaxed">Submitting an inquiry creates no obligation for {config.companyName} to purchase your property, nor does it create any obligation for you to sell. We reserve the right to decline any inquiry at our sole discretion.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">5. Intellectual Property</h2><p className="text-[#5A6B7D] leading-relaxed">All content on this website is the property of {config.companyName} and is protected by applicable copyright and trademark laws.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">6. Limitation of Liability</h2><p className="text-[#5A6B7D] leading-relaxed">To the maximum extent permitted by law, {config.companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">7. Changes to Terms</h2><p className="text-[#5A6B7D] leading-relaxed">We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting to our website.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">8. Contact</h2><p className="text-[#5A6B7D] leading-relaxed">For questions about these Terms of Service, contact us at: <a href={`mailto:info@${config.companyDomain}`} className="hover:underline" style={{ color: "var(--accent-brand)" }}>{`info@${config.companyDomain}`}</a></p></section>
      </div>
      <FooterLinks />
    </main>
  )
}
