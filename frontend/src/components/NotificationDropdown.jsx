import React from 'react';
import { Bell, Check, Briefcase, Languages, DollarSign, X } from 'lucide-react';

export default function NotificationDropdown({ notifications, onClose, onMarkAllRead }) {
  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      top: '55px',
      right: '20px',
      width: '360px',
      backgroundColor: 'rgba(15, 22, 38, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
      zIndex: 100,
      padding: '16px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.95rem' }}>
          <Bell size={18} color="#a78bfa" /> Notifications
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={onMarkAllRead}
            style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Mark all read
          </button>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
        {notifications.map((n) => (
          <div 
            key={n.id}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              backgroundColor: n.unread ? 'rgba(139, 92, 246, 0.12)' : '#131b2e',
              border: n.unread ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {n.type === 'brand' && <Briefcase size={16} color="#8b5cf6" />}
              {n.type === 'dub' && <Languages size={16} color="#38bdf8" />}
              {n.type === 'wallet' && <DollarSign size={16} color="#34d399" />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                {n.title}
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 400 }}>{n.time}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px', lineHeight: '1.3' }}>
                {n.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
