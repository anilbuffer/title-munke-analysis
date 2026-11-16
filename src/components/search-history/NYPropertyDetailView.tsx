'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronsUpDown,
  Eye,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  MOCK_NY_PROPERTY_3010_BRIGGS,
  MOCK_NY_DOCUMENTS_3010_BRIGGS,
  MOCK_NY_VALUATION_DATA,
  NYDocumentItemExact,
} from '@/data/mock-ny-property-details';
import { AIPropertyValuationCard } from './AIPropertyValuationCard';
import { AIPropertyValuationView } from '@/components/valuation/AIPropertyValuationView';

interface NYPropertyDetailViewProps {
  onBack: () => void;
  propertyAddress?: string;
}

export function NYPropertyDetailView({ onBack }: NYPropertyDetailViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isViewingValuation, setIsViewingValuation] = useState(false);

  const property = MOCK_NY_PROPERTY_3010_BRIGGS;
  const docs = [...MOCK_NY_DOCUMENTS_3010_BRIGGS].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.dateRecorded.localeCompare(b.dateRecorded)
      : b.dateRecorded.localeCompare(a.dateRecorded);
  });

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleViewDoc = (doc: NYDocumentItemExact) => {
    setToastMessage(`Viewing ${doc.documentType} recorded on ${doc.dateRecorded}...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (isViewingValuation) {
    return (
      <AIPropertyValuationView
        onBack={() => setIsViewingValuation(false)}
        initialPropertyAddress={property.title || '3010 BRIGGS AVENUE, BX, New York City'}
      />
    );
  }

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#3d2014] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#6b453a] flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Beige Navigation Banner: < Return to search results */}
      <div className="bg-[#ede4db] rounded-2xl px-5 py-3 flex items-center border border-[#e2d7cc] shadow-2xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to search results</span>
        </button>
      </div>

      {/* Main White Card matching attached screenshot exactly */}
      <div className="bg-white rounded-3xl border border-[#eadfd4] p-6 sm:p-8 shadow-xs">
        {/* Title Header with SUCCESS Badge */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#f0e8e0] pb-5">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#3d2014] tracking-tight">
              {property.title}
            </h1>
            <p className="text-xs text-[#8c7b75] mt-1.5 font-normal">
              BBL:{' '}
              <strong className="text-[#3d2014] font-semibold">
                {property.bbl}
              </strong>
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold tracking-wide uppercase bg-[#eaf4ec] text-[#2d7a3e] border border-[#d3ebd7] self-start shrink-0">
            {property.status}
          </span>
        </div>

        {/* Section: Property Overview */}
        <div className="pt-6">
          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#3d2014] border-b border-[#f0e8e0] pb-3 mb-5">
            <Info className="w-4 h-4 text-[#3d2014]" />
            <span>Property Overview</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Specs Grid & Summary Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 3x5 Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-6 text-xs">
                {/* Row 1 */}
                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    PROPERTY
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.property}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    COUNTY, STATE
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.countyState}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    MUNICIPALITY
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.municipality}
                  </span>
                </div>

                {/* Row 2 */}
                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    BLOCK / LOT
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.blockLot}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    ZIP CODE
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.zipCode}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    CURRENT OWNER
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.currentOwner}
                  </span>
                </div>

                {/* Row 3 */}
                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    DATE OF SEARCH
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.dateOfSearch}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    TYPE
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.type}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    YEAR BUILT
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.yearBuilt}
                  </span>
                </div>

                {/* Row 4 */}
                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    FLOORS
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.floors}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    UNITS
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.units}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    LOT AREA
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.lotArea}
                  </span>
                </div>

                {/* Row 5 */}
                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    BBL
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.bblNumber}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    ZONING
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.zoning}
                  </span>
                </div>

                <div />
              </div>

              {/* Two Cards: CURRENT OWNER & TAX ASSESSMENT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#fdfbf9] rounded-2xl p-4 border border-[#f0e8e0]">
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    CURRENT OWNER
                  </span>
                  <span className="text-xs sm:text-sm text-stone-600 mt-1 block">
                    {property.currentOwner}
                  </span>
                </div>

                <div className="bg-[#fdfbf9] rounded-2xl p-4 border border-[#f0e8e0]">
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    TAX ASSESSMENT
                  </span>
                  <span className="text-xs sm:text-sm text-stone-600 mt-1 block">
                    {property.taxAssessment}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Street View Box + Google Maps Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Street View Box */}
              <div className="rounded-2xl border border-[#eadfd4] overflow-hidden h-48 sm:h-52 relative group shadow-2xs bg-stone-100">
                <img
                  src={property.streetViewUrl}
                  alt="3010 Briggs Avenue Street View"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Google Maps Box */}
              <div className="rounded-2xl border border-[#eadfd4] overflow-hidden h-52 sm:h-56 relative group shadow-2xs bg-[#eef6f0]">
                <img
                  src={property.mapUrl}
                  alt="3010 Briggs Avenue Parcel Map"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: AI Property Valuation Engine */}
        <AIPropertyValuationCard
          data={MOCK_NY_VALUATION_DATA}
          onOpenValuation={() => setIsViewingValuation(true)}
        />

        {/* Section: Document Processing Status */}
        <div className="mt-8 pt-6 border-t border-[#f0e8e0]">
          <h2 className="text-base font-bold text-[#3d2014] mb-4">
            Document Processing Status
          </h2>

          {/* Table matching screenshot columns: Sr. No. | Document Type | Date Recorded ↕ | Actions */}
          <div className="border border-[#f0e8e0] rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f6efe9] border-b border-[#f0e8e0] text-[#3d2014] font-medium text-xs">
                    <th className="py-4 px-4 sm:px-6 w-24 whitespace-nowrap">
                      Sr. No.
                    </th>
                    <th className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      Document Type
                    </th>
                    <th
                      onClick={handleToggleSort}
                      className="py-4 px-4 sm:px-6 whitespace-nowrap cursor-pointer hover:bg-stone-200/50 transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Date Recorded</span>
                        <ChevronsUpDown className="w-3.5 h-3.5 text-stone-600" />
                      </div>
                    </th>
                    <th className="py-4 px-4 sm:px-6 w-28 whitespace-nowrap text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5ede5]">
                  {docs.map((row) => (
                    <tr
                      key={row.srNo}
                      className="hover:bg-[#fbf7f4]/80 transition-colors duration-150 text-[#3d2014]"
                    >
                      {/* Sr. No. */}
                      <td className="py-4 px-4 sm:px-6 text-stone-700 font-normal">
                        {row.srNo}
                      </td>

                      {/* Document Type */}
                      <td className="py-4 px-4 sm:px-6 font-normal tracking-wide text-[#3d2014]">
                        {row.documentType}
                      </td>

                      {/* Date Recorded */}
                      <td className="py-4 px-4 sm:px-6 text-stone-700 whitespace-nowrap">
                        {row.dateRecorded}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleViewDoc(row)}
                          className="p-1 rounded-md text-[#3d2014] hover:text-[#550000] hover:bg-stone-100 transition-colors cursor-pointer inline-flex items-center justify-center"
                          title={`View ${row.documentType}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
