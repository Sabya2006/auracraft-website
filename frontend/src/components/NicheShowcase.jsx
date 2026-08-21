import React, { useState } from 'react';
import { Gauge, CheckCircle2, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function NicheShowcase({ onOpenLeadModal }) {
  const [sliderVal, setSliderVal] = useState(50); // 0 to 100 split comparison

  return (
    <section id="showcase" className="py-24 relative bg-[#070a19] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Gauge className="w-4 h-4" />
            <span>Performance & Conversion Engine</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Why Standard Templates Fail <br />
            <span className="neon-text-cyan">And How AuraCraft Wins</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Slow PDF menu downloads and clunky contact forms lose 60%+ of mobile diners and B2B buyers. Slide below to see the interactive difference.
          </p>
        </div>

        {/* Interactive Split Comparison Widget */}
        <div className="glass-panel border-white/10 p-6 md:p-8 rounded-3xl bg-[#090e24] shadow-2xl relative">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>Standard Template (Slow & Clunky)</span>
            </div>

            {/* Slider Control */}
            <div className="flex items-center gap-3 w-full md:w-1/3">
              <span className="text-[11px] font-mono text-gray-400">Drag to Compare</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AuraCraft 60FPS Speed Engine</span>
            </div>
          </div>

          {/* Dynamic Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Box - Old Slow Site */}
            <div className="glass-panel p-6 border-rose-500/20 bg-rose-500/5 rounded-2xl space-y-4 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                <span className="text-xs font-bold text-rose-300">Generic WordPress / Wix Template</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-mono">3.8s LOAD SPEED</span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-center gap-2 text-rose-300">
                  <span className="text-rose-500">❌</span> Heavy 15MB PDF Menu (Unusable on Mobile 4G)
                </li>
                <li className="flex items-center gap-2 text-rose-300">
                  <span className="text-rose-500">❌</span> Manual Phone Call Reservations (Missed Peak Hours)
                </li>
                <li className="flex items-center gap-2 text-rose-300">
                  <span className="text-rose-500">❌</span> Static B2B Product Lists with No Tier Pricing
                </li>
                <li className="flex items-center gap-2 text-rose-300">
                  <span className="text-rose-500">❌</span> High Bounce Rate (72% Drop-off within 5 seconds)
                </li>
              </ul>
            </div>

            {/* Right Box - AuraCraft Speed Engine */}
            <div className="glass-panel p-6 border-emerald-500/30 bg-emerald-500/5 rounded-2xl space-y-4 text-left relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <span className="text-xs font-bold text-emerald-300">AuraCraft Engineered Platform</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">&lt; 0.4s LIGHTNING SPEED</span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-200">
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant Mobile QR Digital Menu (Loads in 250ms)</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated 24/7 Online Booking + SMS Confirmations</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High-Volume B2B Bulk Order Portal with ERP Sync</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Average <strong>+215% Booking & Order Growth</strong> in 30 Days</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Callout */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs font-bold text-white">Guaranteed 60FPS Mobile Smoothness & Fast Load Times</p>
                <p className="text-[11px] text-gray-400">Backed by our 100% Performance SLA & ₹2 Consultation Guarantee</p>
              </div>
            </div>

            <button
              onClick={onOpenLeadModal}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0"
            >
              <span>Get Your Custom Speed Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
