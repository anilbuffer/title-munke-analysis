'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Plus, Minus, Navigation, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { AIOpportunityProperty, Borough } from '@/types/ai-opportunity';

interface BoroughMapSchematicProps {
  borough: Borough;
  properties: AIOpportunityProperty[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  hoveredPropertyId?: string | null;
}

// Borough center coordinates for live interactive map
const BOROUGH_CENTERS: Record<Borough, { center: [number, number]; zoom: number }> = {
  Bronx: { center: [40.8715, -73.886], zoom: 14 },
  Brooklyn: { center: [40.635, -73.945], zoom: 14 },
  Queens: { center: [40.742, -73.85], zoom: 13 },
  Manhattan: { center: [40.758, -73.985], zoom: 13 },
  'Staten Island': { center: [40.579, -74.15], zoom: 12 },
};

// 7 Authentic Schematic Dots matching Reference Image 1 exactly
const SCHEMATIC_BASE_DOTS = [
  // Island 1 (Left - Bronx / Manhattan)
  { id: 'DOT-1', x: 215, y: 165, borough: 'Bronx', defaultAddress: '3025 Briggs Avenue', defaultPrice: '$1,280,000' },
  { id: 'DOT-2', x: 265, y: 245, borough: 'Bronx', defaultAddress: '280 E 198th Street', defaultPrice: '$945,000' },
  { id: 'DOT-3', x: 315, y: 292, borough: 'Bronx', defaultAddress: '3050 Bainbridge Avenue', defaultPrice: '$1,820,000' },
  // Island 2 (Top Center-Right)
  { id: 'DOT-4', x: 550, y: 165, borough: 'Bronx', defaultAddress: '2980 Grand Concourse', defaultPrice: '$2,150,000' },
  { id: 'DOT-5', x: 600, y: 202, borough: 'Bronx', defaultAddress: '2775 Webster Avenue', defaultPrice: '$3,400,000' },
  // Island 3 (Bottom Center - Brooklyn)
  { id: 'DOT-6', x: 505, y: 285, borough: 'Brooklyn', defaultAddress: '3218 Avenue I', defaultPrice: '$1,420,000' },
  // Island 4 (Far Right - Queens)
  { id: 'DOT-7', x: 820, y: 265, borough: 'Queens', defaultAddress: '68-15 174th Street', defaultPrice: '$1,150,000' },
];

export function BoroughMapSchematic({
  borough,
  properties,
  selectedPropertyId,
  onSelectProperty,
  hoveredPropertyId,
}: BoroughMapSchematicProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tileLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersLayerRef = useRef<any>(null);

  // Default to 'Schematic' matching Reference Image 1 exactly, with option to toggle to 'Interactive Map'
  const [viewMode, setViewMode] = useState<'Schematic' | 'Interactive Map'>('Schematic');
  const [tooltip, setTooltip] = useState<{
    text: string;
    subtext: string;
    x: number;
    y: number;
  } | null>(null);

  // Render Leaflet Markers for the Interactive Map
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLeafletMarkers = useCallback((L: any, map: any, layerGroup: any) => {
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    const bounds: [number, number][] = [];

    properties.forEach((prop) => {
      const isSelected = selectedPropertyId === prop.id;
      const isHovered = hoveredPropertyId === prop.id;
      const pinColor = isSelected ? '#550000' : isHovered ? '#780000' : '#8b0000';

      const formattedPrice =
        prop.lastRecordedSalePrice >= 1000000
          ? `$${(prop.lastRecordedSalePrice / 1000000).toFixed(2)}M`
          : `$${(prop.lastRecordedSalePrice / 1000).toFixed(0)}k`;

      const pinIcon = L.divIcon({
        className: 'title-munke-custom-pin',
        html: `
          <div style="cursor: pointer; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.35)); transform: ${
            isSelected ? 'scale(1.18)' : isHovered ? 'scale(1.08)' : 'scale(1)'
          }; transition: transform 0.15s ease;">
            <!-- Price Badge Pill -->
            <div style="
              background: ${isSelected ? '#550000' : '#291e1a'};
              color: #ffffff;
              font-family: var(--font-poppins), system-ui, sans-serif;
              font-size: 11px;
              font-weight: 700;
              padding: 2.5px 8px;
              border-radius: 9999px;
              border: 2px solid #ffffff;
              white-space: nowrap;
              margin-bottom: -5px;
              z-index: 2;
              display: flex;
              align-items: center;
              gap: 4px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: ${
                isSelected ? '#22c55e' : '#f59e0b'
              }; display: inline-block;"></span>
              <span>${formattedPrice}</span>
            </div>
            
            <!-- Pin Teardrop SVG -->
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0C6.27 0 0 6.27 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.27 21.73 0 14 0Z" fill="${pinColor}"/>
              <circle cx="14" cy="14" r="5.5" fill="#FFFFFF"/>
              <circle cx="14" cy="14" r="2.8" fill="${isSelected ? '#22c55e' : '#550000'}"/>
            </svg>
          </div>
        `,
        iconSize: [68, 54],
        iconAnchor: [34, 54],
        popupAnchor: [0, -54],
      });

      const marker = L.marker([prop.lat, prop.lng], {
        icon: pinIcon,
        zIndexOffset: isSelected ? 1000 : 100,
      });

      const popupContent = `
        <div style="font-family: var(--font-poppins), sans-serif; padding: 4px 6px; min-width: 190px;">
          <div style="font-size: 10px; font-weight: 700; color: #15803d; text-transform: uppercase;">
            ${prop.borough} · ${prop.propertyType}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #1c1917; margin-top: 2px;">
            ${prop.address}
          </div>
          <div style="font-size: 16px; font-weight: 800; color: #550000; margin-top: 3px;">
            $${prop.lastRecordedSalePrice.toLocaleString()}
          </div>
          <div style="font-size: 11px; color: #78716c; margin-top: 2px;">
            ${prop.grossSqFt.toLocaleString()} sq ft · $${prop.pricePerSqFt}/sq ft
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: false,
        offset: [0, -32],
      });

      marker.on('click', () => {
        onSelectProperty(prop.id);
      });

      layerGroup.addLayer(marker);
      bounds.push([prop.lat, prop.lng]);
    });

    if (bounds.length > 0 && map) {
      if (bounds.length === 1) {
        map.setView(bounds[0], 15);
      } else {
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 16,
        });
      }
    }
  }, [properties, selectedPropertyId, hoveredPropertyId, onSelectProperty]);

  // Leaflet map initialization
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      if (viewMode !== 'Interactive Map') {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        return;
      }

      const L = (await import('leaflet')).default;
      if (!isMounted || !mapContainerRef.current) return;

      // Fix Leaflet icons
      // @ts-expect-error Leaflet private property
      delete L.Icon.Default.prototype._getIconUrl;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const boroughConfig = BOROUGH_CENTERS[borough] || BOROUGH_CENTERS.Bronx;

      const map = L.map(mapContainerRef.current, {
        center: boroughConfig.center,
        zoom: boroughConfig.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      const tileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      renderLeafletMarkers(L, map, markersLayer);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, borough, renderLeafletMarkers]);

  // Update Leaflet markers on property changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || viewMode !== 'Interactive Map') return;
    let isMounted = true;
    async function refresh() {
      const L = (await import('leaflet')).default;
      if (!isMounted || !mapInstanceRef.current || !markersLayerRef.current) return;
      renderLeafletMarkers(L, mapInstanceRef.current, markersLayerRef.current);
    }
    refresh();
    return () => {
      isMounted = false;
    };
  }, [properties, selectedPropertyId, hoveredPropertyId, viewMode, renderLeafletMarkers]);

  return (
    <div className="w-full">
      {/* Outer Card with warm styling matching Reference Image 1 */}
      <div className="relative bg-[#fcfaf7] border border-[#eadfd4] rounded-2xl p-4 sm:p-5 shadow-2xs">
        {/* Top Header Row matching Image 1 */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              BOROUGH MAP · SCHEMATIC
            </span>
            <span className="text-xs font-semibold text-stone-700 bg-stone-200/80 px-2.5 py-0.5 rounded-md">
              {borough}
            </span>
          </div>

          {/* Toggle between Pixel-Perfect Schematic & Live Interactive Map */}
          <div className="flex items-center gap-1 bg-white border border-[#eadfd4] p-0.5 rounded-xl shadow-2xs">
            <button
              onClick={() => setViewMode('Schematic')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'Schematic'
                  ? 'bg-[#550000] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Schematic
            </button>
            <button
              onClick={() => setViewMode('Interactive Map')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === 'Interactive Map'
                  ? 'bg-[#550000] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Interactive Map</span>
            </button>
          </div>
        </div>

        {/* 1. EXACT PIXEL-PERFECT SCHEMATIC MAP (Matching Reference Image 1) */}
        {viewMode === 'Schematic' && (
          <div className="relative w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden border border-[#eadfd4] bg-[#fbf8f5] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 440"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="islandShadow" x="-5%" y="-5%" width="110%" height="115%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.09" />
                </filter>
              </defs>

              {/* Background canvas fill */}
              <rect width="1000" height="440" fill="#fcfaf7" />

              {/* Island 1: West / Manhattan & West Bronx (Matching Reference Image 1) */}
              <polygon
                points="100,150 290,125 395,150 350,220 430,245 375,310 230,325 120,285 72,225"
                fill="#ebdccb"
                stroke="#bfa693"
                strokeWidth="1.6"
                filter="url(#islandShadow)"
              />

              {/* Island 2: Upper Center / East Bronx */}
              <polygon
                points="485,130 655,140 730,185 670,240 530,235 450,175"
                fill="#ebdccb"
                stroke="#bfa693"
                strokeWidth="1.6"
                filter="url(#islandShadow)"
              />

              {/* Island 3: Bottom Center / Brooklyn */}
              <polygon
                points="420,255 570,245 655,280 565,325 415,305"
                fill="#ebdccb"
                stroke="#bfa693"
                strokeWidth="1.6"
                filter="url(#islandShadow)"
              />

              {/* Island 4: Far Right / Queens */}
              <polygon
                points="745,230 910,220 930,275 830,315 715,285"
                fill="#ebdccb"
                stroke="#bfa693"
                strokeWidth="1.6"
                filter="url(#islandShadow)"
              />

              {/* Center Caption matching Reference Image 1 exactly */}
              <text
                x="500"
                y="380"
                textAnchor="middle"
                fill="#6d5f57"
                fontSize="15"
                fontWeight="500"
                fontFamily="var(--font-poppins), sans-serif"
              >
                NYC · Illustrative map
              </text>

              {/* Render the 7 Schematic Pin Points matching Reference Image 1 */}
              {SCHEMATIC_BASE_DOTS.map((dot, idx) => {
                // Check if this dot maps to an active filtered property
                const matchedProp = properties.find((p) => {
                  if (borough === 'Bronx') {
                    if (idx === 0) return p.id === 'BRONX-01';
                    if (idx === 1) return p.id === 'BRONX-02';
                    if (idx === 2) return p.id === 'BRONX-03';
                    if (idx === 3) return p.id === 'BRONX-04';
                    if (idx === 4) return p.id === 'BRONX-05';
                  }
                  if (borough === 'Brooklyn' && idx === 5) return p.borough === 'Brooklyn';
                  if (borough === 'Queens' && idx === 6) return p.borough === 'Queens';
                  return false;
                });

                const isSelected = matchedProp ? selectedPropertyId === matchedProp.id : false;
                const isHovered = matchedProp ? hoveredPropertyId === matchedProp.id : false;

                const displayAddress = matchedProp ? matchedProp.address : dot.defaultAddress;
                const displayPrice = matchedProp
                  ? `$${matchedProp.lastRecordedSalePrice.toLocaleString()}`
                  : dot.defaultPrice;

                return (
                  <g
                    key={dot.id}
                    className="cursor-pointer"
                    onClick={() => {
                      if (matchedProp) onSelectProperty(matchedProp.id);
                    }}
                    onMouseEnter={() =>
                      setTooltip({
                        text: displayAddress,
                        subtext: displayPrice,
                        x: dot.x,
                        y: dot.y,
                      })
                    }
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {/* Selected Elegant Highlight Ring */}
                    {isSelected && (
                      <>
                        <circle
                          cx={dot.x}
                          cy={dot.y}
                          r="15"
                          fill="none"
                          stroke="#550000"
                          strokeWidth="2"
                          opacity="0.3"
                        />
                        <circle
                          cx={dot.x}
                          cy={dot.y}
                          r="19"
                          fill="#550000"
                          opacity="0.12"
                        />
                      </>
                    )}

                    {/* Outer White Ring */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={isSelected ? 8.5 : isHovered ? 8 : 7}
                      fill="#550000"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="transition-transform duration-150 hover:scale-125"
                    />
                  </g>
                );
              })}

              {/* Hover Tooltip on Schematic Map */}
              {tooltip && (
                <g
                  transform={`translate(${Math.min(Math.max(tooltip.x - 75, 20), 850)}, ${
                    tooltip.y > 110 ? tooltip.y - 48 : tooltip.y + 20
                  })`}
                  pointerEvents="none"
                >
                  <rect
                    width="150"
                    height="42"
                    rx="8"
                    fill="#291e1a"
                    opacity="0.95"
                    filter="url(#islandShadow)"
                  />
                  <text
                    x="75"
                    y="17"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="var(--font-poppins)"
                  >
                    {tooltip.text}
                  </text>
                  <text
                    x="75"
                    y="32"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="var(--font-poppins)"
                  >
                    {tooltip.subtext}
                  </text>
                </g>
              )}
            </svg>
          </div>
        )}

        {/* 2. REAL INTERACTIVE LEAFLET MAP (With live geocoded teardrop pins) */}
        {viewMode === 'Interactive Map' && (
          <div className="relative w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden border border-[#eadfd4] shadow-inner bg-[#e5e3df]">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Custom Interactive Controls */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 shadow-md">
              <button
                onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomIn()}
                className="w-8 h-8 rounded-lg bg-white/95 text-stone-700 hover:text-stone-900 hover:bg-white flex items-center justify-center border border-stone-200 transition-colors cursor-pointer shadow-2xs"
                title="Zoom In"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => mapInstanceRef.current && mapInstanceRef.current.zoomOut()}
                className="w-8 h-8 rounded-lg bg-white/95 text-stone-700 hover:text-stone-900 hover:bg-white flex items-center justify-center border border-stone-200 transition-colors cursor-pointer shadow-2xs"
                title="Zoom Out"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (!mapInstanceRef.current) return;
                  const config = BOROUGH_CENTERS[borough] || BOROUGH_CENTERS.Bronx;
                  mapInstanceRef.current.flyTo(config.center, config.zoom, { duration: 0.8 });
                }}
                className="w-8 h-8 rounded-lg bg-white/95 text-stone-700 hover:text-stone-900 hover:bg-white flex items-center justify-center border border-stone-200 transition-colors cursor-pointer shadow-2xs"
                title={`Recenter on ${borough}`}
              >
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Legend Badge */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200/80 text-[11px] text-stone-700 font-medium shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#550000]"></span>
              <span>{properties.length} geocoded property pin points in {borough}</span>
            </div>
          </div>
        )}

        {/* Footnote below Map Card matching Reference Image 1 */}
        <p className="text-xs text-stone-400 mt-2">
          Map points are schematic, not geocoded property coordinates.
        </p>
      </div>
    </div>
  );
}
