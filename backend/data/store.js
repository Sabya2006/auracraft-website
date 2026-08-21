// Initial seed leads
const leads = [
  {
    id: 'lead-101',
    clientName: 'Marco Rossi',
    companyName: 'La Dolce Vita Bistro',
    category: 'Restaurant',
    email: 'marco@ladolcevita.com',
    phone: '+91 98765 43210',
    services: ['Digital Menu QR', 'Online Table Reservation', 'Custom Web Design'],
    budget: '₹45,000 - ₹75,000',
    notes: 'We need an elegant dark-gold themed website with live menu and reservation engine.',
    status: 'Paid & Scheduled',
    paymentStatus: 'PAID',
    scheduledSlot: {
      date: '2026-08-22',
      time: '10:00 AM - 10:30 AM IST',
      staffName: 'Vikram Mehta (Lead Web Engineer)'
    },
    paymentDetails: {
      amount: 2.00,
      currency: 'INR',
      method: 'UPI QR',
      txnId: 'TXN_AURA_98241562',
      paymentDate: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'lead-102',
    clientName: 'Suresh Patel',
    companyName: 'Apex Spice & Grain Traders',
    category: 'Wholesaler',
    email: 'suresh@apexspices.in',
    phone: '+91 98123 76543',
    services: ['B2B Bulk Portal', 'ERP Catalog Sync', 'Custom Quote System'],
    budget: '₹90,000 - ₹1,50,000',
    notes: 'Need trade customer portal where restaurant buyers can place bulk order quotes with tier pricing.',
    status: 'Paid & Scheduled',
    paymentStatus: 'PAID',
    scheduledSlot: {
      date: '2026-08-22',
      time: '02:00 PM - 02:30 PM IST',
      staffName: 'Priya Sundaram (Client Success Manager)'
    },
    paymentDetails: {
      amount: 2.00,
      currency: 'INR',
      method: 'Corporate NetBanking',
      txnId: 'TXN_AURA_87123901',
      paymentDate: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'lead-103',
    clientName: 'Ananya Sharma',
    companyName: 'Artisan Roast & Bakery',
    category: 'Cafe',
    email: 'ananya@artisanroast.cafe',
    phone: '+91 97788 11223',
    services: ['Express Pickup Ordering', 'Coffee Subscription Engine', 'Loyalty Card'],
    budget: '₹35,000 - ₹60,000',
    notes: 'Cozy aesthetic site with 1-click mobile pickup ordering for morning commuters.',
    status: 'Pending Payment',
    paymentStatus: 'PENDING',
    scheduledSlot: null,
    paymentDetails: null,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

// Staff-Approved Available Time Slots for Clients
const availableSlots = [
  {
    id: 'slot-1',
    date: '2026-08-22',
    time: '10:00 AM - 10:30 AM IST',
    staffName: 'Vikram Mehta',
    status: 'BOOKED',
    approvedBy: 'AuraCraft Director'
  },
  {
    id: 'slot-2',
    date: '2026-08-22',
    time: '11:30 AM - 12:00 PM IST',
    staffName: 'Vikram Mehta',
    status: 'AVAILABLE',
    approvedBy: 'AuraCraft Director'
  },
  {
    id: 'slot-3',
    date: '2026-08-22',
    time: '02:00 PM - 02:30 PM IST',
    staffName: 'Priya Sundaram',
    status: 'BOOKED',
    approvedBy: 'Priya Sundaram'
  },
  {
    id: 'slot-4',
    date: '2026-08-22',
    time: '04:00 PM - 04:30 PM IST',
    staffName: 'Priya Sundaram',
    status: 'AVAILABLE',
    approvedBy: 'Priya Sundaram'
  },
  {
    id: 'slot-5',
    date: '2026-08-23',
    time: '10:30 AM - 11:00 AM IST',
    staffName: 'Vikram Mehta',
    status: 'AVAILABLE',
    approvedBy: 'AuraCraft Director'
  },
  {
    id: 'slot-6',
    date: '2026-08-23',
    time: '03:00 PM - 03:30 PM IST',
    staffName: 'Priya Sundaram',
    status: 'AVAILABLE',
    approvedBy: 'AuraCraft Director'
  }
];

// Initial seed portfolio projects
const portfolioProjects = [
  {
    id: 'port-1',
    title: 'Gourmet Atelier Fine Dining',
    category: 'Restaurant',
    industry: 'Fine Dining & Lounge',
    tagline: 'Interactive Table Booking & Dynamic Seasonal Menu Engine',
    description: 'Transformed an upmarket restaurant into a digital hotspot with instant online booking, mobile QR order previews, and chef highlights.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Table Bookings', value: '+215%' },
      { label: 'Mobile Orders', value: '4.8k / mo' },
      { label: 'Avg Ticket Size', value: '+34%' }
    ],
    techStack: ['React', 'Framer Motion', 'Tailwind', 'Node.js', 'Razorpay'],
    demoUrl: 'https://gourmet-atelier-demo.example.com',
    livePreviewType: 'restaurant',
    testimonial: {
      quote: 'AuraCraft delivered a masterpiece website. Our Friday night table reservations doubled within 3 weeks of launch!',
      author: 'Chef Antoine Laurent',
      role: 'Owner & Executive Chef'
    }
  },
  {
    id: 'port-2',
    title: 'Vanguard Global Spice Merchants',
    category: 'Wholesaler',
    industry: 'Food & Spice B2B Wholesale',
    tagline: 'High-Volume B2B Ordering Portal with Tier-Based Pricing & Invoicing',
    description: 'Designed a high-performance trade portal enabling 450+ commercial restaurant buyers to place recurring bulk orders seamlessly.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'B2B Revenue Growth', value: '+185%' },
      { label: 'Bulk Orders Processed', value: '12,400+' },
      { label: 'Order Processing Time', value: '-65%' }
    ],
    techStack: ['React', 'Express', 'MongoDB', 'PostgreSQL Sync', 'Tailwind'],
    demoUrl: 'https://vanguard-b2b-demo.example.com',
    livePreviewType: 'wholesaler',
    testimonial: {
      quote: 'Our wholesale client onboarding went from days to minutes. Restaurant owners love the instant quote generator!',
      author: 'Rajiv Malhotra',
      role: 'Managing Director, Vanguard Supply'
    }
  },
  {
    id: 'port-3',
    title: 'Brew & Bean Craft Roastery',
    category: 'Cafe',
    industry: 'Artisan Cafe & Coffee Beans',
    tagline: 'Express Pickup App, Coffee Bean Subscription Engine & Digital Stamps',
    description: 'Built a sleek mobile-first web app featuring express coffee pre-ordering, monthly subscription boxes, and digitized loyalty rewards.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Express Pickup Orders', value: '+340%' },
      { label: 'Active Bean Subscribers', value: '1,850' },
      { label: 'Customer Retention', value: '88%' }
    ],
    techStack: ['React', 'PWA', 'Stripe', 'Node.js', 'Lucide'],
    demoUrl: 'https://brewbean-demo.example.com',
    livePreviewType: 'cafe',
    testimonial: {
      quote: 'Morning rush queues are gone! Customers order their espresso on the metro and pick it up hot at our counter.',
      author: 'Elena Rostova',
      role: 'Head Barista & Co-Founder'
    }
  }
];

// Pre-configured Admin Director user structure with closed OraCraft ID
const staffUser = {
  id: 'staff-1',
  oraCraftId: process.env.ADMIN_ORACRAFT_ID || 'OC-DIR-9001',
  name: 'Sabyasachi Admin (Senior Director)',
  role: 'Senior Director',
  password: process.env.ADMIN_PASSWORD || 'SabyaAdmin#Secure2026!',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

// Closed Admin-Controlled Corporate Team Roster with Performance Metrics & Attendance Logs
const staffTeam = [
  {
    id: 'staff-1',
    oraCraftId: 'OC-DIR-9001',
    name: 'Sabyasachi Admin',
    role: 'Senior Director',
    rating: '5.00 / 5.0',
    completedProjects: 85,
    clientSatisfaction: '99.4%',
    revenueGenerated: '₹34,50,000',
    meetingConversion: '92%',
    workingHours: '9:00 AM - 6:00 PM IST (Mon-Fri)',
    status: 'ACTIVE - CHECKED IN',
    lastCheckIn: '08:55 AM IST Today',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'staff-2',
    oraCraftId: 'OC-ENG-101',
    name: 'Vikram Mehta',
    role: 'Lead Web Engineer',
    rating: '4.95 / 5.0',
    completedProjects: 42,
    clientSatisfaction: '98.2%',
    revenueGenerated: '₹18,20,000',
    meetingConversion: '88%',
    workingHours: '9:00 AM - 6:00 PM IST (Mon-Fri)',
    status: 'ACTIVE - CHECKED IN',
    lastCheckIn: '08:58 AM IST Today',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'staff-3',
    oraCraftId: 'OC-CSM-202',
    name: 'Priya Sundaram',
    role: 'Client Success Manager',
    rating: '4.98 / 5.0',
    completedProjects: 58,
    clientSatisfaction: '99.1%',
    revenueGenerated: '₹22,40,000',
    meetingConversion: '94%',
    workingHours: '9:30 AM - 6:30 PM IST (Mon-Fri)',
    status: 'ACTIVE - CHECKED IN',
    lastCheckIn: '09:12 AM IST Today',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  }
];

// Shift Attendance & Work Hours Log Store
const attendanceLogs = [
  {
    id: 'att-101',
    oraCraftId: 'OC-DIR-9001',
    staffName: 'Sabyasachi Admin',
    date: new Date().toISOString().slice(0, 10),
    checkIn: '08:55 AM IST',
    checkOut: 'In Progress (Active Shift)',
    hoursLogged: '7.5 hrs',
    status: 'PRESENT ON TIME'
  },
  {
    id: 'att-102',
    oraCraftId: 'OC-ENG-101',
    staffName: 'Vikram Mehta',
    date: new Date().toISOString().slice(0, 10),
    checkIn: '08:58 AM IST',
    checkOut: 'In Progress (Active Shift)',
    hoursLogged: '7.4 hrs',
    status: 'PRESENT ON TIME'
  },
  {
    id: 'att-103',
    oraCraftId: 'OC-CSM-202',
    staffName: 'Priya Sundaram',
    date: new Date().toISOString().slice(0, 10),
    checkIn: '09:12 AM IST',
    checkOut: 'In Progress (Active Shift)',
    hoursLogged: '7.2 hrs',
    status: 'PRESENT ON TIME'
  }
];

// Corporate Notices
const corporateNotices = [
  {
    id: 'notice-1',
    title: '🔒 Closed Admin-Controlled OraCraft ID Access Active',
    category: 'Security',
    content: 'All staff authentication now strictly requires a verified OraCraft ID (e.g. OC-DIR-9001). Generic emails and self-registrations are disabled.',
    author: 'Sabyasachi Admin',
    date: new Date(Date.now() - 86400000).toISOString()
  }
];

// Leave Requests
const leaveRequests = [
  {
    id: 'leave-101',
    staffName: 'Vikram Mehta',
    oraCraftId: 'OC-ENG-101',
    type: 'Casual Leave',
    startDate: '2026-08-25',
    endDate: '2026-08-26',
    reason: 'Attending Developer Conference in Bengaluru.',
    status: 'APPROVED'
  }
];

// Hiring Jobs
const hiringJobs = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Web Architect (React & Node)',
    department: 'Engineering',
    experience: '4+ Years',
    salaryRange: '₹14,00,000 - ₹22,00,000 / yr',
    status: 'OPEN - HIRING ACTIVE'
  }
];

module.exports = {
  leads,
  availableSlots,
  portfolioProjects,
  staffUser,
  staffTeam,
  attendanceLogs,
  corporateNotices,
  leaveRequests,
  hiringJobs
};
