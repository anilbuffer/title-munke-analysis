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
      {/* Left: Hamburger / Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          <AlignLeft className="w-5 h-5 text-stone-800" />
        </button>
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
        <div className="flex items-center gap-2 pl-2 cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-stone-900">
            broker
          </span>
        </div>
      </div>
    </header>
  );
}
