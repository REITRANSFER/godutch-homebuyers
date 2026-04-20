"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How do you determine your offer price?", answer: "We look at recent sales of updated homes in your area, how quickly they sold, the current condition of your property, local market trends, and the likely cost of any repairs or updates needed.\n\nIf there aren\u2019t enough strong comparable sales, we can also draw on feedback from active local Houston investors who regularly buy in the area.\n\nWe then factor in holding costs, closing costs, resale costs, a reasonable margin for the risk we take, and your preferred timeline, because more flexibility can sometimes create better options.\n\nWe\u2019re transparent about how we arrive at our number. And unlike most cash buyers, we do this homework before making an offer, not after. That\u2019s why our number doesn\u2019t change." },
  { question: "Do I need to make any repairs before selling?", answer: "No. We buy houses in any condition. Roof damage, foundation issues, outdated kitchens, overgrown yards, tenant damage... we\u2019ve seen it all. You don\u2019t need to fix, clean, or stage anything. Just leave whatever you don\u2019t want and we\u2019ll handle the rest." },
  { question: "How fast can you close?", answer: "As fast as 7 days if you need it. But there\u2019s no rush. If you need 30 or 60 days to get settled, that works too. You pick the closing date that makes sense for your situation." },
  { question: "Are there fees or commissions?", answer: "Zero agent commissions. No closing costs. No hidden fees.\n\nThe offer we give you is the gross amount at closing. Any mortgages, liens, unpaid taxes, or other balances secured against the property are typically paid by the title company from the sale proceeds, and the remaining amount is what you walk away with." },
  { question: "What if my house is in foreclosure?", answer: "We work with homeowners in pre-foreclosure regularly. In many cases, we can close fast enough to stop the foreclosure process and help you walk away with equity instead of losing everything. Time matters here, so the sooner you reach out, the more options we have." },
  { question: "What if I owe more than you offer?", answer: "You may still have options through a short sale.\n\nA short sale means we work with your lender to see if they will accept less than the full loan balance as payment to release the property. If approved, you can sell the home and avoid carrying the debt tied to it.\n\nIt can also create extra time in the home while the approval process is reviewed, and it may be a better outcome for your credit than a completed foreclosure.\n\nEvery lender and situation is different, so nothing is guaranteed. But if you\u2019re in this position, it\u2019s worth talking to us as soon as possible." },
  { question: "How is this different from listing with an agent?", answer: "When you list with an agent, you\u2019re looking at 90 to 180 days on market, 5% to 6% in commissions, repair requests from buyers, showings with strangers walking through your home, and the constant risk that a deal falls through because the buyer\u2019s financing didn\u2019t work out. With us, you get a guaranteed cash offer, no fees, and you pick the closing date." },
  { question: "What areas do you serve?", answer: "We buy homes throughout Houston, TX. Harris County and Fort Bend County. That includes Katy, Spring, Pasadena, The Woodlands, Pearland.\n\nEnter your address above to get started." },
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
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-6 pb-5 text-muted-foreground text-base leading-relaxed whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
