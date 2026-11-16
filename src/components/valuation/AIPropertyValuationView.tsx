'use client';

import React, { useState } from 'react';
import {
  MOCK_NYC_VALUATION_DATABASE,
} from '@/data/mock-valuation-database';
import { ValuationHeader } from './ValuationHeader';
import { ValuationHeroCard } from './ValuationHeroCard';
import { PriceOutlookChart } from './PriceOutlookChart';
import { ComparableSalesTable } from './ComparableSalesTable';
import { HistoricalValueChart } from './HistoricalValueChart';
import { InternetFallbackCard } from './InternetFallbackCard';
import { IneligiblePropertyCard } from './IneligiblePropertyCard';
import { CheckCircle2, LayoutGrid, TrendingUp, FileSpreadsheet, History } from 'lucide-react';

interface AIPropertyValuationViewProps {
  onBack: () => void;
  initialPropertyAddress?: string;
}

type ValuationSectionTab = 'all' | 'outlook' | 'comps' | 'history';

export function AIPropertyValuationView({
  onBack,
  initialPropertyAddress = '3010 BRIGGS AVENUE, BX, New York City',
}: AIPropertyValuationViewProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>(() => {
    if (initialPropertyAddress && MOCK_NYC_VALUATION_DATABASE[initialPropertyAddress]) {
      return initialPropertyAddress;
    }
    const match = Object.keys(MOCK_NYC_VALUATION_DATABASE).find((k) =>
      initialPropertyAddress && k.toLowerCase().includes(initialPropertyAddress.toLowerCase().slice(0, 10))
    );
    return match || '3010 BRIGGS AVENUE, BX, New York City';
  });

  const [activeTab, setActiveTab] = useState<ValuationSectionTab>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentRecord = MOCK_NYC_VALUATION_DATABASE[selectedAddress] || MOCK_NYC_VALUATION_DATABASE['3010 BRIGGS AVENUE, BX, New York City'];

  const handleSelectProperty = (address: string) => {
    setSelectedAddress(address);
    setToastMessage(`Loaded ${address.split(',')[0]}...`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRefresh = () => {
    setToastMessage('Refreshing Rolling Sales model...');
    setTimeout(() => {
      setToastMessage('Valuation updated.');
      setTimeout(() => setToastMessage(null), 2500);
    }, 800);
  };

  const isExcluded =
    currentRecord.eligibility === 'EXCLUDED_CONDO' ||
    currentRecord.eligibility === 'EXCLUDED_COOP';

  const navTabs: { id: ValuationSectionTab; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Insights', icon: LayoutGrid },
    { id: 'outlook', label: 'Price Outlook (1-5Y)', icon: TrendingUp },
    { id: 'comps', label: `Comps (${currentRecord.comparables.length})`, icon: FileSpreadsheet },
    { id: 'history', label: 'Value History', icon: History },
  ];

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#3d2014] text-white px-3.5 py-2 rounded-xl shadow-lg border border-[#6b453a] flex items-center gap-2 text-xs animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card */}
      <ValuationHeader
        currentRecord={currentRecord}
        onBack={onBack}
        onSelectProperty={handleSelectProperty}
        onRefresh={handleRefresh}
      />

      {/* Hero Card: Market Value, Price/Sq Ft & Specs */}
      <ValuationHeroCard record={currentRecord} />

      {/* Exclusion Card (if Condominium / Cooperative) */}
      {isExcluded && (
        <IneligiblePropertyCard
          record={currentRecord}
          onSelectEligibleProperty={handleSelectProperty}
        />
      )}

      {/* Internet Fallback Notice (if triggered) */}
      {!isExcluded && <InternetFallbackCard record={currentRecord} />}

      {/* Navigation Pills for quick switching between sections */}
      {!isExcluded && (
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 pt-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#550000] text-white shadow-2xs'
                    : 'bg-[#f5f0ec] text-stone-600 hover:text-stone-900 hover:bg-[#ede5dc]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content Sections based on selected tab */}
      {!isExcluded && (
        <div className="space-y-4">
          {/* 1. Price Outlook */}
          {(activeTab === 'all' || activeTab === 'outlook') && (
            <PriceOutlookChart record={currentRecord} />
          )}

          {/* 2. Comparable Sales */}
          {(activeTab === 'all' || activeTab === 'comps') && (
            <ComparableSalesTable record={currentRecord} />
          )}

          {/* 3. Value History */}
          {(activeTab === 'all' || activeTab === 'history') && (
            <HistoricalValueChart record={currentRecord} />
          )}
        </div>
      )}
    </div>
  );
}
