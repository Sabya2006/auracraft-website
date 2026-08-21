import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import NicheShowcase from './components/NicheShowcase';
import RoiCalculator from './components/RoiCalculator';
import Portfolio from './components/Portfolio';
import ProjectModal from './components/ProjectModal';
import LeadPaymentSection from './components/LeadPaymentSection';
import PaymentModal from './components/PaymentModal';
import StaffLoginModal from './components/StaffLoginModal';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [activeNiche, setActiveNiche] = useState('restaurant'); // 'restaurant', 'wholesaler', 'cafe'
  const [activeLead, setActiveLead] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Corporate Staff Auth state
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffToken, setStaffToken] = useState(sessionStorage.getItem('auracraft_staff_token') || '');
  const [staffUser, setStaffUser] = useState(JSON.parse(sessionStorage.getItem('auracraft_staff_meta') || 'null'));
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenLeadModal = () => {
    const section = document.getElementById('book-consultation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveLead({
        id: 'lead-direct-' + Date.now(),
        clientName: 'Direct Client Inquiry',
        companyName: 'Aura Hospitality Lead',
        email: 'client@auracraft.digital',
        phone: '+91 98765 43210'
      });
      setShowPaymentModal(true);
    }
  };

  const handleStartPaymentFlow = (leadData) => {
    setActiveLead(leadData);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (receiptData) => {
    showToast(`₹2 Payment Verified! Appointment Code: ${receiptData.bookingCode}`, 'success');
  };

  const handleStaffLoginSuccess = (token, user) => {
    setStaffToken(token);
    setStaffUser(user);
    sessionStorage.setItem('auracraft_staff_token', token);
    sessionStorage.setItem('auracraft_staff_meta', JSON.stringify({ name: user.name, role: user.role, oraCraftId: user.oraCraftId || 'OC-DIR-9001' }));
    setShowAdminPortal(true);
    showToast(`Welcome back, ${user.name} (${user.oraCraftId || 'OC-DIR-9001'})! OraCraft Control Center Active.`, 'purple');
  };

  const handleStaffLogout = () => {
    setStaffToken('');
    setStaffUser(null);
    sessionStorage.removeItem('auracraft_staff_token');
    sessionStorage.removeItem('auracraft_staff_meta');
    setShowAdminPortal(false);
    showToast('Logged out of Corporate Staff Portal.', 'info');
  };

  const handleScrollToPortfolio = () => {
    const portfolio = document.getElementById('portfolio');
    if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070913] text-[var(--text-primary)] font-sans flex flex-col relative pb-16 sm:pb-0">
      
      {/* Toast Notification Floating Banner */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-3 animate-bounce ${
          toast.type === 'purple'
            ? 'bg-purple-600/90 text-white border-purple-400'
            : 'bg-emerald-500/90 text-black border-emerald-300'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenLeadModal={handleOpenLeadModal}
        onOpenStaffModal={() => setShowStaffModal(true)}
        onSelectNiche={(niche) => { setActiveNiche(niche); }}
        activeNiche={activeNiche}
        onOpenAdminPortal={() => setShowAdminPortal(true)}
        isStaffLoggedIn={Boolean(staffToken)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Animated Luxury Hero */}
        <Hero
          onOpenLeadModal={handleOpenLeadModal}
          activeNiche={activeNiche}
          onSelectNiche={setActiveNiche}
          onScrollToPortfolio={handleScrollToPortfolio}
        />

        {/* Tech Stack Marquee */}
        <TechMarquee />

        {/* Niche Specific Performance Breakdown */}
        <NicheShowcase
          onOpenLeadModal={handleOpenLeadModal}
        />

        {/* Interactive ROI Growth Calculator */}
        <RoiCalculator
          onOpenLeadModal={handleOpenLeadModal}
        />

        {/* Client Portfolio Showcase Gallery */}
        <Portfolio
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Interactive Scope Builder & Fixed ₹2 Booking Section */}
        <LeadPaymentSection
          onStartPaymentFlow={handleStartPaymentFlow}
          onOpenPaymentModal={handleStartPaymentFlow}
          selectedNiche={activeNiche}
          activeNiche={activeNiche}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenLeadModal={handleOpenLeadModal}
        onOpenStaffModal={() => setShowStaffModal(true)}
        onSelectNiche={setActiveNiche}
      />

      {/* Floating Bottom Glass Bar for Mobile & Quick Booking */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg glass-panel p-2.5 rounded-2xl border-amber-500/30 shadow-2xl bg-[#090d22]/90 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-2 pl-2 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-white font-bold hidden sm:inline">Book 1-on-1 Strategy Call</span>
          <span className="text-amber-400 font-extrabold text-[11px]">Fixed ₹2 Fee</span>
        </div>
        <button
          onClick={handleOpenLeadModal}
          className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
        >
          <span>Lock ₹2 Call</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* MODALS */}

      {/* Interactive Client Demo Prototype Browser Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onBookCall={handleOpenLeadModal}
        />
      )}

      {/* ₹2 Payment Gateway Simulator Modal */}
      {showPaymentModal && activeLead && (
        <PaymentModal
          lead={activeLead}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Corporate Staff Login Modal */}
      {showStaffModal && (
        <StaffLoginModal
          onClose={() => setShowStaffModal(false)}
          onLoginSuccess={handleStaffLoginSuccess}
        />
      )}

      {/* Corporate Staff Admin Control Center */}
      {showAdminPortal && (
        <AdminPortal
          staffUser={staffUser}
          token={staffToken}
          onLogout={handleStaffLogout}
        />
      )}

    </div>
  );
}
