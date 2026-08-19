import React from 'react';
import { Sparkles, Utensils, Building2, Coffee, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Star, CreditCard } from 'lucide-react';
import { nicheHighlights } from '../data/mockData';

export default function Hero({ onOpenLeadModal, activeNiche, onSelectNiche, onScrollToPortfolio }) {
  const currentNiche = nicheHighlights[activeNiche] || nicheHighlights.restaurant;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* Background Neon Orbs */}
      <div className="glow-orb-gold top-10 left-1/4 animate-pulse-glow" />
      <div className="glow-orb-cyan top-40 right-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-semibold text-gray-200">
              Exclusively for <span className="text-amber-400 font-bold">Restaurants</span>, <span className="text-cyan-400 font-bold">Wholesalers</span> & <span className="text-emerald-400 font-bold">Cafes</span>
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              ₹2 Booking Token
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="gradient-text-hero">High-Converting Digital Apps</span>
            <br />
            <span className="text-white">Built for Gastronomy & Trade.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal max-w-2xl mx-auto leading-relaxed">
            We engineer bespoke websites, QR ordering systems, B2B wholesale portals, and cafe subscription apps that turn casual visitors into loyal, repeat customers.
          </p>
        </div>

        {/* Niche Selector Pills Header */}
        <div className="flex justify-center mb-10">
          <div className="glass-panel p-2 flex flex-wrap justify-center gap-2 max-w-xl w-full border-white/15">
            <button
              onClick={() => onSelectNiche('restaurant')}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeNiche === 'restaurant'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Restaurants
            </button>
            <button
              onClick={() => onSelectNiche('wholesaler')}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeNiche === 'wholesaler'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Wholesalers
            </button>
            <button
              onClick={() => onSelectNiche('cafe')}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeNiche === 'cafe'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Coffee className="w-4 h-4" />
              Cafes & Roasteries
            </button>
          </div>
        </div>

        {/* Dynamic Niche Interactive Preview Banner */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Solution Stack
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              {currentNiche.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {currentNiche.subtitle}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {currentNiche.features.map((feat, idx) => (
                <div key={idx} className="glass-panel p-4 border-white/10 hover:border-amber-500/30 transition-all">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{feat.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenLeadModal}
                className="gradient-btn-gold px-8 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-3 shadow-xl group"
              >
                <CreditCard className="w-5 h-5 text-black" />
                <span>Book 1-on-1 Strategy Call (₹2 Token)</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToPortfolio}
                className="glass-panel hover:bg-white/10 text-white px-6 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border-white/20 transition-all"
              >
                <span>View Client Case Studies</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Instant ₹2 token payment locks priority calendar slot & includes full digital audit report.
            </p>
          </div>

          {/* Right Column: Live Mockup Widget Preview */}
          <div className="lg:col-span-5 relative">
            <div className={`glass-panel p-6 border-amber-500/20 shadow-2xl relative overflow-hidden ${currentNiche.glowClass}`}>
              
              {/* Card Top bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-gray-400 ml-2">live_preview.app</span>
                </div>
                <span className="badge-tag badge-gold text-[10px]">
                  Verified High ROI
                </span>
              </div>

              {/* Sample Live Mock Content */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{currentNiche.samplePreview.name}</h3>
                    <p className="text-xs text-amber-400 font-medium">
                      {currentNiche.samplePreview.cuisine || currentNiche.samplePreview.category || currentNiche.samplePreview.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                      {currentNiche.samplePreview.rating}
                    </span>
                  </div>
                </div>

                <div className="bg-[#080c18] p-3 rounded-xl border border-white/5 space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Featured Digital Modules:</p>
                  <div className="space-y-2">
                    {(currentNiche.samplePreview.popularDishes || currentNiche.samplePreview.sampleProducts || currentNiche.samplePreview.sampleItems).map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded-lg text-xs">
                        <div>
                          <span className="text-white font-semibold">{item.name}</span>
                          {item.tag && <span className="ml-2 text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">{item.tag}</span>}
                        </div>
                        <span className="text-amber-400 font-bold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span className="text-gray-200">Average Client Impact:</span>
                  </div>
                  <span className="font-extrabold text-amber-400 text-sm">
                    {activeNiche === 'restaurant' ? '+215% Bookings' : activeNiche === 'wholesaler' ? '+185% B2B Sales' : '+340% Pickups'}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Ticker Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="text-center p-4 glass-panel border-white/5">
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400">120+</p>
            <p className="text-xs text-gray-400 font-medium mt-1">Sites & Apps Launched</p>
          </div>
          <div className="text-center p-4 glass-panel border-white/5">
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-cyan-400">₹2.4M+</p>
            <p className="text-xs text-gray-400 font-medium mt-1">Client Revenue Boost</p>
          </div>
          <div className="text-center p-4 glass-panel border-white/5">
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400">4.9 / 5 ★</p>
            <p className="text-xs text-gray-400 font-medium mt-1">Google Client Rating</p>
          </div>
          <div className="text-center p-4 glass-panel border-white/5">
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-purple-400">₹2 Token</p>
            <p className="text-xs text-gray-400 font-medium mt-1">Confirmation Payment</p>
          </div>
        </div>

      </div>
    </section>
  );
}
