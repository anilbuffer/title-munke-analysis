'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Shield,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';

interface PriceOutlookChartProps {
  record: AIValuationRecord;
}

export function PriceOutlookChart({ record }: PriceOutlookChartProps) {
  const [selectedHorizon, setSelectedHorizon] = useState<1 | 3 | 5>(3);

  const { priceOutlookScenarios, estimatedMarketValue } = record;
  const isEligible = record.eligibility === 'ELIGIBLE' || record.eligibility === 'INSUFFICIENT_DATA';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatGain = (futureVal: number) => {
    const gain = futureVal - estimatedMarketValue;
    const sign = gain >= 0 ? '+' : '';
    return `${sign}${formatCurrency(gain)}`;
  };

  const activeScenario =
    selectedHorizon === 1
      ? priceOutlookScenarios.oneYear
      : selectedHorizon === 3
        ? priceOutlookScenarios.threeYear
        : priceOutlookScenarios.fiveYear;

  // Chart values
  const y0 = estimatedMarketValue;
  const y1_c = priceOutlookScenarios.oneYear.conservativeValue;
  const y1_e = priceOutlookScenarios.oneYear.expectedValue;
  const y1_o = priceOutlookScenarios.oneYear.optimisticValue;

  const y3_c = priceOutlookScenarios.threeYear.conservativeValue;
  const y3_e = priceOutlookScenarios.threeYear.expectedValue;
  const y3_o = priceOutlookScenarios.threeYear.optimisticValue;

  const y5_c = priceOutlookScenarios.fiveYear.conservativeValue;
  const y5_e = priceOutlookScenarios.fiveYear.expectedValue;
  const y5_o = priceOutlookScenarios.fiveYear.optimisticValue;

  // Interpolated points for smooth visualization
  const y2_c = y1_c + (y3_c - y1_c) * 0.48;
  const y2_e = y1_e + (y3_e - y1_e) * 0.48;
  const y2_o = y1_o + (y3_o - y1_o) * 0.48;

  const y4_c = y3_c + (y5_c - y3_c) * 0.48;
  const y4_e = y3_e + (y5_e - y3_e) * 0.48;
  const y4_o = y3_o + (y5_o - y3_o) * 0.48;

  const minVal = Math.min(y0, y5_c) * 0.95;
  const maxVal = Math.max(y5_o, y0 * 1.1) * 1.04;
  const midVal = (minVal + maxVal) / 2;

  // Normalized coordinates (0 to 100)
  const normY = (val: number) => 100 - ((val - minVal) / (maxVal - minVal)) * 100;

  const pts_c = [
    { x: 0, y: normY(y0) },
    { x: 20, y: normY(y1_c) },
    { x: 40, y: normY(y2_c) },
    { x: 60, y: normY(y3_c) },
    { x: 80, y: normY(y4_c) },
    { x: 100, y: normY(y5_c) },
  ];

  const pts_e = [
    { x: 0, y: normY(y0) },
    { x: 20, y: normY(y1_e) },
    { x: 40, y: normY(y2_e) },
    { x: 60, y: normY(y3_e) },
    { x: 80, y: normY(y4_e) },
    { x: 100, y: normY(y5_e) },
  ];

  const pts_o = [
    { x: 0, y: normY(y0) },
    { x: 20, y: normY(y1_o) },
    { x: 40, y: normY(y2_o) },
    { x: 60, y: normY(y3_o) },
    { x: 80, y: normY(y4_o) },
    { x: 100, y: normY(y5_o) },
  ];

  const toPath = (points: { x: number; y: number }[]) => {
    return points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  };

  const expectedAreaPath = `${toPath(pts_e)} L 100 100 L 0 100 Z`;

  const yearsList = [
    { year: 0, label: 'Today (Y0)', pct: 0 },
    { year: 1, label: 'Year 1', pct: 20 },
    { year: 2, label: 'Year 2', pct: 40 },
    { year: 3, label: 'Year 3', pct: 60 },
    { year: 4, label: 'Year 4', pct: 80 },
    { year: 5, label: 'Year 5', pct: 100 },
  ];

  if (!isEligible) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#f0e8e0] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#550000]" />
            <h2 className="text-sm sm:text-base font-bold text-[#3d2014] tracking-tight">
              Price Outlook
            </h2>
          </div>
        </div>

        {/* 1, 3, 5-Year Horizon Selector */}
        <div className="inline-flex p-0.5 bg-[#f5f0ec] rounded-lg border border-[#eadfd4] self-start sm:self-auto">
          {[1, 3, 5].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedHorizon(yr as 1 | 3 | 5)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${selectedHorizon === yr
                  ? 'bg-[#550000] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              {yr}-Year
            </button>
          ))}
        </div>
      </div>

      {/* Visual Chart Card */}
      <div className="bg-[#fdfbf9] border border-[#f0e8e0] rounded-xl p-3.5 space-y-2">
        {/* Scenario Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 font-medium text-stone-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Optimistic (+{activeScenario.optimisticAnnualGrowth}%/yr)</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-[#550000]">
              <span className="w-2 h-2 rounded-full bg-[#550000]" />
              <span>Expected Baseline (+{activeScenario.expectedAnnualGrowth}%/yr)</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-stone-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Conservative (+{activeScenario.conservativeAnnualGrowth}%/yr)</span>
            </div>
          </div>
          <span className="text-[10px] text-stone-400">DOF Annualized Model</span>
        </div>

        {/* Graphic & HTML Axis Wrapper: True 10px Typography Consistency */}
        <div className="pt-2">
          <div className="flex gap-2.5">
            {/* Left Y-Axis HTML Labels: Fixed 10px font size, no SVG distortion */}
            <div className="flex flex-col justify-between text-right text-[10px] text-stone-400 font-medium select-none w-20 shrink-0 h-28 py-0.5">
              <span>{formatCurrency(maxVal)}</span>
              <span>{formatCurrency(midVal)}</span>
              <span>{formatCurrency(minVal)}</span>
            </div>

            {/* SVG Drawing Canvas */}
            <div className="flex-1 relative h-28">
              {/* Background Horizontal Dashed Gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-b border-dashed border-[#ede5dc]" />
                <div className="w-full border-b border-dashed border-[#ede5dc]" />
                <div className="w-full border-b border-dashed border-[#ede5dc]" />
              </div>

              {/* Vertical Guideline for Selected Horizon */}
              <div
                className="absolute top-0 bottom-0 border-l border-dashed border-[#550000] pointer-events-none z-0"
                style={{ left: `${selectedHorizon * 20}%` }}
              />

              {/* Vector Curves */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible relative z-10"
              >
                <defs>
                  <linearGradient id="outlookExpectedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#550000" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="#550000" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path d={expectedAreaPath} fill="url(#outlookExpectedGrad)" />

                {/* Conservative Line */}
                <path
                  d={toPath(pts_c)}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1.8"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />

                {/* Expected Line */}
                <path
                  d={toPath(pts_e)}
                  fill="none"
                  stroke="#550000"
                  strokeWidth="2.4"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />

                {/* Optimistic Line */}
                <path
                  d={toPath(pts_o)}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.8"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />
              </svg>

              {/* Vector Data Dots: Rendered with precise CSS percentages */}
              {pts_c.map((p, idx) => (
                <div
                  key={`dot-c-${idx}`}
                  className="absolute w-2 h-2 rounded-full bg-white border-2 border-amber-600 -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                />
              ))}

              {pts_e.map((p, idx) => {
                const isTarget = idx === selectedHorizon;
                return (
                  <div
                    key={`dot-e-${idx}`}
                    className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 z-20 transition-all ${isTarget
                        ? 'w-3 h-3 bg-[#550000] border-2 border-white ring-2 ring-[#550000]/40'
                        : 'w-2.5 h-2.5 bg-[#550000] border-2 border-white'
                      }`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  />
                );
              })}

              {pts_o.map((p, idx) => (
                <div
                  key={`dot-o-${idx}`}
                  className="absolute w-2 h-2 rounded-full bg-white border-2 border-emerald-500 -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bottom X-Axis HTML Labels: Fixed 10px font size matching other cards */}
          <div className="relative pl-22.5 pr-0 pt-2 h-6 select-none">
            {yearsList.map((item, idx) => {
              const isSelected = item.year === selectedHorizon;
              return (
                <div
                  key={item.year}
                  className={`absolute text-[10px] transition-colors ${isSelected
                      ? 'font-bold text-[#550000]'
                      : 'font-medium text-stone-400'
                    }`}
                  style={{
                    left: `${item.pct}%`,
                    transform:
                      idx === 0
                        ? 'translateX(0%)'
                        : idx === yearsList.length - 1
                          ? 'translateX(-100%)'
                          : 'translateX(-50%)',
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Horizon Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
        {/* Conservative Card */}
        <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-xl p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-amber-800 uppercase">
            <span>Conservative (+{activeScenario.conservativeAnnualGrowth}%/yr)</span>
            <Shield className="w-3 h-3 text-amber-700" />
          </div>
          <div className="text-sm sm:text-base font-bold text-stone-900 mt-1">
            {formatCurrency(activeScenario.conservativeValue)}
          </div>
          <div className="text-[10px] text-amber-800 font-semibold mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{formatGain(activeScenario.conservativeValue)} gain</span>
          </div>
        </div>

        {/* Expected Card */}
        <div className="bg-[#f8e8e8]/70 border border-[#f0c4c4] rounded-xl p-3 shadow-2xs relative">
          <span className="absolute -top-2 right-3 text-[9px] uppercase font-extrabold bg-[#550000] text-white px-2 py-0.2 rounded-full">
            Expected
          </span>
          <div className="flex items-center justify-between text-[10px] font-bold text-[#550000] uppercase">
            <span>Target (+{activeScenario.expectedAnnualGrowth}%/yr)</span>
            <Sparkles className="w-3 h-3 text-[#550000]" />
          </div>
          <div className="text-sm sm:text-base font-bold text-[#550000] mt-1">
            {formatCurrency(activeScenario.expectedValue)}
          </div>
          <div className="text-[10px] text-[#550000] font-semibold mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{formatGain(activeScenario.expectedValue)} gain</span>
          </div>
        </div>

        {/* Optimistic Card */}
        <div className="bg-[#fbf7f4] border border-[#eadfd4] rounded-xl p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-emerald-800 uppercase">
            <span>Optimistic (+{activeScenario.optimisticAnnualGrowth}%/yr)</span>
            <TrendingUp className="w-3 h-3 text-emerald-700" />
          </div>
          <div className="text-sm sm:text-base font-bold text-stone-900 mt-1">
            {formatCurrency(activeScenario.optimisticValue)}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{formatGain(activeScenario.optimisticValue)} gain</span>
          </div>
        </div>
      </div>
    </div>
  );
}
