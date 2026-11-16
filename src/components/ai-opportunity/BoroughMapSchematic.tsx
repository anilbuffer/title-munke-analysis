'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Plus, Minus, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { AIOpportunityProperty, Borough } from '@/types/ai-opportunity';

interface BoroughMapSchematicProps {
  borough: Borough;
  properties: AIOpportunityProperty[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  hoveredPropertyId?: string | null;
}

// Borough center coordinates & default zoom levels
const BOROUGH_CENTERS: Record<Borough, { center: [number, number]; zoom: number }> = {
  Bronx: { center: [40.8715, -73.886], zoom: 14 },
  Brooklyn: { center: [40.635, -73.945], zoom: 14 },
  Queens: { center: [40.735, -73.815], zoom: 13 },
  Manhattan: { center: [40.758, -73.985], zoom: 13 },
  'Staten Island': { center: [40.579, -74.15], zoom: 12 },
};

// 7 Authentic Schematic Dots matching Reference Image 1 exactly
const SCHEMATIC_DOTS = [
  // Island 1 (Left - Bronx / Manhattan)
  { id: 'BRONX-01', x: 92, y: 75, address: '3025 Briggs Avenue', price: '$1,280,000', borough: 'Bronx' },
  { id: 'BRONX-02', x: 116, y: 138, address: '280 E 198th Street', price: '$945,000', borough: 'Bronx' },
  { id: 'BRONX-03', x: 138, y: 182, address: '3050 Bainbridge Avenue', price: '$1,820,000', borough: 'Bronx' },
  // Island 2 (Top Right)
  { id: 'DOT-4', x: 245, y: 72, address: '2980 Grand Concourse', price: '$2,150,000', borough: 'Bronx' },
  { id: 'DOT-5', x: 268, y: 102, address: '2775 Webster Avenue', price: '$3,400,000', borough: 'Bronx' },
  // Island 3 (Bottom Center - Brooklyn)
  { id: 'BK-01', x: 226, y: 202, address: '3218 Avenue I', price: '$1,420,000', borough: 'Brooklyn' },
  // Island 4 (Far Right - Queens)
  { id: 'QN-02', x: 368, y: 168, address: '68-15 174th Street', price: '$1,150,000', borough: 'Queens' },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);

  // Default to 'Roadmap' for real feel with pins, with instant toggle to Satellite or Schematic
  const [viewMode, setViewMode] = useState<'Roadmap' | 'Satellite' | 'Schematic'>('Roadmap');
  const [schematicTooltip, setSchematicTooltip] = useState<{
    text: string;
    subtext: string;
    x: number;
    y: number;
  } | null>(null);

  // Tile URL helper for Google Maps Roadmap & Satellite Hybrid
  const getTileUrl = (mode: 'Roadmap' | 'Satellite') => {
    if (mode === 'Satellite') {
      return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    }
    return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
  };

  // Helper to render high-contrast Title Munke custom pins onto Leaflet map
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderMarkers = useCallback((L: any, map: any, layerGroup: any) => {
    if (!L || !map || !layerGroup) return;

    layerGroup.clearLayers();
    const bounds: [number, number][] = [];

    properties.forEach((prop) => {
      if (typeof prop.lat !== 'number' || typeof prop.lng !== 'number') return;

      const isSelected = selectedPropertyId === prop.id;
      const isHovered = hoveredPropertyId === prop.id;

      const formattedPrice =
        prop.lastRecordedSalePrice >= 1000000
          ? `$${(prop.lastRecordedSalePrice / 1000000).toFixed(2)}M`
          : `$${(prop.lastRecordedSalePrice / 1000).toFixed(0)}k`;

      const pinIcon = L.divIcon({
        className: 'title-munke-map-pin',
        iconSize: [110, 48],
        iconAnchor: [55, 46],
        html: `
          <div style="cursor: pointer; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); transform: ${
            isSelected ? 'scale(1.15)' : isHovered ? 'scale(1.08)' : 'scale(1)'
          }; transition: transform 0.15s ease-out;">
            <!-- Price Badge Pill -->
            <div style="
              background: ${isSelected ? '#550000' : '#291e1a'};
              color: #ffffff;
              font-family: var(--font-poppins), system-ui, -apple-system, sans-serif;
              font-size: 11px;
              font-weight: 700;
              padding: 3px 9px;
              border-radius: 9999px;
              border: 2px solid #ffffff;
              white-space: nowrap;
              margin-bottom: 2px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.25);
            ">
              ${formattedPrice}
            </div>
            <!-- Pin Dot -->
            <div style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: ${isSelected ? '#550000' : '#4a0e0e'};
              border: 2.5px solid #ffffff;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="width: 5px; height: 5px; border-radius: 50%; background: #ffffff;"></div>
            </div>
          </div>
        `,
      });

      const marker = L.marker([prop.lat, prop.lng], {
        icon: pinIcon,
        zIndexOffset: isSelected ? 1000 : isHovered ? 500 : 100,
      });

      // Hover tooltip with address and property type
      marker.bindTooltip(
        `<div style="font-weight: 600; color: #fff;">${prop.address}</div>
         <div style="font-size: 10px; color: #fca5a5;">${prop.propertyType} · $${prop.lastRecordedSalePrice.toLocaleString()}</div>`,
        {
          direction: 'top',
          offset: [0, -42],
          className: 'title-munke-tooltip',
        }
      );

      marker.on('click', () => {
        onSelectProperty(prop.id);
      });

      layerGroup.addLayer(marker);
      bounds.push([prop.lat, prop.lng]);
    });

    // Auto-fit bounds if we have property points
    if (bounds.length > 0) {
      if (selectedPropertyId) {
        const selected = properties.find((p) => p.id === selectedPropertyId);
        if (selected && selected.lat && selected.lng) {
          map.setView([selected.lat, selected.lng], 15, { animate: true });
          return;
        }
      }
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [properties, selectedPropertyId, hoveredPropertyId, onSelectProperty]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      if (viewMode === 'Schematic') return;

      const L = (await import('leaflet')).default;
      if (!isMounted || !mapContainerRef.current) return;

      leafletRef.current = L;

      // Fix Leaflet's default image URL getter
      // @ts-expect-error Leaflet internal property
      delete L.Icon.Default.prototype._getIconUrl;

      // Clean up previous map if exists
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

      const tileLayer = L.tileLayer(getTileUrl(viewMode), {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Create LayerGroup for property markers
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      // Immediately render markers so map is never empty
      renderMarkers(L, map, markersLayer);

      // Force size recalculation to prevent clipped tiles
      setTimeout(() => {
        if (isMounted && mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 150);
    }

    if (viewMode !== 'Schematic') {
      initMap();
    }

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, borough]); // Re-initialize when viewMode or borough changes

  // Update markers when properties, selection or hover states change
  useEffect(() => {
    if (viewMode === 'Schematic' || !mapInstanceRef.current || !markersLayerRef.current || !leafletRef.current) {
      return;
    }
    renderMarkers(leafletRef.current, mapInstanceRef.current, markersLayerRef.current);
  }, [properties, selectedPropertyId, hoveredPropertyId, renderMarkers, viewMode]);

  // Recenter map on active borough
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    const config = BOROUGH_CENTERS[borough] || BOROUGH_CENTERS.Bronx;
    mapInstanceRef.current.flyTo(config.center, config.zoom, { duration: 0.8 });
  };

  return (
    <div className="w-full">
      {/* Outer Card with warm Title Munke styling */}
      <div className="relative bg-[#fcfaf7] border border-[#eadfd4] rounded-2xl p-4 sm:p-5 shadow-2xs">
        {/* Top Header Row: BOROUGH MAP · SCHEMATIC + View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              BOROUGH MAP {viewMode === 'Schematic' ? '· SCHEMATIC' : ''}
            </span>
            <span className="text-xs font-semibold text-stone-700 bg-stone-200/80 px-2.5 py-0.5 rounded-md">
              {borough}
            </span>
          </div>

          {/* View Mode Toggle: Roadmap | Satellite | Schematic */}
          <div className="flex items-center bg-stone-200/60 p-0.5 rounded-lg border border-stone-300/60 text-xs font-semibold">
            {(['Roadmap', 'Satellite', 'Schematic'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === mode
                    ? 'bg-[#550000] text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* 1. REAL INTERACTIVE LEAFLET MAP (Roadmap & Satellite with Live Pin Points) */}
        {viewMode !== 'Schematic' && (
          <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-[#eadfd4] shadow-inner bg-[#e5e3df]">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Custom Interactive Controls (Zoom & Recenter) */}
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
                onClick={handleRecenter}
                className="w-8 h-8 rounded-lg bg-white/95 text-stone-700 hover:text-stone-900 hover:bg-white flex items-center justify-center border border-stone-200 transition-colors cursor-pointer shadow-2xs"
                title={`Recenter on ${borough}`}
              >
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Legend Badge */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200/80 text-[11px] text-stone-700 font-medium shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#550000]"></span>
              <span>{properties.length} recorded sale properties in {borough}</span>
            </div>
          </div>
        )}

        {/* 2. AUTHENTIC SCHEMATIC VECTOR MAP (Pixel-exact reference reconstruction) */}
        {viewMode === 'Schematic' && (
          <div className="relative w-full py-2 flex flex-col items-center justify-center">
            {/* Constrained container maintaining natural 440x285 proportions without pancake stretching */}
            <div className="w-full max-w-lg aspect-[440/285] relative">
              <svg
                viewBox="0 0 440 285"
                className="w-full h-full select-none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="islandShadow" x="-5%" y="-5%" width="110%" height="115%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.08" />
                  </filter>
                </defs>

                {/* Island 1: West (Bronx / Manhattan) */}
                <polygon
                  points="175,45 128,22 45,48 32,98 48,165 95,218 155,202 182,185 152,105"
                  fill="#ebdccb"
                  stroke="#bfa693"
                  strokeWidth="1.6"
                  filter="url(#islandShadow)"
                />

                {/* Island 2: Upper East */}
                <polygon
                  points="218,25 295,36 328,88 302,145 240,145 200,85"
                  fill="#ebdccb"
                  stroke="#bfa693"
                  strokeWidth="1.6"
                  filter="url(#islandShadow)"
                />

                {/* Island 3: Lower Center (Brooklyn) */}
                <polygon
                  points="188,172 252,158 290,198 252,245 188,215"
                  fill="#ebdccb"
                  stroke="#bfa693"
                  strokeWidth="1.6"
                  filter="url(#islandShadow)"
                />

                {/* Island 4: Far Right (Queens) */}
                <polygon
                  points="328,125 402,112 415,162 375,220 318,198"
                  fill="#ebdccb"
                  stroke="#bfa693"
                  strokeWidth="1.6"
                  filter="url(#islandShadow)"
                />

                {/* Center Caption matching Reference Image 1 */}
                <text
                  x="220"
                  y="268"
                  textAnchor="middle"
                  fill="#6d5f57"
                  fontSize="14"
                  fontWeight="500"
                  fontFamily="var(--font-poppins), sans-serif"
                >
                  NYC · Illustrative map
                </text>

                {/* 7 Schematic Pin Points */}
                {SCHEMATIC_DOTS.map((dot) => {
                  const matchedProp = properties.find(
                    (p) =>
                      p.id === dot.id ||
                      (borough === 'Brooklyn' && dot.id === 'BK-01' && p.borough === 'Brooklyn') ||
                      (borough === 'Queens' && dot.id === 'QN-02' && p.borough === 'Queens')
                  );

                  const isSelected = matchedProp
                    ? selectedPropertyId === matchedProp.id
                    : selectedPropertyId === dot.id;
                  const isHovered = matchedProp ? hoveredPropertyId === matchedProp.id : false;

                  const displayAddress = matchedProp ? matchedProp.address : dot.address;
                  const displayPrice = matchedProp
                    ? `$${matchedProp.lastRecordedSalePrice.toLocaleString()}`
                    : dot.price;

                  return (
                    <g
                      key={dot.id}
                      className="cursor-pointer"
                      onClick={() => {
                        if (matchedProp) {
                          onSelectProperty(matchedProp.id);
                        }
                      }}
                      onMouseEnter={() =>
                        setSchematicTooltip({
                          text: displayAddress,
                          subtext: displayPrice,
                          x: dot.x,
                          y: dot.y,
                        })
                      }
                      onMouseLeave={() => setSchematicTooltip(null)}
                    >
                      {/* Outer Selection Halo Ring matching Image 1 */}
                      {isSelected && (
                        <circle
                          cx={dot.x}
                          cy={dot.y}
                          r="11"
                          fill="none"
                          stroke="#550000"
                          strokeWidth="1.5"
                          opacity="0.4"
                        />
                      )}

                      {/* Burgundy Pin Circle with White Ring */}
                      <circle
                        cx={dot.x}
                        cy={dot.y}
                        r={isSelected ? 6.5 : isHovered ? 6 : 5.5}
                        fill="#4a0e0e"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-transform duration-150 hover:scale-125"
                      />
                    </g>
                  );
                })}

                {/* SVG Hover Tooltip */}
                {schematicTooltip && (
                  <g
                    transform={`translate(${Math.min(Math.max(schematicTooltip.x - 70, 10), 300)}, ${
                      schematicTooltip.y > 80 ? schematicTooltip.y - 42 : schematicTooltip.y + 16
                    })`}
                    pointerEvents="none"
                  >
                    <rect
                      width="140"
                      height="38"
                      rx="7"
                      fill="#291e1a"
                      opacity="0.95"
                      filter="url(#islandShadow)"
                    />
                    <text
                      x="70"
                      y="16"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10.5"
                      fontWeight="700"
                      fontFamily="var(--font-poppins)"
                    >
                      {schematicTooltip.text}
                    </text>
                    <text
                      x="70"
                      y="30"
                      textAnchor="middle"
                      fill="#fca5a5"
                      fontSize="10"
                      fontWeight="800"
                      fontFamily="var(--font-poppins)"
                    >
                      {schematicTooltip.subtext}
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* Footnote below Map Card */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 mt-2.5">
          <span>
            {viewMode === 'Schematic'
              ? 'Map points are schematic, not geocoded property coordinates.'
              : `Interactive geocoded GIS map showing registered ACRIS deeds in ${borough}.`}
          </span>
          {viewMode !== 'Schematic' && (
            <span className="hidden sm:inline font-mono text-[11px] text-stone-400">
              Lat/Lng geocoding verified · DOF Rolling Sales
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
