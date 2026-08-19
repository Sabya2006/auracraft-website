import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NicheShowcase from './components/NicheShowcase';
import RoiCalculator from './components/RoiCalculator';
import Portfolio from './components/Portfolio';
import ProjectModal from './components/ProjectModal';
import LeadPaymentSection from './components/LeadPaymentSection';
import PaymentModal from './components/PaymentModal';
import StaffLoginModal from './components/StaffLoginModal';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';

export default function App() {
  const [activeNiche, setActiveNiche] = useState('restaurant'); // 'restaurant', 'wholesaler', 'cafe'
  const [activeLead, setActiveLead] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Corporate Staff Auth state (Only store non-PII token in storage)
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
    }
  };

  const handleStartPaymentFlow = (leadData) => {
    setActiveLead(leadData);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (receiptData) => {
    showToast(`₹2 Payment Verified! Booking Code: ${receiptData.bookingCode}`, 'success');
  };

  const handleStaffLoginSuccess = (token, user) => {
    setStaffToken(token);
    setStaffUser(user);
    // Secure Storage Audit: Store token in sessionStorage (cleared on browser tab close) & omit sensitive PII
    sessionStorage.setItem('auracraft_staff_token', token);
    sessionStorage.setItem('auracraft_staff_meta', JSON.stringify({ name: user.name, role: user.role }));
    setShowAdminPortal(true);
    showToast(`Welcome back, ${user.name}! Corporate Dashboard Active.`, 'purple');
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
    <div className="min-h-screen bg-[#070913] text-[var(--text-primary)] font-sans flex flex-col">
      
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
        
        {/* Animated Hero */}
        <Hero
          onOpenLeadModal={handleOpenLeadModal}
          activeNiche={activeNiche}
          onSelectNiche={setActiveNiche}
          onScrollToPortfolio={handleScrollToPortfolio}
        />

        {/* Niche Specific Breakdown */}
        <NicheShowcase
          onOpenLeadModal={handleOpenLeadModal}
        />

        {/* Interactive ROI Calculator */}
        <RoiCalculator
          onOpenLeadModal={handleOpenLeadModal}
        />

        {/* Client Portfolio Gallery */}
        <Portfolio
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Lead Generation & ₹2 Confirmation Section */}
        <LeadPaymentSection
          onStartPaymentFlow={handleStartPaymentFlow}
          selectedNiche={activeNiche}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenLeadModal={handleOpenLeadModal}
        onOpenStaffModal={() => setShowStaffModal(true)}
        onSelectNiche={setActiveNiche}
      />

      {/* MODALS */}

      {/* Interactive Client Demo Prototype Browser Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onBookCall={handleOpenLeadModal}
        />
      )}

      {/* ₹2 Payment Gateway Modal */}
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

      {/* Corporate Staff Admin Portal Dashboard */}
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
