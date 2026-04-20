"use client";

import { Users, FileSearch, Handshake } from "lucide-react";

const guarantees = [
  {
    icon: FileSearch,
    title: "The Personalised Offer",
    description: "We do our homework. We look at your property, your timeline, needed repairs, local sales, and the best path for your situation.",
  },
  {
    icon: Handshake,
    title: "Clear Process. No Surprises.",
    description: "We explain how we reached the offer, what happens next, and your options. No confusion. No pressure.",
  },
  {
    icon: Users,
    title: "Real People. Real Solutions.",
    description: "Every situation is different. Inheritance, repairs, tenants, foreclosure, divorce, relocation. We treat people with respect and work to find the right fit.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
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
