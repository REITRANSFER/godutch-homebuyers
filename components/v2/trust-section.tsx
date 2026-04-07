"use client";

import { Shield, Clock, Home, DollarSign, Star, Award } from "lucide-react";
import { getConfig } from "@/lib/config";

const config = getConfig();

const stats = [
  { icon: Home, value: config.stat1Value, label: config.stat1Label },
  { icon: Clock, value: config.stat2Value, label: config.stat2Label },
  { icon: Star, value: config.stat3Value, label: config.stat3Label },
  { icon: Award, value: config.stat4Value, label: config.stat4Label },
];

const guarantees = [
  {
    icon: DollarSign,
    title: "The Perfect Cash Offer\u2122",
    description: "The offer we make is the offer you get at closing. We do our homework before we give you a number \u2014 we\u2019ve already factored in the roof, the kitchen, the condition. Our number is final.",
  },
  {
    icon: Clock,
    title: "24-Hour Offer",
    description: "Submit your property info and we\u2019ll have a fair cash offer in your hands within 24 hours. No waiting. No wondering. No runaround.",
  },
  {
    icon: Shield,
    title: "Zero Fees. Zero Commissions.",
    description: "We pay all closing costs. No agent fees. No hidden charges. The number on your offer is exactly what you take home at closing.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-9 w-9 mx-auto mb-3" style={{ color: "var(--accent-brand)" }} />
              <div className="text-4xl md:text-5xl font-bold text-[#0F1D2F]">{stat.value}</div>
              <div className="text-base text-[#5A6B7D] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
              <guarantee.icon className="h-11 w-11 mb-5" style={{ color: "var(--accent-brand)" }} />
              <h3 className="text-xl font-semibold text-[#0F1D2F] mb-3">{guarantee.title}</h3>
              <p className="text-[#5A6B7D] leading-relaxed text-base">{guarantee.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
