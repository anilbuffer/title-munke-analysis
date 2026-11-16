'use client';

import React, { useState, useMemo } from 'react';
import { Borough, AIOpportunityProperty } from '@/types/ai-opportunity';
import { MOCK_AI_OPPORTUNITIES } from '@/data/mock-ai-opportunities';
import { BoroughMapSchematic } from './BoroughMapSchematic';
import { PropertyCard } from './PropertyCard';
import { PropertyDetailCard } from './PropertyDetailCard';
import { AIPropertyValuationView } from '@/components/valuation/AIPropertyValuationView';
import { NYPropertyDetailView } from '@/components/search-history/NYPropertyDetailView';
import { RotateCcw, ChevronLeft } from 'lucide-react';

interface AIOpportunityViewProps {
  onBack?: () => void;
  initialPropertyId?: string;
}

export function AIOpportunityView({
  onBack,
  initialPropertyId = 'BRONX-01',
}: AIOpportunityViewProps) {
  // Filter States matching Image 1
  const [selectedBorough, setSelectedBorough] = useState<Borough>('Bronx');
  const [minPrice, setMinPrice] = useState<number>(500000);
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    initialPropertyId
  );
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

  // View state: 'finder' (Image 1) | 'detail' (Image 2)
  const [activeViewMode, setActiveViewMode] = useState<'finder' | 'detail'>('finder');

  // Deep drilldown views into Title Munke engines
  const [viewingValuationAddress, setViewingValuationAddress] = useState<string | null>(
    null
  );
  const [viewingNYDetailAddress, setViewingNYDetailAddress] = useState<string | null>(
    null
  );

  // Filter properties by Borough and Price range
  const filteredProperties = useMemo(() => {
    return MOCK_AI_OPPORTUNITIES.filter((prop) => {
      const matchesBorough = prop.borough === selectedBorough;
      const matchesMin = minPrice ? prop.lastRecordedSalePrice >= minPrice : true;
      const matchesMax = maxPrice ? prop.lastRecordedSalePrice <= maxPrice : true;
      return matchesBorough && matchesMin && matchesMax;
    });
  }, [selectedBorough, minPrice, maxPrice]);

  // The currently selected property object
  const selectedProperty = useMemo(() => {
    if (!selectedPropertyId) return filteredProperties[0] || null;
    return (
      MOCK_AI_OPPORTUNITIES.find((p) => p.id === selectedPropertyId) ||
      filteredProperties[0] ||
      null
    );
  }, [selectedPropertyId, filteredProperties]);

  // Reset filters back to default Bronx & 500k-2M
  const handleReset = () => {
    setSelectedBorough('Bronx');
    setMinPrice(500000);
    setMaxPrice(2000000);
    setSelectedPropertyId('BRONX-01');
    setActiveViewMode('finder');
  };

  const handleSelectProperty = (property: AIOpportunityProperty) => {
    setSelectedPropertyId(property.id);
    setActiveViewMode('detail');
  };

  const handleSelectPropertyFromMap = (id: string) => {
    setSelectedPropertyId(id);
    // On clicking marker, highlight card
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    }
  };

  // 1. If viewing Full AI Property Valuation Engine
  if (viewingValuationAddress) {
    return (
      <AIPropertyValuationView
        onBack={() => setViewingValuationAddress(null)}
        initialPropertyAddress={viewingValuationAddress}
      />
    );
  }

  // 2. If viewing NY ACRIS Deeds Detail View
  if (viewingNYDetailAddress) {
    return (
      <NYPropertyDetailView
        onBack={() => setViewingNYDetailAddress(null)}
        propertyAddress={viewingNYDetailAddress}
      />
    );
  }

  // 3. If in Focused Detail Mode (Image 2)
  if (activeViewMode === 'detail' && selectedProperty) {
    return (
      <PropertyDetailCard
        property={selectedProperty}
        onBackToFinder={() => setActiveViewMode('finder')}
        onOpenValuation={(address) => setViewingValuationAddress(address)}
        onOpenNYPropertyDetail={(address) => setViewingNYDetailAddress(address)}
      />
    );
  }

  // 4. Default: Finder View (Image 1)
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Top Beige Navigation Banner matching Title Munke consistency: < Back */}
      <div className="bg-[#ede4db] rounded-2xl px-5 py-3 flex items-center border border-[#e2d7cc] shadow-2xs">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-[#eadfd4] p-6 sm:p-8 shadow-xs">
        {/* Header Section matching Image 1 */}
        <div className="space-y-1.5 border-b border-[#f0e8e0] pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-[#291e1a] tracking-tight">
                Property Finder
              </h1>
              {/* Green Badge matching Image 1 */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#eaf4ec] text-[#2d7a3e]">
                Historical sales data
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            Explore NYC properties with recorded sales. This is not an active listing inventory.
          </p>
        </div>

        {/* Filter Controls Section matching Image 1 */}
        <div className="py-5 space-y-4 border-b border-[#f0e8e0]">
          {/* SELECT BOROUGH Radio Group */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-2.5">
              SELECT BOROUGH
            </label>
            <div className="flex flex-wrap items-center gap-6">
              {(['Bronx', 'Brooklyn', 'Queens'] as Borough[]).map((b) => {
                const isChecked = selectedBorough === b;
                return (
                  <label
                    key={b}
                    onClick={() => {
                      setSelectedBorough(b);
                      // Clear selected property to first of that borough
                      const firstInBorough = MOCK_AI_OPPORTUNITIES.find(
                        (p) => p.borough === b
                      );
                      if (firstInBorough) setSelectedPropertyId(firstInBorough.id);
                    }}
                    className="inline-flex items-center gap-2 cursor-pointer text-sm text-[#291e1a] font-medium select-none"
                  >
                    {/* Custom Styled Radio Button matching Image 1 */}
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'border-stone-900 bg-white ring-2 ring-stone-900/10'
                          : 'border-stone-400 bg-white'
                      }`}
                    >
                      {isChecked && (
                        <div className="w-2 h-2 rounded-full bg-stone-900" />
                      )}
                    </div>
                    <span>{b}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Min & Max Price Input Fields matching Image 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* MIN HISTORICAL SALE PRICE ($) */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                MIN HISTORICAL SALE PRICE ($)
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                placeholder="500000"
                className="w-full bg-white border border-[#eadfd4] rounded-full px-4 py-2 text-sm text-[#291e1a] font-medium placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#550000] focus:border-[#550000] transition-colors"
              />
            </div>

            {/* MAX HISTORICAL SALE PRICE ($) */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                MAX HISTORICAL SALE PRICE ($)
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
                placeholder="2000000"
                className="w-full bg-white border border-[#eadfd4] rounded-full px-4 py-2 text-sm text-[#291e1a] font-medium placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#550000] focus:border-[#550000] transition-colors"
              />
            </div>
          </div>

          {/* Results Counter & Reset Button matching Image 1 */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-bold text-[#291e1a]">
              {filteredProperties.length} matching demo properties
            </span>
            <button
              onClick={handleReset}
              className="px-3.5 py-1 rounded-lg border border-stone-300 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer shadow-2xs"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Schematic Borough Map Section matching Image 1 */}
        <div className="pt-6">
          <BoroughMapSchematic
            borough={selectedBorough}
            properties={filteredProperties}
            selectedPropertyId={selectedPropertyId}
            onSelectProperty={handleSelectPropertyFromMap}
            hoveredPropertyId={hoveredPropertyId}
          />
        </div>

        {/* Matching Properties List matching Image 1 */}
        <div className="pt-8">
          <h2 className="text-base sm:text-lg font-bold text-[#291e1a] mb-4">
            Matching properties
          </h2>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-stone-200 rounded-2xl bg-[#fdfbf9]">
              <p className="text-sm text-stone-500">
                No recorded properties found matching the selected price filter in {selectedBorough}.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#550000] font-semibold hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset price filters</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProperties.map((prop) => {
                const isSelected = selectedPropertyId === prop.id;
                return (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    isSelected={isSelected}
                    onSelect={handleSelectProperty}
                    onHover={setHoveredPropertyId}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
