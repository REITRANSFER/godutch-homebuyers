"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getConfig } from "@/lib/config";

const config = getConfig();

const faqs = [
  { question: "How do you determine your offer price?", answer: "We look at comparable sales in your area, the current condition of the property, local market trends, and repair costs. We\u2019re transparent about how we arrive at our number. And unlike most cash buyers, we do this homework before making an offer, not after. That\u2019s why our number doesn\u2019t change." },
  { question: "Do I need to make any repairs before selling?", answer: "No. We buy houses in any condition. Roof damage, foundation issues, outdated kitchens, overgrown yards, tenant damage... we\u2019ve seen it all. You don\u2019t need to fix, clean, or stage anything. Just leave whatever you don\u2019t want and we\u2019ll handle the rest." },
  { question: "How fast can you close?", answer: "As fast as 7 days if you need it. But there\u2019s no rush. If you need 30 or 60 days to get settled, that works too. You pick the closing date that makes sense for your situation." },
  { question: "Are there any fees or commissions?", answer: "Zero. No agent commissions (which typically run 5% to 6% of the sale price). No closing costs. No hidden fees. The offer we give you is the amount you walk away with at closing." },
  { question: "What if my house is in foreclosure?", answer: "We work with homeowners in pre-foreclosure regularly. In many cases, we can close fast enough to stop the foreclosure process and help you walk away with equity instead of losing everything. Time matters here, so the sooner you reach out, the more options we have." },
  { question: "Will your offer change after you see my house?", answer: "No. This is the most important thing about how we operate. We do our due diligence before making an offer. We factor in the condition, the repairs, and the market before we give you a number. That number is final. We don\u2019t use the inspection as an excuse to renegotiate." },
  { question: "How is this different from listing with an agent?", answer: "When you list with an agent, you\u2019re looking at 90 to 180 days on market, 5% to 6% in commissions, repair requests from buyers, showings with strangers walking through your home, and the constant risk that a deal falls through because the buyer\u2019s financing didn\u2019t work out. With us, you get a guaranteed cash offer, no fees, and you pick the closing date." },
  { question: "What areas do you serve?", answer: `We buy homes throughout ${config.serviceArea}. Enter your address above to get started.` },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-secondary py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-4">Common Questions</h2>
        <p className="text-center text-muted-foreground text-lg mb-12">Straight answers. No runaround.</p>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-border bg-background overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="font-medium text-foreground text-lg pr-4">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-6 pb-5 text-muted-foreground text-base leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
