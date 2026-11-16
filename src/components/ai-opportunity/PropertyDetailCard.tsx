'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
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
}: PropertyDetailCardProps) {
  return (
    <div className="w-full space-y-4 animate-in fade-in duration-200">
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

      {/* Main Card matching Reference Image 2 */}
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

        {/* Action Button: Brand Color Pill button (#550000) */}
        <div className="mt-5">
          <button
            onClick={() => onOpenValuation(property.fullAddress)}
            className="w-full py-3.5 px-6 rounded-full bg-[#550000] text-white text-xs sm:text-sm font-semibold hover:bg-[#680000] active:scale-[0.99] transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Open property detail & AI analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
}
