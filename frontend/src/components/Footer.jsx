import React from 'react';
import { Sparkles, Utensils, Building2, Coffee, Lock, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onOpenLeadModal, onOpenStaffModal, onSelectNiche }) {
  return (
    <footer className="bg-[#04060d] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-display text-xl font-bold text-white">
                AuraCraft<span className="text-amber-400">.</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs">
              Premier web engineering and digital application development agency dedicated exclusively to Restaurants, Wholesalers, and Cafes.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Spam-Free ₹2 Token System</span>
            </div>
          </div>

          {/* Col 2: Industry Solutions */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Industry Solutions</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectNiche('restaurant')} className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <Utensils className="w-3.5 h-3.5" /> Restaurant Web Design & QR Menus
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNiche('wholesaler')} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                  <Building2 className="w-3.5 h-3.5" /> B2B Wholesale Trade Portals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNiche('cafe')} className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                  <Coffee className="w-3.5 h-3.5" /> Express Cafe Pickup & Bean Subscriptions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Agency & Governance */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Corporate Access</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenLeadModal} className="hover:text-amber-400 font-semibold text-amber-400 transition-colors">
                  Book ₹2 Strategy Call
                </button>
              </li>
              <li>
                <button onClick={onOpenStaffModal} className="hover:text-purple-300 flex items-center gap-1.5 transition-colors">
                  <Lock className="w-3.5 h-3.5 text-purple-400" /> Internal Staff Dashboard
                </button>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">Client Case Studies</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Contact Studio</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Indiranagar Tech Hub, Bengaluru</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-400" /> hello@auracraft-design.com</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-400" /> +91 (080) 4920 8900</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 AuraCraft Digital Agency. All rights reserved.</p>
          <p>Powered by Modern React & High-Performance Express Node Architecture.</p>
        </div>

      </div>
    </footer>
  );
}
