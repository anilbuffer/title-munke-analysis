'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronsUpDown,
  Eye,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import {
  MOCK_PA_PROPERTY_EXACT,
  MOCK_PA_DOCUMENTS_EXACT,
  PADocumentItem,
} from '@/data/mock-pa-property-details';

interface PAPropertyDetailViewProps {
  onBack: () => void;
  propertyAddress?: string;
}

export function PAPropertyDetailView({ onBack }: PAPropertyDetailViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [mapType, setMapType] = useState<'Map' | 'Satellite'>('Map');

  const property = MOCK_PA_PROPERTY_EXACT;
  const docs = [...MOCK_PA_DOCUMENTS_EXACT].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.dateRecorded.localeCompare(b.dateRecorded)
      : b.dateRecorded.localeCompare(a.dateRecorded);
  });

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleViewDoc = (doc: PADocumentItem) => {
    setToastMessage(`Viewing ${doc.documentType} recorded on ${doc.dateRecorded}...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
              Searched on:{' '}
              <strong className="text-[#3d2014] font-semibold">
                {property.searchedOn}
              </strong>{' '}
              | Search ID:{' '}
              <strong className="text-[#3d2014] font-semibold">
                {property.searchId}
              </strong>
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold tracking-wide uppercase bg-[#eaf4ec] text-[#2d7a3e] border border-[#d3ebd7] self-start shrink-0">
            {property.status}
          </span>
        </div>

        {/* Section: Description */}
        <div className="pt-6">
          <h2 className="text-base font-bold text-[#3d2014] mb-4">
            Description
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Specs Grid & Summary Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 3x3 Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-6 text-xs">
                {/* Row 1 */}
                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    LOCATION
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.location}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    LOTS
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.lots}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    AREA
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.area}
                  </span>
                </div>

                {/* Row 2 */}
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

                {/* Row 3 */}
                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    PIN/PARCEL
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.pinParcel}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    SPAN OF SEARCH
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.spanOfSearch}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                    DATE OF SEARCH
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block">
                    {property.dateOfSearch}
                  </span>
                </div>
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

              {/* Full-width Card: TITLE DEED */}
              <div className="bg-[#fdfbf9] rounded-2xl p-4 border border-[#f0e8e0]">
                <span className="text-[11px] font-bold text-[#3d2014] uppercase tracking-wide block">
                  TITLE DEED
                </span>
                <span className="text-xs text-stone-600 mt-1 block">
                  {property.titleDeed}
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Street View Box + Google Maps Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Street view unavailable Box */}
              <div className="rounded-2xl border border-[#f0e8e0] bg-[#fdfbf9] h-48 sm:h-52 flex items-center justify-center p-6 text-center">
                <span className="text-xs text-stone-400 font-medium">
                  Street view unavailable
                </span>
              </div>

              {/* Google Maps Visual Representation */}
              <div className="rounded-2xl border border-[#eadfd4] bg-[#eef6f0] h-52 sm:h-56 relative overflow-hidden shadow-2xs group">
                {/* Simulated Google Maps Rural Roads & Terrain */}
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 320 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Pale green landscape */}
                  <rect width="320" height="220" fill="#eaf3ec" />

                  {/* Water stream / creek line */}
                  <path
                    d="M-10 160 C 40 170, 70 180, 100 200 C 130 220, 150 240, 160 260"
                    stroke="#bcdbf0"
                    strokeWidth="4"
                    fill="none"
                  />

                  {/* Rural Roads (Lynn Key Rd & Scholler Rd) */}
                  <path
                    d="M-20 180 C 40 190, 80 185, 110 170 C 150 150, 170 120, 185 80 C 200 40, 210 10, 220 -20"
                    stroke="#c6d8cb"
                    strokeWidth="3.5"
                    fill="none"
                  />
                  <path
                    d="M110 170 C 130 150, 160 135, 180 130 C 210 120, 260 90, 330 60"
                    stroke="#ffffff"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M175 130 L 195 105 L 245 95"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeDasharray="2 2"
                    fill="none"
                  />

                  {/* Road Names */}
                  <text
                    x="20"
                    y="195"
                    fontSize="7"
                    fill="#758878"
                    transform="rotate(-25, 20, 195)"
                    fontFamily="sans-serif"
                  >
                    Lynn Key Rd
                  </text>
                  <circle cx="168" cy="205" r="5" fill="#ffffff" stroke="#9bb1a1" strokeWidth="0.8" />
                  <text x="164" y="207" fontSize="5.5" fill="#445548" fontWeight="bold">863</text>
                </svg>

                {/* Google Maps Controls */}
                {/* Top Left: Map / Satellite Button */}
                <div className="absolute top-2.5 left-2.5 z-20 flex bg-white rounded-md shadow-xs border border-stone-200 overflow-hidden text-[10px] font-medium text-stone-700">
                  <button
                    onClick={() => setMapType('Map')}
                    className={`px-2.5 py-1 transition-colors cursor-pointer ${mapType === 'Map' ? 'font-bold text-stone-900 bg-stone-50' : 'hover:bg-stone-50'
                      }`}
                  >
                    Map
                  </button>
                  <div className="w-px bg-stone-200" />
                  <button
                    onClick={() => setMapType('Satellite')}
                    className={`px-2.5 py-1 transition-colors cursor-pointer ${mapType === 'Satellite' ? 'font-bold text-stone-900 bg-stone-50' : 'hover:bg-stone-50'
                      }`}
                  >
                    Satellite
                  </button>
                </div>

                {/* Top Right: Fullscreen Toggle */}
                <div className="absolute top-2.5 right-2.5 z-20 bg-white p-1 rounded-md shadow-xs border border-stone-200 text-stone-600 hover:text-stone-900 cursor-pointer">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Centered Red Location Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] z-20 pointer-events-none drop-shadow-md">
                  <svg width="28" height="36" viewBox="0 0 24 32" fill="none">
                    <path
                      d="M12 0C5.37 0 0 5.37 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37 18.63 0 12 0Z"
                      fill="#ea4335"
                    />
                    <circle cx="12" cy="11" r="4.5" fill="#a50e0e" />
                  </svg>
                </div>

                {/* Bottom Left: Google Logo */}
                <div className="absolute bottom-1.5 left-2 z-20">
                  <span className="font-bold text-xs tracking-tighter text-stone-600 select-none">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>

                {/* Bottom Right: Map attribution */}
                <div className="absolute bottom-1 right-2 z-20 flex items-center gap-1.5 text-[8px] text-stone-500 bg-white/70 px-1.5 py-0.5 rounded backdrop-blur-2xs select-none">
                  <span>Map Data</span>
                  <span>&bull;</span>
                  <span>Terms</span>
                  <span>&bull;</span>
                  <span>Report a map error</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
