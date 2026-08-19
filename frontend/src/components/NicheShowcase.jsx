import React, { useState } from 'react';
import { Utensils, Building2, Coffee, Check, ArrowRight, Smartphone, QrCode, Layers } from 'lucide-react';
import { nicheHighlights } from '../data/mockData';

export default function NicheShowcase({ onOpenLeadModal }) {
  const [selectedTab, setSelectedTab] = useState('restaurant');

  const activeData = nicheHighlights[selectedTab];

  return (
    <section id="niches" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#04060d] border-y border-white/10">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge-tag badge-gold mb-3">
            Industry Specialized Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Engineered Specifically For Your Industry Niche
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Generic templates fail food & wholesale businesses. We construct custom digital engines targeted precisely at your operational workflows.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="glass-panel p-2 flex gap-2 max-w-2xl w-full border-white/15">
            <button
              onClick={() => setSelectedTab('restaurant')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                selectedTab === 'restaurant'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Restaurants
            </button>
            <button
              onClick={() => setSelectedTab('wholesaler')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                selectedTab === 'wholesaler'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Wholesalers
            </button>
            <button
              onClick={() => setSelectedTab('cafe')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                selectedTab === 'cafe'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Coffee className="w-4 h-4" />
              Cafes & Bakeries
            </button>
          </div>
        </div>

        {/* Dynamic Niche Breakdown Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Feature List Card */}
          <div className="glass-panel p-8 flex flex-col justify-between border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${activeData.accentColor}20`, color: activeData.accentColor }}
                >
                  {selectedTab === 'restaurant' && <Utensils className="w-6 h-6" />}
                  {selectedTab === 'wholesaler' && <Building2 className="w-6 h-6" />}
                  {selectedTab === 'cafe' && <Coffee className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeData.title}</h3>
                  <span className="text-xs text-gray-400 font-mono">Specialized Niche Module v2.4</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {activeData.subtitle}
              </p>

              <div className="space-y-4 mb-8">
                {activeData.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenLeadModal}
              className="w-full gradient-btn-gold py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <span>Build My {selectedTab === 'restaurant' ? 'Restaurant' : selectedTab === 'wholesaler' ? 'Wholesale' : 'Cafe'} Website (₹2 Token)</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Interactive Live Mini-App Frame */}
          <div className="glass-panel p-6 border-white/10 flex flex-col justify-between bg-[#070b18]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>Interactive {selectedTab.toUpperCase()} Web App Simulation</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                Live Prototype
              </span>
            </div>

            {/* Interactive Preview Content depending on active tab */}
            {selectedTab === 'restaurant' && (
              <div className="space-y-4 my-auto">
                <div className="bg-[#10172a] p-4 rounded-xl border border-amber-500/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-amber-400" />
                      Table #12 Digital Menu Scan
                    </h4>
                    <span className="text-[11px] text-amber-400 font-semibold">Live Order Cart</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-white/5 rounded">
                      <span className="text-white">2x Truffle Tagliatelle</span>
                      <span className="text-amber-400 font-bold">₹1,500</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded">
                      <span className="text-white">1x Chianti Classico Wine Bottle</span>
                      <span className="text-amber-400 font-bold">₹3,200</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-amber-500 text-black py-2 rounded-lg font-bold text-xs">
                    Confirm Order & Pay at Table
                  </button>
                </div>
              </div>
            )}

            {selectedTab === 'wholesaler' && (
              <div className="space-y-4 my-auto">
                <div className="bg-[#10172a] p-4 rounded-xl border border-cyan-500/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      B2B Trade Buyer Account: Apex Spices
                    </h4>
                    <span className="text-[11px] text-cyan-400 font-semibold">Tier-1 Partner</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-white/5 rounded">
                      <div>
                        <span className="text-white block font-semibold">Basmati Rice (500kg Bulk)</span>
                        <span className="text-[10px] text-gray-400">10x 50kg Bags</span>
                      </div>
                      <span className="text-cyan-400 font-bold">₹42,000</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded">
                      <span className="text-white">Trade Credit Remaining:</span>
                      <span className="text-emerald-400 font-bold">₹1,50,000</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-cyan-500 text-black py-2 rounded-lg font-bold text-xs">
                    Generate Purchase Order PDF
                  </button>
                </div>
              </div>
            )}

            {selectedTab === 'cafe' && (
              <div className="space-y-4 my-auto">
                <div className="bg-[#10172a] p-4 rounded-xl border border-emerald-500/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-emerald-400" />
                      Morning Express Metro Order
                    </h4>
                    <span className="text-[11px] text-emerald-400 font-semibold">Ready in 6 mins</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-white/5 rounded">
                      <span className="text-white">Oat Milk Double Oat Cappuccino</span>
                      <span className="text-emerald-400 font-bold">₹290</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded">
                      <span className="text-white">Digital Stamp Reward:</span>
                      <span className="text-amber-400 font-bold">Stamp #8 of 10</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-emerald-500 text-black py-2 rounded-lg font-bold text-xs">
                    1-Click Express Pay & Pick Up
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <span className="text-xs text-gray-400">
                ⚡ Delivered in 7-14 Business Days with Full Mobile Optimization
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
