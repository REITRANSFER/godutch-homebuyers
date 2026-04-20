export function getConfig() {
  const parseJSON = (val: string | undefined, fallback: unknown) => {
    if (!val) return fallback;
    try { return JSON.parse(val); } catch { return fallback; }
  };

  return {
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Your Company Name",
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(555) 000-0000",
    phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF || "5550000000",
    companyDomain: process.env.NEXT_PUBLIC_COMPANY_DOMAIN || "example.com",
    ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || "Our Team",
    serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA || "Your Area",
    serviceStates: (process.env.NEXT_PUBLIC_SERVICE_STATES || "").split(",").map(s => s.trim()).filter(Boolean),
    serviceCounties: (process.env.NEXT_PUBLIC_SERVICE_COUNTIES || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
    serviceBounds: parseJSON(process.env.NEXT_PUBLIC_SERVICE_BOUNDS, null) as { south: number; north: number; west: number; east: number } | null,
    accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || "#2563eb",
    logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || "/placeholder-logo.svg",
    headline: process.env.NEXT_PUBLIC_HEADLINE || "Sell Your House Fast for Cash.",
    headlineAccent: process.env.NEXT_PUBLIC_HEADLINE_ACCENT || "No Repairs. No Fees.",
    subheadline: process.env.NEXT_PUBLIC_SUBHEADLINE || "Get a fair cash offer within 24 hours. We help homeowners sell their homes fast for cash.",
    metaTitle: process.env.NEXT_PUBLIC_META_TITLE || "Sell Your House Fast for Cash",
    metaDescription: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Get a fair, no-obligation cash offer on your home within 24 hours.",
    stat1Value: process.env.NEXT_PUBLIC_STAT_1_VALUE || "500+",
    stat1Label: process.env.NEXT_PUBLIC_STAT_1_LABEL || "Homes Bought",
    stat2Value: process.env.NEXT_PUBLIC_STAT_2_VALUE || "10+",
    stat2Label: process.env.NEXT_PUBLIC_STAT_2_LABEL || "Years Experience",
    stat3Value: process.env.NEXT_PUBLIC_STAT_3_VALUE || "5-Star",
    stat3Label: process.env.NEXT_PUBLIC_STAT_3_LABEL || "Google Rating",
    stat4Value: process.env.NEXT_PUBLIC_STAT_4_VALUE || "A+",
    stat4Label: process.env.NEXT_PUBLIC_STAT_4_LABEL || "BBB Rating",
  };
}
