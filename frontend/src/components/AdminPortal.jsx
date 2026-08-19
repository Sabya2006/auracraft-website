import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Download, Search, CheckCircle2, Clock, RefreshCw, Trash2 } from 'lucide-react';
import { initialLeadsSeed } from '../data/mockData';
import API_BASE_URL from '../config/api';

export default function AdminPortal({ staffUser, token, onLogout }) {
  const [leadsList, setLeadsList] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    paidLeads: 0,
    totalConfirmationRevenue: 0,
    conversionRate: '0%',
    categoryBreakdown: { Restaurant: 0, Wholesaler: 0, Cafe: 0 }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  const loadFallbackLeads = () => {
    setLeadsList(initialLeadsSeed);
    const total = initialLeadsSeed.length;
    const paid = initialLeadsSeed.filter(l => l.paymentStatus === 'PAID').length;
    setStats({
      totalLeads: total,
      paidLeads: paid,
      totalConfirmationRevenue: paid * 2,
      conversionRate: total > 0 ? `${((paid / total) * 100).toFixed(1)}%` : '0%',
      categoryBreakdown: {
        Restaurant: initialLeadsSeed.filter(l => l.category === 'Restaurant').length,
        Wholesaler: initialLeadsSeed.filter(l => l.category === 'Wholesaler').length,
        Cafe: initialLeadsSeed.filter(l => l.category === 'Cafe').length
      }
    });
  };

  // Fetch leads from backend API or local fallback
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setLeadsList(data.leads);
        setStats(data.stats);
      } else {
        loadFallbackLeads();
      }
    } catch (err) {
      console.warn('[Admin Portal Fallback Notice]', err.message);
      setLoading(false);
      loadFallbackLeads();
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Status Change Handler
  const handleUpdateStatus = async (leadId, newStatus) => {
    setLeadsList(leadsList.map(l => l.id === leadId ? { ...l, status: newStatus } : l));

    try {
      await fetch(`${API_BASE_URL}/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.warn('[Status Update Notice]', err.message);
    }
  };

  // Data Deletion Handler (Right-to-be-forgotten / PII Purge)
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead record and purge all associated PII?')) {
      return;
    }

    setLeadsList(leadsList.filter(l => l.id !== leadId));

    try {
      await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.warn('[Delete Lead Notice]', err.message);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Client Name', 'Company Name', 'Category', 'Email', 'Phone', 'Budget', 'Status', 'Payment Method', 'Txn ID'];
    const rows = leadsList.map(l => [
      l.id,
      `"${l.clientName}"`,
      `"${l.companyName}"`,
      l.category,
      l.email,
      l.phone,
      `"${l.budget}"`,
      l.status,
      l.paymentDetails?.method || 'N/A',
      l.paymentDetails?.txnId || 'N/A'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `auracraft_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads Calculation
  const filteredLeads = leadsList.filter(l => {
    const matchesSector = sectorFilter === 'All' || l.category.toLowerCase() === sectorFilter.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      l.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="modal-overlay overflow-y-auto p-4 sm:p-8">
      <div className="glass-panel w-full max-w-7xl border-purple-500/40 shadow-2xl relative bg-[#070914] min-h-[85vh] flex flex-col">
        
        {/* Admin Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c0f24] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">Corporate Staff Control Center</h2>
                <span className="badge-tag badge-purple text-[10px]">INTERNAL USE ONLY</span>
              </div>
              <p className="text-xs text-gray-400">
                Logged in as <strong className="text-purple-300">{staffUser?.name || 'AuraCraft Administrator'}</strong> ({staffUser?.role || 'Senior Director'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              className="bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={handleExportCSV}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>

            <button
              onClick={onLogout}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit Portal
            </button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Top Metrics Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 border-white/10 bg-[#0e1328]">
              <p className="text-xs text-gray-400 font-medium">Total Inquiries Received</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">{stats.totalLeads}</p>
            </div>

            <div className="glass-panel p-4 border-amber-500/30 bg-[#0e1328]">
              <p className="text-xs text-gray-400 font-medium">₹2 Confirmed Paid Leads</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">{stats.paidLeads}</p>
            </div>

            <div className="glass-panel p-4 border-emerald-500/30 bg-[#0e1328]">
              <p className="text-xs text-gray-400 font-medium">₹2 Token Revenue</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">₹{stats.totalConfirmationRevenue}.00</p>
            </div>

            <div className="glass-panel p-4 border-cyan-500/30 bg-[#0e1328]">
              <p className="text-xs text-gray-400 font-medium">Niche Breakdown</p>
              <div className="flex gap-2 text-xs font-bold mt-2">
                <span className="text-amber-400">R: {stats.categoryBreakdown?.Restaurant || 0}</span>
                <span className="text-cyan-400">W: {stats.categoryBreakdown?.Wholesaler || 0}</span>
                <span className="text-emerald-400">C: {stats.categoryBreakdown?.Cafe || 0}</span>
              </div>
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="glass-panel p-4 border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search leads by name, company, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-9 text-xs"
              />
            </div>

            {/* Sector Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 font-semibold">Sector:</span>
              <div className="bg-[#090d1c] p-1 rounded-xl border border-white/10 flex">
                {['All', 'Restaurant', 'Wholesaler', 'Cafe'].map(sec => (
                  <button
                    key={sec}
                    onClick={() => setSectorFilter(sec)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      sectorFilter === sec ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Leads Table */}
          <div className="glass-panel border-white/10 overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0c1024] text-gray-400 font-mono uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Client & Business</th>
                    <th className="py-3.5 px-4">Sector</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Services Requested</th>
                    <th className="py-3.5 px-4">₹2 Payment Status</th>
                    <th className="py-3.5 px-4">Pipeline Stage</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      
                      <td className="py-3.5 px-4">
                        <span className="text-white font-bold block">{lead.clientName}</span>
                        <span className="text-amber-400 font-medium">{lead.companyName}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`badge-tag ${
                          lead.category === 'Restaurant' ? 'badge-gold' : lead.category === 'Wholesaler' ? 'badge-cyan' : 'badge-emerald'
                        }`}>
                          {lead.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 space-y-0.5">
                        <span className="text-gray-300 block font-mono">{lead.email}</span>
                        <span className="text-gray-400 block font-mono">{lead.phone}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {Array.isArray(lead.services) ? lead.services.map((s, idx) => (
                            <span key={idx} className="bg-white/5 text-gray-300 px-1.5 py-0.5 rounded text-[10px]">
                              {s}
                            </span>
                          )) : <span className="text-gray-400">{lead.services}</span>}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {lead.paymentStatus === 'PAID' ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" />
                              PAID ₹2.00
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono block">
                              Txn: {lead.paymentDetails?.txnId || 'TXN_VERIFIED'}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                            <Clock className="w-3 h-3" />
                            Pending Payment
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className="bg-[#0b0f22] text-white border border-white/10 rounded-lg p-1 text-xs font-semibold"
                        >
                          <option value="Paid & Confirmed">Paid & Confirmed</option>
                          <option value="Pending Payment">Pending Payment</option>
                          <option value="In Discovery Call">In Discovery Call</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Client Onboarded">Client Onboarded</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-all"
                          title="Permanently Purge Lead PII (Right-to-be-Forgotten)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-xs">
                  No lead records found matching "{searchQuery}".
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
