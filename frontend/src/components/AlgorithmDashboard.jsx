import React, { useState } from 'react';
import { BarChart2, Flame, Eye, ArrowUpRight, Lightbulb, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';
import { mockVideos } from '../data/mockData';

export default function AlgorithmDashboard() {
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(255, 59, 92, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
        marginBottom: '24px'
      }}>
        <span className="badge-tag badge-live" style={{ marginBottom: '10px' }}>
          <ShieldCheck size={12} /> 100% Zero-Guesswork Analytics
        </span>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
          Transparent Algorithm <span className="gradient-text">Dashboard</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Know exactly why your video is or isn't being pushed by the algorithm. Get real-time AI diagnostic feedback on Click-Through Rate (CTR), Retention Hooks, and Push Velocity index.
        </p>
      </div>

      {/* Video Selector Dropdown */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Select Video to Analyze:</span>
        <select 
          value={selectedVideo.id}
          onChange={(e) => setSelectedVideo(mockVideos.find(v => v.id === e.target.value))}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            backgroundColor: '#131b2e',
            border: '1px solid var(--border-color)',
            color: '#fff',
            outline: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {mockVideos.map(v => (
            <option key={v.id} value={v.id}>{v.title}</option>
          ))}
        </select>
      </div>

      {/* Main Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Algorithm Push Index</span>
            <Flame size={20} color="#ff3b5c" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff3b5c' }}>
            {selectedVideo.algorithmMetrics.pushScore} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px', fontWeight: 600 }}>
            {selectedVideo.algorithmMetrics.status}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Thumbnail CTR</span>
            <ArrowUpRight size={20} color="#34d399" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
            {selectedVideo.algorithmMetrics.ctr}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Target Benchmark: &gt; 8.5%
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Audience Retention</span>
            <Eye size={20} color="#c084fc" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>
            {selectedVideo.algorithmMetrics.retention}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Avg Watch Time: {selectedVideo.duration}
          </div>
        </div>
      </div>

      {/* Deep-Dive Algorithm Diagnostic Explanation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Why video is or isn't being pushed */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} color="#34d399" /> Algorithm Decision Breakdown
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
            {selectedVideo.algorithmMetrics.reason}
          </p>

          <div style={{ backgroundColor: '#182238', padding: '14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>
              Sub-Factor Velocity Weights:
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>• First 10 Minutes Watch Velocity: <strong>High (94%)</strong></div>
              <div>• Regional Language Multiplier (Auto-Dub): <strong>+28% Boost</strong></div>
              <div>• Comment Sentiment Index: <strong>92% Positive</strong></div>
            </div>
          </div>
        </div>

        {/* AI Actionable Recommendations */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b' }}>
            <Lightbulb size={18} color="#f59e0b" /> AI Actionable Improvement Tips
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {selectedVideo.algorithmMetrics.tips.map((tip, idx) => (
              <div key={idx} style={{ backgroundColor: '#182238', padding: '12px 14px', borderRadius: '10px', display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: '#f59e0b', fontWeight: 800 }}>#{idx + 1}</span>
                <div style={{ color: '#e2e8f0', lineHeight: '1.4' }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
