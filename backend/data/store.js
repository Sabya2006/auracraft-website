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
    status: 'Paid & Confirmed',
    paymentStatus: 'PAID',
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
    status: 'Paid & Confirmed',
    paymentStatus: 'PAID',
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
    paymentDetails: null,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
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

// Pre-configured staff user structure (Reads from environment variables)
const staffUser = {
  id: 'staff-1',
  name: 'AuraCraft Administrator',
  email: process.env.ADMIN_EMAIL || 'admin@auracraft.com',
  password: process.env.ADMIN_PASSWORD || '',
  role: 'Senior Director',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

module.exports = {
  leads,
  portfolioProjects,
  staffUser
};
