import { Metadata } from "next"
import Link from "next/link"
import { FooterLinks } from "@/components/polar/footer-links"
import { getConfig } from "@/lib/config"

const config = getConfig()

export const metadata: Metadata = {
  title: `${config.companyName} — Privacy Policy`,
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/"><img src={config.logoUrl} alt={config.companyName} className="h-16 w-auto" /></Link>
          <Link href="/" className="text-sm font-medium transition-colors" style={{ color: "var(--accent-brand)" }}>\u2190 Back to Home</Link>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-[#0F1D2F] mb-2">{config.companyName} Privacy Policy</h1>
        <p className="text-sm text-[#5A6B7D] mb-10">Last updated: March 24, 2026</p>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">1. Introduction</h2><p className="text-[#5A6B7D] leading-relaxed">{config.companyName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or submit a property inquiry.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">2. Information We Collect</h2><p className="text-[#5A6B7D] leading-relaxed mb-3">We collect information you provide directly to us, including:</p><ul className="list-disc pl-6 space-y-2 text-[#5A6B7D]"><li>Name, email address, and phone number</li><li>Property address and details</li><li>Information about your situation and motivation for selling</li><li>Device information, IP address, and browser type (collected automatically)</li><li>Cookies and similar tracking technologies</li></ul></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">3. How We Use Your Information</h2><p className="text-[#5A6B7D] leading-relaxed mb-3">We use the information we collect to:</p><ul className="list-disc pl-6 space-y-2 text-[#5A6B7D]"><li>Contact you about your property inquiry and provide a cash offer</li><li>Communicate with you about our services</li><li>Improve our website and customer experience</li><li>Comply with legal obligations</li></ul></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">4. Information Sharing</h2><p className="text-[#5A6B7D] leading-relaxed">We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, subject to confidentiality agreements.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">5. Cookies</h2><p className="text-[#5A6B7D] leading-relaxed">Our website uses cookies and similar tracking technologies to enhance your experience and analyze website traffic. You can control cookie settings through your browser preferences.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">6. Your Rights</h2><p className="text-[#5A6B7D] leading-relaxed">You have the right to access, correct, or delete your personal information. To opt out of marketing communications, reply &quot;STOP&quot; to any text message or click &quot;Unsubscribe&quot; in any email.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">7. Data Security</h2><p className="text-[#5A6B7D] leading-relaxed">We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p></section>
        <section className="mb-8"><h2 className="text-xl font-semibold text-[#0F1D2F] mb-3">8. Contact Us</h2><p className="text-[#5A6B7D] leading-relaxed">If you have questions about this Privacy Policy, please contact us:</p><div className="mt-3 space-y-1 text-[#5A6B7D]"><p><strong className="text-[#0F1D2F]">{config.companyName}</strong></p><p>Email: <a href={`mailto:info@${config.companyDomain}`} className="hover:underline" style={{ color: "var(--accent-brand)" }}>{`info@${config.companyDomain}`}</a></p><p>Phone: <a href={`tel:${config.phoneHref}`} className="hover:underline" style={{ color: "var(--accent-brand)" }}>{config.phoneDisplay}</a></p></div></section>
      </div>
      <FooterLinks />
    </main>
  )
}
