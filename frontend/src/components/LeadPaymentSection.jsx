import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../config/api';

export default function LeadPaymentSection({ onStartPaymentFlow, onOpenPaymentModal, selectedNiche, activeNiche }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(['Digital Menu QR', 'Online Table Reservation']);
  const [budgetTier, setBudgetTier] = useState('₹45,000 - ₹75,000');

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentNiche = selectedNiche || activeNiche || 'restaurant';

  const availableServices = [
    { id: 'Digital Menu QR', label: '3D Digital QR Menu Engine', desc: 'Dietary filters, live food photos' },
    { id: 'Online Table Reservation', label: 'Commission-Free Table Booking', desc: 'Automated WhatsApp confirmation' },
    { id: 'B2B Wholesale Portal', label: 'B2B Wholesale Trade Portal', desc: 'Tier pricing & bulk ordering' },
    { id: 'Express Coffee Pickup App', label: 'Express Mobile Pickup Ordering', desc: 'Zero queue coffee pre-order' },
    { id: 'Loyalty Rewards Engine', label: 'Digital Stamps & Coffee Subscription', desc: '88% retention booster' }
  ];

  const toggleService = (srvId) => {
    if (selectedServices.includes(srvId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srvId));
      }
    } else {
      setSelectedServices([...selectedServices, srvId]);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && selectedServices.length > 0) {
      setStep(2);
    }
  };

  const triggerPaymentFlow = (leadObj) => {
    if (onStartPaymentFlow) {
      onStartPaymentFlow(leadObj);
    } else if (onOpenPaymentModal) {
      onOpenPaymentModal(leadObj);
    }
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName || !companyName || !email || !phone) {
      setErrorMsg('Please fill in your name, business name, email, and phone number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          companyName,
          category: currentNiche === 'wholesaler' ? 'Wholesaler' : currentNiche === 'cafe' ? 'Cafe' : 'Restaurant',
          email,
          phone,
          services: selectedServices,
          budget: budgetTier,
          notes
        })
      });

      const data = await res.json();
      setLoading(false);

      if (data.success && data.lead) {
        triggerPaymentFlow(data.lead);
      } else {
        // Fallback lead creation
        const fallbackLead = {
          id: 'lead-' + Date.now(),
          clientName,
          companyName,
          category: currentNiche === 'wholesaler' ? 'Wholesaler' : currentNiche === 'cafe' ? 'Cafe' : 'Restaurant',
          email,
          phone,
          services: selectedServices,
          budget: budgetTier,
          notes,
          status: 'Pending Payment'
        };
        triggerPaymentFlow(fallbackLead);
      }
    } catch (_err) {
      setLoading(false);
      const fallbackLead = {
        id: 'lead-' + Date.now(),
        clientName,
        companyName,
        category: currentNiche === 'wholesaler' ? 'Wholesaler' : currentNiche === 'cafe' ? 'Cafe' : 'Restaurant',
        email,
        phone,
        services: selectedServices,
        budget: budgetTier,
        notes,
        status: 'Pending Payment'
      };
      triggerPaymentFlow(fallbackLead);
    }
  };

  return (
    <section id="book-consultation" className="py-20 relative bg-[#070914] overflow-hidden text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="badge-tag badge-gold inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            3-STEP PROJECT SCOPE & CONSULTATION BUILDER
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lock Strategy Consultation & <span className="neon-text-gold">Fixed ₹2 Booking Fee</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Select your digital workspace modules to receive a customized quote and lock your 1-on-1 strategy call with our Lead Web Architect.
          </p>
        </div>

        {/* 3-Step Wizard Container */}
        <div className="glass-panel p-6 sm:p-10 border-amber-500/30 rounded-3xl shadow-2xl bg-[#090d20]">
          
          {/* Step Progress Indicators */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-400' : 'text-gray-500'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-amber-400 bg-amber-500/20' : 'border-gray-600'}`}>1</span>
              <span>Select Modules</span>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-400' : 'text-gray-500'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-amber-400 bg-amber-500/20' : 'border-gray-600'}`}>2</span>
              <span>Contact Details</span>
            </div>
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-amber-400' : 'text-gray-500'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center border ${step === 3 ? 'border-amber-400 bg-amber-500/20' : 'border-gray-600'}`}>3</span>
              <span>Fixed ₹2 Fee & Slot</span>
            </div>
          </div>

          {/* Step 1: Select Modules */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">Choose Digital Modules:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableServices.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                            : 'bg-[#0c1024] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{srv.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">{srv.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget Tier Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">Estimated Project Investment Tier:</label>
                <div className="grid grid-cols-3 gap-3">
                  {['₹45,000 - ₹75,000', '₹75,000 - ₹1,20,000', '₹1,20,000+'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setBudgetTier(tier)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        budgetTier === tier
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400'
                          : 'bg-[#0c1024] text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full gradient-btn-gold py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: Contact Form */}
          {step === 2 && (
            <form onSubmit={handleSubmitLead} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Chef Marco Rossi"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="input-label">Business / Restaurant Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. La Dolce Vita Bistro"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marco@ladolcevita.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="input-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Project Vision / Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your menu size, seating capacity, or wholesale catalog volume..."
                  className="input-field"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">{errorMsg}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3.5 rounded-xl text-xs border border-white/10"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 gradient-btn-gold py-3.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
                >
                  {loading ? 'Registering Inquiry...' : 'Lock Call & Proceed to Fixed ₹2 Booking'}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
