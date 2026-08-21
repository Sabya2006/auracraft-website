import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Download, Search, CheckCircle2, Clock, RefreshCw, Trash2, UserPlus, Users, Bell, Briefcase, UserMinus, Calendar, PlusCircle, UserCheck, Activity, Award, CheckSquare, Eye, Lock, ArrowRight } from 'lucide-react';
import { initialLeadsSeed } from '../data/mockData';
import API_BASE_URL from '../config/api';

export default function AdminPortal({ staffUser, token, onLogout }) {
  // Role Detection: Check if logged in as Director or standard Staff
  const userRole = staffUser?.role || 'Senior Director';
  const isDirectorRole = userRole === 'Senior Director' || userRole === 'Admin';

  // Toggle Mode for previewing both Admin and Staff Dashboards
  const [dashboardMode, setDashboardMode] = useState(isDirectorRole ? 'admin' : 'staff'); // 'admin' or 'staff'

  // Data States
  const [leadsList, setLeadsList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [noticesList, setNoticesList] = useState([]);
  const [leavesList, setLeavesList] = useState([]);
  const [hiringList, setHiringList] = useState([]);
  const [slotsList, setSlotsList] = useState([]);

  // Active Tab
  const [activeTab, setActiveTab] = useState(isDirectorRole ? 'performance' : 'meetings'); // 'performance', 'leads', 'slots', 'staff', 'attendance', 'notices', 'leaves', 'hiring', 'verify-payment'

  // Modals
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);

  // Forms
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Lead Web Engineer');
  const [customOraCraftId, setCustomOraCraftId] = useState('OC-ENG-102');
  const [newStaffPassword, setNewStaffPassword] = useState('OraCraft#2026!');
  const [staffMsg, setStaffMsg] = useState('');

  // Slot Form
  const [slotDate, setSlotDate] = useState('2026-08-24');
  const [slotTime, setSlotTime] = useState('11:00 AM - 11:30 AM IST');
  const [slotAssignedStaff, setSlotAssignedStaff] = useState('Vikram Mehta');
  const [slotMsg, setSlotMsg] = useState('');

  // Payment Verification Tool
  const [verifyTxnQuery, setVerifyTxnQuery] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  // Check-In State
  const [checkedInTime, setCheckedInTime] = useState(null);
  const [checkInMsg, setCheckInMsg] = useState('');

  // Notice Form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Announcement');
  const [noticeContent, setNoticeContent] = useState('');

  // Job Form
  const [jobTitle, setJobTitle] = useState('');
  const [jobDept, setJobDept] = useState('Engineering');
  const [jobSalary, setJobSalary] = useState('₹12,00,000 - ₹18,00,000 / yr');

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
      console.warn('[Admin Portal Fallback]', err.message);
      setLoading(false);
      loadFallbackLeads();
    }
  };

  const fetchCorporateData = async () => {
    try {
      const [resStaff, resNotices, resLeaves, resHiring, resSlots, resAtt] = await Promise.all([
        fetch(`${API_BASE_URL}/api/auth/staff`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/api/auth/notices`),
        fetch(`${API_BASE_URL}/api/auth/leaves`),
        fetch(`${API_BASE_URL}/api/auth/hiring`),
        fetch(`${API_BASE_URL}/api/leads/available-slots`),
        fetch(`${API_BASE_URL}/api/auth/attendance`)
      ]);

      const dataStaff = await resStaff.json();
      const dataNotices = await resNotices.json();
      const dataLeaves = await resLeaves.json();
      const dataHiring = await resHiring.json();
      const dataSlots = await resSlots.json();
      const dataAtt = await resAtt.json();

      if (dataStaff.success) setStaffList(dataStaff.staff);
      if (dataNotices.success) setNoticesList(dataNotices.notices);
      if (dataLeaves.success) setLeavesList(dataLeaves.leaves);
      if (dataHiring.success) setHiringList(dataHiring.jobs);
      if (dataSlots.success) setSlotsList(dataSlots.slots);
      if (dataAtt.success) setAttendanceList(dataAtt.logs);
    } catch (err) {
      console.warn('[Corporate Fetch Notice]', err.message);
      setStaffList([
        { id: 'staff-1', oraCraftId: 'OC-DIR-9001', name: 'Sabyasachi Admin', role: 'Senior Director', rating: '5.0 / 5.0', completedProjects: 85, clientSatisfaction: '99.4%', revenueGenerated: '₹34,50,000', meetingConversion: '92%', workingHours: '9:00 AM - 6:00 PM IST', status: 'ACTIVE - CHECKED IN' },
        { id: 'staff-2', oraCraftId: 'OC-ENG-101', name: 'Vikram Mehta', role: 'Lead Web Engineer', rating: '4.95 / 5.0', completedProjects: 42, clientSatisfaction: '98.2%', revenueGenerated: '₹18,20,000', meetingConversion: '88%', workingHours: '9:00 AM - 6:00 PM IST', status: 'ACTIVE - CHECKED IN' },
        { id: 'staff-3', oraCraftId: 'OC-CSM-202', name: 'Priya Sundaram', role: 'Client Success Manager', rating: '4.98 / 5.0', completedProjects: 58, clientSatisfaction: '99.1%', revenueGenerated: '₹22,40,000', meetingConversion: '94%', workingHours: '9:30 AM - 6:30 PM IST', status: 'ACTIVE - CHECKED IN' }
      ]);
      setAttendanceList([
        { id: 'att-1', oraCraftId: 'OC-DIR-9001', staffName: 'Sabyasachi Admin', date: '2026-08-21', checkIn: '08:55 AM IST', checkOut: 'Active Shift', hoursLogged: '7.5 hrs', status: 'PRESENT ON TIME' },
        { id: 'att-2', oraCraftId: 'OC-ENG-101', staffName: 'Vikram Mehta', date: '2026-08-21', checkIn: '08:58 AM IST', checkOut: 'Active Shift', hoursLogged: '7.4 hrs', status: 'PRESENT ON TIME' },
        { id: 'att-3', oraCraftId: 'OC-CSM-202', staffName: 'Priya Sundaram', date: '2026-08-21', checkIn: '09:12 AM IST', checkOut: 'Active Shift', hoursLogged: '7.2 hrs', status: 'PRESENT ON TIME' }
      ]);
      setSlotsList([
        { id: 's-1', date: '2026-08-22', time: '10:00 AM - 10:30 AM IST', staffName: 'Vikram Mehta', status: 'AVAILABLE', approvedBy: 'Admin' },
        { id: 's-2', date: '2026-08-22', time: '02:00 PM - 02:30 PM IST', staffName: 'Priya Sundaram', status: 'AVAILABLE', approvedBy: 'Admin' }
      ]);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchCorporateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Shift Check-In
  const handleShiftCheckIn = async () => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
    setCheckedInTime(timeNow);
    setCheckInMsg(`Shift Check-In verified at ${timeNow}`);

    try {
      await fetch(`${API_BASE_URL}/api/auth/attendance/check-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oraCraftId: staffUser?.oraCraftId || 'OC-STF',
          staffName: staffUser?.name || 'Staff Specialist'
        })
      });
      fetchCorporateData();
    } catch (_e) {
      // local
    }
  };

  // Payment Verification Search
  const handleVerifyTxn = (e) => {
    e.preventDefault();
    if (!verifyTxnQuery.trim()) return;

    const foundLead = leadsList.find(l => 
      l.paymentDetails?.txnId?.toLowerCase().includes(verifyTxnQuery.toLowerCase().trim()) ||
      l.paymentDetails?.bookingCode?.toLowerCase().includes(verifyTxnQuery.toLowerCase().trim())
    );

    if (foundLead) {
      setVerifyResult({
        found: true,
        clientName: foundLead.clientName,
        companyName: foundLead.companyName,
        txnId: foundLead.paymentDetails?.txnId || 'TXN_VERIFIED',
        amount: foundLead.paymentDetails?.amount || 2.00,
        bookingCode: foundLead.paymentDetails?.bookingCode || 'AURAX-CONFIRMED',
        paymentDate: foundLead.paymentDetails?.paymentDate || new Date().toISOString(),
        scheduledSlot: foundLead.scheduledSlot
      });
    } else {
      setVerifyResult({
        found: false,
        message: `No payment record found for transaction/code '${verifyTxnQuery}'.`
      });
    }
  };

  // Slot Addition
  const handleAddSlotSubmit = async (e) => {
    e.preventDefault();
    if (!slotDate || !slotTime) return;

    setSlotMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/staff-slots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date: slotDate,
          time: slotTime,
          staffName: slotAssignedStaff
        })
      });

      const data = await res.json();
      if (data.success) {
        setSlotsList([...slotsList, data.slot]);
        setSlotMsg(`Approved & Published: ${data.slot.date} @ ${data.slot.time}`);
        setTimeout(() => {
          setShowAddSlotModal(false);
          setSlotMsg('');
        }, 1500);
      }
    } catch (err) {
      console.warn('[Slot Add Notice]', err.message);
      const fallbackSlot = { id: 'slot-' + Date.now(), date: slotDate, time: slotTime, staffName: slotAssignedStaff, status: 'AVAILABLE', approvedBy: 'Staff' };
      setSlotsList([...slotsList, fallbackSlot]);
      setShowAddSlotModal(false);
    }
  };

  // Staff Account Creation (Admin Only)
  const handleAddStaffSubmit = async (e) => {
    e.preventDefault();
    if (!newStaffName) return;

    setStaffMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newStaffName,
          role: newStaffRole,
          customOraCraftId,
          password: newStaffPassword
        })
      });

      const data = await res.json();
      if (data.success) {
        setStaffList([...staffList, data.staff]);
        setStaffMsg(`Generated OraCraft ID: ${data.staff.oraCraftId} | Password: ${data.tempPassword || newStaffPassword}`);
        setNewStaffName('');
        setTimeout(() => {
          setShowAddStaffModal(false);
          setStaffMsg('');
        }, 2500);
      }
    } catch (err) {
      console.warn('[Staff Add Notice]', err.message);
      const fallback = { id: 'staff-' + (staffList.length + 1), oraCraftId: customOraCraftId, name: newStaffName, role: newStaffRole, rating: '5.0 / 5.0', completedProjects: 0, workingHours: '9:00 AM - 6:00 PM IST' };
      setStaffList([...staffList, fallback]);
      setShowAddStaffModal(false);
    }
  };

  const handleTerminateStaff = async (staffId) => {
    if (!window.confirm('Are you sure you want to terminate and revoke this OraCraft ID?')) return;
    setStaffList(staffList.filter(s => s.id !== staffId));
    try {
      await fetch(`${API_BASE_URL}/api/auth/staff/${staffId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.warn('[Terminate Notice]', err.message);
    }
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/notices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: noticeTitle, category: noticeCategory, content: noticeContent })
      });
      const data = await res.json();
      if (data.success) {
        setNoticesList([data.notice, ...noticesList]);
        setNoticeTitle('');
        setNoticeContent('');
        setShowAddNoticeModal(false);
      }
    } catch (err) {
      console.warn('[Notice Error]', err.message);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!jobTitle) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/hiring`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: jobTitle, department: jobDept, salaryRange: jobSalary })
      });
      const data = await res.json();
      if (data.success) {
        setHiringList([...hiringList, data.job]);
        setJobTitle('');
        setShowAddJobModal(false);
      }
    } catch (err) {
      console.warn('[Job Error]', err.message);
    }
  };

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

  const handleReassignStaffHost = (leadId, newStaffName) => {
    setLeadsList(leadsList.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          scheduledSlot: l.scheduledSlot ? { ...l.scheduledSlot, staffName: newStaffName } : { date: '2026-08-23', time: '11:00 AM IST', staffName: newStaffName }
        };
      }
      return l;
    }));
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead record?')) return;
    setLeadsList(leadsList.filter(l => l.id !== leadId));
    try {
      await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.warn('[Delete Notice]', err.message);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Client Name', 'Company Name', 'Category', 'Email', 'Phone', 'Budget', 'Status', 'Scheduled Date', 'Scheduled Time', 'Assigned Staff', 'Txn ID'];
    const rows = leadsList.map(l => [
      l.id,
      `"${l.clientName}"`,
      `"${l.companyName}"`,
      l.category,
      l.email,
      l.phone,
      `"${l.budget}"`,
      l.status,
      l.scheduledSlot?.date || 'Pending',
      l.scheduledSlot?.time || 'Pending',
      l.scheduledSlot?.staffName || 'Unassigned',
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
      <div className="glass-panel w-full max-w-7xl border-purple-500/40 shadow-2xl relative bg-[#070914] min-h-[88vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c0f24] gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              dashboardMode === 'admin' ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}>
              {dashboardMode === 'admin' ? <ShieldCheck className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">
                  {dashboardMode === 'admin' ? 'OraCraft Director Control Center' : 'OraCraft Staff Operations Workspace'}
                </h2>
                <span className={`badge-tag ${dashboardMode === 'admin' ? 'badge-gold' : 'badge-emerald'} text-[10px]`}>
                  {dashboardMode === 'admin' ? 'DIRECTOR OVERVIEW' : 'STAFF WORKSPACE'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Staff ID: <strong className="text-amber-400 font-mono">{staffUser?.oraCraftId || 'OC-DIR-9001'}</strong> • Role: <strong className="text-purple-300">{staffUser?.role || 'Senior Director'}</strong>
              </p>
            </div>
          </div>

          {/* Controls & Mode Switcher */}
          <div className="flex items-center gap-2.5">
            
            {/* Admin vs Staff View Switcher */}
            <div className="bg-[#070917] p-1 rounded-xl border border-white/10 flex items-center gap-1 text-xs">
              <button
                onClick={() => { setDashboardMode('admin'); setActiveTab('performance'); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  dashboardMode === 'admin' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin View</span>
              </button>
              <button
                onClick={() => { setDashboardMode('staff'); setActiveTab('meetings'); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  dashboardMode === 'staff' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Staff View</span>
              </button>
            </div>

            {/* Quick Action Buttons */}
            {dashboardMode === 'admin' && (
              <>
                <button
                  onClick={() => setShowAddStaffModal(true)}
                  className="bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Add Staff</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg shadow-purple-600/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </>
            )}

            <button
              onClick={onLogout}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>

          </div>
        </div>

        {/* Corporate Operations Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-white/10 bg-[#090d20] flex items-center gap-6 text-xs font-bold overflow-x-auto">
          
          {/* ADMIN ONLY TABS */}
          {dashboardMode === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('performance')}
                className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'performance' ? 'text-amber-400 border-amber-400' : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Executive Performance Metrics (Admin Only)</span>
              </button>

              <button
                onClick={() => setActiveTab('staff')}
                className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'staff' ? 'text-emerald-400 border-emerald-400' : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Staff Account Roster ({staffList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'attendance' ? 'text-cyan-400 border-cyan-400' : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Work Hours & Attendance ({attendanceList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'leads' ? 'text-purple-400 border-purple-400' : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Client Interactions & Pipeline ({leadsList.length})</span>
              </button>
            </>
          )}

          {/* STAFF & SHARED TABS */}
          {dashboardMode === 'staff' && (
            <>
              <button
                onClick={() => setActiveTab('meetings')}
                className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'meetings' ? 'text-amber-400 border-amber-400' : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>My Assigned Meetings & Calls ({leadsList.filter(l => l.scheduledSlot).length})</span>
              </button>

              <button
                onClick={() => setActiveTab('verify-payment')}
                className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'verify-payment' ? 'text-emerald-400 border-emerald-400' : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Verify Payment Confirmations</span>
              </button>

              <button
                onClick={() => setActiveTab('slots')}
                className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'slots' ? 'text-cyan-400 border-cyan-400' : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Submit Available Time Slots ({slotsList.length})</span>
              </button>
            </>
          )}

          {/* SHARED NOTICES & LEAVES */}
          <button
            onClick={() => setActiveTab('notices')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'notices' ? 'text-cyan-400 border-cyan-400' : 'text-gray-400 hover:text-white border-transparent'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Notice Board ({noticesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leaves')}
            className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'leaves' ? 'text-purple-400 border-purple-400' : 'text-gray-400 hover:text-white border-transparent'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Leave Applications ({leavesList.length})</span>
          </button>

          {dashboardMode === 'admin' && (
            <button
              onClick={() => setActiveTab('hiring')}
              className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'hiring' ? 'text-rose-400 border-rose-400' : 'text-gray-400 hover:text-white border-transparent'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Hiring ({hiringList.length})</span>
            </button>
          )}

        </div>

        {/* Dashboard Main Content Body */}
        <div className="p-6 space-y-6 flex-1 text-left">

          {/* ------------------------------------------------------------- */}
          {/* ADMIN TAB 1: EXECUTIVE PERFORMANCE METRICS (ADMIN ONLY) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'performance' && dashboardMode === 'admin' && (
            <div className="space-y-6">
              
              {/* Security Banner */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-amber-300">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span><strong>RESTRICTED TO DIRECTOR ROLE:</strong> Executive team revenue performance metrics are visible strictly to Senior Management.</span>
                </div>
                <span className="badge-tag badge-gold text-[10px]">OC-DIR-9001 ONLY</span>
              </div>

              {/* Team Overall KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 border-amber-500/30 bg-[#0e1328] rounded-2xl">
                  <p className="text-xs text-gray-400 font-medium">Total Agency Revenue Generated</p>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">₹75,10,000</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-1">+28.4% vs last quarter</p>
                </div>

                <div className="glass-panel p-4 border-emerald-500/30 bg-[#0e1328] rounded-2xl">
                  <p className="text-xs text-gray-400 font-medium">Average Team Rating</p>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">4.97 / 5.0</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">Based on 185 client reviews</p>
                </div>

                <div className="glass-panel p-4 border-cyan-500/30 bg-[#0e1328] rounded-2xl">
                  <p className="text-xs text-gray-400 font-medium">Completed Custom Workspaces</p>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1">185 Sites</p>
                  <p className="text-[10px] text-cyan-300 font-mono mt-1">100% On-Time Delivery</p>
                </div>

                <div className="glass-panel p-4 border-purple-500/30 bg-[#0e1328] rounded-2xl">
                  <p className="text-xs text-gray-400 font-medium">Strategy Call Conversion</p>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-purple-400 mt-1">91.3%</p>
                  <p className="text-[10px] text-purple-300 font-mono mt-1">₹2 Token Pre-Qualified</p>
                </div>
              </div>

              {/* Staff Member Detailed Performance Breakdown Table */}
              <div className="glass-panel border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-[#0c1024] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Individual Staff Performance & Revenue Logs
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">Live Staff Count: {staffList.length}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#090d1f] text-gray-400 font-mono uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Staff Member & ID</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Performance Rating</th>
                        <th className="py-3.5 px-4">Completed Sites</th>
                        <th className="py-3.5 px-4">Client Satisfaction</th>
                        <th className="py-3.5 px-4">Revenue Generated</th>
                        <th className="py-3.5 px-4">Conversion Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {staffList.map((member) => (
                        <tr key={member.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <img src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-purple-500/40" />
                              <div>
                                <span className="text-white font-bold block">{member.name}</span>
                                <span className="text-amber-400 font-mono text-[10px] font-bold">{member.oraCraftId || 'OC-STF'}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-purple-300 font-semibold">{member.role}</td>

                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                            {member.rating || '4.95 / 5.0'}
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                            {member.completedProjects || 15} Workspaces
                          </td>

                          <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">
                            {member.clientSatisfaction || '98.5%'}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-emerald-300 font-extrabold">
                            {member.revenueGenerated || '₹15,00,000'}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-purple-300 font-bold">
                            {member.meetingConversion || '90%'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* ADMIN TAB 2: STAFF ACCOUNTS ROSTER (ADMIN ONLY) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'staff' && dashboardMode === 'admin' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Closed Admin-Controlled OraCraft ID Accounts</h3>
                  <p className="text-xs text-gray-400">Manage staff accounts, assign working hours, and issue temporary passwords.</p>
                </div>
                <button
                  onClick={() => setShowAddStaffModal(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Generate New OraCraft ID</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {staffList.map((member) => (
                  <div key={member.id} className="glass-panel p-5 border-amber-500/30 bg-[#0e1328] rounded-2xl space-y-3 relative group">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-purple-500/40" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white">{member.name}</h4>
                          <span className="badge-tag badge-gold font-mono text-[9px] px-1.5 py-0.2">
                            {member.oraCraftId || 'OC-STF'}
                          </span>
                        </div>
                        <p className="text-xs text-purple-400 font-semibold">{member.role}</p>
                      </div>
                    </div>

                    <div className="bg-[#090d1e] p-3 rounded-xl border border-white/5 space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Working Hours:</span>
                        <span className="text-gray-200 font-bold">{member.workingHours || '9:00 AM - 6:00 PM IST'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Shift Status:</span>
                        <span className="text-emerald-400 font-bold">{member.status || 'ACTIVE - CHECKED IN'}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t border-white/5">
                      <span>Last Check-In: <strong className="text-gray-200">{member.lastCheckIn || 'Checked In Today'}</strong></span>
                      {member.role !== 'Senior Director' && (
                        <button
                          onClick={() => handleTerminateStaff(member.id)}
                          className="text-rose-400 hover:text-rose-300 text-[10px] font-bold underline flex items-center gap-1"
                        >
                          <UserMinus className="w-3 h-3" />
                          Revoke ID
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* ADMIN TAB 3: WORK HOURS & ATTENDANCE TRACKER (ADMIN ONLY) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'attendance' && dashboardMode === 'admin' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Staff Work Hours & Shift Attendance Tracking</h3>
                  <p className="text-xs text-gray-400">Monitor live check-in timestamps, shift durations, and punctuality logs.</p>
                </div>
                <button
                  onClick={fetchCorporateData}
                  className="bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh Attendance Feed
                </button>
              </div>

              <div className="glass-panel border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0c1024] text-gray-400 font-mono uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Staff Member</th>
                        <th className="py-3.5 px-4">OraCraft ID</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Shift Check-In</th>
                        <th className="py-3.5 px-4">Check-Out Status</th>
                        <th className="py-3.5 px-4">Hours Logged Today</th>
                        <th className="py-3.5 px-4">Attendance Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {attendanceList.map((att) => (
                        <tr key={att.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 text-white font-bold">{att.staffName}</td>
                          <td className="py-3.5 px-4 text-amber-400 font-mono font-bold">{att.oraCraftId}</td>
                          <td className="py-3.5 px-4 font-mono text-gray-300">{att.date}</td>
                          <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{att.checkIn}</td>
                          <td className="py-3.5 px-4 font-mono text-gray-400">{att.checkOut}</td>
                          <td className="py-3.5 px-4 font-mono text-purple-300 font-bold">{att.hoursLogged}</td>
                          <td className="py-3.5 px-4">
                            <span className="badge-tag badge-emerald text-[10px]">{att.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* ADMIN TAB 4: CLIENT INTERACTIONS & PIPELINE */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'leads' && dashboardMode === 'admin' && (
            <div className="space-y-4">
              
              {/* Search & Sector Filters */}
              <div className="glass-panel p-4 border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search client leads, business, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-9 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 font-semibold">Sector Filter:</span>
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

              {/* Full Leads & Meeting Assignments Table */}
              <div className="glass-panel border-white/10 overflow-hidden rounded-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0c1024] text-gray-400 font-mono uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Client & Business Name</th>
                        <th className="py-3.5 px-4">Sector</th>
                        <th className="py-3.5 px-4">Contact Details</th>
                        <th className="py-3.5 px-4">Meeting Slot & Assigned Staff</th>
                        <th className="py-3.5 px-4">Re-assign Meeting Host</th>
                        <th className="py-3.5 px-4">₹2 Confirmation Fee</th>
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

                          <td className="py-3.5 px-4 space-y-0.5 font-mono">
                            <span className="text-gray-300 block">{lead.email}</span>
                            <span className="text-gray-400 block">{lead.phone}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            {lead.scheduledSlot ? (
                              <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-[11px] space-y-0.5">
                                <span className="font-bold text-amber-400 block">{lead.scheduledSlot.date} @ {lead.scheduledSlot.time}</span>
                                <span className="text-gray-300 block">Host: <strong>{lead.scheduledSlot.staffName}</strong></span>
                              </div>
                            ) : (
                              <span className="text-gray-500 italic text-[11px]">No slot booked yet</span>
                            )}
                          </td>

                          {/* Meeting Assignment Control (Admin) */}
                          <td className="py-3.5 px-4">
                            <select
                              value={lead.scheduledSlot?.staffName || 'Vikram Mehta (Lead Web Engineer)'}
                              onChange={(e) => handleReassignStaffHost(lead.id, e.target.value)}
                              className="bg-[#0b0f22] text-amber-300 border border-amber-500/30 rounded-lg p-1 text-[11px] font-semibold"
                            >
                              <option value="Vikram Mehta (Lead Web Engineer)">Vikram Mehta (Lead Architect)</option>
                              <option value="Priya Sundaram (Client Success Manager)">Priya Sundaram (Client Success)</option>
                              <option value="Sabyasachi Admin (Senior Director)">Sabyasachi Admin (Senior Director)</option>
                            </select>
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
                                Pending Fee
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              className="bg-[#0b0f22] text-white border border-white/10 rounded-lg p-1 text-xs font-semibold"
                            >
                              <option value="Paid & Scheduled">Paid & Scheduled</option>
                              <option value="Paid - Select Time Slot">Paid - Select Time Slot</option>
                              <option value="Pending Payment">Pending Payment</option>
                              <option value="In Discovery Call">In Discovery Call</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="Client Onboarded">Client Onboarded</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
                              title="Permanently Delete Lead Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STAFF TAB 1: MY ASSIGNED CLIENT MEETINGS & SCHEDULES */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'meetings' && dashboardMode === 'staff' && (
            <div className="space-y-6">
              
              {/* Daily Shift Check-In Header Widget */}
              <div className="glass-panel p-5 border-emerald-500/30 bg-[#0e1428] rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Daily Shift Check-In & Work Shift Status</h3>
                    <p className="text-xs text-gray-400">Official Shift Hours: <strong className="text-gray-200">9:00 AM - 6:00 PM IST</strong></p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {checkedInTime ? (
                    <span className="badge-tag badge-emerald text-xs font-mono font-bold px-3 py-1.5">
                      ✓ Checked In @ {checkedInTime}
                    </span>
                  ) : (
                    <button
                      onClick={handleShiftCheckIn}
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Daily Shift Check-In</span>
                    </button>
                  )}
                </div>
              </div>

              {checkInMsg && (
                <p className="text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30 font-mono">
                  {checkInMsg}
                </p>
              )}

              {/* My Scheduled Meetings Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    Assigned 1-on-1 Client Strategy Meetings
                  </h3>
                  <span className="text-xs text-gray-400">Showing confirmed meetings assigned to your staff host</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leadsList.filter(l => l.scheduledSlot).map((lead) => (
                    <div key={lead.id} className="glass-panel p-5 border-amber-500/30 bg-[#0e1328] rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="badge-tag badge-gold text-[10px]">{lead.category}</span>
                        <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          ₹2 PAID CONFIRMED
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-extrabold text-white">{lead.clientName}</h4>
                        <p className="text-xs text-amber-400 font-semibold">{lead.companyName}</p>
                      </div>

                      <div className="bg-[#080b1a] p-3 rounded-xl border border-white/5 space-y-1.5 text-xs font-mono">
                        <div className="flex items-center justify-between text-amber-300 font-bold">
                          <span>Scheduled Date & Time:</span>
                          <span>{lead.scheduledSlot.date} @ {lead.scheduledSlot.time}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Assigned Staff Host:</span>
                          <span className="text-purple-300 font-bold">{lead.scheduledSlot.staffName}</span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1 text-gray-300 pt-1">
                        <p><strong>Client Phone / WhatsApp:</strong> <span className="font-mono text-cyan-300">{lead.phone}</span></p>
                        <p><strong>Requested Services:</strong> {lead.services ? lead.services.join(', ') : 'Web Design & QR Menu'}</p>
                        {lead.notes && <p className="text-[11px] text-gray-400 italic bg-[#060814] p-2 rounded-lg">"{lead.notes}"</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STAFF TAB 2: VERIFY PAYMENT CONFIRMATIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'verify-payment' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              
              <div className="text-center space-y-2">
                <h3 className="text-base font-extrabold text-white">Razorpay ₹2 Payment Verification Lookup Tool</h3>
                <p className="text-xs text-gray-400">Enter a client's transaction reference ID (`TXN_AURA_...`) or appointment receipt code (`AURAX-XXXX`) to verify authentic payment status.</p>
              </div>

              {/* Lookup Form */}
              <form onSubmit={handleVerifyTxn} className="glass-panel p-5 border-emerald-500/30 bg-[#0e1328] rounded-2xl space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={verifyTxnQuery}
                    onChange={(e) => setVerifyTxnQuery(e.target.value)}
                    placeholder="Enter Transaction ID (e.g. TXN_AURA_98241562 or AURAX-9821)"
                    className="input-field flex-1 font-mono uppercase font-bold text-amber-400"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <Search className="w-4 h-4" />
                    <span>Verify Txn</span>
                  </button>
                </div>
              </form>

              {/* Verification Result Card */}
              {verifyResult && (
                <div className={`glass-panel p-6 border rounded-2xl space-y-3 ${
                  verifyResult.found ? 'border-emerald-500/40 bg-[#0a1424]' : 'border-rose-500/40 bg-[#1a0c14]'
                }`}>
                  {verifyResult.found ? (
                    <>
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="badge-tag badge-emerald inline-flex items-center gap-1 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          VERIFIED AUTHENTIC PAYMENT
                        </span>
                        <span className="text-xs font-mono text-gray-400">{new Date(verifyResult.paymentDate).toLocaleString()}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Client Name:</span>
                          <span className="text-white font-bold text-sm block">{verifyResult.clientName}</span>
                          <span className="text-amber-400 block">{verifyResult.companyName}</span>
                        </div>

                        <div>
                          <span className="text-gray-400 block text-[10px]">Booking Code:</span>
                          <span className="text-amber-400 font-bold text-sm block">{verifyResult.bookingCode}</span>
                          <span className="text-emerald-400 font-bold block">Amount Paid: ₹{verifyResult.amount}.00 INR</span>
                        </div>
                      </div>

                      <div className="bg-[#070b1a] p-3 rounded-xl border border-white/10 text-xs font-mono">
                        <span className="text-gray-400 text-[10px] block">Razorpay Txn Reference ID:</span>
                        <span className="text-cyan-300 font-bold">{verifyResult.txnId}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-rose-400 text-xs font-semibold p-2">
                      ❌ {verifyResult.message}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STAFF TAB 3: SUBMIT TIME SLOTS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'slots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Staff Available Time Slots for Client Selection</h3>
                  <p className="text-xs text-gray-400">Submit your available call slots for Director approval & client booking.</p>
                </div>
                <button
                  onClick={() => setShowAddSlotModal(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit Time Slot</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {slotsList.map((slot) => (
                  <div key={slot.id} className="glass-panel p-4 border-amber-500/30 bg-[#0e1328] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">{slot.date}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        slot.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {slot.status}
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      {slot.time}
                    </p>
                    <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t border-white/5 font-mono">
                      <span>Host: <strong className="text-gray-200">{slot.staffName}</strong></span>
                      <span>Status: {slot.approvedBy || 'Approved'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* SHARED TAB: NOTICES */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'notices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Internal Corporate Notice Board</h3>
                  <p className="text-xs text-gray-400">Broadcast announcements, working hours policies, and security notices.</p>
                </div>
                {dashboardMode === 'admin' && (
                  <button
                    onClick={() => setShowAddNoticeModal(true)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Post Notice</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {noticesList.map((n) => (
                  <div key={n.id} className="glass-panel p-4 border-cyan-500/30 bg-[#0a0e20] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="badge-tag badge-cyan text-[10px]">{n.category}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{new Date(n.date).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{n.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{n.content}</p>
                    <p className="text-[10px] text-gray-500">Issued by: <strong className="text-cyan-400">{n.author}</strong></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* SHARED TAB: LEAVE APPLICATIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'leaves' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Staff Leave Applications & Time-Off Log</h3>
                  <p className="text-xs text-gray-400">Review time-off requests and casual leave notices.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leavesList.map((l) => (
                  <div key={l.id} className="glass-panel p-4 border-purple-500/30 bg-[#0a0e20] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{l.staffName}</span>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">{l.oraCraftId}</span>
                      </div>
                      <span className="badge-tag badge-emerald text-[10px]">{l.status}</span>
                    </div>
                    <p className="text-xs text-purple-300 font-semibold">{l.type} ({l.startDate} to {l.endDate})</p>
                    <p className="text-xs text-gray-300 bg-[#060814] p-2 rounded-lg border border-white/5">{l.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* ADMIN TAB: HIRING */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'hiring' && dashboardMode === 'admin' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Active Agency Recruitment</h3>
                  <p className="text-xs text-gray-400">Manage job positions and recruitment openings.</p>
                </div>
                <button
                  onClick={() => setShowAddJobModal(true)}
                  className="bg-rose-500 hover:bg-rose-400 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Post Job Opening</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hiringList.map((job) => (
                  <div key={job.id} className="glass-panel p-4 border-rose-500/30 bg-[#0a0e20] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="badge-tag badge-rose text-[10px]">{job.department}</span>
                      <span className="text-xs font-bold text-emerald-400">{job.status}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{job.title}</h4>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-300 pt-1">
                      <span>Experience: {job.experience}</span>
                      <span className="text-amber-400 font-bold">{job.salaryRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Add OraCraft ID Staff Modal */}
      {showAddStaffModal && (
        <div className="modal-overlay">
          <div className="glass-panel w-full max-w-md p-6 border-emerald-500/40 shadow-2xl bg-[#090d20] text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                Generate & Assign OraCraft ID
              </h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddStaffSubmit} className="space-y-3 text-xs">
              <div>
                <label className="input-label">Staff Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="e.g. Vikram Mehta"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Role & Designation *</label>
                <select
                  value={newStaffRole}
                  onChange={(e) => {
                    const r = e.target.value;
                    setNewStaffRole(r);
                    const prefix = r.includes('Engineer') ? 'OC-ENG' : r.includes('Manager') ? 'OC-CSM' : r.includes('Designer') ? 'OC-DES' : 'OC-STF';
                    setCustomOraCraftId(`${prefix}-${100 + staffList.length + 1}`);
                  }}
                  className="input-field bg-[#0c1024]"
                >
                  <option value="Lead Web Engineer">Lead Web Engineer</option>
                  <option value="Client Success Manager">Client Success Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Senior Director">Senior Director</option>
                </select>
              </div>

              <div>
                <label className="input-label">Assigned OraCraft ID (Unique Identifier) *</label>
                <input
                  type="text"
                  required
                  value={customOraCraftId}
                  onChange={(e) => setCustomOraCraftId(e.target.value.toUpperCase())}
                  className="input-field uppercase font-mono font-bold text-amber-400"
                />
              </div>

              <div>
                <label className="input-label">Assigned Temporary Password *</label>
                <input
                  type="text"
                  required
                  value={newStaffPassword}
                  onChange={(e) => setNewStaffPassword(e.target.value)}
                  className="input-field font-mono"
                />
              </div>

              {staffMsg && (
                <p className="text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30 font-mono">
                  {staffMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Generate & Issue OraCraft ID
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Slot Modal */}
      {showAddSlotModal && (
        <div className="modal-overlay">
          <div className="glass-panel w-full max-w-md p-6 border-amber-500/40 shadow-2xl bg-[#090d20] text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-400" />
                Approve & Publish Time Slot for Clients
              </h3>
              <button onClick={() => setShowAddSlotModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddSlotSubmit} className="space-y-3 text-xs">
              <div>
                <label className="input-label">Date (YYYY-MM-DD) *</label>
                <input
                  type="date"
                  required
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Time Window (e.g. 11:00 AM - 11:30 AM IST) *</label>
                <input
                  type="text"
                  required
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  className="input-field font-mono"
                />
              </div>

              <div>
                <label className="input-label">Assigned Staff Host *</label>
                <select
                  value={slotAssignedStaff}
                  onChange={(e) => setSlotAssignedStaff(e.target.value)}
                  className="input-field bg-[#0c1024]"
                >
                  <option value="Vikram Mehta (Lead Architect)">Vikram Mehta (Lead Architect)</option>
                  <option value="Priya Sundaram (Client Success Manager)">Priya Sundaram (Client Success Manager)</option>
                  <option value="Sabyasachi Admin (Senior Management)">Sabyasachi Admin (Senior Management)</option>
                </select>
              </div>

              {slotMsg && (
                <p className="text-xs text-amber-400 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/30">
                  {slotMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-amber-500/20"
              >
                Approve & Publish Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Post Notice Modal */}
      {showAddNoticeModal && (
        <div className="modal-overlay">
          <div className="glass-panel w-full max-w-md p-6 border-cyan-500/40 shadow-2xl bg-[#090d20] text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                Broadcast Corporate Notice
              </h3>
              <button onClick={() => setShowAddNoticeModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddNotice} className="space-y-3 text-xs">
              <div>
                <label className="input-label">Notice Headline *</label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Standard Working Hours Policy Update"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value)}
                  className="input-field bg-[#0c1024]"
                >
                  <option value="Announcement">Announcement</option>
                  <option value="Policy">Policy</option>
                  <option value="Working Hours">Working Hours</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div>
                <label className="input-label">Notice Details *</label>
                <textarea
                  rows={4}
                  required
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  placeholder="Enter notice details for agency staff..."
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-3 rounded-xl"
              >
                Publish Notice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showAddJobModal && (
        <div className="modal-overlay">
          <div className="glass-panel w-full max-w-md p-6 border-rose-500/40 shadow-2xl bg-[#090d20] text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-rose-400" />
                Post New Job Position
              </h3>
              <button onClick={() => setShowAddJobModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddJob} className="space-y-3 text-xs">
              <div>
                <label className="input-label">Job Title *</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior React & Node Architect"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Department *</label>
                <input
                  type="text"
                  required
                  value={jobDept}
                  onChange={(e) => setJobDept(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Salary Range *</label>
                <input
                  type="text"
                  required
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  className="input-field font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-400 text-white font-extrabold py-3 rounded-xl"
              >
                Publish Job Opening
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
