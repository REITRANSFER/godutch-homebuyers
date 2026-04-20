"use client";

import { useState } from "react";
import { ArrowRight, ArrowDown, Shield, Clock, DollarSign } from "lucide-react";
import { SurveyCard } from "@/components/v2/survey-card";
import { AddressAutocomplete, type AddressDetails } from "@/components/survey/address-autocomplete";
import { getConfig } from "@/lib/config";

const config = getConfig();

export function HeroSection() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [initialAddress, setInitialAddress] = useState("");
  const [outsideAreaError, setOutsideAreaError] = useState(false);

  const handleAddressSelect = (address: string, details: AddressDetails) => {
    const state = details.state?.toUpperCase() || "";
    const county = details.county || "";

    const stateOk = config.serviceStates.length === 0 || config.serviceStates.includes(state);
    const countyLower = county.toLowerCase();
    const countyOk = config.serviceCounties.length > 0
      ? config.serviceCounties.some(c => countyLower.includes(c))
      : (!config.serviceArea || config.serviceArea === "Your Area" || countyLower.includes(config.serviceArea.toLowerCase()));

    if (stateOk && countyOk) {
      setInitialAddress(address);
      setOutsideAreaError(false);
      setShowSurvey(true);
    } else {
      setOutsideAreaError(true);
    }
  };

  return (
    <section id="hero" className="relative bg-white">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 py-20 md:px-12 md:py-24 lg:px-20">
        {/* Trust badges */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-6 mb-6 animate-reveal-up">
          <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
            <Shield className="h-4 w-4 text-[#1B2A4A]" />
            <span>Trusted</span>
          </div>
          <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
            <Clock className="h-4 w-4 text-[#1B2A4A]" />
            <span>24-Hour Cash Offers</span>
          </div>
          <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
            <DollarSign className="h-4 w-4 text-[#1B2A4A]" />
            <span>No Fees. No Commissions.</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-[#0F1D2F] md:text-5xl lg:text-6xl max-w-4xl animate-reveal-up animation-delay-100">
          {config.headline}{" "}
          <span style={{ color: "var(--accent-brand)" }}>{config.headlineAccent}</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-2 md:mt-4 text-center text-base md:text-xl text-[#5A6B7D] max-w-2xl leading-relaxed animate-reveal-up animation-delay-200">
          {config.subheadline}
        </p>

        {/* Address Input or Survey */}
        <div className="mt-4 md:mt-10 w-full max-w-2xl animate-reveal-up animation-delay-300">
          {!showSurvey ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[#1B2A4A] text-base font-medium">Enter your address to start</span>
                <ArrowDown className="h-5 w-5 text-[#1B2A4A] animate-bounce" />
              </div>
              <div className="relative">
                <AddressAutocomplete
                  value={initialAddress}
                  onChange={(address) => { setInitialAddress(address); setOutsideAreaError(false); }}
                  onSelect={handleAddressSelect}
                  placeholder={`Enter your ${config.serviceArea} area address...`}
                  bounds={config.serviceBounds || undefined}
                  className="[&_input]:h-14 [&_input]:text-lg [&_input]:rounded-2xl [&_input]:shadow-lg [&_input]:border-[#1B2A4A]/30 [&_input]:bg-white"
                />
              </div>
              <button
                onClick={() => { if (initialAddress.trim().length > 5) setShowSurvey(true) }}
                disabled={initialAddress.trim().length <= 5}
                className="w-full h-14 bg-[#1B2A4A] hover:bg-[#131E36] text-white font-semibold text-xl rounded-2xl transition-all shadow-lg shadow-[#1B2A4A]/20 flex items-center justify-center gap-2 disabled:opacity-40"
              >
                Get My Free Cash Offer
                <ArrowRight className="h-6 w-6" />
              </button>
              {outsideAreaError && (
                <p className="text-center text-sm font-medium" style={{ color: "#dc2626" }}>
                  {`Sorry, we only buy homes in ${config.serviceArea}. Please enter a local address.`}
                </p>
              )}
              <p className="text-center text-[#94A3B8] text-sm">
                Takes less than 2 minutes. No obligation.
              </p>
            </div>
          ) : (
            <div className="animate-scale-in">
              <SurveyCard initialAddress={initialAddress} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
