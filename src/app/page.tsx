'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SearchHistoryView } from '@/components/search-history/SearchHistoryView';
import { AIOpportunityView } from '@/components/ai-opportunity/AIOpportunityView';

export default function AppHome() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'Search History' | 'AI Opportunity'>('Search History');

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#291e1a] flex p-0 lg:p-4 font-sans">
      {/* Sidebar Navigation: Only Search History and AI Opportunity are enabled */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        activeNavItem={activeNav}
        onSelectNav={(item) => {
          if (item === 'Search History' || item === 'AI Opportunity' || item === 'Property Finder') {
            setActiveNav(
              item === 'Property Finder'
                ? 'AI Opportunity'
                : (item as 'Search History' | 'AI Opportunity')
            );
          }
        }}
      />

      {/* Main Workspace (Offset for fixed lg sidebar w-72 (288px) + ml-4 (16px) = 304px) */}
      <div className="flex-1 lg:pl-[304px] flex flex-col min-w-0 px-4 sm:px-6 py-4 lg:py-0">
        {/* Top Header Card */}
        <div className="mb-5">
          <Header
            activeNav={activeNav}
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </div>

        {/* Main Content Area: Only Search History & AI Opportunity flows */}
        <main className="flex-1 pb-8">
          {/* 1. Search History Flow */}
          {activeNav === 'Search History' && (
            <SearchHistoryView
              onBack={() => {
                if (typeof window !== 'undefined' && window.history.length > 1) {
                  window.history.back();
                }
              }}
            />
          )}

          {/* 2. AI Opportunity Flow */}
          {activeNav === 'AI Opportunity' && (
            <AIOpportunityView
              onBack={() => setActiveNav('Search History')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
