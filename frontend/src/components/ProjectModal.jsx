import React, { useState } from 'react';
import { X, Laptop, Smartphone, Utensils, Building2, Coffee, Check, Calendar } from 'lucide-react';

export default function ProjectModal({ project, onClose, onBookCall }) {
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' or 'mobile'

  // Prototype state for restaurant
  const [resGuests, setResGuests] = useState(2);
  const [resTime, setResTime] = useState('8:00 PM');
  const [resConfirmed, setResConfirmed] = useState(false);

  // Prototype state for wholesaler
  const [riceBags, setRiceBags] = useState(10);
  const [oilTins, setOilTins] = useState(5);
  const [poSubmitted, setPoSubmitted] = useState(false);

  // Prototype state for cafe
  const [coffeeGrind, setCoffeeGrind] = useState('Espresso Fine');
  const [pickupConfirmed, setPickupConfirmed] = useState(false);

  if (!project) return null;

  const totalWholesale = (riceBags * 4200) + (oilTins * 3100);

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border-amber-500/30 shadow-2xl relative bg-[#070a16]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c1124]">
          <div className="flex items-center gap-3">
            <span className={`badge-tag ${
              project.category === 'Restaurant' ? 'badge-gold' : project.category === 'Wholesaler' ? 'badge-cyan' : 'badge-emerald'
            }`}>
              {project.category} Prototype
            </span>
            <h3 className="text-lg font-bold text-white hidden sm:block truncate max-w-xs">{project.title}</h3>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-2">
            <div className="bg-white/5 p-1 rounded-xl flex items-center border border-white/10 text-xs">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                  deviceView === 'desktop' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                  deviceView === 'mobile' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile App
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Info Banner */}
          <div className="grid md:grid-cols-12 gap-6 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="md:col-span-8">
              <h2 className="text-xl font-extrabold text-white">{project.title}</h2>
              <p className="text-xs text-amber-400 font-semibold mb-1">{project.tagline}</p>
              <p className="text-xs text-gray-300 leading-relaxed">{project.description}</p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-2">
              <button
                onClick={() => { onClose(); onBookCall(); }}
                className="gradient-btn-gold py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Build Similar Site for Me (₹2 Token)</span>
              </button>
            </div>
          </div>

          {/* Interactive Web Application Preview Window */}
          <div className={`mx-auto transition-all duration-300 ${
            deviceView === 'mobile' ? 'max-w-sm border-8 border-gray-800 rounded-[36px] shadow-2xl overflow-hidden' : 'w-full rounded-2xl border border-white/15 overflow-hidden'
          }`}>
            
            {/* Simulated Browser Bar */}
            <div className="bg-[#12182c] px-4 py-2 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="bg-[#080b16] px-4 py-1 rounded-full border border-white/10 text-[11px] text-gray-400 font-mono flex items-center gap-2">
                <span className="text-emerald-400">https://</span>
                <span>{project.title.toLowerCase().replace(/\s+/g, '')}.auracraft-demo.com</span>
              </div>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded">
                Interactive
              </span>
            </div>

            {/* Prototype Application Content */}
            <div className="bg-[#090d1c] p-6 text-white min-h-[380px]">
              
              {/* RESTAURANT PROTOTYPE */}
              {project.category === 'Restaurant' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-amber-400">La Milano Gourmet Dining</h3>
                      <p className="text-xs text-gray-400">Fine Italian Cuisine & Table Reservation Engine</p>
                    </div>
                    <span className="badge-tag badge-gold text-xs">Table Booking Open</span>
                  </div>

                  {!resConfirmed ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/10">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-400" />
                          Reserve a VIP Table
                        </h4>
                        <div>
                          <label className="text-[11px] text-gray-400">Guests Count:</label>
                          <select 
                            value={resGuests} 
                            onChange={(e) => setResGuests(e.target.value)}
                            className="input-field mt-1 text-xs"
                          >
                            <option value="2">2 Guests (Romantic Booth)</option>
                            <option value="4">4 Guests (Family Table)</option>
                            <option value="6">6 Guests (Executive Lounge)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-gray-400">Preferred Slot:</label>
                          <select 
                            value={resTime} 
                            onChange={(e) => setResTime(e.target.value)}
                            className="input-field mt-1 text-xs"
                          >
                            <option value="7:30 PM">7:30 PM</option>
                            <option value="8:00 PM">8:00 PM (Popular)</option>
                            <option value="9:15 PM">9:15 PM</option>
                          </select>
                        </div>
                        <button
                          onClick={() => setResConfirmed(true)}
                          className="w-full bg-amber-500 text-black font-bold py-2.5 rounded-lg text-xs hover:bg-amber-400 transition-colors"
                        >
                          Confirm VIP Table Reservation
                        </button>
                      </div>

                      <div className="bg-white/5 p-4 rounded-xl space-y-2 border border-white/10">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-amber-400" />
                          Featured Digital Menu
                        </h4>
                        <div className="p-2 bg-white/5 rounded text-xs flex justify-between items-center">
                          <span>Truffle Tagliatelle</span>
                          <span className="text-amber-400 font-bold">₹750</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded text-xs flex justify-between items-center">
                          <span>Woodfired Neapolitan Pizza</span>
                          <span className="text-amber-400 font-bold">₹620</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded text-xs flex justify-between items-center">
                          <span>Artisanal Tiramisu</span>
                          <span className="text-amber-400 font-bold">₹420</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/15 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-emerald-400">VIP Reservation Confirmed!</h4>
                      <p className="text-xs text-gray-300">
                        Table for <strong className="text-white">{resGuests} Guests</strong> at <strong className="text-white">{resTime}</strong> has been locked in. Confirmation SMS sent!
                      </p>
                      <button
                        onClick={() => setResConfirmed(false)}
                        className="text-xs text-amber-400 underline pt-2 font-semibold"
                      >
                        Book Another Table
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* WHOLESALER PROTOTYPE */}
              {project.category === 'Wholesaler' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400">Vanguard Wholesale B2B Trade Portal</h3>
                      <p className="text-xs text-gray-400">Commercial Commodity & Spice Bulk Ordering</p>
                    </div>
                    <span className="badge-tag badge-cyan text-xs">GST Registered Trade Portal</span>
                  </div>

                  {!poSubmitted ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-cyan-400" />
                          Bulk Order Cart (Tier 1 Discount Applied)
                        </h4>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg text-xs">
                          <div>
                            <span className="text-white font-bold block">Special Basmati Rice (50kg Bag)</span>
                            <span className="text-gray-400">₹4,200 / Bag</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setRiceBags(Math.max(1, riceBags - 1))} className="px-2 py-1 bg-white/10 rounded font-bold">-</button>
                            <span className="font-bold text-cyan-400 w-6 text-center">{riceBags}</span>
                            <button onClick={() => setRiceBags(riceBags + 1)} className="px-2 py-1 bg-white/10 rounded font-bold">+</button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg text-xs">
                          <div>
                            <span className="text-white font-bold block">Cold-Pressed Mustard Oil (20L Tin)</span>
                            <span className="text-gray-400">₹3,100 / Tin</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setOilTins(Math.max(1, oilTins - 1))} className="px-2 py-1 bg-white/10 rounded font-bold">-</button>
                            <span className="font-bold text-cyan-400 w-6 text-center">{oilTins}</span>
                            <button onClick={() => setOilTins(oilTins + 1)} className="px-2 py-1 bg-white/10 rounded font-bold">+</button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-white/10 text-sm">
                          <span className="text-gray-300 font-bold">Total Invoice Quote:</span>
                          <span className="font-extrabold text-cyan-400 text-lg">₹{totalWholesale.toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => setPoSubmitted(true)}
                          className="w-full bg-cyan-500 text-black font-bold py-2.5 rounded-lg text-xs hover:bg-cyan-400 transition-colors"
                        >
                          Generate Official Purchase Order & Request Dispatch
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-cyan-500/15 border border-cyan-500/40 p-6 rounded-2xl text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-cyan-400">Purchase Order PO-9842 Issued!</h4>
                      <p className="text-xs text-gray-300">
                        Total Amount: <strong className="text-white">₹{totalWholesale.toLocaleString()}</strong>. Dispatch scheduled from Mumbai Central Warehouse.
                      </p>
                      <button
                        onClick={() => setPoSubmitted(false)}
                        className="text-xs text-cyan-400 underline pt-2 font-semibold"
                      >
                        Create New Trade Order
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* CAFE PROTOTYPE */}
              {project.category === 'Cafe' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-emerald-400">Brew & Bean Coffee App</h3>
                      <p className="text-xs text-gray-400">Express Pickup & Artisanal Bean Subscription</p>
                    </div>
                    <span className="badge-tag badge-emerald text-xs">Express Pickup Live</span>
                  </div>

                  {!pickupConfirmed ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Coffee className="w-4 h-4 text-emerald-400" />
                          Order Express Metro Pickup
                        </h4>

                        <div className="space-y-2 text-xs">
                          <div>
                            <label className="text-gray-400 text-[11px]">Select Grind Style for Bean Bag (250g):</label>
                            <select
                              value={coffeeGrind}
                              onChange={(e) => setCoffeeGrind(e.target.value)}
                              className="input-field mt-1 text-xs"
                            >
                              <option value="Whole Bean">Whole Bean (Unmilled)</option>
                              <option value="Espresso Fine">Espresso Fine Grind</option>
                              <option value="French Press Coarse">French Press Coarse</option>
                            </select>
                          </div>

                          <div className="p-3 bg-white/5 rounded-lg flex justify-between items-center">
                            <div>
                              <span className="text-white font-bold block">1x Double Oat Milk Cappuccino</span>
                              <span className="text-gray-400 text-[10px]">Estimated Pickup: 7 Mins</span>
                            </div>
                            <span className="text-emerald-400 font-bold">₹280</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setPickupConfirmed(true)}
                          className="w-full bg-emerald-500 text-black font-bold py-2.5 rounded-lg text-xs hover:bg-emerald-400 transition-colors"
                        >
                          Express Pay & Claim Digital Loyalty Stamp
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/15 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-emerald-400">Order Ready for Pickup! Ticket #74</h4>
                      <p className="text-xs text-gray-300">
                        Barista is preparing your Oat Milk Cappuccino & {coffeeGrind} Bean Bag. Pick up at Express Bar Counter!
                      </p>
                      <button
                        onClick={() => setPickupConfirmed(false)}
                        className="text-xs text-emerald-400 underline pt-2 font-semibold"
                      >
                        Order Again
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
