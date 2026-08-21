import React from 'react';
import { QrCode, ShoppingBag, Calendar } from 'lucide-react';

export default function Hero({ onOpenLeadModal, activeNiche, onSelectNiche, onScrollToPortfolio }) {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-radial-gradient">
      
      {/* Ambient Neon Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Copy & Right Live Browser Mockup (Matches Target Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          
          {/* Left Hero Copy */}
          <div className="space-y-6">
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Architecting <span className="neon-text-gold">High-Converting</span> Digital Workspaces for <span className="text-cyan-400">Restaurants, Wholesalers & Cafes</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
              Transform your hospitality or wholesale business with performance-driven digital solutions. Custom online reservations, B2B wholesale order portals, and express coffee pickup apps built for maximum ROI.
            </p>

            {/* Glowing CTA Button (Matches Target Image) */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenLeadModal}
                className="glass-panel border-amber-400/80 hover:border-amber-300 text-amber-300 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
              >
                Explore Solutions
              </button>

              <button
                onClick={onScrollToPortfolio}
                className="glass-panel border-white/10 hover:border-white/30 text-gray-300 hover:text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                View Case Studies
              </button>
            </div>

            {/* Sector Tags */}
            <div className="pt-4 flex items-center gap-2">
              {['restaurant', 'wholesaler', 'cafe'].map((niche) => (
                <button
                  key={niche}
                  onClick={() => onSelectNiche(niche)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border ${
                    activeNiche === niche
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>

          </div>

          {/* Right Live Glassmorphic Browser Window Mockup (Matches Target Image) */}
          <div className="relative">
            <div className="glass-panel p-2.5 border-emerald-500/30 rounded-2xl shadow-2xl bg-[#090d20]/90 backdrop-blur-2xl">
              
              {/* Top Window Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0d1228] rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-gray-400">auracraft.digital/preview</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">60 FPS ENGINE</span>
              </div>

              {/* Mockup Window Content */}
              <div className="p-4 sm:p-6 bg-[#060815] rounded-b-xl space-y-4">
                
                {/* 3 Grid Preview Cards (Matches Target Image) */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Digital QR Menu Card */}
                  <div className="glass-panel p-3 border-white/10 bg-[#0c1024] space-y-2 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white flex items-center gap-1">
                        <QrCode className="w-3.5 h-3.5 text-amber-400" />
                        Digital QR Menu
                      </span>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-[10px] text-amber-300">
                      <p className="font-bold">Burgers & Drinks</p>
                      <p className="text-gray-400">Filtered by dietary tags</p>
                    </div>
                  </div>

                  {/* Online Table Booking Card */}
                  <div className="glass-panel p-3 border-white/10 bg-[#0c1024] space-y-2 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        Online Table Booking
                      </span>
                    </div>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-1.5 rounded-lg text-[10px]">
                      Book a Table
                    </button>
                  </div>

                </div>

                {/* B2B Wholesale Order Cart Card */}
                <div className="glass-panel p-4 border-emerald-500/30 bg-[#0c1128] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                      B2B Wholesale Order Cart
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">Bulk Grain & Spice Palette ($960)</p>
                  </div>
                  <button className="bg-emerald-500 text-black font-bold px-3 py-1.5 rounded-lg text-xs">
                    Place Order
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
