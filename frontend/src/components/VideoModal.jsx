import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Share2, Languages, Flame, Volume2, MessageSquare, Check, UserPlus } from 'lucide-react';
import ShareModal from './ShareModal';

export default function VideoModal({ video, onClose, onToggleSubscribe }) {
  const [selectedLang, setSelectedLang] = useState(video.dubbedLanguages[0] || 'English');
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [dislikesCount, setDislikesCount] = useState(video.dislikes || 850);
  const [isSubscribed, setIsSubscribed] = useState(video.isSubscribed || false);
  const [subsCount, setSubsCount] = useState(video.subscribers);
  const [showShare, setShowShare] = useState(false);

  const [comments, setComments] = useState([
    { id: 1, user: "Alex Tech", text: "The auto-dubbing in Hindi sounds so natural! Amazing innovation 🔥", time: "1 hour ago" },
    { id: 2, user: "Priya Sharma", text: "Brand Hub feature is a gamechanger for indie creators!", time: "3 hours ago" }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
      if (disliked) {
        setDislikesCount(dislikesCount - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikesCount(dislikesCount - 1);
      setDisliked(false);
    } else {
      setDislikesCount(dislikesCount + 1);
      setDisliked(true);
      if (liked) {
        setLikesCount(likesCount - 1);
        setLiked(false);
      }
    }
  };

  const handleSubscribeToggle = () => {
    if (isSubscribed) {
      setIsSubscribed(false);
      setSubsCount(subsCount - 1);
    } else {
      setIsSubscribed(true);
      setSubsCount(subsCount + 1);
    }
    if (onToggleSubscribe) onToggleSubscribe(video.id);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      { id: Date.now(), user: "You (Creator)", text: newComment, time: "Just now" },
      ...comments
    ]);
    setNewComment("");
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '1100px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#1e293b',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Video Player */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
          <video 
            src={video.videoUrl} 
            controls 
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Next-Gen Interactive Control Bar: Auto-Dubbing Audio Track Switcher */}
        <div className="glass-panel" style={{
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderColor: 'rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Languages size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c084fc' }}>
                Hyper-Local AI Auto-Dubbing Active
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Real-time multi-lingual neural audio output
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Select Audio Track:</span>
            {video.dubbedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: selectedLang === lang ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                  backgroundColor: selectedLang === lang ? '#8b5cf6' : '#1e293b',
                  color: '#fff',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {selectedLang === lang && <Volume2 size={12} />}
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Video Metadata & Interactive Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{video.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={video.channelAvatar} 
                alt={video.channel}
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{video.channel}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{subsCount.toLocaleString()} Subscribers</div>
              </div>
              <button 
                onClick={handleSubscribeToggle}
                style={{
                  backgroundColor: isSubscribed ? '#1e293b' : '#fff',
                  color: isSubscribed ? '#38bdf8' : '#000',
                  border: isSubscribed ? '1px solid #38bdf8' : 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginLeft: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isSubscribed ? <Check size={14} /> : <UserPlus size={14} />}
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', backgroundColor: '#1e293b', borderRadius: '20px', overflow: 'hidden' }}>
              <button 
                onClick={handleLike}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: liked ? '#ff3b5c' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <ThumbsUp size={16} /> {likesCount.toLocaleString()}
              </button>
              <button 
                onClick={handleDislike}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  backgroundColor: disliked ? '#334155' : 'transparent',
                  color: disliked ? '#ff3b5c' : '#94a3b8',
                  border: 'none',
                  borderLeft: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <ThumbsDown size={16} />
              </button>
            </div>

            <button 
              onClick={() => setShowShare(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: '#1e293b',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

        {/* Share Modal popup */}
        {showShare && (
          <ShareModal videoTitle={video.title} onClose={() => setShowShare(false)} />
        )}

        {/* Transparent Algorithm Insights Box */}
        {video.algorithmMetrics && (
          <div className="glass-panel" style={{ padding: '16px', backgroundColor: 'rgba(19, 27, 46, 0.9)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: '#ff3b5c', marginBottom: '8px' }}>
              <Flame size={18} /> Transparent Algorithm Insights
              <span className="badge-tag badge-live" style={{ marginLeft: 'auto' }}>
                Status: {video.algorithmMetrics.status}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div style={{ backgroundColor: '#182238', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Push Index</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>{video.algorithmMetrics.pushScore} / 100</div>
              </div>
              <div style={{ backgroundColor: '#182238', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CTR (Click Rate)</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{video.algorithmMetrics.ctr}</div>
              </div>
              <div style={{ backgroundColor: '#182238', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Avg Retention</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c084fc' }}>{video.algorithmMetrics.retention}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
              <strong>Why Algorithm Pushed This:</strong> {video.algorithmMetrics.reason}
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '12px' }}>
            <MessageSquare size={18} /> Comments ({comments.length})
          </div>
          <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input 
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '20px',
                backgroundColor: '#172033',
                border: '1px solid var(--border-color)',
                color: '#fff',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
            <button className="gradient-btn" style={{ padding: '8px 18px', borderRadius: '20px', fontSize: '0.85rem' }}>
              Post
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {comments.map((c) => (
              <div key={c.id} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {c.user[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{c.user} <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400 }}>• {c.time}</span></div>
                  <div style={{ color: '#cbd5e1', marginTop: '2px' }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
