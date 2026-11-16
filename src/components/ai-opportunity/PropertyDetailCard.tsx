'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Building2,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import { AIOpportunityProperty } from '@/types/ai-opportunity';

interface PropertyDetailCardProps {
  property: AIOpportunityProperty;
  onBackToFinder: () => void;
  onOpenValuation: (address: string) => void;
  onOpenNYPropertyDetail: (address: string) => void;
}

export function PropertyDetailCard({
  property,
  onBackToFinder,
  onOpenValuation,
  onOpenNYPropertyDetail,
}: PropertyDetailCardProps) {
  const [showDeepAnalysis, setShowDeepAnalysis] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownloadOpportunity = () => {
    setToastMessage(`Exporting AI Opportunity Brief for ${property.address}...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#3d2014] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#6b453a] flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Beige Navigation Banner matching Title Munke consistency: < Back */}
      <div className="bg-[#ede4db] rounded-2xl px-5 py-3 flex items-center justify-between border border-[#e2d7cc] shadow-2xs">
        <button
          onClick={onBackToFinder}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>

        <span className="text-xs text-stone-500 font-mono">
          BBL: {property.bbl}
        </span>
      </div>

      {/* Main Card exactly matching Reference Image 2 */}
      <div className="bg-white rounded-3xl border border-[#eadfd4] p-6 sm:p-8 shadow-xs">
        {/* Green Badge matching Image 2 */}
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#eaf4ec] text-[#2d7a3e]">
            Historical sales record
          </span>
        </div>

        {/* Address Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#291e1a] mt-3 tracking-tight">
          {property.address}
        </h1>

        {/* Price in Burgundy (#550000) matching Image 2 */}
        <div className="text-3xl sm:text-4xl font-extrabold text-[#550000] mt-2 tracking-tight">
          ${property.lastRecordedSalePrice.toLocaleString()}
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Last recorded sale price · Illustrative demo record
        </p>

        {/* Action Button: Black Pill button matching Image 2 */}
        <div className="mt-5">
          <button
            onClick={() => onOpenValuation(property.fullAddress)}
            className="w-full py-3.5 px-6 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-stone-800 active:scale-[0.99] transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Open property detail & AI analysis</span>
          </button>
        </div>

        {/* Expandable Section: AI Opportunity Analysis & Underwriting Breakdown */}
        <div className="mt-8 pt-6 border-t border-[#f0e8e0]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#550000]" />
              <h2 className="text-sm sm:text-base font-bold text-[#291e1a]">
                AI Opportunity Underwriting & Valuation
              </h2>
            </div>
            <button
              onClick={() => setShowDeepAnalysis(!showDeepAnalysis)}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
            >
              <span>{showDeepAnalysis ? 'Collapse' : 'Expand'}</span>
              {showDeepAnalysis ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showDeepAnalysis && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Score & Equity Spread Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Metric 1: Opportunity Score */}
                <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    AI Opportunity Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#550000]">
                      {property.opportunityScore}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Exceptional Spread
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Top 5% ROI percentile in {property.borough}
                  </span>
                </div>

                {/* Metric 2: Estimated Current Market Value */}
                <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    Current AI Valuation
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#291e1a]">
                      ${property.estimatedMarketValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      +${property.equitySpread.toLocaleString()} (+{property.equitySpreadPercent}%) equity upside
                    </span>
                  </div>
                </div>

                {/* Metric 3: In-Place Capitalization Rate */}
                <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    Cap Rate / Yield
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#291e1a]">
                      {property.capRatePercent}%
                    </span>
                    <span className="text-xs text-stone-500">
                      ({property.grossYieldPercent}% Gross)
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Acquisition price: ${property.pricePerSqFt}/sq ft (vs area ${property.areaMedianPricePerSqFt})
                  </span>
                </div>
              </div>

              {/* Property Specs Breakdown Grid */}
              <div className="bg-[#fcfaf7] border border-[#eadfd4] rounded-2xl p-4 sm:p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-3 border-b border-[#f0e8e0] pb-2">
                  Building Specs & Zoning Potential
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">
                      Building Class
                    </span>
                    <span className="font-semibold text-[#291e1a] mt-0.5 block">
                      {property.buildingClass}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">
                      Gross Square Footage
                    </span>
                    <span className="font-semibold text-[#291e1a] mt-0.5 block">
                      {property.grossSqFt.toLocaleString()} sq ft
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">
                      Year Built / Stories
                    </span>
                    <span className="font-semibold text-[#291e1a] mt-0.5 block">
                      {property.yearBuilt} · {property.stories} Stories ({property.totalUnits} Units)
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">
                      Zoning / Max FAR
                    </span>
                    <span className="font-semibold text-[#291e1a] mt-0.5 block">
                      {property.zoning} (FAR {property.actualFAR} / Max {property.maxFAR})
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Rationale & Key Highlights */}
              <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-2xl p-4 sm:p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                  AI Investment Thesis
                </span>
                <p className="text-xs sm:text-sm text-[#3d2014] leading-relaxed">
                  {property.rationale}
                </p>

                <div className="mt-3.5 pt-3 border-t border-[#f0e8e0]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Key Opportunity Drivers
                  </span>
                  <ul className="space-y-1.5">
                    {property.keyHighlights.map((hl, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-stone-700 flex items-start gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenValuation(property.fullAddress)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch AI Valuation Model</span>
                  </button>

                  <button
                    onClick={() => onOpenNYPropertyDetail(property.fullAddress)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#eadfd4] text-stone-800 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>View ACRIS Deeds</span>
                  </button>
                </div>

                <button
                  onClick={handleDownloadOpportunity}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors cursor-pointer font-medium"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Deal Sheet</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
