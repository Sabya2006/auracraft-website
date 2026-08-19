import React from 'react';
import { Home, Compass, Tv, Briefcase, Sparkles, Languages, BarChart2, Radio, Scissors, Wallet, Users } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const mainNav = [
    { id: 'feed', label: 'Explore Feed', icon: Home },
    { id: 'trending', label: 'Trending', icon: Compass },
    { id: 'subscriptions', label: 'Subscriptions', icon: Tv },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const nextGenNav = [
    { id: 'brandHub', label: 'Brand Collab Hub', icon: Briefcase, badge: 'Deals' },
    { id: 'aiStudio', label: 'AI Creator Studio', icon: Sparkles, badge: 'Script/SEO' },
    { id: 'autoDubbing', label: 'Hyper-Local Dubbing', icon: Languages, badge: 'Voice AI' },
    { id: 'algorithmDashboard', label: 'Transparent Algo', icon: BarChart2, badge: 'Metrics' },
    { id: 'liveStream', label: 'Live Stream Studio', icon: Radio, badge: 'SuperChat' },
    { id: 'aiClips', label: 'AI Shorts Auto-Cutter', icon: Scissors, badge: '9:16 Reels' },
    { id: 'wallet', label: 'Earnings Wallet', icon: Wallet, badge: '₹ Payouts' },
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      padding: '16px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {/* Main Menu */}
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', padding: '0 10px 8px 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Menu
        </div>
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: isActive ? '#1e293b' : 'transparent',
                color: isActive ? '#38bdf8' : 'var(--text-primary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginBottom: '2px',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={16} color={isActive ? '#38bdf8' : 'var(--text-secondary)'} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Next-Gen Features Section */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#a78bfa',
          padding: '0 10px 8px 10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          ✨ Next-Gen Suite
        </div>
        {nextGenNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '10px',
                border: isActive ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                color: isActive ? '#c084fc' : 'var(--text-primary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={16} color={isActive ? '#c084fc' : '#8b5cf6'} />
                {item.label}
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '0.62rem',
                  padding: '2px 5px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(139, 92, 246, 0.25)',
                  color: '#e9d5ff'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Creator Status Box */}
      <div className="glass-panel" style={{ padding: '12px', marginTop: 'auto' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: '2px' }}>
          Creator Pro Active
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          450K Subs • Push Score: 92/100
        </div>
        <button 
          onClick={() => setActiveTab('algorithmDashboard')}
          style={{
            width: '100%',
            padding: '6px',
            borderRadius: '6px',
            backgroundColor: '#1e293b',
            color: '#fff',
            border: 'none',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          View Algo Metrics
        </button>
      </div>
    </aside>
  );
}
