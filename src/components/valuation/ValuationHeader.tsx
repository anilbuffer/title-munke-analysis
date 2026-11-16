'use client';

import React from 'react';
import {
  ChevronLeft,
  ShieldCheck,
  AlertTriangle,
  Download,
  RotateCw,
  Search,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';
import { MOCK_NYC_VALUATION_DATABASE } from '@/data/mock-valuation-database';

interface ValuationHeaderProps {
  currentRecord: AIValuationRecord;
  onBack: () => void;
  onSelectProperty: (address: string) => void;
  onRefresh?: () => void;
}

export function ValuationHeader({
  currentRecord,
  onBack,
  onSelectProperty,
  onRefresh,
}: ValuationHeaderProps) {
  const propertyKeys = Object.keys(MOCK_NYC_VALUATION_DATABASE);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Top Row: Back Button & Property Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#f0e8e0]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Property</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-stone-500 hidden sm:inline">
            Property:
          </span>
          <div className="relative">
            <select
              value={currentRecord.propertyAddress}
              onChange={(e) => onSelectProperty(e.target.value)}
              className="appearance-none bg-[#fbf7f4] border border-[#eadfd4] text-xs font-semibold text-[#3d2014] rounded-xl px-3 py-1.5 pr-7 hover:border-stone-400 focus:outline-none focus:ring-1 focus:ring-[#550000] cursor-pointer shadow-2xs"
            >
              {propertyKeys.map((key) => {
                const item = MOCK_NYC_VALUATION_DATABASE[key];
                const tag =
                  item.eligibility === 'ELIGIBLE'
                    ? 'Eligible'
                    : item.eligibility === 'INSUFFICIENT_DATA'
                      ? 'Fallback'
                      : 'Excluded';
                return (
                  <option key={key} value={key}>
                    [{tag}] {key.split(',')[0]}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400">
              <Search className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Address, BBL & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-base sm:text-lg font-bold text-[#3d2014] tracking-tight">
              {currentRecord.propertyAddress}
            </h1>

            {/* Concise Status Pills */}
            {currentRecord.eligibility === 'ELIGIBLE' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eaf4ec] text-[#2d7a3e] border border-[#d3ebd7]">
                <ShieldCheck className="w-3 h-3" />
                PLUTO Verified
              </span>
            )}
            {currentRecord.eligibility === 'EXCLUDED_CONDO' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                <AlertTriangle className="w-3 h-3" />
                Condo Excluded
              </span>
            )}
            {currentRecord.eligibility === 'EXCLUDED_COOP' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                <AlertTriangle className="w-3 h-3" />
                Co-op Excluded
              </span>
            )}
            {currentRecord.eligibility === 'INSUFFICIENT_DATA' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                <AlertTriangle className="w-3 h-3" />
                Internet Fallback
              </span>
            )}

            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
              {currentRecord.confidenceLevel === 'HIGH_CONFIDENCE' ? 'High Confidence' : 'Lower Confidence'}
            </span>
          </div>

          <div className="text-[11px] text-stone-500 flex items-center gap-2 flex-wrap">
            <span>BBL: <strong className="text-stone-700">{currentRecord.bbl}</strong></span>
            <span>•</span>
            <span>{currentRecord.plutoData.borough}</span>
            <span>•</span>
            <span>Class {currentRecord.plutoData.buildingClass} ({currentRecord.plutoData.buildingClassDescription})</span>
          </div>
        </div>

        {/* Compact Actions */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer border border-[#eadfd4]"
              title="Refresh Valuation Model"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => alert(`Exporting AI Valuation Abstract for ${currentRecord.propertyAddress}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#550000] text-white hover:bg-[#400000] transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
