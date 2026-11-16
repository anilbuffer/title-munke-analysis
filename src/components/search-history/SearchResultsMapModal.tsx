'use client';

import React, { useState } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Navigation,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { SearchHistoryItem } from '@/data/mock-search-history';

interface SearchResultsMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'Pennsylvania' | 'New York';
  records: SearchHistoryItem[];
  onSelectProperty: (address: string) => void;
  onOpenValuation?: (address: string) => void;
}

interface MapCoordinate {
  id: number;
  x: number; // percentage
  y: number; // percentage
  address: string;
  dateTime: string;
  status: string;
  township?: string;
  borough?: string;
}

export function SearchResultsMapModal({
  isOpen,
  onClose,
  activeTab,
  records,
  onSelectProperty,
  onOpenValuation,
}: SearchResultsMapModalProps) {
  const [mapType, setMapType] = useState<'Map' | 'Satellite'>('Map');
  const [isTerrain, setIsTerrain] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPin, setSelectedPin] = useState<MapCoordinate | null>(null);

  if (!isOpen) return null;

  // Preset realistic coordinates for Pennsylvania (Lehigh County, Allentown, Lynn, Macungie, Weisenberg)
  const PA_COORDINATES: Record<string, { x: number; y: number; township: string }> = {
    '6432 SCHOLLER RD, Lynn Township, PA': { x: 28, y: 32, township: 'Lynn Township' },
    '5829 HILL DR, Upper Macungie Township, PA': { x: 42, y: 56, township: 'Upper Macungie Township' },
    '4055 RHOADS RD, Weisenberg Township, PA': { x: 34, y: 46, township: 'Weisenberg Township' },
    '7613 DRESHER RD, Lynn Township, PA': { x: 24, y: 26, township: 'Lynn Township' },
    '7810 DRESHER RD, Lynn Township, PA': { x: 26, y: 22, township: 'Lynn Township' },
    '2868 READING RD, Allentown City, PA': { x: 68, y: 52, township: 'Allentown City' },
    '2830 W CHEW ST, Allentown City, PA': { x: 62, y: 48, township: 'Allentown (West End)' },
    '2303 HEFFNER RD, Weisenberg Township, PA': { x: 38, y: 40, township: 'Weisenberg Township' },
    '6432 SCHOLLER RD, Breinigsville, PA': { x: 46, y: 64, township: 'Breinigsville' },
    '3344 WEISENBERG CHURCH RD, New Tripoli, PA': { x: 31, y: 28, township: 'New Tripoli' },
  };

  // Preset realistic coordinates for New York (Bronx, Manhattan, Brooklyn, Queens)
  const NY_COORDINATES: Record<string, { x: number; y: number; borough: string }> = {
    '3010 BRIGGS AVENUE, BX': { x: 53.5, y: 22, borough: 'Bronx (Bedford Park)' },
    '2612 WEST 2 STREET, BK': { x: 41.5, y: 89, borough: 'Brooklyn (Gravesend)' },
    '150 W 56TH ST, MN': { x: 36.5, y: 52, borough: 'Manhattan (Midtown)' },
    '45-12 43RD ST, QN': { x: 63.5, y: 57.5, borough: 'Queens (Sunnyside)' },
    '88 PIERREPONT ST, BK': { x: 36.2, y: 82.5, borough: 'Brooklyn (Heights)' },
    '340 RIVERSIDE DR, MN': { x: 38.2, y: 42.5, borough: 'Manhattan (Upper West)' },
    '1120 PARK AVE, MN': { x: 43.5, y: 26.5, borough: 'Manhattan (Upper East)' },
    '420 COLUMBUS AVE, MN': { x: 37.8, y: 46.5, borough: 'Manhattan (Upper West)' },
    '600 BEDFORD AVE, BK': { x: 44.5, y: 84.5, borough: 'Brooklyn (Williamsburg)' },
    '75-20 ASTORIA BLVD, QN': { x: 48.5, y: 14.5, borough: 'Queens (East Elmhurst)' },
    '145 E 48TH ST, MN': { x: 38.5, y: 54.5, borough: 'Manhattan (Midtown East)' },
  };

  // Map records to coordinate pins
  const pins: MapCoordinate[] = records.map((rec, idx) => {
    if (activeTab === 'Pennsylvania') {
      const coord = PA_COORDINATES[rec.address] || {
        x: 30 + ((idx * 7) % 45),
        y: 25 + ((idx * 11) % 50),
        township: 'Lehigh County',
      };
      return {
        id: rec.id,
        x: coord.x,
        y: coord.y,
        address: rec.address,
        dateTime: rec.dateTime,
        status: rec.status,
        township: coord.township,
      };
    } else {
      const coord = NY_COORDINATES[rec.address] || {
        x: 36 + ((idx * 6) % 30),
        y: 30 + ((idx * 13) % 55),
        borough: rec.borough || 'New York',
      };
      return {
        id: rec.id,
        x: coord.x,
        y: coord.y,
        address: rec.address,
        dateTime: rec.dateTime,
        status: rec.status,
        borough: coord.borough,
      };
    }
  });

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.8, prev + delta * 0.15), 1.8));
  };

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
        {/* Header Bar matching attached screenshot exactly: "Search Results Map" + X */}
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

        {/* Map Body Canvas Container */}
        <div className="relative flex-1 bg-[#e5e3df] overflow-hidden select-none">
          {/* Real Map Surface */}
          <div
            className="w-full h-full relative transition-transform duration-200 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={() => setSelectedPin(null)}
          >
            {activeTab === 'New York' ? (
              /* NY Real Map Texture matching user screenshot */
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    mapType === 'Satellite'
                      ? 'url(/ny-briggs-satellite-hd.jpg)'
                      : 'url(/search-results-map-ny.jpg)',
                  filter: isTerrain ? 'contrast(1.08) brightness(0.97)' : 'none',
                }}
              />
            ) : (
              /* Pennsylvania Vector / Texture Map matching Google Maps styling */
              <div
                className={`w-full h-full relative ${
                  mapType === 'Satellite'
                    ? 'bg-[#1e2a1b]'
                    : isTerrain
                    ? 'bg-[#e2e7df]'
                    : 'bg-[#eef2ec]'
                }`}
              >
                {mapType === 'Satellite' ? (
                  /* Satellite Background for PA */
                  <div
                    className="w-full h-full bg-cover bg-center opacity-90"
                    style={{ backgroundImage: 'url(/pa-scholler-satellite-hd.jpg)' }}
                  />
                ) : (
                  /* Vector Google Maps SVG for Pennsylvania Lehigh Valley */
                  <svg
                    className="w-full h-full absolute inset-0 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1000 700"
                  >
                    <defs>
                      {/* Hill shading for terrain mode */}
                      <linearGradient id="hillShade" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d5ded2" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c5cfc2" stopOpacity="0.8" />
                      </linearGradient>
                      {/* River water pattern */}
                      <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b4d7ee" />
                        <stop offset="100%" stopColor="#9fcbed" />
                      </linearGradient>
                    </defs>

                    {/* Terrain Mountain Ridges (Blue Mountain & South Mountain) */}
                    {isTerrain && (
                      <>
                        <path
                          d="M 0,80 Q 250,50 500,90 T 1000,70 L 1000,0 L 0,0 Z"
                          fill="url(#hillShade)"
                          opacity="0.6"
                        />
                        <path
                          d="M 200,550 Q 500,520 800,570 T 1000,560 L 1000,700 L 0,700 Z"
                          fill="url(#hillShade)"
                          opacity="0.4"
                        />
                        <text x="250" y="55" fill="#8f9d8a" fontSize="13" fontWeight="bold" letterSpacing="4">
                          BLUE MOUNTAIN RIDGELINE (PA APPALACHIAN TRAIL)
                        </text>
                        <text x="450" y="620" fill="#8f9d8a" fontSize="13" fontWeight="bold" letterSpacing="4">
                          SOUTH MOUNTAIN PRESERVE
                        </text>
                      </>
                    )}

                    {/* Lehigh County & Township Boundary lines */}
                    <path
                      d="M 120,40 L 880,40 L 920,660 L 80,660 Z"
                      fill="none"
                      stroke="#d8cfc4"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />

                    {/* Waterways: Lehigh River & Jordan Creek */}
                    <path
                      d="M 680,40 Q 640,180 620,290 T 670,410 T 730,520 T 820,660"
                      fill="none"
                      stroke="url(#waterGrad)"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 250,220 Q 380,310 500,340 T 630,360"
                      fill="none"
                      stroke="url(#waterGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 180,480 Q 290,460 410,510 T 600,540"
                      fill="none"
                      stroke="url(#waterGrad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Major Highways: I-78, Route 22, Route 309, Route 100 */}
                    {/* Route 22 (East-West Thruway) */}
                    <path
                      d="M 0,330 Q 300,320 600,340 T 1000,330"
                      fill="none"
                      stroke="#fcd6a4"
                      strokeWidth="9"
                    />
                    <path
                      d="M 0,330 Q 300,320 600,340 T 1000,330"
                      fill="none"
                      stroke="#fa9e25"
                      strokeWidth="2.5"
                    />

                    {/* Interstate 78 (Southern Expressway) */}
                    <path
                      d="M 0,530 Q 350,510 650,530 T 1000,520"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      opacity="0.8"
                    />

                    {/* Route 100 (North-South through Macungie & Fogelsville) */}
                    <path
                      d="M 430,40 L 410,660"
                      fill="none"
                      stroke="#fcd6a4"
                      strokeWidth="8"
                    />

                    {/* Route 309 (North-South through Allentown) */}
                    <path
                      d="M 640,40 L 620,660"
                      fill="none"
                      stroke="#fcd6a4"
                      strokeWidth="8"
                    />

                    {/* Local road grid network */}
                    <path
                      d="M 180,120 L 450,240 M 220,380 L 520,390 M 150,560 L 480,590 M 520,180 L 880,180 M 540,460 L 890,470"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                    />

                    {/* City & Township Labels */}
                    <g fill="#4a5568" fontWeight="600" fontSize="13">
                      <text x="630" y="325" fill="#1a202c" fontSize="16" fontWeight="bold">
                        Allentown
                      </text>
                      <text x="760" y="360" fill="#1a202c" fontSize="15" fontWeight="bold">
                        Bethlehem
                      </text>
                      <text x="390" y="580" fill="#2d3748" fontSize="13" fontWeight="bold">
                        Macungie
                      </text>
                      <text x="310" y="605" fill="#2d3748" fontSize="13" fontWeight="bold">
                        Breinigsville
                      </text>
                      <text x="210" y="210" fill="#4a5568" fontSize="12">
                        Lynn Township
                      </text>
                      <text x="310" y="360" fill="#4a5568" fontSize="12">
                        Weisenberg Township
                      </text>
                      <text x="380" y="470" fill="#4a5568" fontSize="12">
                        Upper Macungie
                      </text>
                    </g>
                  </svg>
                )}
              </div>
            )}

            {/* Red Teardrop Map Pins for all records */}
            {pins.map((pin) => {
              const isSelected = selectedPin?.id === pin.id;

              return (
                <div
                  key={pin.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPin(pin);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-full cursor-pointer z-30 group transition-transform duration-150 hover:scale-125"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  {/* Google Maps Style Teardrop Pin */}
                  <div
                    className={`relative flex items-center justify-center transition-all ${
                      isSelected ? 'scale-125' : ''
                    }`}
                  >
                    <svg
                      width="26"
                      height="34"
                      viewBox="0 0 26 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-md"
                    >
                      <path
                        d="M13 0C5.82 0 0 5.82 0 13C0 22.75 13 34 13 34C13 34 26 22.75 26 13C26 5.82 20.18 0 13 0Z"
                        fill="#ea4335"
                      />
                      <circle cx="13" cy="13" r="5" fill="#ffffff" />
                      <circle cx="13" cy="13" r="2.5" fill="#b31412" />
                    </svg>

                    {/* Mini Hover Tooltip */}
                    <div className="absolute bottom-full mb-1 hidden group-hover:block whitespace-nowrap bg-black/85 text-white text-[11px] px-2 py-0.5 rounded shadow pointer-events-none">
                      {pin.address.split(',')[0]}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Interactive Selected Property Popup (InfoWindow) */}
            {selectedPin && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-40 bg-white rounded-2xl border border-[#eadfd4] shadow-xl p-4 w-72 sm:w-80 -translate-x-1/2 -translate-y-[135%] animate-in fade-in zoom-in-95"
                style={{
                  left: `${selectedPin.x}%`,
                  top: `${selectedPin.y}%`,
                }}
              >
                <div className="flex items-start justify-between gap-2 border-b border-[#f0e8e0] pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                      {selectedPin.status}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {selectedPin.township || selectedPin.borough}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="py-2.5 space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#3d2014] leading-snug">
                    {selectedPin.address}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Recorded Date: <strong className="text-stone-700">{selectedPin.dateTime}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#f0e8e0]">
                  <button
                    onClick={() => {
                      onSelectProperty(selectedPin.address);
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
                        onOpenValuation(selectedPin.address);
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

          {/* Top-Left: Map / Satellite Control Toggle (Matches screenshot) */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-40 flex flex-col gap-1.5">
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

            {/* Terrain Checkbox Option (under Map button as seen in Google Maps UI) */}
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

          {/* Top-Right: Fullscreen Expand Button (Matches screenshot) */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-40">
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
          <div className="absolute bottom-6 right-4 z-40 flex flex-col gap-2 items-center">
            {/* Pegman Street View Button */}
            <button
              onClick={() => {
                if (pins.length > 0) {
                  onSelectProperty(pins[0].address);
                  onClose();
                }
              }}
              className="w-8 h-8 rounded-lg bg-white shadow-md border border-stone-200 flex items-center justify-center text-amber-600 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Drag Pegman to view 360° Street View"
            >
              <Navigation className="w-4 h-4 text-amber-600" />
            </button>

            {/* Zoom In / Zoom Out vertical stack */}
            <div className="flex flex-col bg-white rounded-lg shadow-md border border-stone-200 overflow-hidden">
              <button
                onClick={() => handleZoom(1)}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-50 border-b border-stone-200 transition-colors cursor-pointer"
                title="Zoom in"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(-1)}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                title="Zoom out"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom-Left: Google Attribution Logo */}
          <div className="absolute bottom-2 left-3 z-40 pointer-events-none select-none flex items-center gap-1">
            <span className="text-sm font-bold tracking-tight text-stone-600 font-sans">
              Google
            </span>
          </div>

          {/* Bottom-Right: Map Data & Legal Footer */}
          <div className="absolute bottom-1.5 right-14 z-40 pointer-events-none select-none text-[10px] text-stone-600 bg-white/80 px-2 py-0.5 rounded shadow-2xs hidden sm:block">
            <span>Map data ©2026 • Terms • Report a map error</span>
          </div>
        </div>
      </div>
    </div>
  );
}
