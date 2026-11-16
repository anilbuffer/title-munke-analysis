'use client';

import React from 'react';
import {
  ShieldX,
  ArrowRight,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';

interface IneligiblePropertyCardProps {
  record: AIValuationRecord;
  onSelectEligibleProperty: (address: string) => void;
}

export function IneligiblePropertyCard({
  record,
  onSelectEligibleProperty,
}: IneligiblePropertyCardProps) {
  const isCondo = record.eligibility === 'EXCLUDED_CONDO';
  const isCoop = record.eligibility === 'EXCLUDED_COOP';

  if (!isCondo && !isCoop) {
    return null;
  }

  return (
    <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-red-100 text-red-700 shrink-0 mt-0.5">
            <ShieldX className="w-5 h-5" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-red-950">
                {isCondo ? 'Condominium Unit — Excluded from Scope' : 'Cooperative Apartment — Excluded from Scope'}
              </h3>
              <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.2 rounded-full border border-red-300">
                Excluded
              </span>
            </div>
            <p className="text-xs text-red-900/80 leading-relaxed max-w-2xl">
              Single-lot automated models evaluate unified fee-simple PLUTO parcels. {isCondo ? 'Condominiums' : 'Cooperatives'} trade as individual unit shares and require specialized appraisal with HOA common reserve audits.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectEligibleProperty('3010 BRIGGS AVENUE, BX, New York City')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#550000] text-white hover:bg-[#400000] transition-colors cursor-pointer shrink-0 self-center"
        >
          <span>View 3010 Briggs Ave</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
