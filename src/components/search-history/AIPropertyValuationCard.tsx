'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export interface AIPropertyValuationData {
  state?: 'NY' | 'PA' | string;
  propertyAddress?: string;
  marketValue?: number;
  [key: string]: unknown;
}

interface AIPropertyValuationCardProps {
  title?: string;
  description?: string;
  data?: unknown;
}

export function AIPropertyValuationCard({
  title = 'AI Property Valuation Engine',
  description = 'Automated valuation model analyzing real-time deed recordings, tax assessment data, and market comparables.',
}: AIPropertyValuationCardProps) {
  return (
    <div className="mt-8 pt-6 border-t border-[#f0e8e0]">
      <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-2xl p-5 sm:p-6 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#550000] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#3d2014] tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
