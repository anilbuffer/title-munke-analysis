'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SearchHistoryView } from '@/components/search-history/SearchHistoryView';
import { useRouter } from 'next/navigation';

export default function SearchHistoryPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();

  const handleNavSelect = (item: string) => {
    if (item === 'Search History') return;
    if (item === 'Settings') {
      router.push('/');
    } else {
      router.push(`/?tab=${encodeURIComponent(item)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#291e1a] flex p-0 lg:p-4 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        activeNavItem="Search History"
        onSelectNav={handleNavSelect}
      />

      {/* Main Workspace */}
      <div className="flex-1 lg:pl-[304px] flex flex-col min-w-0 px-4 sm:px-6 py-4 lg:py-0">
        {/* Top Header Card */}
        <div className="mb-5">
          <Header
            activeNav="Search History"
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 pb-8">
          <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs">
            <SearchHistoryView onBack={() => router.push('/')} />
          </div>
        </main>
      </div>
    </div>
  );
}
