import React, { useState } from 'react';
import { Sparkles, FileText, Image, AlignLeft, Wand2, Copy, Check } from 'lucide-react';

export default function AiStudio() {
  const [activeTool, setActiveTool] = useState('script');
  
  // Script Generator State
  const [topic, setTopic] = useState('Next-Gen AI Smartphones');
  const [niche, setNiche] = useState('Tech & Reviews');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);

  // Thumbnail Generator State
  const [thumbnailPrompt, setThumbnailPrompt] = useState('Neon futuristic cyber smartphone floating with glowing camera lens');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [generatedThumbnail, setGeneratedThumbnail] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop');

  const handleGenerateScript = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript({
        hook: `Did you know that ${topic} is rendering traditional flagships obsolete? In the next 3 minutes, I'll show you why!`,
        scenes: [
          { title: "Scene 1: Visual Unboxing Hook (0:00 - 0:45)", detail: `Cinematic macro shot of the device reflections. Voiceover introducing ${topic}.` },
          { title: "Scene 2: Performance Benchmark Test (0:45 - 2:30)", detail: "Live split-screen benchmark metrics comparing gaming FPS and temperature." },
          { title: "Scene 3: AI Camera & Neural Features (2:30 - 5:00)", detail: "Demonstrating real-time object replacement and hyper-local voice translations." },
          { title: "Scene 4: Verdict & Final CTA (5:00 - 6:30)", detail: "Summary of pros/cons + call to action: 'Subscribe for weekly tech breakdowns!'" }
        ],
        seoTags: ["#TechReview", `#${topic.replace(/\s+/g, '')}`, "#NextGenAI", "#Smartphones2026"]
      });
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#a78bfa', fontWeight: 700 }}>
          <Sparkles size={16} /> Integrated Creator Intelligence
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
          AI Creator <span className="gradient-text">Studio</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Speed up your production from script writing to thumbnail creation and SEO descriptions with built-in AI tools.
        </p>
      </div>

      {/* Tool Navigation */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {[
          { id: 'script', label: 'Multi-Scene Scriptwriter', icon: FileText },
          { id: 'thumbnail', label: 'AI Thumbnail Formatter', icon: Image },
          { id: 'description', label: 'SEO Auto-Description', icon: AlignLeft },
        ].map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                border: isActive ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                backgroundColor: isActive ? 'rgba(139, 92, 246, 0.2)' : '#131b2e',
                color: isActive ? '#c084fc' : '#fff',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Icon size={16} />
              {tool.label}
            </button>
          );
        })}
      </div>

      {/* Tool Content Area */}
      {activeTool === 'script' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Input Panel */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wand2 size={16} color="#a78bfa" /> Script Prompt Configurator
            </h3>
            <form onSubmit={handleGenerateScript}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Video Topic / Title Idea:
                </label>
                <input 
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
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
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Target Channel Niche:
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
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
                  <option>Tech & Reviews</option>
                  <option>Gaming & Esports</option>
                  <option>Finance & Crypto</option>
                  <option>Vlogs & Lifestyle</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="gradient-btn"
                style={{ width: '100%', padding: '12px', borderRadius: '10px', fontSize: '0.88rem' }}
              >
                {isGenerating ? 'AI Writing Multi-Scene Script...' : 'Generate Full Script Breakdown'}
              </button>
            </form>
          </div>

          {/* Output Panel */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: '#38bdf8' }}>
              Generated Scene Breakdown
            </h3>
            {generatedScript ? (
              <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ backgroundColor: '#182238', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #ff3b5c' }}>
                  <div style={{ fontWeight: 700, color: '#ff3b5c', marginBottom: '4px' }}>🔥 Hook Drop (First 5 sec)</div>
                  <div>"{generatedScript.hook}"</div>
                </div>

                {generatedScript.scenes.map((scene, idx) => (
                  <div key={idx} style={{ backgroundColor: '#182238', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontWeight: 700, color: '#c084fc', marginBottom: '2px' }}>{scene.title}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>{scene.detail}</div>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {generatedScript.seoTags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.72rem', backgroundColor: '#1e293b', padding: '3px 8px', borderRadius: '12px', color: '#38bdf8' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', padding: '40px 0' }}>
                Click "Generate Full Script Breakdown" to view multi-scene AI script suggestions.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTool === 'thumbnail' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
            Automated Thumbnail AI Generator & Formatter
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Visual Style Prompt:
              </label>
              <textarea 
                rows={3}
                value={thumbnailPrompt}
                onChange={(e) => setThumbnailPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#172033',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.85rem',
                  marginBottom: '14px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                {['16:9 (Main)', '9:16 (Shorts)', '1:1 (Community)'].map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: aspectRatio === ratio ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                      backgroundColor: aspectRatio === ratio ? '#8b5cf6' : '#1e293b',
                      color: '#fff',
                      fontSize: '0.78rem'
                    }}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
              <button className="gradient-btn" style={{ width: '100%', padding: '10px', borderRadius: '10px', fontSize: '0.85rem' }}>
                Generate Thumbnail Variant
              </button>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Formatted Preview ({aspectRatio})</div>
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src={generatedThumbnail} alt="Thumbnail Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'description' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>
            Auto-Generated SEO Description & Chapter Markers
          </h3>
          <textarea 
            rows={8}
            readOnly
            value={`🔥 In this video, we explore ${topic} and how it revolutionizes the creator economy!\n\n📌 Timestamps:\n0:00 - Introduction & Hook\n0:45 - Key Feature Breakdown\n2:30 - AI Hyper-Local Dubbing Demo\n5:00 - Final Verdict & Rating\n\n🔗 Links & Resources:\n• Join our Brand Hub: https://mytube.com/brand-hub\n• Try AI Creator Studio: https://mytube.com/studio\n\n#ContentCreator #MyTube #VideoPlatform #AITools`}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              backgroundColor: '#172033',
              border: '1px solid var(--border-color)',
              color: '#38bdf8',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      )}
    </div>
  );
}
