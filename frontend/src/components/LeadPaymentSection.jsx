import React, { useState } from 'react';
import { CreditCard, Check, Send } from 'lucide-react';
import API_BASE_URL from '../config/api';

export default function LeadPaymentSection({ onStartPaymentFlow, selectedNiche }) {
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    category: selectedNiche === 'wholesaler' ? 'Wholesaler' : selectedNiche === 'cafe' ? 'Cafe' : 'Restaurant',
    email: '',
    phone: '',
    services: ['Custom Web Design', 'Mobile Optimization'],
    budget: '₹45,000 - ₹75,000',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const availableServices = [
    'Digital Menu & QR Scanner',
    'Online Table Reservation',
    'B2B Wholesale Trade Portal',
    'Express Pickup Ordering App',
    'Coffee Bean Subscription Engine',
    'Custom Brand Web Engineering',
    'SEO & Google Business Boost'
  ];

  const handleServiceToggle = (service) => {
    if (formData.services.includes(service)) {
      setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
    } else {
      setFormData({ ...formData, services: [...formData.services, service] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // POST to backend API
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      setLoading(false);
      // Trigger payment gateway modal with created lead details
      onStartPaymentFlow(data.lead || { ...formData, id: 'lead-' + Date.now() });
    } catch (err) {
      console.warn('[Lead Flow Notice]', err.message);
      setLoading(false);
      onStartPaymentFlow({ ...formData, id: 'lead-' + Date.now() });
    }
  };

  return (
    <section id="book-consultation" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#070a16]">
      <div className="max-w-4xl mx-auto">
        
        <div className="glass-panel p-8 sm:p-12 border-amber-500/30 glass-panel-gold relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 mb-3">
              <CreditCard className="w-3.5 h-3.5" />
              Spam-Free ₹2 Token Booking System
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Schedule Your Strategy Call
            </h2>
            <p className="text-gray-300 text-sm">
              Complete your business details and pay a nominal <strong className="text-amber-400 font-bold">₹2 token fee</strong> to confirm your 1-on-1 consultation with our lead web architect.
            </p>
          </div>

          {/* Lead Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chef Marco Rossi"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Company / Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. La Trattoria Milano"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="input-label">Business Industry Sector *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field text-xs font-semibold"
                >
                  <option value="Restaurant">Restaurant & Bistro</option>
                  <option value="Wholesaler">Wholesaler & B2B Trade</option>
                  <option value="Cafe">Cafe & Roastery</option>
                </select>
              </div>

              <div>
                <label className="input-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            {/* Target Services */}
            <div>
              <label className="input-label mb-2">Required Features & Solutions (Select all that apply):</label>
              <div className="flex flex-wrap gap-2">
                {availableServices.map((service) => {
                  const isSelected = formData.services.includes(service);
                  return (
                    <button
                      type="button"
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-black border border-amber-400 font-bold shadow-sm'
                          : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget & Notes */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Estimated Budget Scale</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="input-field text-xs font-semibold"
                >
                  <option value="₹35,000 - ₹60,000">₹35,000 - ₹60,000 (Standard Site)</option>
                  <option value="₹60,000 - ₹1,20,000">₹60,000 - ₹1,20,000 (Full App + Menu QR)</option>
                  <option value="₹1,20,000+">₹1,20,000+ (Enterprise B2B / Custom ERP Sync)</option>
                </select>
              </div>

              <div>
                <label className="input-label">Special Notes / Desired Launch Date</label>
                <input
                  type="text"
                  placeholder="e.g., Need live before festival season"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            {/* Confirmation Banner */}
            <div className="bg-[#080c18] p-4 rounded-xl border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  ₹2
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Confirmation Token Payment: ₹2.00 INR</p>
                  <p className="text-[11px] text-gray-400">100% refundable token to lock priority calendar slot</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto gradient-btn-gold px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shrink-0"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>Proceed to ₹2 Payment</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
