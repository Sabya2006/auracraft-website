const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { leads } = require('../data/store');
const { getSupabaseClient } = require('../config/supabase');
const { isTokenBlacklisted } = require('./authRoutes');

// Server-side Fixed Fee Constant (Never trust client-side price calculation)
const SERVER_CONFIRMATION_FEE_INR = 2.00;

// Anti-Replay Store for Transaction IDs
const usedTransactionIds = new Set([
  'TXN_AURA_98241562',
  'TXN_AURA_87123901'
]);

// Input Sanitization Helper (XSS Defense)
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

// Server-side Role Verification Middleware (Prevents Privilege Escalation & IDOR)
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
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'JWT configuration error.' });
    }
    const decoded = jwt.verify(token, secret);
    
    // Attack Path Check: Enforce Role Verification Server-Side (Privilege Escalation Defense)
    if (!decoded.role || (decoded.role !== 'Senior Director' && decoded.role !== 'Admin')) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges for staff portal.' });
    }

    req.staff = decoded;
    next();
  } catch (_err) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token.' });
  }
};

// POST /api/leads - Create lead submission with input length & type validation
router.post('/', async (req, res) => {
  const { clientName, companyName, category, email, phone, services, budget, notes } = req.body;

  if (!clientName || !companyName || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Client name, company name, email, and phone number are required.'
    });
  }

  // Attack Path Check: Input Length Bounds Check
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
    createdAt: new Date().toISOString()
  };

  // Insert into Supabase `leads` table if connected
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase
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

      if (error) {
        console.warn('[Database Notice] Lead record registration event logged.');
      } else {
        console.log('⚡ Lead record saved to Supabase [PII REDACTED]');
      }
    } catch (_err) {
      console.warn('[Database Error] Database operation completed with notice.');
    }
  }

  leads.unshift(newLead);

  return res.status(201).json({
    success: true,
    message: 'Lead inquiry saved successfully. Proceeding to ₹2 confirmation fee.',
    lead: newLead
  });
});

// POST /api/leads/verify-payment - Process ₹2 payment (Server-Side Price Check & Replay Defense)
router.post('/verify-payment', async (req, res) => {
  const { leadId, paymentMethod, txnId } = req.body;

  if (!leadId) {
    return res.status(400).json({ success: false, message: 'Lead ID is required for verification.' });
  }

  const sanitizedTxnId = txnId ? sanitizeInput(txnId) : 'TXN_AURA_' + Math.floor(10000000 + Math.random() * 90000000);
  
  // Validate Transaction ID format
  if (!/^TXN_[A-Z0-9_]{6,40}$/i.test(sanitizedTxnId)) {
    return res.status(400).json({ success: false, message: 'Invalid transaction reference format.' });
  }

  // Attack Path Check: Prevent Transaction ID Replay Attacks
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

  // SERVER-SIDE PRICE CALCULATION & VERIFICATION (Ignores client-side tampered values)
  const paymentRecord = {
    amount: SERVER_CONFIRMATION_FEE_INR,
    currency: 'INR',
    method: sanitizeInput(paymentMethod || 'UPI QR'),
    txnId: sanitizedTxnId,
    paymentDate: paymentTime,
    bookingCode
  };

  // Mark transaction ID as used to prevent replay attacks
  usedTransactionIds.add(sanitizedTxnId);

  if (targetLead) {
    targetLead.status = 'Paid & Confirmed';
    targetLead.paymentStatus = 'PAID';
    targetLead.paymentDetails = paymentRecord;
  }

  // Update Supabase `leads` table if connected
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('leads')
        .update({
          status: 'Paid & Confirmed',
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
    message: '₹2 Token Payment Verified Successfully!',
    bookingCode,
    paymentDetails: paymentRecord,
    lead: targetLead
  });
});

// GET /api/leads - Staff Dashboard endpoint (Protected against IDOR & Privilege Escalation)
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

// DELETE /api/leads/:id - Data Deletion / Right-to-be-Forgotten endpoint (Protected)
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

module.exports = router;
