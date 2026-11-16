'use client';

import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Search,
  AlertTriangle,
  MapPin,
  ArrowUpDown,
} from 'lucide-react';
import { AIValuationRecord } from '@/types/property-valuation';

interface ComparableSalesTableProps {
  record: AIValuationRecord;
}

export function ComparableSalesTable({ record }: ComparableSalesTableProps) {
  const [sortField, setSortField] = useState<'similarity' | 'price' | 'date' | 'distance' | 'sqftPrice'>('similarity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchFilter, setSearchFilter] = useState('');

  const { comparables, sufficientCompsAvailable, compDataLimitationNote } = record;

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

  const filteredComps = useMemo(() => {
    const result = comparables.filter((c) => {
      const q = searchFilter.toLowerCase();
      return (
        c.address.toLowerCase().includes(q) ||
        c.neighborhood.toLowerCase().includes(q) ||
        c.buildingClass.toLowerCase().includes(q) ||
        c.plutoZoning.toLowerCase().includes(q)
      );
    });

    result.sort((a, b) => {
      if (sortField === 'similarity') {
        return sortOrder === 'asc' ? a.similarityScore - b.similarityScore : b.similarityScore - a.similarityScore;
      }
      if (sortField === 'price') {
        return sortOrder === 'asc' ? a.salePrice - b.salePrice : b.salePrice - a.salePrice;
      }
      if (sortField === 'date') {
        return sortOrder === 'asc' ? a.saleDate.localeCompare(b.saleDate) : b.saleDate.localeCompare(a.saleDate);
      }
      if (sortField === 'distance') {
        return sortOrder === 'asc' ? a.distanceMiles - b.distanceMiles : b.distanceMiles - a.distanceMiles;
      }
      if (sortField === 'sqftPrice') {
        return sortOrder === 'asc' ? a.pricePerSqFt - b.pricePerSqFt : b.pricePerSqFt - a.pricePerSqFt;
      }
      return 0;
    });

    return result;
  }, [comparables, searchFilter, sortField, sortOrder]);

  const handleSort = (field: 'similarity' | 'price' | 'date' | 'distance' | 'sqftPrice') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const avgCompPricePerSqFt = useMemo(() => {
    if (!comparables.length) return 0;
    const total = comparables.reduce((acc, c) => acc + c.pricePerSqFt, 0);
    return Math.round(total / comparables.length);
  }, [comparables]);

  const medianCompSalePrice = useMemo(() => {
    if (!comparables.length) return 0;
    const sorted = [...comparables].sort((a, b) => a.salePrice - b.salePrice);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid].salePrice : (sorted[mid - 1].salePrice + sorted[mid].salePrice) / 2;
  }, [comparables]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0e8e0] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#550000]" />
            <h2 className="text-sm sm:text-base font-bold text-[#3d2014] tracking-tight">
              Recent Comparable Sales
            </h2>
          </div>
        </div>

        {/* Quick Summary Pill & Filter */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {comparables.length > 0 && (
            <span className="text-[11px] font-medium text-stone-600 bg-[#fbf7f4] px-2.5 py-1 rounded-lg border border-[#eadfd4]">
              {comparables.length} Comps • Avg ${avgCompPricePerSqFt}/sq ft • Median {formatCurrency(medianCompSalePrice)}
            </span>
          )}

          <div className="relative w-44">
            <input
              type="text"
              placeholder="Filter comps..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-7 pr-2.5 py-1 text-xs bg-[#fbf7f4] border border-[#eadfd4] rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#550000]"
            />
            <Search className="w-3 h-3 text-stone-400 absolute left-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Data Limitation Notice (if applicable) */}
      {!sufficientCompsAvailable && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-amber-800 leading-relaxed text-[11px]">
            {compDataLimitationNote ||
              'Limited comparable sales found in internal registry for this building class and submarket.'}
          </p>
        </div>
      )}

      {/* Comps Table: Compact & Clean */}
      {filteredComps.length > 0 ? (
        <div className="border border-[#f0e8e0] rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f6efe9] border-b border-[#f0e8e0] text-[#3d2014] text-[11px] font-semibold">
                  <th className="py-2.5 px-3.5 whitespace-nowrap">Property</th>
                  <th
                    onClick={() => handleSort('similarity')}
                    className="py-2.5 px-2.5 whitespace-nowrap cursor-pointer hover:bg-stone-200/60"
                  >
                    <div className="flex items-center gap-1">
                      <span>Match</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('price')}
                    className="py-2.5 px-2.5 whitespace-nowrap cursor-pointer hover:bg-stone-200/60"
                  >
                    <div className="flex items-center gap-1">
                      <span>Sale Price</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('sqftPrice')}
                    className="py-2.5 px-2.5 whitespace-nowrap cursor-pointer hover:bg-stone-200/60"
                  >
                    <div className="flex items-center gap-1">
                      <span>$/Sq Ft</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-2.5 whitespace-nowrap">Gross Area</th>
                  <th
                    onClick={() => handleSort('distance')}
                    className="py-2.5 px-2.5 whitespace-nowrap cursor-pointer hover:bg-stone-200/60"
                  >
                    <div className="flex items-center gap-1">
                      <span>Distance</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('date')}
                    className="py-2.5 px-2.5 whitespace-nowrap cursor-pointer hover:bg-stone-200/60"
                  >
                    <div className="flex items-center gap-1">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap text-right">Class & Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5ede5]">
                {filteredComps.map((comp) => (
                  <tr
                    key={comp.id}
                    className="hover:bg-[#fbf7f4]/80 transition-colors text-[#3d2014]"
                  >
                    {/* Address */}
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-stone-900">{comp.address}</div>
                      <div className="text-[10px] text-stone-400">
                        {comp.neighborhood} • BBL: {comp.bbl}
                      </div>
                    </td>

                    {/* Match Score */}
                    <td className="py-2.5 px-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold ${comp.similarityScore >= 95
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-stone-100 text-stone-700'
                          }`}
                      >
                        {comp.similarityScore}%
                      </span>
                    </td>

                    {/* Sale Price */}
                    <td className="py-2.5 px-2.5 font-bold text-stone-900 whitespace-nowrap">
                      {formatCurrency(comp.salePrice)}
                    </td>

                    {/* Price / Sq Ft */}
                    <td className="py-2.5 px-2.5 font-semibold text-[#550000] whitespace-nowrap">
                      ${comp.pricePerSqFt}
                    </td>

                    {/* Gross Area */}
                    <td className="py-2.5 px-2.5 text-stone-600 whitespace-nowrap">
                      {formatNumber(comp.grossSqFt)} sq ft
                    </td>

                    {/* Distance */}
                    <td className="py-2.5 px-2.5 text-stone-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{comp.distanceMiles} mi</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-2.5 px-2.5 text-stone-500 whitespace-nowrap">
                      {comp.saleDate}
                    </td>

                    {/* Notes */}
                    <td className="py-2.5 px-3.5 text-right text-[11px] text-stone-600">
                      <span>{comp.buildingClass}</span>
                      {comp.conditionAdjFactor && (
                        <div className="text-[10px] text-stone-400 italic">
                          {comp.conditionAdjFactor}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-stone-500 text-xs bg-[#fbf7f4] rounded-xl border border-dashed border-[#eadfd4]">
          No comparable sales match your query.
        </div>
      )}
    </div>
  );
}
