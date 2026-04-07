import Link from "next/link"
import { getConfig } from "@/lib/config"

const config = getConfig()

export function FooterLinks() {
  return (
    <footer className="bg-white px-4 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-gray-200 py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <img src={config.logoUrl} alt={config.companyName} width={320} height={80} className="h-20 w-auto" />
          <p className="text-sm text-gray-500">We buy houses in any condition. No obligation, no pressure.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="transition-colors hover:text-gray-900">Privacy Policy</Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="transition-colors hover:text-gray-900">Terms of Service</Link>
            <span className="text-gray-300">|</span>
            <a href={`tel:${config.phoneHref}`} className="transition-colors hover:text-gray-900">{config.phoneDisplay}</a>
          </div>
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} {config.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
