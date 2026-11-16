'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

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
  onOpenValuation?: () => void;
}

export function AIPropertyValuationCard({
  title = 'AI Property Valuation Engine',
  description = 'Automated valuation model analyzing real-time deed recordings, municipal tax assessments, and comparable sales for broker underwriting.',
  onOpenValuation,
}: AIPropertyValuationCardProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleValuationClick = () => {
    if (onOpenValuation) {
      setIsLoading(true);
      setToastMessage('Opening AI Property Valuation Engine...');
      setTimeout(() => {
        setIsLoading(false);
        setToastMessage(null);
        onOpenValuation();
      }, 400);
      return;
    }

    setIsLoading(true);
    setToastMessage('Running AI Property Valuation analysis...');
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage('AI Property Valuation complete.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  return (
    <div className="mt-8 pt-6 border-t border-[#f0e8e0]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#3d2014] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#6b453a] flex items-center gap-2 text-xs sm:text-sm animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-2xl p-6 sm:p-8 shadow-2xs text-center flex flex-col items-center justify-center">
        {/* Centered Title */}
        <h2 className="text-base sm:text-lg font-bold text-[#3d2014] tracking-tight">
          {title}
        </h2>

        {/* Centered Short Description */}
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-xl mx-auto">
          {description}
        </p>

        {/* Centered [AI Property Valuation] Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleValuationClick}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#550000] text-white hover:bg-[#400000] transition-all duration-200 shadow-xs shadow-[#550000]/20 active:scale-[0.98] cursor-pointer disabled:opacity-70"
          >
            <Sparkles className={`w-4 h-4 text-amber-300 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Loading Engine...' : 'AI Property Valuation'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
