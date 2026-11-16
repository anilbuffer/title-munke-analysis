'use client';

import React from 'react';
import {
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';

interface InternetFallbackCardProps {
  record: AIValuationRecord;
}

export function InternetFallbackCard({ record }: InternetFallbackCardProps) {
  const { internetFallbackSources, reviewTrackingId } = record;

  if (record.dataSource !== 'INTERNET_FALLBACK' || !internetFallbackSources) {
    return null;
  }

  return (
    <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-900 shrink-0 mt-0.5">
            <ShieldAlert className="w-4 h-4 text-amber-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-amber-950">
                Limited Internal Records — Internet Fallback Active
              </h3>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-400">
                Lower Confidence
              </span>
            </div>
            <p className="text-[11px] text-amber-900/80 leading-relaxed mt-0.5">
              Insufficient internal deed filings for this parcel in the past 24 months. Estimated using public secondary indexes and saved for review under Audit ID: <span className="font-mono font-semibold">{reviewTrackingId || 'REV-VAL-2026-9042'}</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Sources list */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        <span className="text-[10px] font-bold uppercase text-amber-900/60">Sources:</span>
        {internetFallbackSources.map((src, idx) => (
          <a
            key={idx}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-stone-700 hover:text-[#550000] transition-colors shadow-2xs"
          >
            <span className="font-medium">{src.title.split(' ')[0]}</span>
            <span className="text-[10px] text-stone-400">({src.confidenceWeight}%)</span>
            <ExternalLink className="w-2.5 h-2.5 text-stone-400" />
          </a>
        ))}
      </div>
    </div>
  );
}
