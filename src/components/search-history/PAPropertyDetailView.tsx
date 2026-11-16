'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  FileText,
  CheckCircle2,
  Crosshair,
  Maximize2,
  Plus,
  Minus,
  Bot,
} from 'lucide-react';
import {
  MOCK_PA_PROPERTY_6432_SCHOLLER,
  MOCK_PA_DOCUMENT_TRANSACTIONS,
  PADocumentTransaction,
} from '@/data/mock-pa-property-details';

interface PAPropertyDetailViewProps {
  onBack: () => void;
  propertyAddress?: string;
}

export function PAPropertyDetailView({
  onBack,
  propertyAddress = '6432 SCHOLLER RD, Lynn Township, PA',
}: PAPropertyDetailViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const property = MOCK_PA_PROPERTY_6432_SCHOLLER;
  const docs = MOCK_PA_DOCUMENT_TRANSACTIONS;

  const handleViewDoc = (doc: PADocumentTransaction) => {
    setToastMessage(`Viewing Lehigh County Instrument #${doc.documentId} (${doc.docType})...`);
    setTimeout(() => setToastMessage(null), 3500);
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

      {/* Main White Card Container */}
      <div className="bg-white rounded-3xl border border-[#eadfd4] p-6 sm:p-8 shadow-xs">
        {/* Title Header with SUCCESS Badge */}
        <div className="flex items-start justify-between gap-4 border-b border-[#f0e8e0] pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#3d2014] tracking-tight">
              {property.address}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#550000]" />
              <span>{property.subAddress}</span>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold tracking-wide uppercase bg-[#eaf4ec] text-[#2d7a3e] border border-[#d3ebd7] shrink-0">
            {property.status}
          </span>
        </div>

        {/* Section: Property Identification */}
        <div className="pt-6">
          <div className="flex items-center gap-2 text-sm font-bold text-[#3d2014] mb-5">
            <Crosshair className="w-4 h-4 text-[#550000]" />
            <span>Property Identification</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Specs Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs sm:text-sm">
              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  County / Municipality
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.countyMunicipality}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Parcel PIN
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.parcelPin}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Land Use Code
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.landUseCode}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Acreage
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.acreage}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Year Built
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.yearBuilt}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Living Area
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.livingArea}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Total Rooms
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.totalRooms}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Zoning
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.zoning}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Tax Assessment
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.taxAssessment}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Clean & Green Status
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.cleanAndGreen}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  School District
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#291e1a] mt-0.5 block">
                  {property.schoolDistrict}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                  Recorded Owner
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#550000] mt-0.5 block">
                  {property.recordedOwner}
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Stacked Visuals (Homestead Photo + Parcel Map) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {/* Rural Homestead Photo */}
              <div className="relative rounded-2xl overflow-hidden border border-[#eadfd4] bg-stone-900 aspect-4/3 group shadow-2xs">
                <img
                  src={property.photoUrl}
                  alt="6432 Scholler Rd Homestead"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5 z-20 bg-black/60 backdrop-blur-xs text-white p-1 rounded-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-2 left-2.5 z-20 bg-black/65 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  Homestead View
                </div>
              </div>

              {/* Lehigh County Parcel GIS Map with Red Pin */}
              <div className="relative rounded-2xl overflow-hidden border border-[#eadfd4] bg-[#eef1f4] aspect-4/3 group shadow-2xs">
                <img
                  src={property.mapParcelUrl}
                  alt="Lehigh County Parcel Map"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Red Location Pin on Map */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none drop-shadow-md">
                  <div className="relative flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-lg animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Map Zoom Controls */}
                <div className="absolute bottom-2.5 right-2.5 z-20 flex flex-col bg-white rounded-md border border-stone-300 shadow-xs overflow-hidden">
                  <button
                    className="p-1 hover:bg-stone-100 text-stone-700 transition-colors"
                    aria-label="Zoom in"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <div className="h-px bg-stone-200" />
                  <button
                    className="p-1 hover:bg-stone-100 text-stone-700 transition-colors"
                    aria-label="Zoom out"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </div>
                <div className="absolute top-2 left-2.5 z-20 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-medium px-2 py-0.5 rounded border border-stone-200">
                  Lynn Twp &bull; Parcel 5418-47
                </div>
              </div>
            </div>
          </div>

          {/* Two Beige Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-[#fbf7f4] rounded-2xl p-4 border border-[#f0e8e0]">
              <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                Total Documents
              </span>
              <span className="text-base sm:text-lg font-bold text-[#3d2014] mt-0.5 block">
                {property.totalDocuments} Documents Found
              </span>
            </div>

            <div className="bg-[#fbf7f4] rounded-2xl p-4 border border-[#f0e8e0]">
              <span className="text-[11px] font-semibold text-[#8b6555] uppercase tracking-wider block">
                Last Document Recorded
              </span>
              <span className="text-base sm:text-lg font-bold text-[#3d2014] mt-0.5 block">
                {property.lastDocumentRecorded}
              </span>
            </div>
          </div>

          {/* Full-width Legal Description / Verification Box */}
          <div className="bg-[#fbf7f4] rounded-2xl p-4 border border-[#f0e8e0] mt-4">
            <span className="text-xs font-bold text-[#550000] block mb-1">
              Legal Description:
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              {property.legalDescription}
            </p>
          </div>
        </div>

        {/* Section: Document Transactions */}
        <div className="mt-8 pt-6 border-t border-[#f0e8e0]">
          <div className="flex items-center gap-2 text-sm font-bold text-[#3d2014] mb-4">
            <FileText className="w-4 h-4 text-[#550000]" />
            <span>Document Transactions</span>
          </div>

          {/* 4-Column Table */}
          <div className="border border-[#f0e8e0] rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#fbf7f4] border-b border-[#f0e8e0] text-[#8b6555] font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 sm:px-6 whitespace-nowrap">DOCUMENT ID</th>
                    <th className="py-3 px-4 sm:px-6 whitespace-nowrap">RECORDED DATE</th>
                    <th className="py-3 px-4 sm:px-6 whitespace-nowrap">DOC TYPE</th>
                    <th className="py-3 px-4 sm:px-6 whitespace-nowrap text-right pr-6">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5ede5]">
                  {docs.map((doc) => (
                    <tr
                      key={doc.id}
                      className={`transition-colors duration-150 ${
                        doc.highlighted
                          ? 'bg-[#fffcf4] hover:bg-[#fff9e8] text-[#854d0e]'
                          : 'hover:bg-[#fbf7f4]/80 text-[#3d2014]'
                      }`}
                    >
                      {/* Column 1: DOCUMENT ID */}
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                        <span
                          onClick={() => handleViewDoc(doc)}
                          className={`font-semibold cursor-pointer hover:underline ${
                            doc.highlighted ? 'text-[#b45309]' : 'text-[#550000]'
                          }`}
                        >
                          {doc.documentId}
                        </span>
                      </td>

                      {/* Column 2: RECORDED DATE */}
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap text-stone-700">
                        {doc.recordedDate}
                      </td>

                      {/* Column 3: DOC TYPE */}
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                        <span
                          className={`font-medium ${
                            doc.highlighted ? 'text-[#92400e] font-semibold' : 'text-stone-800'
                          }`}
                        >
                          {doc.docType}
                        </span>
                      </td>

                      {/* Column 4: ACTION */}
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap text-right pr-6">
                        <button
                          onClick={() => handleViewDoc(doc)}
                          className={`font-semibold hover:underline cursor-pointer ${
                            doc.highlighted
                              ? 'text-[#b45309] hover:text-[#92400e]'
                              : 'text-[#550000] hover:text-[#7a0000]'
                          }`}
                        >
                          View
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

      {/* Floating Mascot Action Button at bottom right */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => {
            setToastMessage('Title Munke Assistant ready to analyze recorded documents.');
            setTimeout(() => setToastMessage(null), 3000);
          }}
          className="w-12 h-12 rounded-full bg-[#4a1c17] text-white shadow-xl hover:bg-[#5e231c] active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-[#6b2e28]"
          title="Title Munke Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
