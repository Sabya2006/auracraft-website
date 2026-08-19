import React, { useState } from 'react';
import { Calculator, Sparkles, Utensils, Building2, Coffee } from 'lucide-react';

export default function RoiCalculator({ onOpenLeadModal }) {
  const [industry, setIndustry] = useState('restaurant');
  const [monthlyVolume, setMonthlyVolume] = useState(1200); // monthly orders or table turns
  const [avgTicket, setAvgTicket] = useState(650); // average spend in ₹

  // Calculations
  const calculatedBoostPercent = industry === 'restaurant' ? 0.28 : industry === 'wholesaler' ? 0.35 : 0.42;
  const currentMonthlyGross = monthlyVolume * avgTicket;
  const estimatedMonthlyGrowth = Math.round(currentMonthlyGross * calculatedBoostPercent);
  const estimatedAnnualBoost = estimatedMonthlyGrowth * 12;
  const savedCommissionOrAdmin = Math.round(currentMonthlyGross * 0.15); // Saved commissions/admin effort

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="glass-panel p-8 lg:p-12 border-amber-500/20 glass-panel-gold">
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Inputs & Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
                <Calculator className="w-4 h-4" />
                Interactive Revenue Impact Calculator
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                Calculate Your Digital Growth Potential
              </h2>
              <p className="text-gray-400 text-sm">
                Select your industry sector and current volume to estimate how much extra revenue an AuraCraft high-converting digital platform can generate.
              </p>

              {/* Industry Toggle */}
              <div>
                <label className="input-label">Select Your Business Sector:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setIndustry('restaurant'); setMonthlyVolume(1200); setAvgTicket(650); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      industry === 'restaurant' ? 'bg-amber-500 text-black shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    Restaurant
                  </button>
                  <button
                    onClick={() => { setIndustry('wholesaler'); setMonthlyVolume(350); setAvgTicket(18000); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      industry === 'wholesaler' ? 'bg-cyan-500 text-black shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    Wholesaler
                  </button>
                  <button
                    onClick={() => { setIndustry('cafe'); setMonthlyVolume(2500); setAvgTicket(280); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      industry === 'cafe' ? 'bg-emerald-500 text-black shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    Cafe
                  </button>
                </div>
              </div>

              {/* Slider 1: Monthly Customer Volume */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">
                    {industry === 'restaurant' ? 'Monthly Table Covers / Orders' : industry === 'wholesaler' ? 'Monthly B2B Orders' : 'Monthly Coffee Customers'}
                  </span>
                  <span className="text-amber-400 font-bold text-sm">{monthlyVolume.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={industry === 'wholesaler' ? 50 : 300}
                  max={industry === 'wholesaler' ? 2000 : 10000}
                  step={industry === 'wholesaler' ? 25 : 100}
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-white/10 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Slider 2: Average Order Value */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">Average Order Spend (₹)</span>
                  <span className="text-amber-400 font-bold text-sm">₹{avgTicket.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={industry === 'cafe' ? 100 : industry === 'restaurant' ? 250 : 2000}
                  max={industry === 'cafe' ? 1200 : industry === 'restaurant' ? 3500 : 75000}
                  step={industry === 'wholesaler' ? 500 : 50}
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-white/10 rounded-lg h-2 cursor-pointer"
                />
              </div>

            </div>

            {/* Right Side: Results Display */}
            <div className="lg:col-span-5 bg-[#080c18] p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-gray-400">ESTIMATED REVENUE IMPACT</span>
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>

              <div>
                <p className="text-xs text-gray-400">Projected Extra Monthly Revenue</p>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400 mt-1">
                  +₹{estimatedMonthlyGrowth.toLocaleString()} <span className="text-xs font-normal text-gray-400">/ month</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[11px] text-gray-400">Annual Growth</p>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">
                    +₹{estimatedAnnualBoost.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[11px] text-gray-400">Commission / Admin Savings</p>
                  <p className="text-base font-bold text-cyan-400 mt-0.5">
                    ₹{savedCommissionOrAdmin.toLocaleString()} / mo
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenLeadModal}
                  className="w-full gradient-btn-gold py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Unlock This Growth (₹2 Booking Fee)</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
