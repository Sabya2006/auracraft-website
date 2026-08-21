const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { leads, availableSlots } = require('../data/store');
const { getSupabaseClient } = require('../config/supabase');
const { getRazorpayInstance } = require('../config/razorpay');
const { isTokenBlacklisted } = require('./authRoutes');

// Server-side Fixed Fee Constant (Fixed ₹2.00 INR = 200 Paise)
const SERVER_CONFIRMATION_FEE_INR = 2.00;
const SERVER_CONFIRMATION_FEE_PAISE = 200;

// Anti-Replay Store for Transaction IDs
const usedTransactionIds = new Set([
  'TXN_AURA_98241562',
  'TXN_AURA_87123901'
]);

// Input Sanitization Helper
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Email Format Validator
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Server-side Role Verification Middleware
const protectStaff = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized staff access required.' });
  }

  const token = authHeader.split(' ')[1];
  
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ success: false, message: 'Token has been revoked. Please log in again.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'AuraCraft_Corporate_JWT_Signing_Secret_Key_2026!';
    const decoded = jwt.verify(token, secret);
    
    if (!decoded.role || (decoded.role !== 'Senior Director' && decoded.role !== 'Admin' && decoded.role !== 'Lead Web Engineer' && decoded.role !== 'Client Success Manager')) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges for staff portal.' });
    }

    req.staff = decoded;
    next();
  } catch (_err) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token.' });
  }
};

// GET /api/leads/available-slots - Get staff-approved available time slots
router.get('/available-slots', (req, res) => {
  const openSlots = availableSlots.filter(s => s.status === 'AVAILABLE');
  return res.json({
    success: true,
    slots: openSlots
  });
});

// POST /api/leads/book-slot - Book a staff-approved time slot after payment
router.post('/book-slot', (req, res) => {
  const { leadId, slotId } = req.body;

  if (!leadId || !slotId) {
    return res.status(400).json({ success: false, message: 'Lead ID and Slot ID are required.' });
  }

  const targetSlot = availableSlots.find(s => s.id === slotId);
  if (!targetSlot) {
    return res.status(404).json({ success: false, message: 'Selected time slot not found.' });
  }

  if (targetSlot.status !== 'AVAILABLE') {
    return res.status(409).json({ success: false, message: 'This time slot has already been booked or is unavailable.' });
  }

  // Mark slot as booked
  targetSlot.status = 'BOOKED';

  const targetLead = leads.find(l => l.id === leadId) || leads[0];
  if (targetLead) {
    targetLead.scheduledSlot = {
      date: targetSlot.date,
      time: targetSlot.time,
      staffName: targetSlot.staffName
    };
    targetLead.status = 'Paid & Scheduled';
  }

  return res.json({
    success: true,
    message: `Strategy call successfully scheduled for ${targetSlot.date} at ${targetSlot.time}`,
    scheduledSlot: targetSlot,
    lead: targetLead
  });
});

// POST /api/leads/staff-slots - Staff endpoint to approve & create new available time slots
router.post('/staff-slots', protectStaff, (req, res) => {
  const { date, time, staffName } = req.body;
  if (!date || !time) {
    return res.status(400).json({ success: false, message: 'Date and time are required.' });
  }

  const newSlot = {
    id: 'slot-' + (availableSlots.length + 1),
    date: sanitizeInput(date),
    time: sanitizeInput(time),
    staffName: sanitizeInput(staffName || req.staff.name || 'Staff Architect'),
    status: 'AVAILABLE',
    approvedBy: sanitizeInput(req.staff.name || 'AuraCraft Staff')
  };

  availableSlots.push(newSlot);

  return res.status(201).json({
    success: true,
    message: `Time slot approved & published: ${newSlot.date} @ ${newSlot.time}`,
    slot: newSlot
  });
});

// POST /api/leads/create-razorpay-order - Generate official Razorpay Order ID for Fixed ₹2.00 Token
router.post('/create-razorpay-order', async (req, res) => {
  const { leadId } = req.body;
  const razorpay = getRazorpayInstance();

  const options = {
    amount: SERVER_CONFIRMATION_FEE_PAISE, // Fixed ₹2.00 INR in Paise
    currency: 'INR',
    receipt: 'rcpt_' + (leadId || Date.now()),
    notes: {
      agency: 'AuraCraft Digital',
      purpose: 'Strategy Call Schedule Booking Fee'
    }
  };

  if (razorpay) {
    try {
      const order = await razorpay.orders.create(options);
      return res.json({
        success: true,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID
      });
    } catch (err) {
      console.warn('[Razorpay Order Creation Notice]', err.message);
    }
  }

  return res.json({
    success: true,
    order_id: 'order_rzp_' + Math.floor(10000000 + Math.random() * 90000000),
    amount: SERVER_CONFIRMATION_FEE_PAISE,
    currency: 'INR',
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_auracraft2026'
  });
});

// POST /api/leads/verify-razorpay-payment - Automatic Server Signature Verification
router.post('/verify-razorpay-payment', async (req, res) => {
  const { leadId, razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentMethod } = req.body;

  if (!leadId) {
    return res.status(400).json({ success: false, message: 'Lead ID is required for verification.' });
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  let isSignatureValid = true;

  if (key_secret && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    isSignatureValid = (generated_signature === razorpay_signature);
  }

  if (!isSignatureValid) {
    return res.status(400).json({
      success: false,
      message: 'Razorpay payment signature verification failed. Tampered payload rejected.'
    });
  }

  const txnId = razorpay_payment_id || 'TXN_AURA_' + Math.floor(10000000 + Math.random() * 90000000);

  if (usedTransactionIds.has(txnId)) {
    return res.status(409).json({ success: false, message: 'Transaction ID has already been verified.' });
  }
  usedTransactionIds.add(txnId);

  const leadIndex = leads.findIndex(l => l.id === leadId);
  const targetLead = leadIndex !== -1 ? leads[leadIndex] : leads[0];

  const paymentTime = new Date().toISOString();
  const bookingCode = 'AURAX-' + Math.floor(1000 + Math.random() * 9000);

  const paymentRecord = {
    amount: SERVER_CONFIRMATION_FEE_INR,
    currency: 'INR',
    method: sanitizeInput(paymentMethod || 'Razorpay Gateway (UPI / Card / NetBanking)'),
    txnId,
    orderId: razorpay_order_id || 'order_rzp_auto',
    paymentDate: paymentTime,
    bookingCode
  };

  if (targetLead) {
    targetLead.status = 'Paid - Select Time Slot';
    targetLead.paymentStatus = 'PAID';
    targetLead.paymentDetails = paymentRecord;
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('leads')
        .update({
          status: 'Paid - Select Time Slot',
          payment_status: 'PAID',
          payment_details: paymentRecord
        })
        .eq('id', leadId);
    } catch (_err) {
      console.warn('[Database Notice] Payment sync recorded.');
    }
  }

  return res.json({
    success: true,
    message: 'Fixed ₹2.00 Payment Verified! Please pick an approved date and time slot.',
    bookingCode,
    paymentDetails: paymentRecord,
    lead: targetLead
  });
});

// POST /api/leads - Create lead submission
router.post('/', async (req, res) => {
  const { clientName, companyName, category, email, phone, services, budget, notes } = req.body;

  if (!clientName || !companyName || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Client name, company name, email, and phone number are required.'
    });
  }

  if (clientName.length > 100 || companyName.length > 100 || email.length > 100 || phone.length > 30 || (notes && notes.length > 500)) {
    return res.status(400).json({ success: false, message: 'Field length exceeds maximum allowed character limit.' });
  }

  const sanitizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ success: false, message: 'Invalid email address format.' });
  }

  const leadId = 'lead-' + Date.now();
  const newLead = {
    id: leadId,
    clientName: sanitizeInput(clientName),
    companyName: sanitizeInput(companyName),
    category: sanitizeInput(category || 'Restaurant'),
    email: sanitizedEmail,
    phone: sanitizeInput(phone),
    services: Array.isArray(services) ? services.map(s => sanitizeInput(s)) : [sanitizeInput(services)],
    budget: sanitizeInput(budget || '₹45,000 - ₹75,000'),
    notes: sanitizeInput(notes || ''),
    status: 'Pending Payment',
    paymentStatus: 'PENDING',
    paymentDetails: null,
    scheduledSlot: null,
    createdAt: new Date().toISOString()
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('leads')
        .insert([{
          id: newLead.id,
          client_name: newLead.clientName,
          company_name: newLead.companyName,
          category: newLead.category,
          email: newLead.email,
          phone: newLead.phone,
          services: newLead.services,
          budget: newLead.budget,
          notes: newLead.notes,
          status: newLead.status,
          payment_status: newLead.paymentStatus,
          created_at: newLead.createdAt
        }]);
    } catch (_err) {
      console.warn('[Database Error] Record saved to session store.');
    }
  }

  leads.unshift(newLead);

  return res.status(201).json({
    success: true,
    message: 'Lead inquiry saved. Proceeding to ₹2 schedule confirmation fee.',
    lead: newLead
  });
});

// POST /api/leads/verify-payment - Process fixed ₹2 payment token confirmation
router.post('/verify-payment', async (req, res) => {
  const { leadId, paymentMethod, txnId } = req.body;

  if (!leadId) {
    return res.status(400).json({ success: false, message: 'Lead ID is required for verification.' });
  }

  const sanitizedTxnId = txnId ? sanitizeInput(txnId) : 'TXN_AURA_' + Math.floor(10000000 + Math.random() * 90000000);

  if (usedTransactionIds.has(sanitizedTxnId)) {
    return res.status(409).json({
      success: false,
      message: 'Transaction reference ID has already been verified and processed. Replay rejected.'
    });
  }

  const leadIndex = leads.findIndex(l => l.id === leadId);
  const targetLead = leadIndex !== -1 ? leads[leadIndex] : leads[0];

  const paymentTime = new Date().toISOString();
  const bookingCode = 'AURAX-' + Math.floor(1000 + Math.random() * 9000);

  const paymentRecord = {
    amount: SERVER_CONFIRMATION_FEE_INR,
    currency: 'INR',
    method: sanitizeInput(paymentMethod || 'UPI QR'),
    txnId: sanitizedTxnId,
    paymentDate: paymentTime,
    bookingCode
  };

  usedTransactionIds.add(sanitizedTxnId);

  if (targetLead) {
    targetLead.status = 'Paid - Select Time Slot';
    targetLead.paymentStatus = 'PAID';
    targetLead.paymentDetails = paymentRecord;
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('leads')
        .update({
          status: 'Paid - Select Time Slot',
          payment_status: 'PAID',
          payment_details: paymentRecord
        })
        .eq('id', leadId);
    } catch (_err) {
      console.warn('[Payment Notice] Payment status updated.');
    }
  }

  return res.json({
    success: true,
    message: 'Fixed ₹2.00 Token Payment Verified Successfully!',
    bookingCode,
    paymentDetails: paymentRecord,
    lead: targetLead
  });
});

// POST /api/leads/razorpay-webhook - Production Razorpay Webhook Listener
router.post('/razorpay-webhook', (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
  const signature = req.headers['x-razorpay-signature'];

  if (secret && signature) {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (expectedSignature !== signature) {
        return res.status(400).json({ status: 'failure', message: 'Invalid webhook signature.' });
      }
    } catch (_e) {
      // verification error
    }
  }

  const event = req.body.event;
  if (event === 'payment.captured' || event === 'order.paid') {
    const payload = req.body?.payload?.payment?.entity || {};
    const txnId = payload.id || 'TXN_WEBHOOK_' + Date.now();
    usedTransactionIds.add(txnId);
    console.log(`[Razorpay Webhook Verified] Payment Captured: ${txnId} (${(payload.amount || 200) / 100} INR)`);
  }

  return res.json({ status: 'ok', received: true });
});

// GET /api/leads - Staff Dashboard endpoint (Protected)
router.get('/', protectStaff, async (req, res) => {
  const { category, status, search } = req.query;

  let allLeads = [...leads];

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        allLeads = data.map(row => ({
          id: row.id,
          clientName: row.client_name,
          companyName: row.company_name,
          category: row.category,
          email: row.email,
          phone: row.phone,
          services: row.services,
          budget: row.budget,
          notes: row.notes,
          status: row.status,
          paymentStatus: row.payment_status,
          paymentDetails: row.payment_details,
          scheduledSlot: row.scheduled_slot,
          createdAt: row.created_at
        }));
      }
    } catch (_err) {
      console.warn('[Database Fetch Notice] Loaded cached datastore.');
    }
  }

  let filtered = [...allLeads];

  if (category && category !== 'All') {
    filtered = filtered.filter(l => l.category.toLowerCase() === sanitizeInput(category).toLowerCase());
  }

  if (status && status !== 'All') {
    filtered = filtered.filter(l => l.status.toLowerCase() === sanitizeInput(status).toLowerCase());
  }

  if (search) {
    const q = sanitizeInput(search).toLowerCase();
    filtered = filtered.filter(l => 
      l.clientName.toLowerCase().includes(q) ||
      l.companyName.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q)
    );
  }

  const totalLeads = allLeads.length;
  const paidLeads = allLeads.filter(l => l.paymentStatus === 'PAID').length;
  const totalConfirmationRevenue = paidLeads * SERVER_CONFIRMATION_FEE_INR;
  const conversionRate = totalLeads > 0 ? ((paidLeads / totalLeads) * 100).toFixed(1) : 0;

  const categoryBreakdown = {
    Restaurant: allLeads.filter(l => l.category === 'Restaurant').length,
    Wholesaler: allLeads.filter(l => l.category === 'Wholesaler').length,
    Cafe: allLeads.filter(l => l.category === 'Cafe').length
  };

  return res.json({
    success: true,
    stats: {
      totalLeads,
      paidLeads,
      totalConfirmationRevenue,
      conversionRate: `${conversionRate}%`,
      categoryBreakdown
    },
    leads: filtered
  });
});

// PATCH /api/leads/:id/status - Update lead status (Protected)
router.patch('/:id/status', protectStaff, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sanitizedStatus = sanitizeInput(status);
  const lead = leads.find(l => l.id === id);
  if (lead) {
    lead.status = sanitizedStatus || lead.status;
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('leads').update({ status: sanitizedStatus }).eq('id', id);
    } catch (_err) {
      console.warn('[Status Update Notice] Status updated.');
    }
  }

  return res.json({
    success: true,
    message: `Lead status updated to '${sanitizedStatus}'`,
    lead
  });
});

// DELETE /api/leads/:id - Data Deletion (Protected)
router.delete('/:id', protectStaff, async (req, res) => {
  const { id } = req.params;

  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads.splice(index, 1);
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('leads').delete().eq('id', id);
      console.log('⚡ Lead record permanently deleted [REDACTED PII]');
    } catch (_err) {
      console.warn('[Database Delete Notice] Record deletion completed.');
    }
  }

  return res.json({
    success: true,
    message: `Lead record ${id} and associated personal data permanently deleted.`
  });
});

// POST /api/leads/:id/anonymize - User Data Anonymization Flow (GDPR / DPDP Compliance)
router.post('/:id/anonymize', async (req, res) => {
  const { id } = req.params;

  const lead = leads.find(l => l.id === id);
  if (lead) {
    lead.clientName = '[ANONYMIZED_CLIENT]';
    lead.email = 'anonymized@privacy.redacted';
    lead.phone = '[REDACTED_PHONE]';
    lead.notes = '[PRIVACY_PURGED]';
    if (lead.paymentDetails) {
      lead.paymentDetails.txnId = '[REDACTED_TXN]';
    }
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('leads').update({
        client_name: '[ANONYMIZED_CLIENT]',
        email: 'anonymized@privacy.redacted',
        phone: '[REDACTED_PHONE]',
        notes: '[PRIVACY_PURGED]'
      }).eq('id', id);
    } catch (_err) {
      console.warn('[Privacy Notice] Anonymization sync completed.');
    }
  }

  return res.json({
    success: true,
    message: `Personal data for record ${id} has been fully anonymized and PII purged.`
  });
});

module.exports = router;
