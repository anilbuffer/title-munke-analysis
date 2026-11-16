'use client';

import React from 'react';
import { AlignLeft, Save, RefreshCw, User } from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';

interface HeaderProps {
  onToggleSidebar?: () => void;
  activeNav?: string;
}

export function Header({ onToggleSidebar, activeNav = 'Settings' }: HeaderProps) {
  const { isDirty, isSaving, saveChanges } = useAISettings();
  const isSettings = activeNav === 'Settings';

  return (
    <header className="w-full bg-white rounded-2xl border border-[#eadfd4] shadow-xs px-5 sm:px-6 py-3 flex items-center justify-between transition-colors">
      {/* Left: Hamburger + Broker Portal Title Pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          <AlignLeft className="w-5 h-5 text-stone-800" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#550000] uppercase tracking-wider bg-[#550000]/10 px-2.5 py-1 rounded-full border border-[#550000]/20">
            Broker Portal
          </span>
          <span className="hidden sm:inline-block text-xs text-stone-500 font-medium">
            Title Abstract & Valuation Desk
          </span>
        </div>
      </div>

      {/* Right: Quick Actions & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Unsaved Changes Indicator (Only on Settings) */}
        {isSettings && isDirty && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Unsaved Changes
          </span>
        )}

        {/* Save Changes Button (Only on Settings) */}
        {isSettings && (
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#550000] text-white hover:bg-[#680000] active:scale-95 transition-all shadow-xs disabled:opacity-70 cursor-pointer"
            title="Save changes (⌘S)"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </button>
        )}

        {/* User Profile Pill matching screenshot ('broker' avatar) */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-2xs">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-semibold text-stone-900 leading-tight">
              broker
            </span>
            <span className="hidden sm:inline-block text-[10px] text-stone-500 leading-tight">
              Licensed Broker Desk
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
