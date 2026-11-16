'use client';

import React from 'react';
import {
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';

interface NeighborhoodComparisonCardProps {
  record: AIValuationRecord;
}

export function NeighborhoodComparisonCard({ record }: NeighborhoodComparisonCardProps) {
  const { neighborhoodBenchmark, aiExplanation, pricePerSqFt } = record;
  const isEligible = record.eligibility === 'ELIGIBLE' || record.eligibility === 'INSUFFICIENT_DATA';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const isPremium = neighborhoodBenchmark.propertyPricePremiumPercent >= 0;

  if (!isEligible) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0e8e0] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#550000]" />
            <h2 className="text-sm sm:text-base font-bold text-[#3d2014] tracking-tight">
              Neighborhood Comparison & Valuation Insights
            </h2>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold self-start sm:self-auto ${isPremium
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
        >
          {isPremium ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>
            {isPremium ? '+' : ''}
            {neighborhoodBenchmark.propertyPricePremiumPercent}% vs Median
          </span>
        </div>
      </div>

      {/* Metrics Row + Visual Comparison Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        {/* 3 Metric Pills */}
        <div className="md:col-span-6 grid grid-cols-3 gap-2">
          <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-xl p-2.5">
            <span className="text-[9px] uppercase font-bold text-stone-500 block">MEDIAN PRICE</span>
            <span className="text-xs sm:text-sm font-bold text-[#3d2014] mt-0.5 block truncate">
              {formatCurrency(neighborhoodBenchmark.medianSalePrice)}
            </span>
          </div>

          <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-xl p-2.5">
            <span className="text-[9px] uppercase font-bold text-stone-500 block">AREA $/SQ FT</span>
            <span className="text-xs sm:text-sm font-bold text-[#3d2014] mt-0.5 block">
              ${neighborhoodBenchmark.averagePricePerSqFt}
            </span>
          </div>

          <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-xl p-2.5">
            <span className="text-[9px] uppercase font-bold text-stone-500 block">12M VOLUME</span>
            <span className="text-xs sm:text-sm font-bold text-[#3d2014] mt-0.5 block">
              {neighborhoodBenchmark.twelveMonthSalesVolume} sales
            </span>
          </div>
        </div>

        {/* Visual Bar Meter */}
        <div className="md:col-span-6 bg-[#fdfbf9] border border-[#f0e8e0] rounded-xl p-3 space-y-2">
          <div>
            <div className="flex justify-between text-[11px] mb-1 font-semibold text-stone-700">
              <span>Subject Property: <strong>${pricePerSqFt}/sq ft</strong></span>
              <span>Area Median: ${neighborhoodBenchmark.averagePricePerSqFt}/sq ft</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-[#550000] rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (pricePerSqFt / (neighborhoodBenchmark.averagePricePerSqFt * 1.5)) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Key Insights: Punchy & Compact */}
      <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-xl p-3.5 sm:p-4 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#3d2014]">
          <Sparkles className="w-3.5 h-3.5 text-[#550000]" />
          <span>Why this property is valued higher or lower:</span>
        </div>

        <p className="text-xs text-stone-700 leading-relaxed font-normal">
          {aiExplanation.plainLanguageNarrative}
        </p>

        {/* Driver Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {aiExplanation.keyDriversWhyHigherOrLower.slice(0, 4).map((driver, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-2.5 border border-[#eadfd4] text-[11px] flex items-start gap-2"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${driver.impact === 'INCREASES_VALUE'
                    ? 'bg-emerald-500'
                    : driver.impact === 'DECREASES_VALUE'
                      ? 'bg-red-500'
                      : 'bg-stone-400'
                  }`}
              />
              <div className="space-y-0.5">
                <span className="font-bold text-stone-800">{driver.factor}</span>
                <p className="text-stone-500 leading-normal text-[10.5px]">{driver.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
