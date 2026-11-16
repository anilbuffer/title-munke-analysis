'use client';

import React from 'react';
import {
  History,
  AlertTriangle,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';

interface HistoricalValueChartProps {
  record: AIValuationRecord;
}

export function HistoricalValueChart({ record }: HistoricalValueChartProps) {
  const { historicalPrices, sufficientHistoricalData, historicalDataLimitationNote } = record;
  const isEligible = record.eligibility === 'ELIGIBLE' || record.eligibility === 'INSUFFICIENT_DATA';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (!isEligible) {
    return null;
  }

  // Calculate CAGR if there are multiple data points
  let cagr = '0.0';
  let totalGainPercent = '0.0';
  if (historicalPrices.length >= 2) {
    const first = historicalPrices[0];
    const last = historicalPrices[historicalPrices.length - 1];
    const yearsDiff = last.year - first.year;
    if (yearsDiff > 0 && first.estimatedValue > 0) {
      const growthRatio = last.estimatedValue / first.estimatedValue;
      const cagrVal = (Math.pow(growthRatio, 1 / yearsDiff) - 1) * 100;
      cagr = cagrVal.toFixed(1);
      totalGainPercent = (((last.estimatedValue - first.estimatedValue) / first.estimatedValue) * 100).toFixed(1);
    }
  }

  const values = historicalPrices.map((p) => p.estimatedValue);
  const minVal = values.length > 0 ? Math.min(...values) * 0.92 : 0;
  const maxVal = values.length > 0 ? Math.max(...values) * 1.06 : 1;
  const midVal = (minVal + maxVal) / 2;

  const minYear = historicalPrices.length > 0 ? historicalPrices[0].year : 2007;
  const maxYear = historicalPrices.length > 0 ? historicalPrices[historicalPrices.length - 1].year : 2026;
  const yearSpan = Math.max(1, maxYear - minYear);

  // Normalized coordinates (0 to 100)
  const normX = (yr: number) => ((yr - minYear) / yearSpan) * 100;
  const normY = (val: number) => 100 - ((val - minVal) / (maxVal - minVal)) * 100;

  const points = historicalPrices.map((pt) => ({
    x: normX(pt.year),
    y: normY(pt.estimatedValue),
    year: pt.year,
    val: pt.estimatedValue,
    date: pt.date,
  }));

  const toPath = (pts: { x: number; y: number }[]) => {
    return pts.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  };

  const pathStr = toPath(points);
  const areaPath = points.length > 0 ? `${pathStr} L 100 100 L 0 100 Z` : '';

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#f0e8e0] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#550000]" />
            <h2 className="text-sm sm:text-base font-bold text-[#3d2014] tracking-tight">
              Historical Value Changes Over Time
            </h2>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Recorded deed transfers and municipal tax assessment progression
          </p>
        </div>

        {sufficientHistoricalData && (
          <div className="flex items-center gap-1.5 text-xs self-start sm:self-auto">
            <span className="font-medium text-stone-500 text-[11px]">CAGR:</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              +{cagr}% / yr (+{totalGainPercent}%)
            </span>
          </div>
        )}
      </div>

      {/* Historical Data Limitation Notice (if applicable) */}
      {!sufficientHistoricalData && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-amber-800 leading-relaxed text-[11px]">
            {historicalDataLimitationNote ||
              'Historical deed records are incomplete for this tax lot. Displaying verified recordings without ungrounded extrapolation.'}
          </p>
        </div>
      )}

      {/* Graphic & HTML Axis Wrapper: True 10px Typography Consistency */}
      {points.length >= 2 && (
        <div className="bg-[#fdfbf9] border border-[#f0e8e0] rounded-xl p-3.5 space-y-2">
          <div className="pt-1">
            <div className="flex gap-2.5">
              {/* Left Y-Axis HTML Labels: Fixed 10px font size, no SVG distortion */}
              <div className="flex flex-col justify-between text-right text-[10px] text-stone-400 font-medium select-none w-20 shrink-0 h-28 py-0.5">
                <span>{formatCurrency(maxVal)}</span>
                <span>{formatCurrency(midVal)}</span>
                <span>{formatCurrency(minVal)}</span>
              </div>

              {/* Graphic Canvas */}
              <div className="flex-1 relative h-28">
                {/* Horizontal Dashed Gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="w-full border-b border-dashed border-[#ede5dc]" />
                  <div className="w-full border-b border-dashed border-[#ede5dc]" />
                  <div className="w-full border-b border-dashed border-[#ede5dc]" />
                </div>

                {/* SVG Curve */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full overflow-visible relative z-10"
                >
                  <defs>
                    <linearGradient id="historyGradientClean" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#550000" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#550000" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path d={areaPath} fill="url(#historyGradientClean)" />

                  {/* Trend Line */}
                  <path
                    d={pathStr}
                    fill="none"
                    stroke="#550000"
                    strokeWidth="2.2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Vector Data Dots: Rendered with precise CSS percentages */}
                {points.map((p, idx) => (
                  <div
                    key={`hist-dot-${idx}`}
                    className="absolute w-2.5 h-2.5 rounded-full bg-white border-2 border-[#550000] -translate-x-1/2 -translate-y-1/2 z-20 shadow-2xs"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom X-Axis HTML Labels: Fixed 10px font size matching other cards */}
            <div className="relative pl-22.5 pr-0 pt-2 h-6 select-none">
              {points.map((p, idx) => (
                <div
                  key={`year-label-${idx}`}
                  className="absolute text-[10px] font-medium text-stone-400"
                  style={{
                    left: `${p.x}%`,
                    transform:
                      idx === 0
                        ? 'translateX(0%)'
                        : idx === points.length - 1
                        ? 'translateX(-100%)'
                        : 'translateX(-50%)',
                  }}
                >
                  {p.year}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Historical Milestones List: Compact & Clean */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-1">
          Historical Deed Filings & Assessments
        </span>

        <div className="divide-y divide-[#f5ede5] border border-[#f0e8e0] rounded-xl overflow-hidden bg-white">
          {historicalPrices.map((item, idx) => (
            <div
              key={idx}
              className="py-2 px-3 sm:px-3.5 flex items-center justify-between gap-2 hover:bg-[#fbf7f4] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#f8e8e8] text-[#550000] flex items-center justify-center font-bold text-[9px] shrink-0">
                  {item.year.toString().slice(-2)}
                </span>
                <div>
                  <div className="text-xs font-semibold text-[#3d2014] leading-tight">
                    {item.eventDescription}
                  </div>
                  <div className="text-[10px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.source}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-bold text-[#3d2014]">
                  {formatCurrency(item.estimatedValue)}
                </div>
                <div className="text-[9px] text-stone-400">
                  Year {item.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
