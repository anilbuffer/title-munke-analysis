'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AIOpportunityProperty } from '@/types/ai-opportunity';

interface PropertyCardProps {
  property: AIOpportunityProperty;
  isSelected: boolean;
  onSelect: (property: AIOpportunityProperty) => void;
  onHover?: (id: string | null) => void;
}

export function PropertyCard({
  property,
  isSelected,
  onSelect,
  onHover,
}: PropertyCardProps) {
  return (
    <div
      onClick={() => onSelect(property)}
      onMouseEnter={() => onHover && onHover(property.id)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`group bg-white rounded-xl sm:rounded-2xl p-4 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-2 border-[#550000] shadow-xs'
          : 'border border-[#eadfd4] hover:border-stone-300 hover:shadow-2xs'
      }`}
    >
      {/* Top Row: Address & Right Arrow */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm sm:text-base font-bold text-[#291e1a] tracking-tight group-hover:text-[#550000] transition-colors">
          {property.address}
        </h3>
        <ChevronRight
          className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
            isSelected ? 'text-[#550000]' : 'text-stone-400'
          }`}
        />
      </div>

      {/* Middle Row: Borough · Type · Sq Ft */}
      <p className="text-xs text-stone-500 mt-1">
        {property.borough} · {property.propertyType} ·{' '}
        {property.grossSqFt.toLocaleString()} sq ft
      </p>

      {/* Bottom Row: Last recorded sale price & formatted price */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
        <span className="text-xs text-stone-500">Last recorded sale price</span>
        <span className="text-sm sm:text-base font-bold text-[#550000] tracking-tight">
          ${property.lastRecordedSalePrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
