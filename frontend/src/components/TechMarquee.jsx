import React from 'react';
import { Cpu, ShieldCheck, Zap, Layers, Database, Lock, Globe, Server } from 'lucide-react';

export default function TechMarquee() {
  const techStack = [
    { name: 'React 18', icon: Globe, desc: 'Ultra-Fast Virtual DOM' },
    { name: 'Node.js', icon: Server, desc: '60FPS Event Loop' },
    { name: 'Supabase DB', icon: Database, desc: 'PostgreSQL Cloud Engine' },
    { name: 'Tailwind CSS', icon: Layers, desc: 'Glassmorphic Styling' },
    { name: 'JWT Security', icon: Lock, desc: 'Enterprise Authentication' },
    { name: 'Stripe & UPI', icon: ShieldCheck, desc: 'Instant Payments' },
    { name: 'Edge CDN', icon: Zap, desc: '< 0.4s Global Load' },
    { name: 'Custom CRM', icon: Cpu, desc: 'Real-Time Lead Pipeline' }
  ];

  return (
    <section className="py-10 border-y border-white/10 bg-[#060814] overflow-hidden relative">
      <div className="max-w-7xl mx-mx-auto px-4 text-center mb-6">
        <p className="text-[11px] font-mono tracking-widest text-purple-400 uppercase font-semibold">
          ⚡ Powered by Enterprise-Grade Engineering Architecture
        </p>
      </div>

      <div className="flex w-full overflow-hidden mask-linear-gradient">
        <div className="flex gap-6 animate-marquee whitespace-nowrap py-2">
          {[...techStack, ...techStack].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all hover:bg-white/10 shrink-0"
              >
                <div className="w-7 h-7 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-extrabold text-white block">{item.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono block">{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
