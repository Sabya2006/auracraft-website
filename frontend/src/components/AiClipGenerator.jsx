import React, { useState } from 'react';
import { Scissors, Flame, Play, CheckCircle2, RefreshCw, Wand2, Download } from 'lucide-react';
import { mockVideos, mockClips } from '../data/mockData';

export default function AiClipGenerator() {
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);
  const [clips, setClips] = useState(mockClips);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const handleGenerateNewClips = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setClips([
        {
          id: `clip_${Date.now()}`,
          title: "Shocking AI Voice Dubbing Breakdown!",
          timestamp: "10:12 - 10:55",
          viralityScore: 99,
          estimatedShortsViews: "600K - 1.2M",
          audioTrack: "Tamil & Hindi AI Dubbed",
          thumbnail: "https://images.unsplash.com/photo-1558441719-670554688690?w=400&auto=format&fit=crop"
        },
        ...clips
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDownloadClip = (clipId) => {
    setDownloadSuccess(clipId);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
        marginBottom: '24px'
      }}>
        <span className="badge-tag badge-ai" style={{ marginBottom: '10px' }}>
          <Scissors size={12} /> Automated 9:16 Shorts & Reels Extractor
        </span>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
          AI Viral Clip <span className="gradient-text">Auto-Cutter</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Automatically detect high-retention moments from long-form videos. Cut 9:16 vertical Shorts with animated captions, voice dubbing, and virality index ratings.
        </p>
      </div>

      {/* Control Box */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            Select Source Long-Form Video:
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

        <button 
          onClick={handleGenerateNewClips}
          disabled={isProcessing}
          className="gradient-btn"
          style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {isProcessing ? (
            <> <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> AI Extracting Key Moments... </>
          ) : (
            <> <Wand2 size={16} /> Auto-Generate Viral Shorts Clips </>
          )}
        </button>
      </div>

      {/* Extracted Shorts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {clips.map(clip => (
          <div key={clip.id} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', maxHeight: '340px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
                <img src={clip.thumbnail} alt={clip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge-tag badge-live" style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  <Flame size={12} /> Viral Score: {clip.viralityScore}/100
                </span>
                <span style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {clip.timestamp}
                </span>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>{clip.title}</h4>
              <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: '4px' }}>
                Audio: {clip.audioTrack}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Est. Views: {clip.estimatedShortsViews}
              </div>
            </div>

            <button 
              onClick={() => handleDownloadClip(clip.id)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: downloadSuccess === clip.id ? 'rgba(16, 185, 129, 0.2)' : '#1e293b',
                color: downloadSuccess === clip.id ? '#34d399' : '#fff',
                border: downloadSuccess === clip.id ? '1px solid #34d399' : '1px solid var(--border-color)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {downloadSuccess === clip.id ? (
                <> <CheckCircle2 size={16} /> Ready in Studio Gallery! </>
              ) : (
                <> <Download size={16} /> Export 9:16 Vertical Short </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
