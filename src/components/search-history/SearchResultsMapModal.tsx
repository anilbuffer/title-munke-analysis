'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Navigation,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { SearchHistoryItem } from '@/data/mock-search-history';

interface SearchResultsMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'Pennsylvania' | 'New York';
  records: SearchHistoryItem[];
  onSelectProperty: (address: string) => void;
  onOpenValuation?: (address: string) => void;
}

// Preset precise latitude/longitude coordinates for Pennsylvania deeds
const PA_COORDS: Record<string, { lat: number; lng: number; township: string }> = {
  '6432 SCHOLLER RD, Lynn Township, PA': { lat: 40.6865, lng: -75.8752, township: 'Lynn Township' },
  '5829 HILL DR, Upper Macungie Township, PA': { lat: 40.5892, lng: -75.6184, township: 'Upper Macungie' },
  '4055 RHOADS RD, Weisenberg Township, PA': { lat: 40.6385, lng: -75.7231, township: 'Weisenberg' },
  '7613 DRESHER RD, Lynn Township, PA': { lat: 40.7102, lng: -75.8450, township: 'Lynn Township' },
  '7810 DRESHER RD, Lynn Township, PA': { lat: 40.7145, lng: -75.8420, township: 'Lynn Township' },
  '2868 READING RD, Allentown City, PA': { lat: 40.5645, lng: -75.5120, township: 'Allentown' },
  '2830 W CHEW ST, Allentown City, PA': { lat: 40.5975, lng: -75.5080, township: 'Allentown West End' },
  '2303 HEFFNER RD, Weisenberg Township, PA': { lat: 40.6210, lng: -75.7480, township: 'Weisenberg' },
  '6432 SCHOLLER RD, Breinigsville, PA': { lat: 40.5420, lng: -75.6320, township: 'Breinigsville' },
  '3344 WEISENBERG CHURCH RD, New Tripoli, PA': { lat: 40.6550, lng: -75.7620, township: 'New Tripoli' },
  '7112 KINGS HIGHWAY, Zionsville, PA': { lat: 40.4850, lng: -75.5250, township: 'Zionsville' },
  '1420 HAMILTON ST, Allentown City, PA': { lat: 40.6010, lng: -75.4850, township: 'Allentown' },
  '425 W WALNUT ST, Allentown City, PA': { lat: 40.6025, lng: -75.4720, township: 'Allentown' },
  '1845 S 4TH ST, Allentown City, PA': { lat: 40.5820, lng: -75.4650, township: 'South Allentown' },
  '521 E BROAD ST, Bethlehem, PA': { lat: 40.6230, lng: -75.3750, township: 'Bethlehem' },
};

// Preset precise latitude/longitude coordinates for New York deeds
const NY_COORDS: Record<string, { lat: number; lng: number; borough: string }> = {
  '3010 BRIGGS AVENUE, BX': { lat: 40.8715, lng: -73.8860, borough: 'Bronx (Bedford Park)' },
  '2612 WEST 2 STREET, BK': { lat: 40.5912, lng: -73.9715, borough: 'Brooklyn (Gravesend)' },
  '150 W 56TH ST, MN': { lat: 40.7645, lng: -73.9795, borough: 'Manhattan (Midtown)' },
  '45-12 43RD ST, QN': { lat: 40.7445, lng: -73.9215, borough: 'Queens (Sunnyside)' },
  '88 PIERREPONT ST, BK': { lat: 40.6952, lng: -73.9950, borough: 'Brooklyn (Heights)' },
  '340 RIVERSIDE DR, MN': { lat: 40.8030, lng: -73.9710, borough: 'Manhattan (Upper West)' },
  '1120 PARK AVE, MN': { lat: 40.7830, lng: -73.9550, borough: 'Manhattan (Upper East)' },
  '420 COLUMBUS AVE, MN': { lat: 40.7845, lng: -73.9740, borough: 'Manhattan (Upper West)' },
  '600 BEDFORD AVE, BK': { lat: 40.7065, lng: -73.9575, borough: 'Brooklyn (Williamsburg)' },
  '75-20 ASTORIA BLVD, QN': { lat: 40.7660, lng: -73.8920, borough: 'Queens (East Elmhurst)' },
  '145 E 48TH ST, MN': { lat: 40.7550, lng: -73.9725, borough: 'Manhattan (Midtown East)' },
  '225 CADMAN PLAZA W, BK': { lat: 40.6970, lng: -73.9910, borough: 'Brooklyn Downtown' },
  '820 5TH AVE, MN': { lat: 40.7670, lng: -73.9705, borough: 'Manhattan (Lenox Hill)' },
  '120 BROADWAY, MN': { lat: 40.7085, lng: -74.0110, borough: 'Financial District' },
  '350 ST ANNS AVE, BX': { lat: 40.8075, lng: -73.9180, borough: 'Mott Haven, Bronx' },
  '136-20 38TH AVE, QN': { lat: 40.7595, lng: -73.8320, borough: 'Flushing, Queens' },
};

export function SearchResultsMapModal({
  isOpen,
  onClose,
  activeTab,
  records,
  onSelectProperty,
  onOpenValuation,
}: SearchResultsMapModalProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tileLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersLayerRef = useRef<any>(null);

  const [mapType, setMapType] = useState<'Map' | 'Satellite'>('Map');
  const [isTerrain, setIsTerrain] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePropertyPopup, setActivePropertyPopup] = useState<SearchHistoryItem | null>(null);

  // Initialize and update the real Leaflet Map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous map if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initial center based on Pennsylvania or New York
      const initialCenter: [number, number] =
        activeTab === 'Pennsylvania'
          ? [40.6200, -75.6400] // Lehigh County, PA
          : [40.7484, -73.9857]; // New York City

      const initialZoom = activeTab === 'Pennsylvania' ? 11 : 12;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false, // We use custom Google Maps styled zoom controls
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Tile URLs for Google Maps Roadmap, Terrain, and Hybrid Satellite
      const getTileUrl = (type: 'Map' | 'Satellite', terrain: boolean) => {
        if (type === 'Satellite') {
          return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'; // Google Hybrid Satellite
        }
        if (terrain) {
          return 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'; // Google Terrain
        }
        return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'; // Google Roadmap
      };

      const tileLayer = L.tileLayer(getTileUrl(mapType, isTerrain), {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Create LayerGroup for markers
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      // Custom Google Red Pin Icon
      const googlePinIcon = L.divIcon({
        className: 'google-maps-pin-container',
        html: `
          <div style="cursor: pointer; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); display: flex; align-items: center; justify-content: center; width: 28px; height: 36px;">
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0C6.27 0 0 6.27 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.27 21.73 0 14 0Z" fill="#EA4335"/>
              <circle cx="14" cy="14" r="5.5" fill="#FFFFFF"/>
              <circle cx="14" cy="14" r="2.8" fill="#B31412"/>
            </svg>
          </div>
        `,
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -36],
      });

      // Plot actual pins for records
      records.forEach((record, index) => {
        let lat = 40.7128;
        let lng = -74.0060;

        if (activeTab === 'Pennsylvania') {
          const match = PA_COORDS[record.address];
          if (match) {
            lat = match.lat;
            lng = match.lng;
          } else {
            // Deterministic distribution around Lehigh Valley
            lat = 40.55 + ((index * 0.023) % 0.16);
            lng = -75.75 + ((index * 0.031) % 0.35);
          }
        } else {
          const match = NY_COORDS[record.address];
          if (match) {
            lat = match.lat;
            lng = match.lng;
          } else {
            // Deterministic distribution around NYC
            lat = 40.65 + ((index * 0.019) % 0.22);
            lng = -74.02 + ((index * 0.027) % 0.18);
          }
        }

        const marker = L.marker([lat, lng], { icon: googlePinIcon });

        marker.on('click', () => {
          setActivePropertyPopup(record);
        });

        markersLayer.addLayer(marker);
      });

      // Fit map bounds to show all deed markers nicely
      if (records.length > 0) {
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 200);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, activeTab, records]);

  // Update Tile Layer dynamically when user toggles Map, Satellite, or Terrain
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    let tileUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    if (mapType === 'Satellite') {
      tileUrl = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    } else if (isTerrain) {
      tileUrl = 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
    }

    tileLayerRef.current.setUrl(tileUrl);
  }, [mapType, isTerrain]);

  // Invalidate map size when fullscreen changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 300);
    }
  }, [isFullscreen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="map-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5 animate-in fade-in duration-200"
    >
      <div
        className={`bg-white rounded-2xl sm:rounded-3xl border border-[#eadfd4] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-6xl h-[88vh] max-h-[900px]'
        }`}
      >
        {/* Header Bar matching attached screenshot: "Search Results Map" + deed count + X */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-[#eadfd4] bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <h2
              id="map-modal-title"
              className="text-base sm:text-lg font-bold text-[#3d2014] tracking-tight"
            >
              Search Results Map
            </h2>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-600 font-medium">
              {activeTab} ({records.length} deeds plotted)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close search results map"
          >
            <X className="w-5 h-5 text-stone-700" />
          </button>
        </div>

        {/* Real Interactive Map Canvas Container */}
        <div className="relative flex-1 bg-[#e5e3df] overflow-hidden select-none">
          {/* Real Leaflet Map DOM Element */}
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Top-Left: Map / Satellite Control Toggle (matching Google Maps UI) */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex flex-col gap-1.5">
            <div className="inline-flex bg-white rounded-lg shadow-md border border-stone-200 overflow-hidden text-xs font-semibold text-stone-800">
              <button
                onClick={() => setMapType('Map')}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  mapType === 'Map'
                    ? 'bg-stone-50 text-stone-900 font-bold border-r border-stone-200'
                    : 'text-stone-600 hover:bg-stone-50 border-r border-stone-200'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setMapType('Satellite')}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  mapType === 'Satellite'
                    ? 'bg-stone-50 text-stone-900 font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                Satellite
              </button>
            </div>

            {/* Terrain Checkbox Option */}
            {mapType === 'Map' && (
              <label className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-md shadow-xs border border-stone-200 text-[11px] font-medium text-stone-700 cursor-pointer self-start select-none">
                <input
                  type="checkbox"
                  checked={isTerrain}
                  onChange={(e) => setIsTerrain(e.target.checked)}
                  className="rounded text-[#550000] focus:ring-[#550000] cursor-pointer"
                />
                <span>Terrain</span>
              </label>
            )}
          </div>

          {/* Top-Right: Fullscreen Toggle */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded-lg bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Bottom-Right: Zoom & Navigation Controls */}
          <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-2 items-center">
            {/* Pegman Street View Button */}
            <button
              onClick={() => {
                if (records.length > 0) {
                  onSelectProperty(records[0].address);
                  onClose();
                }
              }}
              className="w-8 h-8 rounded-lg bg-white shadow-md border border-stone-200 flex items-center justify-center text-amber-600 hover:bg-stone-50 transition-colors cursor-pointer"
              title="View Street View & Property Records"
            >
              <Navigation className="w-4 h-4 text-amber-600" />
            </button>

            {/* Zoom In / Zoom Out Controls */}
            <div className="flex flex-col bg-white rounded-lg shadow-md border border-stone-200 overflow-hidden">
              <button
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.zoomIn();
                  }
                }}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-50 border-b border-stone-200 transition-colors cursor-pointer"
                title="Zoom in"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.zoomOut();
                  }
                }}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                title="Zoom out"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom-Left: Google Logo */}
          <div className="absolute bottom-2 left-3 z-20 pointer-events-none select-none flex items-center gap-1">
            <span className="text-sm font-bold tracking-tight text-stone-600 font-sans">
              Google
            </span>
          </div>

          {/* Bottom-Right: Map Legal Footer */}
          <div className="absolute bottom-1.5 right-14 z-20 pointer-events-none select-none text-[10px] text-stone-600 bg-white/80 px-2 py-0.5 rounded shadow-2xs hidden sm:block">
            <span>Map data ©2026 • Terms • Report a map error</span>
          </div>

          {/* Interactive Property InfoWindow Popup */}
          {activePropertyPopup && (
            <div
              className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-white rounded-2xl border border-[#eadfd4] shadow-2xl p-4 w-[90%] max-w-sm animate-in fade-in zoom-in-95"
            >
              <div className="flex items-start justify-between gap-2 border-b border-[#f0e8e0] pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                    {activePropertyPopup.status}
                  </span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-[11px] text-stone-500 font-medium">
                    {activePropertyPopup.borough || activeTab}
                  </span>
                </div>
                <button
                  onClick={() => setActivePropertyPopup(null)}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="py-2.5 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#3d2014] leading-snug">
                  {activePropertyPopup.address}
                </h4>
                <p className="text-[11px] text-stone-500">
                  Recorded Date: <strong className="text-stone-700">{activePropertyPopup.dateTime}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#f0e8e0]">
                <button
                  onClick={() => {
                    onSelectProperty(activePropertyPopup.address);
                    onClose();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] shadow-2xs transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onOpenValuation && (
                  <button
                    onClick={() => {
                      onOpenValuation(activePropertyPopup.address);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#eadfd4] bg-[#faf6f2] hover:bg-[#f3ede6] text-[#550000] text-xs font-semibold transition-colors cursor-pointer"
                    title="AI Valuation Engine"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#550000]" />
                    <span>Valuation</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
