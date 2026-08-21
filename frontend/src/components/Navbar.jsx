import React from 'react';
import { ShieldCheck, Lock, ChevronDown } from 'lucide-react';
import AuraLogo from './AuraLogo';

export default function Navbar({ onOpenLeadModal, onOpenStaffModal, onOpenAdminPortal, isStaffLoggedIn }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300 bg-[#070913]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo (Matches Target Design 100%) */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <AuraLogo className="w-9 h-9" />
          <div className="flex flex-col text-left">
            <span className="font-display text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none">
              AuraCraft
            </span>
            <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase font-bold mt-0.5">
              DIGITAL
            </span>
          </div>
        </div>

        {/* Clean Modern Navigation Menu (Matches Target Image) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-300">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-emerald-400 font-bold border-b-2 border-emerald-400 pb-0.5">
            Home
          </button>
          
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-white transition-colors" onClick={() => scrollToSection('showcase')}>
            <span>Services</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors">
            Case Studies
          </button>

          <button onClick={() => scrollToSection('roi-calculator')} className="hover:text-white transition-colors">
            Pricing
          </button>

          <button onClick={() => scrollToSection('book-consultation')} className="hover:text-white transition-colors">
            Blog
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Gold 'Get Started' Button (Matches Target Image) */}
          <button
            onClick={onOpenLeadModal}
            className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold px-5 py-2 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105"
          >
            Get Started
          </button>

          {/* Corporate Staff Access */}
          {isStaffLoggedIn ? (
            <button
              onClick={onOpenAdminPortal}
              className="bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
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
