import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Vote, Send, PlusCircle } from 'lucide-react';
import { mockCommunityPosts } from '../data/mockData';

export default function CommunityHub() {
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [votedOption, setVotedOption] = useState(null);

  const handleVote = (postIndex, optIndex) => {
    if (votedOption !== null) return;
    setVotedOption(optIndex);
    const updated = [...posts];
    updated[postIndex].poll.options[optIndex].votes += 1;
    updated[postIndex].poll.totalVotes += 1;
    setPosts(updated);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setPosts([
      {
        id: `post_${Date.now()}`,
        author: "Tech Fusion AI",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop",
        time: "Just now",
        content: newPostContent,
        poll: null,
        likes: 1,
        commentsCount: 0
      },
      ...posts
    ]);
    setNewPostContent('');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
        Creator Community <span className="gradient-text">Hub</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
        Connect with your audience through interactive polls, text announcements, and member-only exclusives.
      </p>

      {/* New Post Box */}
      <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px' }}>
        <form onSubmit={handleCreatePost}>
          <textarea 
            rows={3}
            placeholder="Share an update or question with your community..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#172033',
              border: '1px solid var(--border-color)',
              color: '#fff',
              outline: 'none',
              fontSize: '0.88rem',
              marginBottom: '12px'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="gradient-btn" style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PlusCircle size={16} /> Post to Community
            </button>
          </div>
        </form>
      </div>

      {/* Feed Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map((post, postIdx) => (
          <div key={post.id} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src={post.avatar} alt={post.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{post.author}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{post.time}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.92rem', color: '#e2e8f0', marginBottom: '14px', lineHeight: '1.5' }}>
              {post.content}
            </div>

            {/* Poll Component if present */}
            {post.poll && (
              <div style={{ backgroundColor: '#182238', padding: '16px', borderRadius: '12px', marginBottom: '14px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Vote size={16} /> {post.poll.question}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {post.poll.options.map((opt, optIdx) => {
                    const pct = Math.round((opt.votes / post.poll.totalVotes) * 100);
                    const isSelected = votedOption === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleVote(postIdx, optIdx)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: isSelected ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.2)' : '#131b2e',
                          color: '#fff',
                          textAlign: 'left',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
                          <span>{opt.label}</span>
                          <span style={{ fontWeight: 700, color: '#a78bfa' }}>{pct}%</span>
                        </div>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`, backgroundColor: 'rgba(139, 92, 246, 0.25)', zIndex: 1, transition: 'width 0.4s ease' }} />
                      </button>
                    );
                  })}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {post.poll.totalVotes.toLocaleString()} votes
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <ThumbsUp size={16} /> {post.likes}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <MessageSquare size={16} /> {post.commentsCount} Comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
