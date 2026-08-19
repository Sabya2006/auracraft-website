import React from 'react';
import { Sparkles, Utensils, Building2, Coffee, ShieldCheck, CreditCard, Lock } from 'lucide-react';

export default function Navbar({ onOpenLeadModal, onOpenStaffModal, onSelectNiche, activeNiche, onOpenAdminPortal, isStaffLoggedIn }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-[var(--border-color)] px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Target Badge */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-cyan-500 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                AuraCraft<span className="text-amber-400">.</span>
              </span>
              <span className="badge-tag badge-gold hidden sm:inline-flex text-[10px] py-0.5">
                Food & Trade Agency
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] hidden md:block">
              Web Engineering for Restaurants, Wholesalers & Cafes
            </p>
          </div>
        </div>

        {/* Niche Selector Pills / Main Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0b0f1d] p-1.5 rounded-full border border-white/10 shadow-inner">
          <button
            onClick={() => onSelectNiche('restaurant')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeNiche === 'restaurant'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            Restaurants
          </button>
          <button
            onClick={() => onSelectNiche('wholesaler')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeNiche === 'wholesaler'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Wholesalers
          </button>
          <button
            onClick={() => onSelectNiche('cafe')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeNiche === 'cafe'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            Cafes
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* ₹2 Strategy Call CTA */}
          <button
            onClick={onOpenLeadModal}
            className="gradient-btn-gold px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 group"
          >
            <CreditCard className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>Book Call <span className="bg-black/20 text-black px-1.5 py-0.5 rounded text-[11px]">₹2</span></span>
          </button>

          {/* Corporate Staff Access */}
          {isStaffLoggedIn ? (
            <button
              onClick={onOpenAdminPortal}
              className="bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-purple-500/10"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Staff Dashboard</span>
            </button>
          ) : (
            <button
              onClick={onOpenStaffModal}
              className="bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Internal Corporate Staff Login"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Staff Portal</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
