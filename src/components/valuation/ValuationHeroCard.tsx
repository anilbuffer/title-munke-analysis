'use client';

import React from 'react';
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

  const breakdownItems = [
    {
      label: 'Price Per Sq. Ft.',
      value: isEligible ? `$${record.pricePerSqFt} / sq ft` : '—',
      badge:
        isEligible && record.neighborhoodBenchmark?.propertyPricePremiumPercent !== undefined
          ? `+${record.neighborhoodBenchmark.propertyPricePremiumPercent}% vs median`
          : null,
    },
    {
      label: 'Gross Sq Ft',
      value: `${formatNumber(plutoData.grossSqFt)} sq ft`,
      badge: null,
    },
    {
      label: 'Lot Area',
      value: `${formatNumber(plutoData.lotAreaSqFt)} sq ft`,
      badge: null,
    },
    {
      label: 'Year Built',
      value: `${plutoData.yearBuilt}`,
      badge: null,
    },
    {
      label: 'Stories / Units',
      value: `${plutoData.stories} Fl • ${plutoData.totalUnits} Unit${plutoData.totalUnits === 1 ? '' : 's'}`,
      badge: null,
    },
    {
      label: 'Zoning / FAR',
      value: `${plutoData.zoning} (FAR ${plutoData.maxFAR})`,
      badge: null,
    },
    {
      label: 'Tax Assessed',
      value: formatCurrency(plutoData.assessedValue),
      badge: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
      {/* 1st Card: Estimated Market Value */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="border-b border-[#f0e8e0] pb-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Estimated Market Value
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-[#3d2014] tracking-tight mt-1">
            {isEligible ? formatCurrency(record.estimatedMarketValue) : 'Excluded'}
          </div>

          <p className="text-xs text-stone-500 mt-2">
            Based on recent Rolling Sales deeds & PLUTO records
          </p>
        </div>

        <div className="pt-3.5 mt-5 border-t border-[#f0e8e0] text-[11px] text-stone-500 flex flex-wrap items-center justify-between gap-2">
          <span>
            Owner: <strong className="text-stone-700 font-medium">{plutoData.currentOwner}</strong>
          </span>
          <span>
            Scope: <strong className="text-stone-700 font-medium">{plutoData.coopCondoStatus || 'Fee Simple'}</strong> (Class {plutoData.taxClass})
          </span>
        </div>
      </div>

      {/* 2nd Card: Property Specs Breakdown List */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="border-b border-[#f0e8e0] pb-2 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Property Specs Breakdown
            </span>
          </div>

          <div className="divide-y divide-[#f5ede5]">
            {breakdownItems.map((item, idx) => (
              <div
                key={idx}
                className="py-2 flex items-center justify-between gap-3 text-xs"
              >
                <span className="text-stone-500 font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#3d2014]">{item.value}</span>
                  {item.badge && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
