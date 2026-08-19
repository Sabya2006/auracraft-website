import React, { useState } from 'react';
import { Languages, Volume2, Mic, CheckCircle2, Play, RefreshCw, Zap } from 'lucide-react';
import { mockVideos } from '../data/mockData';

export default function AutoDubbing() {
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLangs, setTargetLangs] = useState(['Hindi', 'Tamil', 'Telugu']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dubbingComplete, setDubbingComplete] = useState(true);
  const [activePlaybackLang, setActivePlaybackLang] = useState('Hindi');

  const availableLanguages = [
    'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 
    'Gujarati', 'Kannada', 'Malayalam', 'Spanish', 'French'
  ];

  const toggleLanguage = (lang) => {
    if (targetLangs.includes(lang)) {
      setTargetLangs(targetLangs.filter(l => l !== lang));
    } else {
      setTargetLangs([...targetLangs, lang]);
    }
  };

  const handleStartDubbing = () => {
    setIsProcessing(true);
    setDubbingComplete(false);
    setTimeout(() => {
      setIsProcessing(false);
      setDubbingComplete(true);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
        marginBottom: '24px'
      }}>
        <span className="badge-tag badge-ai" style={{ marginBottom: '10px' }}>
          <Languages size={12} /> Neural Voice Cloning & Translation
        </span>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
          Hyper-Local AI <span className="gradient-text">Auto-Dubbing</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Instantly translate and clone your voice into regional Indian & global languages. Double your channel audience overnight by breaking all language barriers without hiring manual voice actors!
        </p>
      </div>

      {/* Main Studio Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left Column: Configurator */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mic size={16} color="#38bdf8" /> Dubbing Pipeline Configurator
          </h3>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Select Source Video:
            </label>
            <select 
              value={selectedVideo.id}
              onChange={(e) => setSelectedVideo(mockVideos.find(v => v.id === e.target.value))}
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
            >
              {mockVideos.map(v => (
                <option key={v.id} value={v.id}>{v.title}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Target AI Dubbing Languages:
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {availableLanguages.map(lang => {
                const isSelected = targetLangs.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '14px',
                      border: isSelected ? '1px solid #38bdf8' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.2)' : '#172033',
                      color: isSelected ? '#38bdf8' : 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            onClick={handleStartDubbing}
            disabled={isProcessing}
            className="gradient-btn"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isProcessing ? (
              <> <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Neural Voice Synthesizing... </>
            ) : (
              <> <Zap size={16} /> Process Auto-Dubbing Batch </>
            )}
          </button>
        </div>

        {/* Right Column: Audio Waveform Preview & Interactive Player */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Volume2 size={18} /> Neural Audio Output Tracks
          </h3>

          {dubbingComplete && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                {targetLangs.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActivePlaybackLang(lang)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '16px',
                      border: activePlaybackLang === lang ? '1px solid #38bdf8' : '1px solid var(--border-color)',
                      backgroundColor: activePlaybackLang === lang ? '#38bdf8' : '#1e293b',
                      color: activePlaybackLang === lang ? '#000' : '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {lang} Audio Track
                  </button>
                ))}
              </div>

              {/* Simulated Waveform Display */}
              <div style={{
                backgroundColor: '#0f172a',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid var(--border-color)',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Language Track: <strong>{activePlaybackLang} (Cloned Voice)</strong></span>
                  <span style={{ color: '#34d399' }}>Precision Sync: 99.4%</span>
                </div>
                {/* Visual Audio Bars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '40px' }}>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                      key={i} 
                      style={{
                        flex: 1,
                        backgroundColor: i % 2 === 0 ? '#38bdf8' : '#8b5cf6',
                        height: `${Math.max(15, Math.sin(i * 0.5) * 100)}%`,
                        borderRadius: '2px',
                        transition: 'height 0.2s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                  Ready to attach to video stream! 3 Regional Audio Tracks generated in 4.2s.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
