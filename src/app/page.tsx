'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { GovernanceTabs, SettingsSubTab } from '@/components/ai-settings/GovernanceTabs';
import { ModelConfigurationCard } from '@/components/ai-settings/ModelConfigurationCard';
import { SystemPromptsCard } from '@/components/ai-settings/SystemPromptsCard';
import { ContextHistorySettingsCard } from '@/components/ai-settings/ContextHistorySettingsCard';
import { TokenUsageOverviewCard } from '@/components/ai-settings/TokenUsageOverviewCard';
import { SystemArchitectureDiagram } from '@/components/ai-settings/SystemArchitectureDiagram';
import { AboutModelSwitchingCard } from '@/components/ai-settings/AboutModelSwitchingCard';
import { DetailedUsageCard } from '@/components/ai-settings/DetailedUsageCard';
import { DetailedUsageModal } from '@/components/ai-settings/DetailedUsageModal';
import { TestConnectionModal } from '@/components/ai-settings/TestConnectionModal';
import { AddTokensModal } from '@/components/ai-settings/AddTokensModal';
import { ToastContainer } from '@/components/ai-settings/Toast';
import { SearchHistoryView } from '@/components/search-history/SearchHistoryView';
import { AIPropertyValuationView } from '@/components/valuation/AIPropertyValuationView';
import {
  User,
  CreditCard,
  Database,
  Search,
  Building,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  Bot,
  Settings,
  ArrowRight,
} from 'lucide-react';

export default function AISettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Search History');
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsSubTab>('governance');

  // Sample data for other views
  const recentSearches = [
    { bbl: '1-00124-0010', address: '45 Wall St, New York, NY', type: 'Deed & Mortgage', status: 'Clear', time: '12 mins ago' },
    { bbl: '3-02100-0045', address: '280 Cadman Plaza W, Brooklyn, NY', type: 'Title Chain Search', status: 'Pending Review', time: '45 mins ago' },
    { bbl: '4-01580-0022', address: '31-10 Thomson Ave, LIC, NY', type: 'Lien Examination', status: 'Clear', time: '2 hours ago' },
    { bbl: '1-00840-0015', address: '350 5th Ave, New York, NY', type: 'Full Abstract of Title', status: 'Completed', time: '5 hours ago' },
  ];

  const requests = [
    { id: 'REQ-2026-894', property: '120 Broadway, Manhattan', client: 'First American Title Co.', priority: 'Urgent', status: 'In Progress', date: 'Nov 16, 2026' },
    { id: 'REQ-2026-893', property: '150 5th Ave, Manhattan', client: 'Fidelity National Title', priority: 'Standard', status: 'Completed', date: 'Nov 15, 2026' },
    { id: 'REQ-2026-892', property: '75 Livingston St, Brooklyn', client: 'Stewart Title Guaranty', priority: 'High', status: 'Pending Review', date: 'Nov 15, 2026' },
    { id: 'REQ-2026-891', property: '89-01 Queens Blvd, Elmhurst', client: 'Old Republic National Title', priority: 'Standard', status: 'Completed', date: 'Nov 14, 2026' },
  ];

  const agentsList = [
    { name: 'ACRIS Deed Crawler', role: 'Real-time NYC Registry Ingestion', status: 'Operational', model: 'GPT-4o mini', speed: '99.9%', tasks: '1,420 runs' },
    { name: 'Lien & Encumbrance Auditor', role: 'Automated UCC & Mortgage Clearance', status: 'Operational', model: 'Claude 3.5 Sonnet', speed: '98.5%', tasks: '890 runs' },
    { name: 'Chain of Title Synthesizer', role: 'Historical Deed Linkage & Gap Analysis', status: 'Operational', model: 'GPT-4o', speed: '99.4%', tasks: '612 runs' },
    { name: 'Metes & Bounds Matcher', role: 'Survey & Legal Description Validation', status: 'Operational', model: 'Claude 3.5 Sonnet', speed: '97.8%', tasks: '430 runs' },
    { name: 'Transfer Tax & ACRIS Verifier', role: 'NYC RPTT & NYS TP-584 Reconciliation', status: 'Operational', model: 'GPT-4o mini', speed: '100%', tasks: '1,890 runs' },
    { name: 'Title Policy Risk Scorer', role: 'Final Underwriting & Exceptions Drafting', status: 'Operational', model: 'GPT-4o', speed: '99.1%', tasks: '340 runs' },
  ];

  const auditEvents = [
    { id: 'AUD-8821', time: '11:24:12', user: 'broker', action: 'Exported Pennsylvania Search History (14 records)', ip: '192.168.1.42', hash: '8f7c...3a19' },
    { id: 'AUD-8820', time: '11:15:02', user: 'Agent: ACRIS Crawler', action: 'Ingested 42 new ACRIS Deed filings (Manhattan Block 120-145)', ip: 'internal-cluster', hash: 'e2b1...91da' },
    { id: 'AUD-8819', time: '10:58:33', user: 'broker', action: 'Switched Primary Model to GPT-4o with Sonnet Fallback', ip: '192.168.1.42', hash: '41a0...bc6e' },
    { id: 'AUD-8818', time: '10:30:19', user: 'System Worker', action: 'Automated weekly token quota refreshed (+100,000)', ip: 'stripe-webhook', hash: 'c90d...e44f' },
    { id: 'AUD-8817', time: '09:45:00', user: 'Agent: Lien Auditor', action: 'Resolved Lis Pendens exception on BBL 1-00840-0015', ip: 'internal-cluster', hash: '09ea...1782' },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#291e1a] flex p-0 lg:p-4 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        activeNavItem="Search History"
        onSelectNav={(item) => {
          if (item === 'Search History') {
            setActiveNav('Search History');
          }
        }}
      />

      {/* Main Workspace (Offset for fixed lg sidebar w-72 (288px) + ml-4 (16px) = 304px) */}
      <div className="flex-1 lg:pl-[304px] flex flex-col min-w-0 px-4 sm:px-6 py-4 lg:py-0">

        {/* Top Header Card */}
        <div className="mb-5">
          <Header
            activeNav="Search History"
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </div>

        {/* Main Content Area: Exclusively Search History and its full interactive flow */}
        <main className="flex-1 pb-8">
          {/* Active Flow: Search History */}
          {activeNav === 'Search History' && (
            <SearchHistoryView />
          )}

          {/* Other pages are disabled and inaccessible */}
          {activeNav === 'Settings' && (
            <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs">
              {/* Sub-Tabs under Settings */}
              <div className="mb-6">
                <GovernanceTabs
                  activeTab={activeSettingsTab}
                  onTabChange={(tab) => setActiveSettingsTab(tab)}
                />
              </div>

              {/* Inner Cards Layout under Tabs */}
              {activeSettingsTab === 'governance' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
                  <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                    <ModelConfigurationCard />
                    <SystemPromptsCard />
                    <ContextHistorySettingsCard />
                    <TokenUsageOverviewCard />
                  </div>
                  <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                    <SystemArchitectureDiagram />
                    <AboutModelSwitchingCard />
                    <DetailedUsageCard />
                  </div>
                </div>
              )}

              {/* Profile Settings Tab */}
              {activeSettingsTab === 'profile' && (
                <div className="bg-white rounded-2xl border border-[#eadfd4] shadow-xs p-8 text-center max-w-xl mx-auto my-8 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#f8f3ed] flex items-center justify-center mx-auto mb-4 text-[#550000]">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans">
                    Profile Settings
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mb-6">
                    Manage broker account credentials, title agent licensing, and notification preferences.
                  </p>
                  <button
                    onClick={() => setActiveSettingsTab('governance')}
                    className="px-5 py-2.5 rounded-full bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] transition-colors cursor-pointer"
                  >
                    Return to AI Governance
                  </button>
                </div>
              )}

              {/* Upgrade Price Tab */}
              {activeSettingsTab === 'pricing' && (
                <div className="bg-white rounded-2xl border border-[#eadfd4] shadow-xs p-8 text-center max-w-xl mx-auto my-8 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#f8f3ed] flex items-center justify-center mx-auto mb-4 text-[#550000]">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans">
                    Upgrade Price & Subscription
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mb-6">
                    Manage broker enterprise seat allocations, monthly deed search quotas, and county recorder packages.
                  </p>
                  <button
                    onClick={() => setActiveSettingsTab('governance')}
                    className="px-5 py-2.5 rounded-full bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] transition-colors cursor-pointer"
                  >
                    Return to AI Governance
                  </button>
                </div>
              )}

              {/* NYC Data Updates Tab */}
              {activeSettingsTab === 'nyc_data' && (
                <div className="bg-white rounded-2xl border border-[#eadfd4] shadow-xs p-8 text-center max-w-xl mx-auto my-8 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#f8f3ed] flex items-center justify-center mx-auto mb-4 text-[#550000]">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans">
                    NYC Data & ACRIS Recordings
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mb-6">
                    Automated synchronization status for Automated City Register Information System (ACRIS) real property transfer tax rolls.
                  </p>
                  <button
                    onClick={() => setActiveSettingsTab('governance')}
                    className="px-5 py-2.5 rounded-full bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] transition-colors cursor-pointer"
                  >
                    Return to AI Governance
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. DASHBOARD VIEW */}
          {activeNav === 'Dashboard' && (
            <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3d2014]">Dashboard Overview</h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">Real-time title searches, ACRIS synchronization, and agent analytics</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('Advanced Search')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#550000] text-white text-xs sm:text-sm font-medium hover:bg-[#6b0000] shadow-xs cursor-pointer transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>New Title Search</span>
                  </button>
                </div>
              </div>

              {/* KPI Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase">Title Searches</span>
                    <Building className="w-4 h-4 text-[#550000]" />
                  </div>
                  <div className="text-2xl font-bold text-[#3d2014]">1,248</div>
                  <div className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% this month
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase">Pending Requests</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-[#3d2014]">14</div>
                  <div className="text-xs text-amber-700 mt-1 font-medium">3 requiring underwriter sign-off</div>
                </div>

                <div className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase">Active AI Agents</span>
                    <Bot className="w-4 h-4 text-[#550000]" />
                  </div>
                  <div className="text-2xl font-bold text-[#3d2014]">6</div>
                  <div className="text-xs text-stone-600 mt-1 font-medium">100% operational status</div>
                </div>

                <div className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase">ACRIS Sync</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-[#3d2014]">Live</div>
                  <div className="text-xs text-stone-600 mt-1 font-medium">Synced 3 mins ago</div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#3d2014]">Recent Title Inquiries</h3>
                  <button
                    onClick={() => setActiveNav('Search History')}
                    className="text-xs text-[#550000] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View All <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 text-stone-500 font-medium">
                        <th className="pb-3 pl-2">BBL</th>
                        <th className="pb-3">Property Address</th>
                        <th className="pb-3">Search Scope</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right pr-2">Recorded</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-[#3d2014]">
                      {recentSearches.map((item, idx) => (
                        <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3 pl-2 font-mono text-xs font-semibold text-stone-700">{item.bbl}</td>
                          <td className="py-3 font-medium">{item.address}</td>
                          <td className="py-3 text-stone-600">{item.type}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'Clear' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              item.status === 'Completed' ? 'bg-stone-100 text-stone-700 border border-stone-200' :
                                'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 text-right pr-2 text-stone-500 text-xs">{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. REQUEST VIEW */}
          {activeNav === 'Request' && (
            <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3d2014]">Title Search Requests</h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">Manage incoming title deed and ACRIS document examination requests</p>
                </div>
                <button
                  onClick={() => alert('New Title Search Request created.')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#550000] text-white text-xs sm:text-sm font-medium hover:bg-[#6b0000] shadow-xs cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Request</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 text-stone-500 font-medium">
                        <th className="pb-3 pl-2">Request ID</th>
                        <th className="pb-3">Subject Property</th>
                        <th className="pb-3">Client Agency</th>
                        <th className="pb-3">Priority</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right pr-2">Date Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-[#3d2014]">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3.5 pl-2 font-mono text-xs font-semibold text-[#550000]">{req.id}</td>
                          <td className="py-3.5 font-medium">{req.property}</td>
                          <td className="py-3.5 text-stone-600">{req.client}</td>
                          <td className="py-3.5">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${req.priority === 'Urgent' ? 'bg-red-50 text-red-700 border border-red-200' :
                              req.priority === 'High' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                'bg-stone-100 text-stone-700 border border-stone-200'
                              }`}>
                              {req.priority}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${req.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              req.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right pr-2 text-stone-500 text-xs">{req.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 5. ADVANCED SEARCH VIEW */}
          {activeNav === 'Advanced Search' && (
            <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3d2014]">Advanced Title & Deed Search</h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">Multi-borough ACRIS registry indexation, deed chains, mortgages, and encumbrances</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#eadfd4] p-6 shadow-2xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide">Borough</label>
                    <select className="w-full bg-[#f8f3ed] border border-[#eadfd4] rounded-xl px-3.5 py-2.5 text-sm text-[#3d2014] focus:outline-none focus:ring-1 focus:ring-[#550000]">
                      <option>Manhattan (Borough 1)</option>
                      <option>Bronx (Borough 2)</option>
                      <option>Brooklyn (Borough 3)</option>
                      <option>Queens (Borough 4)</option>
                      <option>Staten Island (Borough 5)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide">Block Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 00124"
                      className="w-full bg-[#f8f3ed] border border-[#eadfd4] rounded-xl px-3.5 py-2.5 text-sm text-[#3d2014] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#550000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide">Lot Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 0010"
                      className="w-full bg-[#f8f3ed] border border-[#eadfd4] rounded-xl px-3.5 py-2.5 text-sm text-[#3d2014] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#550000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide">Document Class / Type</label>
                    <select className="w-full bg-[#f8f3ed] border border-[#eadfd4] rounded-xl px-3.5 py-2.5 text-sm text-[#3d2014] focus:outline-none focus:ring-1 focus:ring-[#550000]">
                      <option>All Deeds & Conveyances (DEED)</option>
                      <option>Mortgages & UCC Filings (MTGE)</option>
                      <option>Satisfaction of Mortgage (SAT)</option>
                      <option>Lis Pendens & Tax Liens (LIEN)</option>
                      <option>Easements & Declarations (AGMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide">Grantor / Grantee Party Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Morgan Stanley or Smith, John"
                      className="w-full bg-[#f8f3ed] border border-[#eadfd4] rounded-xl px-3.5 py-2.5 text-sm text-[#3d2014] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#550000]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-500">AI Agents will extract OCR text and verify tax stamps automatically</span>
                  <button
                    onClick={() => alert('Executing ACRIS deed search query...')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#550000] text-white text-xs sm:text-sm font-semibold hover:bg-[#680000] transition-colors cursor-pointer shadow-xs"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search ACRIS Records</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. AGENTS VIEW */}
          {activeNav === 'Agents' && (
            <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3d2014]">Title Munke AI Agents</h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">Autonomous micro-agents executing specialized title research and document indexing</p>
                </div>
                <button
                  onClick={() => setActiveNav('Settings')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#550000] text-white text-xs sm:text-sm font-medium hover:bg-[#6b0000] shadow-xs cursor-pointer transition-all"
                >
                  <Settings className="w-4 h-4" />
                  <span>Configure Agent Models</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentsList.map((agent, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#f8f3ed] flex items-center justify-center text-[#550000]">
                        <Bot className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {agent.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#3d2014]">{agent.name}</h3>
                      <p className="text-xs text-stone-500 mt-0.5">{agent.role}</p>
                    </div>
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                      <span>Model: <strong className="text-stone-900">{agent.model}</strong></span>
                      <span>Success: <strong className="text-emerald-700">{agent.speed}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. AUDIT LOGS VIEW */}
          {activeNav === 'Audit Logs' && (
            <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3d2014]">System & Compliance Audit Logs</h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">Cryptographically hashed immutable audit trail for title searches and model modifications</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#eadfd4] text-xs font-semibold text-stone-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    SOC2 Compliant Ledger
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#eadfd4] p-5 shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 text-stone-500 font-medium">
                        <th className="pb-3 pl-2">Event ID</th>
                        <th className="pb-3">Timestamp</th>
                        <th className="pb-3">Initiator</th>
                        <th className="pb-3">Action Description</th>
                        <th className="pb-3 font-mono">Verification Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-[#3d2014]">
                      {auditEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3.5 pl-2 font-mono text-xs font-semibold text-stone-700">{evt.id}</td>
                          <td className="py-3.5 font-mono text-xs text-stone-500">{evt.time}</td>
                          <td className="py-3.5 font-medium">{evt.user}</td>
                          <td className="py-3.5 text-stone-700">{evt.action}</td>
                          <td className="py-3.5 font-mono text-xs text-stone-400">{evt.hash}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Global Modals & Notifications */}
      <DetailedUsageModal />
      <TestConnectionModal />
      <AddTokensModal />
      <ToastContainer />
    </div>
  );
}
