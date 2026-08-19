import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, MessageCircle } from 'lucide-react';

export default function ShareModal({ videoTitle, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://mytube.com/watch?v=demo_${Date.now()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '24px', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Share2 size={18} color="#38bdf8" /> Share Video
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          "{videoTitle}"
        </p>

        {/* Quick Social Action Shortcuts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
          <button style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#25D366', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MessageCircle size={16} /> WhatsApp
          </button>
          <button style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#0088cc', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Send size={16} /> Telegram
          </button>
          <button style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#1DA1F2', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            Twitter / X
          </button>
        </div>

        {/* Copy Link Input Bar */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#172033', padding: '6px 10px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <input 
            type="text" 
            readOnly 
            value={shareUrl}
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.82rem', outline: 'none' }}
          />
          <button 
            onClick={handleCopy}
            className="gradient-btn"
            style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
