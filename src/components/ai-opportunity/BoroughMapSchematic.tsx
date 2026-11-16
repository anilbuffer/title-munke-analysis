'use client';

import React, { useState } from 'react';
import { AIOpportunityProperty, Borough } from '@/types/ai-opportunity';

interface BoroughMapSchematicProps {
  borough: Borough;
  properties: AIOpportunityProperty[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  hoveredPropertyId?: string | null;
}

export function BoroughMapSchematic({
  borough,
  properties,
  selectedPropertyId,
  onSelectProperty,
  hoveredPropertyId,
}: BoroughMapSchematicProps) {
  const [tooltip, setTooltip] = useState<{
    property: AIOpportunityProperty;
    x: number;
    y: number;
  } | null>(null);

  // Schematic polygon shapes representing NYC boroughs (Bronx, Brooklyn, Queens)
  const islands = [
    {
      id: 0,
      name: 'West / Manhattan & West Bronx',
      points: '80,140 270,118 365,135 328,202 405,222 350,285 220,310 110,268 65,210',
    },
    {
      id: 1,
      name: 'North-East / East Bronx',
      points: '455,115 625,125 690,170 640,225 505,220 425,160',
    },
    {
      id: 2,
      name: 'South-Central / Brooklyn',
      points: '395,245 540,235 625,270 540,315 395,295',
    },
    {
      id: 3,
      name: 'East / Queens',
      points: '695,220 860,205 885,260 780,295 675,270',
    },
  ];

  return (
    <div className="w-full">
      {/* Outer Card with warm beige background matching Image 1 */}
      <div className="relative bg-[#fcfaf7] border border-[#eadfd4] rounded-2xl p-4 sm:p-5 shadow-2xs overflow-hidden">
        {/* Top Header Row inside Map Card */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            BOROUGH MAP · SCHEMATIC
          </span>
          <span className="text-xs font-semibold text-stone-700 bg-stone-200/80 px-2.5 py-0.5 rounded-md">
            {borough}
          </span>
        </div>

        {/* SVG Schematic Canvas */}
        <div className="relative w-full aspect-[16/9] max-h-[320px] flex items-center justify-center">
          <svg
            viewBox="0 0 1000 440"
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Subtle Drop Shadow for polygons */}
              <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="115%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* Render Schematic Borough Landmass Polygons */}
            {islands.map((island) => {
              return (
                <polygon
                  key={island.id}
                  points={island.points}
                  fill="#e5d7c7"
                  stroke="#bfa693"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  filter="url(#mapShadow)"
                  className="transition-colors duration-300"
                />
              );
            })}

            {/* Bottom Caption inside Map */}
            <text
              x="500"
              y="370"
              textAnchor="middle"
              fill="#6d5f57"
              fontSize="15"
              fontWeight="500"
              fontFamily="var(--font-poppins), sans-serif"
            >
              NYC · Illustrative map
            </text>

            {/* Render Property Dots for Matching Properties */}
            {properties.map((prop) => {
              const isSelected = selectedPropertyId === prop.id;
              const isHovered = hoveredPropertyId === prop.id;
              const { x, y } = prop.schematicPoint;

              return (
                <g
                  key={prop.id}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => onSelectProperty(prop.id)}
                  onMouseEnter={() => setTooltip({ property: prop, x, y })}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {/* Selected / Hovered Pulse Ring */}
                  {(isSelected || isHovered) && (
                    <>
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill="#550000"
                        opacity="0.25"
                        className="animate-ping"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="none"
                        stroke="#550000"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                    </>
                  )}

                  {/* Burgundy Center Pin Circle matching Image 1 */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 7.5 : 6}
                    fill="#550000"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="transition-all duration-200 hover:scale-125"
                  />
                </g>
              );
            })}

            {/* SVG Hover Tooltip */}
            {tooltip && (
              <g
                transform={`translate(${Math.min(Math.max(tooltip.x - 70, 20), 860)}, ${
                  tooltip.y > 100 ? tooltip.y - 48 : tooltip.y + 20
                })`}
                pointerEvents="none"
              >
                <rect
                  width="140"
                  height="40"
                  rx="8"
                  fill="#291e1a"
                  opacity="0.95"
                />
                <text
                  x="70"
                  y="16"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="var(--font-poppins)"
                >
                  {tooltip.property.address}
                </text>
                <text
                  x="70"
                  y="30"
                  textAnchor="middle"
                  fill="#fca5a5"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="var(--font-poppins)"
                >
                  ${tooltip.property.lastRecordedSalePrice.toLocaleString()}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Footnote below Map Card matching Image 1 */}
      <p className="text-xs text-stone-400 mt-2">
        Map points are schematic, not geocoded property coordinates.
      </p>
    </div>
  );
}
