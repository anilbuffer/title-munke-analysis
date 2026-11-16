'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronsUpDown,
  Eye,
  Maximize2,
  CheckCircle2,
  MapPin,
  Compass,
  ExternalLink,
  Download,
} from 'lucide-react';
import {
  MOCK_PA_DOCUMENTS_EXACT,
  MOCK_PA_VALUATION_DATA,
  PADocumentItem,
  getPAPropertyDetails,
} from '@/data/mock-pa-property-details';
import { AIPropertyValuationCard } from './AIPropertyValuationCard';
import { AIPropertyValuationView } from '@/components/valuation/AIPropertyValuationView';

interface PAPropertyDetailViewProps {
  onBack: () => void;
  propertyAddress?: string;
}

export function PAPropertyDetailView({
  onBack,
  propertyAddress,
}: PAPropertyDetailViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [mapType, setMapType] = useState<'Map' | 'Satellite'>('Map');
  const [isViewingValuation, setIsViewingValuation] = useState(false);

  const property = getPAPropertyDetails(propertyAddress);
  const displayAddress = propertyAddress || property.property || '6432 SCHOLLER RD, Lynn Township, PA';
  const displayTitle = property.title || (propertyAddress ? `${propertyAddress}, Lehigh County, Pennsylvania` : '6432 SCHOLLER RD, Lynn Township, PA');

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

  if (isViewingValuation) {
    return (
      <AIPropertyValuationView
        onBack={() => setIsViewingValuation(false)}
        initialPropertyAddress={displayAddress}
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
        {/* Title Header with SUCCESS Badge & Broker Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#f0e8e0] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-[#550000] uppercase tracking-wider bg-[#550000]/10 px-2.5 py-0.5 rounded-full border border-[#550000]/20">
                Broker Closing Package
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 font-medium">PIN: {property.pinParcel}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-[#3d2014] tracking-tight">
              {displayTitle}
            </h1>
            <p className="text-xs text-[#8c7b75] mt-1 font-normal">
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
          <div className="flex items-center gap-2.5 self-start shrink-0">
            <button
              type="button"
              onClick={() => {
                setToastMessage(`Exporting Broker Closing Packet for ${displayAddress.split(',')[0]}...`);
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#eadfd4] bg-white text-stone-800 hover:bg-stone-50 text-xs font-medium shadow-2xs cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Export Closing Packet</span>
            </button>
            <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase bg-[#eaf4ec] text-[#2d7a3e] border border-[#d3ebd7]">
              {property.status}
            </span>
          </div>
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
                    {displayAddress.split(',')[0]}
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
              {/* Street View / Property Preview Box */}
              <div className="rounded-2xl border border-[#eadfd4] overflow-hidden h-48 sm:h-52 relative group shadow-2xs bg-stone-100">
                <img
                  src={property.streetViewUrl}
                  alt={`${displayAddress} Property Preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Property Preview UI Overlays */}
                {/* Top-Left: Address Chip */}
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white rounded-md text-[11px] font-medium shadow-sm">
                  <MapPin className="w-3 h-3 text-[#ea4335]" />
                  <span className="truncate max-w-[150px] sm:max-w-[180px]">{displayAddress.split(',')[0]}</span>
                </div>

                {/* Top-Right: Open in Google Maps / Street View */}
                <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`,
                        '_blank'
                      )
                    }
                    title="Open live Google Maps in new tab"
                    className="w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white flex items-center justify-center shadow-sm cursor-pointer transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

                {/* Bottom-Left: Property Photo badge */}
                <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 bg-black/65 backdrop-blur-xs text-[10px] text-white/90 rounded tracking-tight">
                  Property Preview •{' '}
                  {displayAddress.toUpperCase().includes('CHEW') ||
                  displayAddress.toUpperCase().includes('ALLENTOWN')
                    ? 'Allentown Residential'
                    : displayAddress.toUpperCase().includes('HILL')
                    ? 'Suburban Residence'
                    : 'Rural Residential'}
                </div>

                {/* Bottom-Right: Interactive Explore 360 Button */}
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`,
                      '_blank'
                    )
                  }
                  className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 bg-[#550000] hover:bg-[#6b0000] text-white rounded-md text-[10px] px-2 py-0.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                  <span>Explore 360°</span>
                </button>
              </div>

              {/* Google Maps Box: Live & Functional based on Property Address */}
              <div className="rounded-2xl border border-[#eadfd4] overflow-hidden h-56 sm:h-64 relative group shadow-2xs bg-[#eef6f0]">
                {/* Live Functional Google Map Iframe for displayAddress */}
                <iframe
                  title={`Live Google Map for ${displayAddress}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(displayAddress)}&t=${mapType === 'Satellite' ? 'k' : 'm'}&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Top-Left: Map / Satellite switcher */}
                <div className="absolute top-2.5 left-2.5 z-20 flex bg-white/95 backdrop-blur-xs rounded-md shadow-xs border border-stone-200 overflow-hidden text-[10px] font-medium text-stone-700">
                  <button
                    type="button"
                    onClick={() => setMapType('Map')}
                    className={`px-2.5 py-1 transition-colors cursor-pointer ${
                      mapType === 'Map'
                        ? 'font-bold text-stone-900 bg-stone-100 shadow-2xs'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    Map
                  </button>
                  <div className="w-px bg-stone-200" />
                  <button
                    type="button"
                    onClick={() => setMapType('Satellite')}
                    className={`px-2.5 py-1 transition-colors cursor-pointer ${
                      mapType === 'Satellite'
                        ? 'font-bold text-stone-900 bg-stone-100 shadow-2xs'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    Satellite
                  </button>
                </div>

                {/* Top-Right: Fullscreen / Open in Google Maps */}
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`,
                      '_blank'
                    )
                  }
                  title="Open live Google Maps in new tab"
                  className="absolute top-2.5 right-2.5 z-20 bg-white/95 hover:bg-white backdrop-blur-xs p-1.5 rounded-md shadow-xs border border-stone-200 text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: AI Property Valuation Engine */}
        <AIPropertyValuationCard
          data={MOCK_PA_VALUATION_DATA}
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
