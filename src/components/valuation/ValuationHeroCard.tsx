'use client';

import React from 'react';
import {
  CheckCircle2,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';

interface ValuationHeroCardProps {
  record: AIValuationRecord;
}

export function ValuationHeroCard({ record }: ValuationHeroCardProps) {
  const { plutoData } = record;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  const isEligible = record.eligibility === 'ELIGIBLE' || record.eligibility === 'INSUFFICIENT_DATA';

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Valuation Figures Grid: Market Value, Range, $/Sq Ft */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
        {/* Market Value Hero Box */}
        <div className="md:col-span-4 bg-[#fbf7f4] border border-[#eadfd4] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              <span>Estimated Market Value</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Verified
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3d2014] tracking-tight">
              {isEligible ? formatCurrency(record.estimatedMarketValue) : 'Excluded'}
            </div>
          </div>

          <div className="text-[11px] text-stone-500 mt-2">
            Based on recent Rolling Sales deeds & PLUTO records
          </div>
        </div>

        {/* Predicted Selling Price Range */}
        <div className="md:col-span-5 bg-white border border-[#eadfd4] rounded-xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
            Estimated Selling Range
          </span>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Low */}
            <div className="bg-[#fbf7f4] rounded-lg p-2 border border-[#eadfd4]">
              <span className="text-[10px] font-medium text-stone-500 block uppercase">
                Low
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800 block mt-0.5">
                {isEligible ? formatCurrency(record.lowEstimatedPrice) : '—'}
              </span>
            </div>

            {/* Expected */}
            <div className="bg-[#f8e8e8] rounded-lg p-2 border border-[#f0c4c4] relative">
              <span className="text-[10px] font-bold text-[#550000] block uppercase">
                Target
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#550000] block mt-0.5">
                {isEligible ? formatCurrency(record.estimatedMarketValue) : '—'}
              </span>
            </div>

            {/* High */}
            <div className="bg-[#fbf7f4] rounded-lg p-2 border border-[#eadfd4]">
              <span className="text-[10px] font-medium text-stone-500 block uppercase">
                High
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800 block mt-0.5">
                {isEligible ? formatCurrency(record.highEstimatedPrice) : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Price Per Sq Ft Box */}
        <div className="md:col-span-3 bg-[#fbf7f4] border border-[#eadfd4] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Price Per Sq. Ft.
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#3d2014]">
                {isEligible ? `$${record.pricePerSqFt}` : '—'}
              </span>
              <span className="text-[11px] text-stone-500">/ sq ft</span>
            </div>
          </div>

          <div className="text-[11px] text-stone-600 mt-2 flex items-center justify-between">
            <span>vs. Area Median:</span>
            <span className="font-semibold text-emerald-700">
              +{record.neighborhoodBenchmark.propertyPricePremiumPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* PLUTO Specs Bar: Compact, clean single row */}
      <div className="pt-2 border-t border-[#f0e8e0]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="bg-[#fdfbf9] p-2.5 rounded-lg border border-[#f0e8e0]">
            <span className="text-[9px] font-bold text-stone-400 uppercase block">GROSS SQ FT</span>
            <span className="text-xs font-bold text-[#3d2014] mt-0.5 block">{formatNumber(plutoData.grossSqFt)} sq ft</span>
          </div>
          <div className="bg-[#fdfbf9] p-2.5 rounded-lg border border-[#f0e8e0]">
            <span className="text-[9px] font-bold text-stone-400 uppercase block">LOT AREA</span>
            <span className="text-xs font-bold text-[#3d2014] mt-0.5 block">{formatNumber(plutoData.lotAreaSqFt)} sq ft</span>
          </div>
          <div className="bg-[#fdfbf9] p-2.5 rounded-lg border border-[#f0e8e0]">
            <span className="text-[9px] font-bold text-stone-400 uppercase block">YEAR BUILT</span>
            <span className="text-xs font-bold text-[#3d2014] mt-0.5 block">{plutoData.yearBuilt}</span>
          </div>
          <div className="bg-[#fdfbf9] p-2.5 rounded-lg border border-[#f0e8e0]">
            <span className="text-[9px] font-bold text-stone-400 uppercase block">STORIES / UNITS</span>
            <span className="text-xs font-bold text-[#3d2014] mt-0.5 block">{plutoData.stories} Fl • {plutoData.totalUnits} Unit</span>
          </div>
          <div className="bg-[#fdfbf9] p-2.5 rounded-lg border border-[#f0e8e0]">
            <span className="text-[9px] font-bold text-stone-400 uppercase block">ZONING / FAR</span>
            <span className="text-xs font-bold text-[#3d2014] mt-0.5 block">{plutoData.zoning} (FAR {plutoData.maxFAR})</span>
          </div>
          <div className="bg-[#fdfbf9] p-2.5 rounded-lg border border-[#f0e8e0]">
            <span className="text-[9px] font-bold text-stone-400 uppercase block">TAX ASSESSED</span>
            <span className="text-xs font-bold text-[#3d2014] mt-0.5 block">{formatCurrency(plutoData.assessedValue)}</span>
          </div>
        </div>

        <div className="mt-2 text-[11px] text-stone-500 flex items-center justify-between px-1">
          <span>Owner: <strong className="text-stone-700 font-medium">{plutoData.currentOwner}</strong></span>
          <span>Scope: <strong className="text-stone-700 font-medium">{plutoData.coopCondoStatus || 'Fee Simple'}</strong> (Class {plutoData.taxClass})</span>
        </div>
      </div>
    </div>
  );
}
