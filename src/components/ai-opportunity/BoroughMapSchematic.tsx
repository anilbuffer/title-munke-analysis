'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Plus, Minus, Navigation, Layers, Sparkles } from 'lucide-react';
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
  Queens: { center: [40.742, -73.85], zoom: 13 },
  Manhattan: { center: [40.758, -73.985], zoom: 13 },
  'Staten Island': { center: [40.579, -74.15], zoom: 12 },
};

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

  const [mapType, setMapType] = useState<'Roadmap' | 'Satellite' | 'Schematic'>('Roadmap');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize and update the real Leaflet Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      if (mapType === 'Schematic') {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        return;
      }

      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Fix Leaflet's default icon path issues in bundlers
      // @ts-expect-error Leaflet private property
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

      // Tile URLs: Google Maps Roadmap or Satellite
      const getTileUrl = (type: 'Roadmap' | 'Satellite') => {
        if (type === 'Satellite') {
          return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
        }
        return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
      };

      const tileLayer = L.tileLayer(getTileUrl(mapType as 'Roadmap' | 'Satellite'), {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // LayerGroup for property markers
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      setMapLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapType, borough]);

  // Update Markers whenever properties, selection, or map instance changes
  useEffect(() => {
    if (!mapInstanceRef.current || mapType === 'Schematic') return;

    let isMounted = true;

    async function updateMarkers() {
      const L = (await import('leaflet')).default;
      if (!isMounted || !mapInstanceRef.current || !markersLayerRef.current) return;

      markersLayerRef.current.clearLayers();

      const bounds: [number, number][] = [];

      properties.forEach((prop) => {
        const isSelected = selectedPropertyId === prop.id;
        const isHovered = hoveredPropertyId === prop.id;

        const formattedPrice =
          prop.lastRecordedSalePrice >= 1000000
            ? `$${(prop.lastRecordedSalePrice / 1000000).toFixed(2)}M`
            : `$${(prop.lastRecordedSalePrice / 1000).toFixed(0)}k`;

        // Custom Title Munke Burgundy Map Pin
        const pinIcon = L.divIcon({
          className: 'title-munke-custom-pin',
          html: `
            <div style="cursor: pointer; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.35)); display: flex; flex-direction: column; align-items: center; transition: all 0.2s ease;">
              <div style="
                background: ${isSelected ? '#550000' : isHovered ? '#6b0000' : '#291e1a'};
                color: #ffffff;
                font-family: var(--font-poppins), sans-serif;
                font-size: 11px;
                font-weight: 700;
                padding: 3px 8px;
                border-radius: 9999px;
                border: 2px solid ${isSelected ? '#fca5a5' : '#ffffff'};
                white-space: nowrap;
                box-shadow: ${isSelected ? '0 0 0 3px rgba(85,0,0,0.4)' : '0 2px 5px rgba(0,0,0,0.25)'};
                display: flex;
                align-items: center;
                gap: 4px;
              ">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: ${
                  isSelected ? '#22c55e' : '#eab308'
                }; display: inline-block;"></span>
                <span>${formattedPrice}</span>
              </div>
              <div style="
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid ${isSelected ? '#550000' : '#291e1a'};
                margin-top: -1px;
              "></div>
            </div>
          `,
          iconSize: [70, 36],
          iconAnchor: [35, 36],
          popupAnchor: [0, -36],
        });

        const marker = L.marker([prop.lat, prop.lng], { icon: pinIcon });

        // Tooltip Popup on Marker
        const popupContent = `
          <div style="font-family: var(--font-poppins), sans-serif; padding: 4px; min-width: 180px;">
            <div style="font-size: 10px; font-weight: 700; color: #15803d; text-transform: uppercase; letter-spacing: 0.5px;">
              ${prop.borough} · ${prop.propertyType}
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #1c1917; margin-top: 2px;">
              ${prop.address}
            </div>
            <div style="font-size: 15px; font-weight: 800; color: #550000; margin-top: 3px;">
              $${prop.lastRecordedSalePrice.toLocaleString()}
            </div>
            <div style="font-size: 10px; color: #78716c; margin-top: 1px;">
              ${prop.grossSqFt.toLocaleString()} sq ft · $${prop.pricePerSqFt}/sq ft
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: false,
          offset: [0, -28],
        });

        marker.on('click', () => {
          onSelectProperty(prop.id);
        });

        markersLayerRef.current.addLayer(marker);
        bounds.push([prop.lat, prop.lng]);
      });

      // Fit map bounds if there are matching properties
      if (bounds.length > 0 && mapInstanceRef.current) {
        if (bounds.length === 1) {
          mapInstanceRef.current.setView(bounds[0], 15);
        } else {
          mapInstanceRef.current.fitBounds(bounds, {
            padding: [45, 45],
            maxZoom: 15,
          });
        }
      }
    }

    updateMarkers();

    return () => {
      isMounted = false;
    };
  }, [properties, selectedPropertyId, hoveredPropertyId, onSelectProperty, mapType]);

  // Zoom helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    const config = BOROUGH_CENTERS[borough] || BOROUGH_CENTERS.Bronx;
    mapInstanceRef.current.flyTo(config.center, config.zoom, { duration: 0.8 });
  };

  return (
    <div className="w-full">
      {/* Outer Card with warm styling */}
      <div className="relative bg-[#fcfaf7] border border-[#eadfd4] rounded-2xl p-4 sm:p-5 shadow-2xs">
        {/* Top Header Row inside Map Card matching Image 1 */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              BOROUGH MAP · SCHEMATIC
            </span>
            <span className="text-xs font-semibold text-stone-700 bg-stone-200/80 px-2.5 py-0.5 rounded-md">
              {borough}
            </span>
          </div>

          {/* Map Layer Mode Switcher: Roadmap | Satellite | Schematic */}
          <div className="flex items-center gap-1 bg-white border border-[#eadfd4] p-0.5 rounded-xl shadow-2xs">
            <button
              onClick={() => setMapType('Roadmap')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mapType === 'Roadmap'
                  ? 'bg-[#550000] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => setMapType('Satellite')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mapType === 'Satellite'
                  ? 'bg-[#550000] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('Schematic')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mapType === 'Schematic'
                  ? 'bg-[#550000] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Schematic
            </button>
          </div>
        </div>

        {/* Real Interactive Map Canvas (Leaflet with Google Maps tiles) */}
        {mapType !== 'Schematic' && (
          <div className="relative w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden border border-[#eadfd4] shadow-inner bg-[#e5e3df]">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Custom Interactive Zoom & Recenter Controls */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 shadow-md">
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-lg bg-white/95 text-stone-700 hover:text-stone-900 hover:bg-white flex items-center justify-center border border-stone-200 transition-colors cursor-pointer shadow-2xs"
                title="Zoom In"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
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

            {/* Bottom Left Legend Badge */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200/80 text-[11px] text-stone-700 font-medium shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#550000]"></span>
              <span>{properties.length} recorded sale properties in {borough}</span>
            </div>
          </div>
        )}

        {/* Schematic Vector Map Mode */}
        {mapType === 'Schematic' && (
          <div className="relative w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden border border-[#eadfd4] bg-[#fbf8f5] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 440"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="schematicShadow" x="-5%" y="-5%" width="110%" height="115%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Water texture background */}
              <rect width="1000" height="440" fill="#f4ece4" />

              {/* Landmass 1: West / Manhattan & West Bronx */}
              <polygon
                points="80,140 270,118 365,135 328,202 405,222 350,285 220,310 110,268 65,210"
                fill="#ebdccb"
                stroke="#c0a996"
                strokeWidth="1.6"
                filter="url(#schematicShadow)"
              />
              <text x="210" y="210" fill="#8c7a6e" fontSize="12" fontWeight="700" opacity="0.6">
                WEST BRONX
              </text>

              {/* Landmass 2: East Bronx */}
              <polygon
                points="455,115 625,125 690,170 640,225 505,220 425,160"
                fill="#ebdccb"
                stroke="#c0a996"
                strokeWidth="1.6"
                filter="url(#schematicShadow)"
              />
              <text x="530" y="165" fill="#8c7a6e" fontSize="12" fontWeight="700" opacity="0.6">
                EAST BRONX
              </text>

              {/* Landmass 3: Brooklyn */}
              <polygon
                points="395,245 540,235 625,270 540,315 395,295"
                fill="#ebdccb"
                stroke="#c0a996"
                strokeWidth="1.6"
                filter="url(#schematicShadow)"
              />
              <text x="475" y="275" fill="#8c7a6e" fontSize="12" fontWeight="700" opacity="0.6">
                BROOKLYN
              </text>

              {/* Landmass 4: Queens */}
              <polygon
                points="695,220 860,205 885,260 780,295 675,270"
                fill="#ebdccb"
                stroke="#c0a996"
                strokeWidth="1.6"
                filter="url(#schematicShadow)"
              />
              <text x="760" y="250" fill="#8c7a6e" fontSize="12" fontWeight="700" opacity="0.6">
                QUEENS
              </text>

              {/* Center Caption */}
              <text
                x="500"
                y="375"
                textAnchor="middle"
                fill="#6d5f57"
                fontSize="15"
                fontWeight="500"
                fontFamily="var(--font-poppins)"
              >
                NYC · Illustrative map
              </text>

              {/* Property Pins */}
              {properties.map((prop) => {
                const isSelected = selectedPropertyId === prop.id;
                const { x, y } = prop.schematicPoint;

                return (
                  <g
                    key={prop.id}
                    className="cursor-pointer"
                    onClick={() => onSelectProperty(prop.id)}
                  >
                    {isSelected && (
                      <>
                        <circle cx={x} cy={y} r="18" fill="#550000" opacity="0.25" />
                        <circle cx={x} cy={y} r="12" fill="none" stroke="#550000" strokeWidth="2" />
                      </>
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7.5 : 6}
                      fill="#550000"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* Footnote below Map Card */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 mt-2.5">
          <span>
            {mapType === 'Schematic'
              ? 'Map points are schematic, not geocoded property coordinates.'
              : `Interactive geocoded GIS map showing registered ACRIS deeds in ${borough}.`}
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-stone-400">
            Lat/Lng geocoding verified · DOF Rolling Sales
          </span>
        </div>
      </div>
    </div>
  );
}
