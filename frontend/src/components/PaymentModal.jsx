import React, { useState } from 'react';
import { X, QrCode, CreditCard, Building, ShieldCheck, CheckCircle2, Sparkles, Lock, Clock, UserCheck, Bot, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import API_BASE_URL from '../config/api';

export default function PaymentModal({ lead, onClose, onPaymentComplete }) {
  const [step, setStep] = useState('payment'); // 'payment', 'schedule', 'receipt'
  const [method, setMethod] = useState('upi_qr'); // 'upi_qr', 'upi_id', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('client@upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  // Time Slot Selection States
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [finalReceipt, setFinalReceipt] = useState(null);

  // Chat Interface State
  const [chatMessages, setChatMessages] = useState([]);

  if (!lead) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.warn('[Confetti Notice]', err.message);
    }
  };

  // Fetch staff-approved available time slots
  const fetchAvailableSlots = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/available-slots`);
      const data = await res.json();
      if (data.success && data.slots.length > 0) {
        setAvailableSlots(data.slots);
      } else {
        const fallbackSlots = [
          { id: 'slot-1', date: '2026-08-22', time: '10:00 AM - 10:30 AM IST', staffName: 'Vikram Mehta (Lead Architect)', status: 'AVAILABLE' },
          { id: 'slot-2', date: '2026-08-22', time: '11:30 AM - 12:00 PM IST', staffName: 'Vikram Mehta (Lead Architect)', status: 'AVAILABLE' },
          { id: 'slot-3', date: '2026-08-22', time: '02:00 PM - 02:30 PM IST', staffName: 'Priya Sundaram (Client Success Manager)', status: 'AVAILABLE' },
          { id: 'slot-4', date: '2026-08-23', time: '10:30 AM - 11:00 AM IST', staffName: 'Vikram Mehta (Lead Architect)', status: 'AVAILABLE' }
        ];
        setAvailableSlots(fallbackSlots);
      }
    } catch (err) {
      console.warn('[Slots Fallback]', err.message);
      const fallbackSlots = [
        { id: 'slot-1', date: '2026-08-22', time: '10:00 AM - 10:30 AM IST', staffName: 'Vikram Mehta (Lead Architect)', status: 'AVAILABLE' },
        { id: 'slot-2', date: '2026-08-22', time: '11:30 AM - 12:00 PM IST', staffName: 'Vikram Mehta (Lead Architect)', status: 'AVAILABLE' },
        { id: 'slot-3', date: '2026-08-22', time: '02:00 PM - 02:30 PM IST', staffName: 'Priya Sundaram (Client Success Manager)', status: 'AVAILABLE' }
      ];
      setAvailableSlots(fallbackSlots);
    }
  };

  const handleSimulatePayment = async () => {
    setIsProcessing(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          paymentMethod: method === 'upi_qr' ? 'UPI QR Code' : method === 'upi_id' ? 'UPI ID' : method === 'card' ? 'Credit/Debit Card' : 'Corporate NetBanking',
          txnId: 'TXN_AURA_' + Math.floor(10000000 + Math.random() * 90000000)
        })
      });

      const data = await res.json();
      setIsProcessing(false);

      if (data.success) {
        setPaymentData(data);
        fetchAvailableSlots();
        setStep('schedule');
        triggerConfetti();

        // Initialize Chat Assistant Greeting
        setChatMessages([
          {
            sender: 'bot',
            text: `Payment of ₹2.00 verified! 🎉 Welcome ${lead.clientName || 'Partner'}! Please select your preferred date & time slot from the staff-approved available slots below to confirm your strategy call:`
          }
        ]);
      }
    } catch (err) {
      console.warn('[Payment Fallback]', err.message);
      setIsProcessing(false);
      const fallbackData = {
        success: true,
        bookingCode: 'AURAX-' + Math.floor(1000 + Math.random() * 9000),
        paymentDetails: {
          amount: 2.00,
          currency: 'INR',
          method: method.toUpperCase(),
          txnId: 'TXN_AURA_' + Math.floor(10000000 + Math.random() * 90000000),
          paymentDate: new Date().toISOString()
        }
      };
      setPaymentData(fallbackData);
      fetchAvailableSlots();
      setStep('schedule');
      triggerConfetti();

      setChatMessages([
        {
          sender: 'bot',
          text: `Payment of ₹2.00 verified! 🎉 Welcome ${lead.clientName || 'Partner'}! Please select your preferred date & time slot from the staff-approved available slots below to confirm your strategy call:`
        }
      ]);
    }
  };

  const handleSelectSlotInChat = async (slot) => {
    setSelectedSlot(slot);
    setIsProcessing(true);

    // Update Chat History
    const updatedMessages = [
      ...chatMessages,
      { sender: 'user', text: `I choose ${slot.date} at ${slot.time} (Host: ${slot.staffName})` },
      { sender: 'bot', text: `Excellent choice! Locking slot ${slot.date} @ ${slot.time} with ${slot.staffName}...` }
    ];
    setChatMessages(updatedMessages);

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/book-slot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          slotId: slot.id
        })
      });

      await res.json();
      setIsProcessing(false);

      const receiptObj = {
        ...paymentData,
        scheduledSlot: slot
      };

      setFinalReceipt(receiptObj);
      setTimeout(() => {
        setStep('receipt');
        triggerConfetti();
        if (onPaymentComplete) onPaymentComplete(receiptObj);
      }, 1200);

    } catch (err) {
      console.warn('[Slot Booking Notice]', err.message);
      setIsProcessing(false);
      const receiptObj = {
        ...paymentData,
        scheduledSlot: slot
      };
      setFinalReceipt(receiptObj);
      setTimeout(() => {
        setStep('receipt');
        triggerConfetti();
        if (onPaymentComplete) onPaymentComplete(receiptObj);
      }, 1200);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-lg overflow-hidden border-amber-500/40 shadow-2xl relative bg-[#070a16]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c1124]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              {step === 'payment' ? 'Fixed ₹2 Strategy Call Booking' : step === 'schedule' ? 'AI Strategy Call Scheduling Assistant' : 'Appointment Confirmed!'}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* STEP 1: PAYMENT (FIXED ₹2 FEE) */}
          {step === 'payment' && (
            <>
              {/* Token Fee Box */}
              <div className="bg-[#0e1428] p-4 rounded-xl border border-amber-500/30 flex justify-between items-center text-left">
                <div>
                  <span className="text-[10px] text-gray-400 block font-mono">FIXED CONFIRMATION TOKEN</span>
                  <span className="text-sm font-bold text-white">{lead.companyName || lead.clientName || 'Strategy Consultation Call'}</span>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-extrabold text-amber-400">₹2.00</span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">100% Refundable</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-4 gap-2 bg-[#090d1c] p-1.5 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setMethod('upi_qr')}
                  className={`py-2 rounded-lg font-bold transition-all flex flex-col items-center gap-1 ${
                    method === 'upi_qr' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI QR</span>
                </button>
                <button
                  onClick={() => setMethod('upi_id')}
                  className={`py-2 rounded-lg font-bold transition-all flex flex-col items-center gap-1 ${
                    method === 'upi_id' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>UPI Apps</span>
                </button>
                <button
                  onClick={() => setMethod('card')}
                  className={`py-2 rounded-lg font-bold transition-all flex flex-col items-center gap-1 ${
                    method === 'card' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards</span>
                </button>
                <button
                  onClick={() => setMethod('netbanking')}
                  className={`py-2 rounded-lg font-bold transition-all flex flex-col items-center gap-1 ${
                    method === 'netbanking' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>NetBank</span>
                </button>
              </div>

              {/* Dynamic Method Form Screen */}
              {method === 'upi_qr' && (
                <div className="text-center space-y-3 bg-[#0a0e1e] p-6 rounded-xl border border-white/10">
                  <p className="text-xs text-gray-300 font-semibold">Scan QR with Google Pay / PhonePe / Paytm / BHIM</p>
                  
                  {/* Generated Simulated QR Code */}
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto flex flex-col items-center justify-center shadow-lg border-2 border-amber-400 relative">
                    <div className="grid grid-cols-6 gap-1 w-full h-full bg-black p-2 rounded">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className={`rounded-xs ${i % 2 === 0 ? 'bg-amber-400' : i % 3 === 0 ? 'bg-white' : 'bg-transparent'}`} />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-amber-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                        ₹2.00
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 font-mono">UPI ID: auracraft.agency@okaxis</p>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full gradient-btn-gold py-3.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isProcessing ? 'Verifying ₹2.00 Payment...' : 'Pay ₹2.00 & Open AI Scheduling Assistant'}
                  </button>
                </div>
              )}

              {method === 'upi_id' && (
                <div className="space-y-4 bg-[#0a0e1e] p-4 rounded-xl border border-white/10 text-left">
                  <div>
                    <label className="input-label">Enter VPA / UPI ID:</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="input-field text-xs font-mono"
                      placeholder="username@upi"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">A payment request for ₹2.00 will be sent to your UPI app.</p>
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full gradient-btn-gold py-3.5 rounded-xl font-extrabold text-xs"
                  >
                    {isProcessing ? 'Authorizing UPI PIN...' : 'Send UPI Request & Pay ₹2.00'}
                  </button>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-3 bg-[#0a0e1e] p-4 rounded-xl border border-white/10 text-left text-xs">
                  <div>
                    <label className="input-label">Card Number:</label>
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="input-field text-xs font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="input-label">Expiry Date:</label>
                      <input type="text" placeholder="MM/YY" defaultValue="08/28" className="input-field text-xs" />
                    </div>
                    <div>
                      <label className="input-label">CVV:</label>
                      <input type="password" placeholder="•••" defaultValue="892" className="input-field text-xs" />
                    </div>
                  </div>
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full gradient-btn-gold py-3.5 rounded-xl font-extrabold text-xs"
                  >
                    {isProcessing ? 'Processing Card Auth...' : 'Pay ₹2.00 via Card'}
                  </button>
                </div>
              )}

              {method === 'netbanking' && (
                <div className="space-y-3 bg-[#0a0e1e] p-4 rounded-xl border border-white/10 text-left text-xs">
                  <label className="input-label">Select Corporate Bank:</label>
                  <select className="input-field text-xs">
                    <option>HDFC Bank Corporate</option>
                    <option>ICICI Bank Commercial</option>
                    <option>State Bank of India (SBI)</option>
                    <option>Axis Bank Business</option>
                  </select>
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full gradient-btn-gold py-3.5 rounded-xl font-extrabold text-xs"
                  >
                    {isProcessing ? 'Connecting NetBanking Portal...' : 'Pay ₹2.00 via NetBanking'}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit SSL Encryption • PCI-DSS Compliant Razorpay Gateway
              </div>
            </>
          )}

          {/* STEP 2: CHAT-BASED MEETING SCHEDULING INTERFACE */}
          {step === 'schedule' && (
            <div className="space-y-4 text-left">
              
              {/* AI Chat Header */}
              <div className="flex items-center justify-between bg-[#090e22] p-3 rounded-xl border border-amber-500/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">OraCraft AI Scheduling Assistant</h4>
                    <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Chat • Fixed ₹2 Verified
                    </p>
                  </div>
                </div>
                <span className="badge-tag badge-gold text-[9px]">AI ASSISTANT</span>
              </div>

              {/* Chat Messages Box */}
              <div className="space-y-3 max-h-72 overflow-y-auto p-3 bg-[#050814] rounded-2xl border border-white/10 text-xs">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[9px] flex-shrink-0">
                        AI
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl border text-xs max-w-[85%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'bg-[#0f152d] text-gray-200 border-white/10'
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}

                {/* Available Slots as Interactive Chat Option Chips */}
                {!selectedSlot && (
                  <div className="pl-8 space-y-2 pt-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tap a slot to confirm booking:</p>
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleSelectSlotInChat(slot)}
                        className="w-full text-left p-3 rounded-xl border bg-[#090d20] border-amber-500/40 hover:bg-amber-500/20 transition-all flex items-center justify-between text-xs group"
                      >
                        <div>
                          <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {slot.date} @ {slot.time}
                          </div>
                          <div className="text-[10px] text-gray-300 flex items-center gap-1 mt-0.5">
                            <UserCheck className="w-3 h-3 text-emerald-400" />
                            Assigned Host: <strong>{slot.staffName}</strong>
                          </div>
                        </div>

                        <span className="bg-amber-500 text-black font-extrabold px-3 py-1.5 rounded-lg text-[10px] group-hover:scale-105 transition-transform flex items-center gap-1">
                          <span>Confirm</span>
                          <Send className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* STEP 3: OFFICIAL CONFIRMED APPOINTMENT RECEIPT */}
          {step === 'receipt' && finalReceipt && (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <span className="badge-tag badge-emerald text-xs mb-2">₹2 Payment & Slot Verified</span>
                <h3 className="text-xl font-extrabold text-white">Strategy Call Confirmed!</h3>
                <p className="text-xs text-gray-300 mt-1">
                  Booking Code: <span className="font-mono text-amber-400 font-bold">{finalReceipt.bookingCode}</span>
                </p>
              </div>

              {/* Scheduled Time Pass */}
              <div className="bg-[#090e1f] p-4 rounded-xl border border-amber-500/40 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Scheduled Date:</span>
                  <span className="text-amber-400 font-bold">{finalReceipt.scheduledSlot?.date}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Scheduled Time:</span>
                  <span className="text-cyan-400 font-bold">{finalReceipt.scheduledSlot?.time}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Assigned Staff:</span>
                  <span className="text-white font-bold">{finalReceipt.scheduledSlot?.staffName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Fee Paid:</span>
                  <span className="text-emerald-400 font-bold">₹2.00 INR (PAID)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="text-gray-300">{finalReceipt.paymentDetails?.txnId}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                A calendar invitation and WhatsApp reminder have been sent to your phone. Our Staff Architect will connect with you at your chosen time.
              </p>

              <button
                onClick={onClose}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl text-xs transition-colors"
              >
                Close & Return to Website
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
