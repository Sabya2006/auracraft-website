import React, { useState } from 'react';
import { Briefcase, DollarSign, Send, CheckCircle2, Filter, Zap, Award } from 'lucide-react';
import { mockBrandCampaigns } from '../data/mockData';

export default function BrandHub() {
  const [campaigns] = useState(mockBrandCampaigns);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [appliedCampaigns, setAppliedCampaigns] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [pitchText, setPitchText] = useState('');
  const [customPayout, setCustomPayout] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (activeModal) {
      setAppliedCampaigns([...appliedCampaigns, activeModal.id]);
      setActiveModal(null);
      setPitchText('');
    }
  };

  const filteredCampaigns = campaigns.filter(c => {
    if (selectedFilter === 'All') return true;
    return c.type.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '30px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(255, 59, 92, 0.15) 100%)',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge-tag badge-ai" style={{ marginBottom: '10px' }}>
            <Zap size={12} /> Direct Brand Marketplace (0% Platform Fee)
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
            Brand Collaboration <span className="gradient-text">Hub</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '0.92rem', lineHeight: '1.5' }}>
            Apply directly for paid sponsorships, product seeding, and barter collaborations. No third-party agencies needed. Smart matching pairs your channel metrics directly with top brand budgets.
          </p>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={18} color="#34d399" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Total Paid to Creators</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>₹2.4 Crore ($290K)</div>
              </div>
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#c084fc" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Active Brand Partners</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#c084fc' }}>185+ Brands</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['All', 'Paid Sponsorship', 'Product Seeding', 'Barter'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: selectedFilter === filter ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
              backgroundColor: selectedFilter === filter ? '#8b5cf6' : '#131b2e',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredCampaigns.map((c) => {
          const isApplied = appliedCampaigns.includes(c.id);
          return (
            <div key={c.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.6rem' }}>{c.brandLogo}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem' }}>{c.brandName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.niche}</div>
                    </div>
                  </div>
                  <span className="badge-tag badge-live" style={{ fontSize: '0.7rem' }}>
                    {c.type}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', lineHeight: '1.3' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '14px', lineHeight: '1.4' }}>
                  {c.description}
                </p>

                <div style={{ backgroundColor: '#182238', padding: '12px', borderRadius: '10px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Payout Offer</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{c.payout}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
                    Min Subs: {c.minSubscribers} • {c.deadline}
                  </div>
                </div>
              </div>

              {isApplied ? (
                <div style={{
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#34d399',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  <CheckCircle2 size={16} /> Application Under Review
                </div>
              ) : (
                <button 
                  onClick={() => setActiveModal(c)}
                  className="gradient-btn"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '0.88rem'
                  }}
                >
                  Apply Directly Now
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Application Pitch Modal */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '550px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
              Apply for {activeModal.brandName} Campaign
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
              {activeModal.title} • Listed Payout: <span style={{ color: '#34d399', fontWeight: 700 }}>{activeModal.payout}</span>
            </div>

            <form onSubmit={handleApply}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Your Channel Pitch / Why you're a great fit:
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Mention your audience demographics, past engagement rate, or how you plan to integrate the brand..."
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: '#172033',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Proposed Fee (Optional counter-offer):
                </label>
                <input 
                  type="text"
                  placeholder="e.g. ₹50,000"
                  value={customPayout}
                  onChange={(e) => setCustomPayout(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: '#172033',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#1e293b',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="gradient-btn"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Send size={14} /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
