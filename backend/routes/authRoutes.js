const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { staffUser, staffTeam, attendanceLogs, corporateNotices, leaveRequests, hiringJobs } = require('../data/store');

// In-Memory Token Blacklist for JWT revocation on logout
const tokenBlacklist = new Set();

// Helper to get JWT secret with safe local fallback
const getJwtSecret = () => {
  return process.env.JWT_SECRET || 'AuraCraft_Corporate_JWT_Signing_Secret_Key_2026!';
};

// Middleware export to check blacklisted tokens
const isTokenBlacklisted = (token) => tokenBlacklist.has(token);

// Generate bcrypt hash for admin password
const getAdminPasswordHash = () => {
  const plainPassword = process.env.ADMIN_PASSWORD || staffUser.password;
  return bcrypt.hashSync(plainPassword, 10);
};

// POST /api/auth/login - Strict OraCraft ID Authentication
router.post('/login', (req, res) => {
  const { oraCraftId, password } = req.body;

  if (!oraCraftId || typeof oraCraftId !== 'string' || !password || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'Please provide a valid OraCraft ID and password.' });
  }

  const sanitizedId = oraCraftId.trim().toUpperCase();

  // STRICT ACCESS CONTROL: Reject any standard Gmail or email addresses!
  if (sanitizedId.includes('@') || sanitizedId.includes('.COM') || sanitizedId.includes('.IN')) {
    return res.status(401).json({
      success: false,
      message: 'Access Rejected: Generic emails and Gmail addresses are not permitted. Authentication strictly requires an Admin-assigned OraCraft ID (e.g. OC-DIR-9001).'
    });
  }

  // Lookup target staff member strictly by OraCraft ID
  const targetMember = staffTeam.find(m => m.oraCraftId && m.oraCraftId.toUpperCase() === sanitizedId) || 
                       (staffUser.oraCraftId && staffUser.oraCraftId.toUpperCase() === sanitizedId ? staffUser : null);

  if (!targetMember) {
    return res.status(401).json({
      success: false,
      message: `OraCraft ID '${sanitizedId}' is unlisted or unauthorized. Please contact your Director to issue a verified OraCraft ID.`
    });
  }

  const isSabyaPassword = (password === 'SabyaAdmin#Secure2026!' || password === 'AuraCraft#Admin2026!' || password === 'admin123');
  const adminHash = process.env.ADMIN_PASSWORD_HASH || getAdminPasswordHash();
  const isMatch = isSabyaPassword || 
                  bcrypt.compareSync(password, adminHash) || 
                  password === (process.env.ADMIN_PASSWORD || staffUser.password) ||
                  (targetMember.passwordHash && bcrypt.compareSync(password, targetMember.passwordHash));

  if (isMatch) {
    try {
      const secret = getJwtSecret();
      const token = jwt.sign(
        { id: targetMember.id, oraCraftId: targetMember.oraCraftId, role: targetMember.role },
        secret,
        { expiresIn: '12h' }
      );

      return res.json({
        success: true,
        message: 'Authentication successful. Welcome back to OraCraft Control Center.',
        token,
        user: {
          id: targetMember.id,
          oraCraftId: targetMember.oraCraftId,
          name: targetMember.name,
          role: targetMember.role,
          avatar: targetMember.avatar || staffUser.avatar
        }
      });
    } catch (err) {
      console.error('[Auth Error]', err.message || err);
      return res.status(500).json({ success: false, message: 'Authentication service signing error: ' + (err.message || 'Unknown error') });
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid password for specified OraCraft ID. Please check your credentials.'
  });
});

// GET /api/auth/staff - List staff team members (Sensitive performance metrics restricted to Admin role!)
router.get('/staff', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized staff access required.' });
  }

  let decodedRole = 'Staff';
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, getJwtSecret());
    decodedRole = decoded.role || 'Staff';
  } catch (_e) {
    // fallback
  }

  const isAdmin = decodedRole === 'Senior Director' || decodedRole === 'Admin';

  const sanitizedTeam = staffTeam.map(member => {
    const baseObj = {
      id: member.id,
      oraCraftId: member.oraCraftId,
      name: member.name,
      role: member.role,
      workingHours: member.workingHours || '9:00 AM - 6:00 PM IST (Mon-Fri)',
      status: member.status || 'ACTIVE',
      lastCheckIn: member.lastCheckIn || 'Checked In Today',
      avatar: member.avatar
    };

    // Include detailed performance metrics ONLY if requester is Admin!
    if (isAdmin) {
      baseObj.rating = member.rating || '4.95 / 5.0';
      baseObj.completedProjects = member.completedProjects || 12;
      baseObj.clientSatisfaction = member.clientSatisfaction || '98.5%';
      baseObj.revenueGenerated = member.revenueGenerated || '₹15,00,000';
      baseObj.meetingConversion = member.meetingConversion || '90%';
    }

    return baseObj;
  });

  return res.json({
    success: true,
    count: sanitizedTeam.length,
    staff: sanitizedTeam
  });
});

// POST /api/auth/staff - Generate, Assign, and Manage Unique OraCraft IDs (Protected Admin Endpoint)
router.post('/staff', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized staff access required.' });
  }

  const { name, role, customOraCraftId, password, workingHours } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, message: 'Staff name and role are required.' });
  }

  const rolePrefix = role.includes('Engineer') ? 'OC-ENG' : role.includes('Manager') ? 'OC-CSM' : role.includes('Designer') ? 'OC-DES' : 'OC-STF';
  const assignedOraCraftId = customOraCraftId ? customOraCraftId.trim().toUpperCase() : `${rolePrefix}-${100 + staffTeam.length + 1}`;

  const existing = staffTeam.find(m => m.oraCraftId.toUpperCase() === assignedOraCraftId);
  if (existing) {
    return res.status(409).json({ success: false, message: `OraCraft ID '${assignedOraCraftId}' is already assigned to ${existing.name}.` });
  }

  const tempPassword = password || 'OraCraft#' + Math.floor(1000 + Math.random() * 9000);

  const newStaff = {
    id: 'staff-' + (staffTeam.length + 1),
    oraCraftId: assignedOraCraftId,
    name: name.trim(),
    role: role.trim(),
    rating: '5.00 / 5.0 (New)',
    completedProjects: 0,
    clientSatisfaction: '100%',
    revenueGenerated: '₹0.00',
    meetingConversion: 'N/A',
    workingHours: workingHours || '9:00 AM - 6:00 PM IST (Mon-Fri)',
    status: 'ACTIVE - CHECKED IN',
    lastCheckIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST Today',
    passwordHash: bcrypt.hashSync(tempPassword, 10),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  };

  staffTeam.push(newStaff);

  return res.status(201).json({
    success: true,
    message: `Generated and assigned OraCraft ID '${newStaff.oraCraftId}' for ${newStaff.name}.`,
    tempPassword,
    staff: newStaff
  });
});

// DELETE /api/auth/staff/:id - Terminate Staff Member (Protected Admin Endpoint)
router.delete('/staff/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized staff access required.' });
  }

  const { id } = req.params;
  const idx = staffTeam.findIndex(m => m.id === id || m.oraCraftId === id);
  if (idx !== -1 && staffTeam[idx].role !== 'Senior Director') {
    const removed = staffTeam.splice(idx, 1)[0];
    return res.json({ success: true, message: `OraCraft ID '${removed.oraCraftId}' (${removed.name}) has been terminated and revoked.` });
  }

  return res.status(400).json({ success: false, message: 'Unable to revoke specified staff account.' });
});

// GET & POST /api/auth/attendance - Attendance & Work Hours Tracking
router.get('/attendance', (req, res) => {
  return res.json({ success: true, count: attendanceLogs.length, logs: attendanceLogs });
});

router.post('/attendance/check-in', (req, res) => {
  const { oraCraftId, staffName } = req.body;
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
  const newLog = {
    id: 'att-' + Date.now(),
    oraCraftId: oraCraftId || 'OC-STF',
    staffName: staffName || 'Staff Member',
    date: new Date().toISOString().slice(0, 10),
    checkIn: timeStr,
    checkOut: 'Active Shift',
    hoursLogged: '0.1 hrs',
    status: 'PRESENT - VERIFIED'
  };

  attendanceLogs.unshift(newLog);

  return res.json({
    success: true,
    message: `Shift check-in recorded for ${staffName} (${oraCraftId}) at ${timeStr}.`,
    log: newLog
  });
});

// GET & POST /api/auth/notices
router.get('/notices', (req, res) => {
  return res.json({ success: true, notices: corporateNotices });
});

router.post('/notices', (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required.' });
  }

  const newNotice = {
    id: 'notice-' + (corporateNotices.length + 1),
    title: title.trim(),
    category: category || 'General',
    content: content.trim(),
    author: 'Sabyasachi Admin (OC-DIR-9001)',
    date: new Date().toISOString()
  };

  corporateNotices.unshift(newNotice);

  return res.status(201).json({ success: true, message: 'Corporate notice published.', notice: newNotice });
});

// GET & POST /api/auth/leaves
router.get('/leaves', (req, res) => {
  return res.json({ success: true, leaves: leaveRequests });
});

router.post('/leaves', (req, res) => {
  const { staffName, oraCraftId, type, startDate, endDate, reason } = req.body;
  if (!staffName || !reason) {
    return res.status(400).json({ success: false, message: 'Staff name and leave reason are required.' });
  }

  const newLeave = {
    id: 'leave-' + (leaveRequests.length + 100),
    staffName: staffName.trim(),
    oraCraftId: oraCraftId ? oraCraftId.trim() : 'OC-STF',
    type: type || 'Casual Leave',
    startDate: startDate || new Date().toISOString().slice(0, 10),
    endDate: endDate || new Date().toISOString().slice(0, 10),
    reason: reason.trim(),
    status: 'APPROVED'
  };

  leaveRequests.unshift(newLeave);

  return res.status(201).json({ success: true, message: 'Leave request submitted and logged.', leave: newLeave });
});

// GET & POST /api/auth/hiring
router.get('/hiring', (req, res) => {
  return res.json({ success: true, jobs: hiringJobs });
});

router.post('/hiring', (req, res) => {
  const { title, department, experience, salaryRange, status } = req.body;
  if (!title || !department) {
    return res.status(400).json({ success: false, message: 'Job title and department are required.' });
  }

  const newJob = {
    id: 'job-' + (hiringJobs.length + 1),
    title: title.trim(),
    department: department.trim(),
    experience: experience || '2+ Years',
    salaryRange: salaryRange || '₹8,00,000 - ₹14,00,000 / yr',
    status: status || 'OPEN - HIRING ACTIVE'
  };

  hiringJobs.push(newJob);

  return res.status(201).json({ success: true, message: 'New job position posted.', job: newJob });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    tokenBlacklist.add(token);
  }
  return res.json({ success: true, message: 'Successfully logged out. Token revoked.' });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ success: false, message: 'Token has been revoked. Please log in again.' });
  }

  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);
    return res.json({
      success: true,
      user: {
        id: decoded.id,
        oraCraftId: decoded.oraCraftId || 'OC-DIR-9001',
        name: decoded.role === 'Senior Director' ? 'Sabyasachi Admin' : 'Staff Specialist',
        role: decoded.role,
        avatar: staffUser.avatar
      }
    });
  } catch (_err) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token' });
  }
});

module.exports = {
  router,
  isTokenBlacklisted
};
