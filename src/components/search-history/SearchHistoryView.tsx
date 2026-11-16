'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronsUpDown,
  ChevronDown,
  Link2,
  Download,
  Eye,
  MapPin,
  Search,
  X,
  CheckCircle2,
  Bot,
} from 'lucide-react';
import {
  PENNSYLVANIA_SEARCH_HISTORY,
  NEW_YORK_SEARCH_HISTORY,
  SearchHistoryItem,
} from '@/data/mock-search-history';
import { NYPropertyDetailView } from './NYPropertyDetailView';
import { PAPropertyDetailView } from './PAPropertyDetailView';

interface SearchHistoryViewProps {
  onBack?: () => void;
  defaultTab?: 'Pennsylvania' | 'New York';
}

export function SearchHistoryView({ onBack, defaultTab = 'Pennsylvania' }: SearchHistoryViewProps) {
  const [activeTab, setActiveTab] = useState<'Pennsylvania' | 'New York'>(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingPAProperty, setViewingPAProperty] = useState<string | null>(null);
  const [viewingNYProperty, setViewingNYProperty] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'srNo' | 'address' | 'dateTime' | 'status'>('srNo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const rawData = activeTab === 'Pennsylvania' ? PENNSYLVANIA_SEARCH_HISTORY : NEW_YORK_SEARCH_HISTORY;

  const filteredData = useMemo(() => {
    let result = rawData.filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.address.toLowerCase().includes(q) ||
        (item.borough && item.borough.toLowerCase().includes(q)) ||
        item.dateTime.toLowerCase().includes(q)
      );
    });

    result.sort((a, b) => {
      if (sortField === 'srNo') {
        return sortOrder === 'asc' ? a.srNo - b.srNo : b.srNo - a.srNo;
      }
      if (sortField === 'address') {
        return sortOrder === 'asc'
          ? a.address.localeCompare(b.address)
          : b.address.localeCompare(a.address);
      }
      if (sortField === 'dateTime') {
        return sortOrder === 'asc'
          ? a.dateTime.localeCompare(b.dateTime)
          : b.dateTime.localeCompare(a.dateTime);
      }
      if (sortField === 'status') {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });

    return result;
  }, [rawData, searchQuery, sortField, sortOrder]);

  const handleSort = (field: 'srNo' | 'address' | 'dateTime' | 'status') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDownload = (record: SearchHistoryItem) => {
    setToastMessage(`Downloading Title Abstract for ${record.address}...`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleViewRecord = (record: SearchHistoryItem) => {
    if (activeTab === 'Pennsylvania') {
      setViewingPAProperty(record.address);
    } else {
      setViewingNYProperty(record.address);
    }
  };

  // If viewing detailed Pennsylvania property page (FULL PAGE, NOT A MODAL)
  // Placed AFTER all hooks to adhere to React Rules of Hooks
  if (viewingPAProperty) {
    return (
      <PAPropertyDetailView
        onBack={() => setViewingPAProperty(null)}
        propertyAddress={viewingPAProperty}
      />
    );
  }

  // If viewing detailed New York property page (FULL PAGE, NOT A MODAL)
  // Placed AFTER all hooks to adhere to React Rules of Hooks
  if (viewingNYProperty) {
    return (
      <NYPropertyDetailView
        onBack={() => setViewingNYProperty(null)}
        propertyAddress={viewingNYProperty}
      />
    );
  }

  return (
    <div className="relative animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#3d2014] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#6b453a] flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top: Back Navigation Banner */}
      <div className="bg-[#ede4db] rounded-2xl px-5 py-3 mb-5 flex items-center border border-[#e2d7cc] shadow-2xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>
      </div>

      {/* Tabs Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          {/* Pennsylvania Tab */}
          <button
            onClick={() => setActiveTab('Pennsylvania')}
            className={`px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'Pennsylvania'
                ? 'bg-[#550000] text-white shadow-xs shadow-[#550000]/20'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            Pennsylvania
          </button>

          {/* New York Tab */}
          <button
            onClick={() => setActiveTab('New York')}
            className={`px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'New York'
                ? 'bg-[#550000] text-white shadow-xs shadow-[#550000]/20'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            New York
          </button>
        </div>

        {/* Right Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Live Search Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter addresses..."
              className="pl-8 pr-7 py-1.5 text-xs bg-white rounded-full border border-[#eadfd4] placeholder-stone-400 text-[#3d2014] focus:outline-none focus:ring-1 focus:ring-[#550000] w-40 sm:w-56"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Map View Indicator Icon (matching New York screenshot right button) */}
          <button
            onClick={() => alert(`Showing map distribution for ${activeTab} deeds...`)}
            className="w-8 h-8 rounded-lg bg-[#550000] text-white flex items-center justify-center hover:bg-[#680000] shadow-2xs transition-colors cursor-pointer"
            title="Map view"
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Data Table Card */}
      <div className="bg-white rounded-3xl border border-[#eadfd4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            {/* Table Header with Warm Beige Background matching screenshot */}
            <thead>
              <tr className="bg-[#fbf7f4] border-b border-[#f0e8e0] text-[#3d2014] font-medium text-xs">
                {/* Sr. No. */}
                <th
                  onClick={() => handleSort('srNo')}
                  className="py-4 px-4 sm:px-6 w-20 whitespace-nowrap cursor-pointer hover:bg-stone-100/50 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Sr. No.</span>
                  </div>
                </th>

                {/* Address */}
                <th
                  onClick={() => handleSort('address')}
                  className="py-4 px-4 sm:px-6 min-w-[280px] whitespace-nowrap cursor-pointer hover:bg-stone-100/50 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Address</span>
                    <ChevronsUpDown className="w-3.5 h-3.5 text-stone-500" />
                  </div>
                </th>

                {/* Date / Time */}
                <th
                  onClick={() => handleSort('dateTime')}
                  className="py-4 px-4 sm:px-6 min-w-[190px] whitespace-nowrap cursor-pointer hover:bg-stone-100/50 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Date / Time</span>
                    {activeTab === 'Pennsylvania' ? (
                      <ChevronDown className="w-3.5 h-3.5 text-stone-600" />
                    ) : (
                      <ChevronsUpDown className="w-3.5 h-3.5 text-stone-500" />
                    )}
                  </div>
                </th>

                {/* Borough (Only for New York) */}
                {activeTab === 'New York' && (
                  <th className="py-4 px-4 sm:px-6 min-w-[120px] whitespace-nowrap">
                    <span>Borough</span>
                  </th>
                )}

                {/* Status */}
                <th
                  onClick={() => handleSort('status')}
                  className="py-4 px-4 sm:px-6 min-w-[120px] whitespace-nowrap cursor-pointer hover:bg-stone-100/50 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    <ChevronsUpDown className="w-3.5 h-3.5 text-stone-500" />
                  </div>
                </th>

                {/* Download Link */}
                <th className="py-4 px-4 sm:px-6 min-w-[140px] whitespace-nowrap text-center sm:text-left">
                  <span>Download Link</span>
                </th>

                {/* Action */}
                <th className="py-4 px-4 sm:px-6 w-24 whitespace-nowrap text-center">
                  <span>Action</span>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#f5ede5] text-[#3d2014]">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeTab === 'New York' ? 7 : 6}
                    className="py-12 text-center text-stone-500"
                  >
                    No search records found matching &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[#fbf7f4]/80 transition-colors duration-150"
                  >
                    {/* Sr. No. */}
                    <td className="py-4 px-4 sm:px-6 text-stone-700 text-xs sm:text-[13px]">
                      {row.srNo}
                    </td>

                    {/* Address - Click opens Full Page Detail View */}
                    <td
                      onClick={() => handleViewRecord(row)}
                      className="py-4 px-4 sm:px-6 text-xs sm:text-[13px] font-normal tracking-tight text-[#3d2014] cursor-pointer hover:text-[#550000] hover:underline"
                    >
                      {row.address}
                    </td>

                    {/* Date / Time */}
                    <td className="py-4 px-4 sm:px-6 text-xs sm:text-[13px] text-stone-700 whitespace-nowrap">
                      {row.dateTime}
                    </td>

                    {/* Borough (Only for New York) */}
                    {activeTab === 'New York' && (
                      <td className="py-4 px-4 sm:px-6 text-xs sm:text-[13px] text-stone-800 font-medium whitespace-nowrap">
                        {row.borough}
                      </td>
                    )}

                    {/* Status Badge */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase bg-[#eaf4ec] text-[#2d7a3e]">
                        {row.status}
                      </span>
                    </td>

                    {/* Download Link */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-center sm:text-left">
                      {activeTab === 'Pennsylvania' ? (
                        <button
                          onClick={() => handleDownload(row)}
                          className="p-1 rounded-md text-[#3d2014] hover:text-[#550000] hover:bg-stone-100 transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Download Title Document"
                        >
                          <Link2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDownload(row)}
                          className="inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-[#550000] transition-colors cursor-pointer font-normal group"
                        >
                          <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                          <span className="hover:underline">Download</span>
                        </button>
                      )}
                    </td>

                    {/* Action - Eye icon opens Full Page Detail View (NOT A MODAL) */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleViewRecord(row)}
                        className="p-1 rounded-md text-[#3d2014] hover:text-[#550000] hover:bg-stone-100 transition-colors cursor-pointer inline-flex items-center justify-center"
                        title={activeTab === 'New York' ? 'View ACRIS Records & Property Specs' : 'View Pennsylvania Property & Recorded Deeds'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-[#f0e8e0] bg-[#fdfbf9] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <span>
            Showing <strong>{filteredData.length}</strong> of <strong>{rawData.length}</strong> records in {activeTab}
          </span>
          <span className="text-[11px]">
            Data synchronized with County Recorder & ACRIS Real Property Transfer Tax rolls
          </span>
        </div>
      </div>

      {/* Floating Action / Support Button (Matching screenshot bottom-right circular button) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => alert('Title Munke AI Assistant ready to analyze deed records.')}
          className="w-12 h-12 rounded-full bg-[#4a1c17] text-white shadow-lg hover:bg-[#5e231c] active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-[#6b2e28]"
          title="Title Munke AI Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
