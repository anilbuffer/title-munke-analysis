'use client';

import React from 'react';
import Image from 'next/image';
import {
  LayoutGrid,
  UserSearch,
  Search,
  History,
  UserRound,
  Logs,
  Settings,
  ArrowLeft,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  activeNavItem?: string;
  onSelectNav?: (item: string) => void;
}

export function Sidebar({
  isMobileOpen,
  onCloseMobile,
  activeNavItem = 'Settings',
  onSelectNav,
}: SidebarProps) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, enabled: false },
    { name: 'Request', icon: UserSearch, enabled: false },
    { name: 'Advanced Search', icon: Search, enabled: false },
    { name: 'Search History', icon: History, enabled: true },
    { name: 'Agents', icon: UserRound, enabled: false },
    { name: 'Audit Logs', icon: Logs, enabled: false },
    { name: 'Settings', icon: Settings, enabled: false },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 lg:w-72 bg-[#f5f0ec] p-5 flex flex-col justify-between border-r lg:border border-[#eadfd4] lg:rounded-3xl lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] transition-transform duration-300 shadow-xs overflow-y-auto custom-scrollbar ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand Logo & Navigation */}
        <div className="flex flex-col">
          {/* Mobile close button */}
          <div className="flex justify-end lg:hidden mb-2">
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200/60 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Brand Logo */}
          <div className="flex flex-col items-center justify-center pt-2 pb-7">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <Image
                src="/title-munke-logo.png"
                alt="TITLE MUNKE Logo"
                width={112}
                height={112}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNavItem === item.name;
              const isEnabled = item.enabled;

              return (
                <button
                  key={item.name}
                  disabled={!isEnabled}
                  onClick={() => {
                    if (isEnabled) {
                      onSelectNav && onSelectNav(item.name);
                      if (onCloseMobile) onCloseMobile();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-medium transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#550000] text-white shadow-sm shadow-[#550000]/25'
                      : isEnabled
                      ? 'text-[#3d2014] hover:text-[#23120b] hover:bg-[#ebdfd3] cursor-pointer'
                      : 'text-stone-400/60 bg-transparent cursor-not-allowed opacity-40 select-none'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        isActive
                          ? 'text-white'
                          : isEnabled
                          ? 'text-[#3d2014]'
                          : 'text-stone-400/60'
                      }`}
                      strokeWidth={1.8}
                    />
                    <span className="font-sans font-medium tracking-wide">
                      {item.name}
                    </span>
                  </div>

                  {!isEnabled && (
                    <span className="text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-stone-200/70 text-stone-500">
                      Disabled
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Logout Button Pill */}
        <div className="pt-4 mt-6">
          <button
            onClick={() => alert('Signing out of TITLE MUNKE...')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-medium border border-[#eadfd4] shadow-2xs hover:bg-stone-50 hover:shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-stone-600" />
              <span>Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </aside>
    </>
  );
}
