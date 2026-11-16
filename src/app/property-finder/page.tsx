'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AIOpportunityView } from '@/components/ai-opportunity/AIOpportunityView';
import { useRouter } from 'next/navigation';

export default function PropertyFinderPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();

  const handleNavSelect = (item: string) => {
    if (item === 'Search History') {
      router.push('/search-history');
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#291e1a] flex p-0 lg:p-4 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        activeNavItem="AI Opportunity"
        onSelectNav={handleNavSelect}
      />

      {/* Main Workspace */}
      <div className="flex-1 lg:pl-[304px] flex flex-col min-w-0 px-4 sm:px-6 py-4 lg:py-0">
        {/* Top Header Card */}
        <div className="mb-5">
          <Header
            activeNav="AI Opportunity"
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 pb-8">
          <AIOpportunityView onBack={() => router.push('/search-history')} />
        </main>
      </div>
    </div>
  );
}
