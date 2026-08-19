import React from 'react';
import { Languages, Flame, Play } from 'lucide-react';

export default function VideoCard({ video, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(video)}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Thumbnail Container */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
        <img 
          src={video.thumbnail} 
          alt={video.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Duration badge */}
        <span style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          {video.duration}
        </span>

        {/* Hyper-Local Dubbing Tag */}
        {video.isDubbed && (
          <span className="badge-tag badge-ai" style={{ position: 'absolute', top: '8px', left: '8px' }}>
            <Languages size={12} /> Auto-Dubbed ({video.dubbedLanguages.length})
          </span>
        )}

        {/* Push Score Tag */}
        {video.algorithmMetrics && (
          <span className="badge-tag badge-live" style={{ position: 'absolute', top: '8px', right: '8px' }}>
            <Flame size={12} /> Push: {video.algorithmMetrics.pushScore}/100
          </span>
        )}
      </div>

      {/* Info Container */}
      <div style={{ padding: '14px', display: 'flex', gap: '12px' }}>
        <img 
          src={video.channelAvatar} 
          alt={video.channel}
          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <h4 style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            lineHeight: '1.3',
            marginBottom: '6px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {video.title}
          </h4>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>
            {video.channel}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {video.views} views • {video.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
}
