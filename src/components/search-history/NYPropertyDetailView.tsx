'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  Building,
  CheckCircle2,
  FileText,
  MapPin,
  ExternalLink,
  Download,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Calendar,
  DollarSign,
  Layers,
  Bot,
  X,
} from 'lucide-react';
import {
  MOCK_NY_PROPERTY_450_7TH_AVE,
  MOCK_ACRIS_RECORDED_DOCS,
  ACRISRecordedDocument,
} from '@/data/mock-ny-property-details';

interface NYPropertyDetailViewProps {
  onBack: () => void;
  propertyAddress?: string;
}

export function NYPropertyDetailView({ onBack, propertyAddress = '450 7 AVENUE, Manhattan, New York' }: NYPropertyDetailViewProps) {
  const [docFilter, setDocFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<ACRISRecordedDocument | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const property = MOCK_NY_PROPERTY_450_7TH_AVE;

  const filteredDocs = useMemo(() => {
    return MOCK_ACRIS_RECORDED_DOCS.filter((doc) => {
      const matchesType = docFilter === 'ALL' || doc.docType === docFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        doc.crfn.toLowerCase().includes(q) ||
        doc.docTypeDesc.toLowerCase().includes(q) ||
        doc.party1.toLowerCase().includes(q) ||
        doc.party2.toLowerCase().includes(q) ||
        doc.docAmount.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [docFilter, searchQuery]);

  const handleDownloadDoc = (doc: ACRISRecordedDocument) => {
    setToastMessage(`Downloading ACRIS Filing CRFN #${doc.crfn} (${doc.docType})...`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#3d2014] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#6b453a] flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top: Back Navigation */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Search History</span>
        </button>
      </div>

      {/* Property Title & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-2xl p-5 border border-[#eadfd4] shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[#3d2014] tracking-tight">
              {property.address}, New York City
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase bg-[#eaf4ec] text-[#2d7a3e]">
              {property.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            BBL: <strong className="font-mono text-stone-800">{property.bbl}</strong> &bull; Borough: {property.borough} &bull; Block: {property.block} &bull; Lot: {property.lot}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setToastMessage('Exporting Full Title Package with 78 ACRIS Instruments...');
              setTimeout(() => setToastMessage(null), 3500);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#550000] text-white text-xs sm:text-sm font-medium hover:bg-[#6b0000] shadow-xs cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Title Package</span>
          </button>
        </div>
      </div>

      {/* Property Overview Grid (Specs + Street View & Parcel Map) */}
      <div className="bg-white rounded-3xl border border-[#eadfd4] p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-[#3d2014] border-b border-[#f0e8e0] pb-3">
          <Building className="w-4 h-4 text-[#550000]" />
          <span>Property Identification & Building Specs</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Metadata table specs */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 text-xs sm:text-sm">
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Borough / Tax Block</span>
              <p className="font-semibold text-[#3d2014] mt-0.5">{property.borough} (1) &bull; Block {property.block}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Tax Lot</span>
              <p className="font-semibold text-[#3d2014] mt-0.5">Lot {property.lot}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Building Class</span>
              <p className="font-semibold text-[#3d2014] mt-0.5">{property.buildingClass}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Property Name</span>
              <p className="font-medium text-stone-800 mt-0.5">{property.propertyType}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Stories</span>
              <p className="font-medium text-stone-800 mt-0.5">{property.stories} Stories</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Year Built</span>
              <p className="font-medium text-stone-800 mt-0.5">{property.yearBuilt}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Gross Floor Area</span>
              <p className="font-medium text-stone-800 mt-0.5">{property.grossFloorArea}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Lot Dimensions</span>
              <p className="font-medium text-stone-800 mt-0.5">{property.lotDimensions}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Zoning District</span>
              <p className="font-medium text-stone-800 mt-0.5">{property.zoning}</p>
            </div>

            <div className="sm:col-span-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Recorded Owner of Record</span>
              <p className="font-semibold text-[#550000] mt-0.5">{property.currentOwner}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Tax Classification</span>
              <p className="font-medium text-stone-800 mt-0.5">{property.taxClass}</p>
            </div>
          </div>

          {/* Right Column (4 cols): Street View Photo & Parcel Map */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3.5">
            {/* Street View Image Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden border border-[#eadfd4] bg-stone-100 aspect-video group">
              {/* Fallback illustration / photo representation */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80"
                alt="450 7th Ave Building"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2.5 z-20 text-white text-[11px] font-semibold flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                <span>Building Street View</span>
              </div>
            </div>

            {/* Parcel GIS Map Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden border border-[#eadfd4] bg-stone-100 aspect-video group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                alt="Manhattan Lot Map"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2.5 z-20 text-white text-[11px] font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>NYC ACRIS Parcel Boundary</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary KPI Pills (matching screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#eadfd4] p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Total ACRIS Instruments</span>
            <div className="text-xl font-bold text-[#3d2014] mt-0.5">78 Recorded Filings</div>
            <p className="text-[11px] text-stone-500 mt-0.5">Continuous chain indexed from 1966 to Present</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#f8f3ed] flex items-center justify-center text-[#550000]">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#eadfd4] p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Recorded Document Types</span>
            <div className="text-sm font-bold text-[#3d2014] mt-0.5">14 Deeds &bull; 32 Mortgages &bull; 18 Sats &bull; 14 UCC</div>
            <p className="text-[11px] text-emerald-700 mt-0.5 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Zero outstanding Lis Pendens or tax warrants
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#f8f3ed] flex items-center justify-center text-[#550000]">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recorded Documents Data Table (ACRIS Filings) */}
      <div className="bg-white rounded-3xl border border-[#eadfd4] shadow-xs overflow-hidden space-y-4">
        {/* Table Title & Filter Header */}
        <div className="p-5 sm:p-6 pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#550000]" />
            <h2 className="text-base sm:text-lg font-bold text-[#3d2014]">
              Recorded Documents
            </h2>
            <span className="text-xs text-stone-500 ml-1">
              ({filteredDocs.length} shown)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Document Type Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#f8f3ed] p-1 rounded-xl border border-[#eadfd4] text-xs">
              {['ALL', 'DEED', 'MTGE', 'AGMT', 'SAT', 'UCC'].map((type) => (
                <button
                  key={type}
                  onClick={() => setDocFilter(type)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    docFilter === type
                      ? 'bg-[#550000] text-white shadow-2xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CRFN, party..."
                className="pl-8 pr-3 py-1.5 text-xs bg-[#f8f3ed] rounded-xl border border-[#eadfd4] placeholder-stone-400 text-[#3d2014] focus:outline-none focus:ring-1 focus:ring-[#550000] w-36 sm:w-48"
              />
            </div>
          </div>
        </div>

        {/* The ACRIS Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#fbf7f4] border-b border-[#f0e8e0] text-[#3d2014] font-medium text-xs">
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap">CRFN / File #</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap">Doc Date</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap">Recorded</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap">Doc Type / Description</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap min-w-[200px]">Party 1 (Grantor)</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap min-w-[200px]">Party 2 (Grantee)</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap text-right pr-6">Doc Amount</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5ede5] text-[#3d2014]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-stone-500">
                    No ACRIS records matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#fbf7f4]/80 transition-colors">
                    {/* CRFN */}
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs font-semibold text-[#550000] whitespace-nowrap">
                      {doc.crfn}
                    </td>

                    {/* Doc Date */}
                    <td className="py-3.5 px-4 sm:px-6 text-stone-700 whitespace-nowrap">
                      {doc.docDate}
                    </td>

                    {/* Recorded Date */}
                    <td className="py-3.5 px-4 sm:px-6 text-stone-600 whitespace-nowrap">
                      {doc.recordedDate}
                    </td>

                    {/* Document Type Badge & Description */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                          doc.docType === 'DEED' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          doc.docType === 'MTGE' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                          doc.docType === 'SAT' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                          doc.docType === 'UCC' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                          'bg-stone-100 text-stone-800 border border-stone-300'
                        }`}>
                          {doc.docType}
                        </span>
                        <span className="text-xs font-medium text-stone-800 line-clamp-1">
                          {doc.docTypeDesc}
                        </span>
                      </div>
                    </td>

                    {/* Party 1 */}
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-stone-800 font-medium">
                      {doc.party1}
                    </td>

                    {/* Party 2 */}
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-stone-600">
                      {doc.party2}
                    </td>

                    {/* Doc Amount */}
                    <td className="py-3.5 px-4 sm:px-6 text-xs font-mono font-medium text-right pr-6 whitespace-nowrap text-stone-900">
                      {doc.docAmount}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-[#550000] hover:bg-stone-100 transition-colors cursor-pointer"
                          title="View Instrument Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadDoc(doc)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-[#550000] hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Download ACRIS PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-[#f0e8e0] bg-[#fdfbf9] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <span>
            NYC Department of Finance Automated City Register Information System (ACRIS) Verified Records
          </span>
          <span className="font-mono text-[11px]">
            BBL: 1-00784-0043 &bull; Nelson Tower
          </span>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => alert('Title Munke AI Assistant ready to analyze deed records.')}
          className="w-12 h-12 rounded-full bg-[#4a1c17] text-white shadow-lg hover:bg-[#5e231c] active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-[#6b2e28]"
          title="Title Munke AI Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>

      {/* Single Document Inspection Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#eadfd4] shadow-xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#f8f3ed] flex items-center justify-center text-[#550000]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3d2014]">ACRIS Recorded Instrument</h3>
                  <p className="text-xs font-mono text-stone-500">CRFN: {selectedDoc.crfn}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-[#f8f3ed] rounded-2xl p-4 space-y-2 border border-[#eadfd4]">
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Instrument Type</span>
                  <p className="font-semibold text-[#3d2014] text-sm mt-0.5">{selectedDoc.docTypeDesc} ({selectedDoc.docType})</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Document Date</span>
                    <p className="font-medium text-stone-800">{selectedDoc.docDate}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Recorded Date</span>
                    <p className="font-medium text-stone-800">{selectedDoc.recordedDate}</p>
                  </div>
                </div>
                <div className="pt-1 border-t border-[#eadfd4]">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Document / Mortgage Amount</span>
                  <p className="font-bold text-[#550000] font-mono text-sm">{selectedDoc.docAmount}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 p-3.5 space-y-2.5">
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Party 1 (Grantor / Mortgagor)</span>
                  <p className="font-semibold text-stone-900 text-xs mt-0.5">{selectedDoc.party1}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">Party 2 (Grantee / Mortgagee)</span>
                  <p className="font-semibold text-stone-900 text-xs mt-0.5">{selectedDoc.party2}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadDoc(selectedDoc);
                  setSelectedDoc(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#550000] text-white text-xs font-semibold hover:bg-[#6b0000] shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
