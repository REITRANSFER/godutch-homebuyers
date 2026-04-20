"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getConfig } from "@/lib/config";

const config = getConfig();

const salesLetterParagraphs = [
  { type: "hook-headline" as const, content: "How we determine your offer:" },
  { type: "body" as const, content: "First, we look at recent sales of updated homes in your area and how quickly they sold." },
  { type: "body" as const, content: "If there aren\u2019t enough strong comparable sales, we can also draw on feedback from active local Houston investors who regularly buy properties in the area. That gives us real-time market insight, not guesswork." },
  { type: "body" as const, content: "Then we estimate the cost to bring your property to market standard, along with holding, closing, and resale costs." },
  { type: "body" as const, content: "We also consider your timeline. More flexibility can sometimes create better options." },
  { type: "body" as const, content: "Then we present a clear offer, explain how we got there, answer your questions, and let you decide what works for you." },
  { type: "body" as const, content: "Fair doesn\u2019t always mean highest. Fair means honest." },
  { type: "divider" as const, content: "" },
  { type: "subheadline" as const, content: "It\u2019s Not Just About Price" },
  { type: "body" as const, content: "Everyone wants the highest price. But price is only one variable." },
  { type: "body" as const, content: "Every way of selling has trade-offs." },
  { type: "body" as const, content: "A traditional listing may achieve a higher price, but it can also mean repairs, showings, commissions, delays, and uncertainty." },
  { type: "body" as const, content: "A direct sale can offer speed, convenience, and certainty. But it may not be the highest possible number on paper." },
  { type: "body" as const, content: "If you need to close tomorrow, more margin may need to be built in. If you have a few weeks of flexibility, the offer can sometimes be higher." },
  { type: "body" as const, content: "The right choice depends on what matters most to you." },
  { type: "body" as const, content: "Our role is to help you understand the trade-offs." },
  { type: "divider" as const, content: "" },
  { type: "subheadline" as const, content: "Your Situation Matters" },
  { type: "body" as const, content: "Some people need speed. Some want certainty. Some don\u2019t want repairs, showings, or months of waiting." },
  { type: "body" as const, content: "Others are dealing with inheritance, tenants, divorce, relocation, or a property they no longer want to manage." },
  { type: "body" as const, content: "No two sellers are the same. Tell us what matters to you, and we\u2019ll show you the options." },
  { type: "divider" as const, content: "" },
  { type: "subheadline" as const, content: "How This Actually Works" },
  { type: "step" as const, content: "Tell us about your property. (Now)|Complete the short form with your address and a few basic details. It only takes a couple of minutes." },
  { type: "step" as const, content: "We contact you to learn more. (Immediately or later today)|We\u2019ll reach out by text and/or phone to ask a few follow-up questions and see whether a face-to-face meeting makes sense." },
  { type: "step" as const, content: "We meet and walk you through the options. (As soon as we can)|Once we understand the property and your situation properly, we\u2019ll explain the options available, answer your questions, and present a clear offer if it\u2019s a fit." },
  { type: "step" as const, content: "You decide. We handle the rest. (When you\u2019re ready)|If you choose to move forward, we go to work and close on the date that suits you. Fast if you need speed, later if you need time." },
  { type: "divider" as const, content: "" },
  { type: "subheadline" as const, content: "Why People Choose Us Over a Traditional Listing" },
  { type: "comparison" as const, content: "" },
  { type: "divider" as const, content: "" },
  { type: "subheadline" as const, content: "One Last Thing" },
  { type: "body" as const, content: "We know you have options. You can list with a realtor and wait for the right buyer. You can try to sell it yourself and handle showings, negotiations, and repair requests. You can call one of those \u201cwe buy houses\u201d signs stuck at every intersection." },
  { type: "body" as const, content: "But if you want to speak with a real local team that will give you a real number and explain how they got there, that\u2019s us." },
  { type: "body" as const, content: "We\u2019re building our name the right way: by being clear, fair, and doing what we say we\u2019ll do. And the offer we make is the offer you\u2019ll get at closing." },
  { type: "cta" as const, content: "Get your cash offer now." },
];

function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-4 text-base font-semibold text-muted-foreground border-b border-border"></th>
            <th className="py-4 px-4 text-base font-semibold text-[#1B2A4A] border-b border-border bg-[#1B2A4A]/10">{config.companyName}</th>
            <th className="py-4 px-4 text-base font-semibold text-muted-foreground border-b border-border">Traditional Listing</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Timeline", "3\u201345 days", "90\u2013180 days"],
            ["Fees", "Zero", "5\u20136% commission"],
            ["Repairs", "None required", "Buyer may request"],
            ["Showings", "Just us", "Multiple strangers"],
            ["Offer certainty", "Guaranteed", "Can fall through"],
            ["Closing costs", "We pay", "You pay"],
          ].map(([label, us, them], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
              <td className="py-3 px-4 text-base font-medium text-foreground border-b border-border">{label}</td>
              <td className="py-3 px-4 text-base text-[#1B2A4A] font-medium border-b border-border">{us}</td>
              <td className="py-3 px-4 text-base text-muted-foreground border-b border-border">{them}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SalesLetterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    const paragraphs = sectionRef.current?.querySelectorAll("[data-paragraph]");
    if (!paragraphs) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-paragraph"));
            setVisibleCount((prev) => Math.max(prev, idx + 1));
          }
        });
      },
      { threshold: 0.3 }
    );
    paragraphs.forEach((p) => observerRef.current!.observe(p));
  }, []);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  let stepCounter = 0;

  return (
    <section className="bg-background py-20 md:py-32">
      <div ref={sectionRef} className="mx-auto max-w-3xl px-6 md:px-12">
        {salesLetterParagraphs.map((p, i) => {
          const isVisible = i < visibleCount;
          if (p.type === "divider") {
            return (
              <div key={i} data-paragraph={i} className={`my-10 md:my-14 border-t border-border transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} />
            );
          }
          if (p.type === "hook-headline") {
            return (
              <h2 key={i} data-paragraph={i} className={`text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {p.content}
              </h2>
            );
          }
          if (p.type === "subheadline") {
            return (
              <h3 key={i} data-paragraph={i} className={`text-2xl md:text-3xl font-bold text-foreground mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {p.content}
              </h3>
            );
          }
          if (p.type === "comparison") {
            return (
              <div key={i} data-paragraph={i} className={`my-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <ComparisonTable />
              </div>
            );
          }
          if (p.type === "step") {
            stepCounter++;
            const [title, desc] = p.content.split("|");
            return (
              <div key={i} data-paragraph={i} className={`flex gap-4 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: "var(--accent-brand)" }}>
                  {stepCounter}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground">{title}</h4>
                  <p className="text-muted-foreground mt-1 text-base leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          }
          if (p.type === "cta") {
            return (
              <div key={i} data-paragraph={i} className={`mt-12 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <button
                  onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 text-white font-semibold text-xl px-12 py-5 rounded-2xl transition-all"
                  style={{ backgroundColor: "var(--accent-brand)" }}
                >
                  {p.content}
                </button>
              </div>
            );
          }
          return (
            <p key={i} data-paragraph={i} className={`text-lg md:text-xl leading-relaxed text-muted-foreground mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {p.content}
            </p>
          );
        })}
      </div>
    </section>
  );
}
