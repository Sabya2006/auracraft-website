import React, { useState } from 'react';
import { Radio, Users, Heart, MessageSquare, DollarSign, Send, ShieldAlert } from 'lucide-react';

export default function LiveStreamStudio() {
  const [viewerCount, setViewerCount] = useState(14820);
  const [likes, setLikes] = useState(3840);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Rohan V.", text: "The auto-dubbing speed is insane! Hello from Bangalore 🔥", superChat: null },
    { id: 2, user: "Sarah Jenkins", text: "Sent $50 SuperChat! Keep building!", superChat: "₹4,100 ($50)" },
    { id: 3, user: "Karthik R.", text: "Can we get Tamil dubbing live on stream?", superChat: null }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [superChatAmount, setSuperChatAmount] = useState("");

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        user: "You (Creator)",
        text: inputMsg,
        superChat: superChatAmount ? `₹${superChatAmount}` : null
      }
    ]);
    if (superChatAmount) {
      setLikes(likes + 25);
    }
    setInputMsg("");
    setSuperChatAmount("");
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Live Broadcast Header */}
      <div className="glass-panel" style={{
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderLeft: '4px solid #ff3b5c'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            padding: '6px 14px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 59, 92, 0.2)',
            color: '#ff3b5c',
            border: '1px solid rgba(255, 59, 92, 0.4)',
            fontSize: '0.85rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Radio size={16} className="pulse" /> LIVE BROADCAST ACTIVE
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
            Next-Gen AI Platform Keynote Live Stream
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>
            <Users size={18} /> {viewerCount.toLocaleString()} Viewers
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: '#ff3b5c' }}>
            <Heart size={18} /> {likes.toLocaleString()} Likes
          </div>
        </div>
      </div>

      {/* Stream Player & Live Chat Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Video Video Feed Area */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', position: 'relative' }}>
            <video 
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" 
              controls 
              autoPlay 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span className="badge-tag badge-ai" style={{ position: 'absolute', top: '12px', left: '12px' }}>
              🤖 AI Real-Time Chat Moderation Enabled
            </span>
          </div>

          <div style={{ backgroundColor: '#182238', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live SuperChat Revenue</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>₹38,400 ($460)</div>
            </div>
            <button 
              onClick={() => setLikes(likes + 1)}
              style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#ff3b5c', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Heart size={16} /> Tap Like
            </button>
          </div>
        </div>

        {/* Live Chat Engine Panel */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '480px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={16} color="#38bdf8" /> Live Community Stream Chat
          </h3>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px', paddingRight: '6px' }}>
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  backgroundColor: msg.superChat ? 'rgba(245, 158, 11, 0.2)' : '#172033',
                  border: msg.superChat ? '1px solid #f59e0b' : '1px solid transparent'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: msg.superChat ? '#f59e0b' : '#38bdf8', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{msg.user}</span>
                  {msg.superChat && (
                    <span style={{ backgroundColor: '#f59e0b', color: '#000', padding: '1px 6px', borderRadius: '8px', fontSize: '0.7rem' }}>
                      SuperChat {msg.superChat}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginTop: '2px' }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                placeholder="Send a live message..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
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
              <button className="gradient-btn" style={{ padding: '8px 16px', borderRadius: '20px' }}>
                <Send size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={14} color="#f59e0b" />
              <input 
                type="number"
                placeholder="SuperChat Amount (Optional ₹)"
                value={superChatAmount}
                onChange={(e) => setSuperChatAmount(e.target.value)}
                style={{
                  flex: 1,
                  padding: '6px 12px',
                  borderRadius: '12px',
                  backgroundColor: '#172033',
                  border: '1px solid var(--border-color)',
                  color: '#f59e0b',
                  fontSize: '0.78rem',
                  outline: 'none'
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
