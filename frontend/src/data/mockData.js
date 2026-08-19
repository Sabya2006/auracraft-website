export const initialLeadsSeed = [
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

export const nicheHighlights = {
  restaurant: {
    id: 'restaurant',
    title: 'High-Converting Web Design for Restaurants & Bistros',
    subtitle: 'Turn online visitors into packed tables and direct commission-free pickup orders.',
    accentColor: '#f59e0b',
    glowClass: 'glass-panel-gold',
    features: [
      {
        title: '3D Interactive Digital Menu & QR',
        desc: 'Filterable by dietary preferences (Gluten-Free, Vegan, Halal) with high-res food photography and instant QR table scanning.'
      },
      {
        title: 'Instant Table Reservation Engine',
        desc: 'Automated table allocation with SMS/WhatsApp confirmation, zero third-party commission fees.'
      },
      {
        title: 'Direct Online Ordering System',
        desc: 'Skip 30% delivery app commissions with integrated online checkout and direct kitchen POS integration.'
      },
      {
        title: 'VIP Events & Chef Specials Showcase',
        desc: 'Promote weekend live music, wine tasting events, and seasonal tasting menus with high urgency.'
      }
    ],
    samplePreview: {
      name: 'La Trattoria Milano',
      cuisine: 'Authentic Italian & Wine Bar',
      rating: '4.9 ★ (840+ Reviews)',
      address: '14 MG Road, Indiranagar, Bengaluru',
      popularDishes: [
        { name: 'Truffle & Porcini Tagliatelle', price: '₹750', tag: 'Chef Choice' },
        { name: 'Wood-Fired Neapolitan Margherita', price: '₹620', tag: 'Best Seller' },
        { name: 'Artisanal Tiramisu', price: '₹420', tag: 'Signature Dessert' }
      ]
    }
  },
  wholesaler: {
    id: 'wholesaler',
    title: 'Enterprise B2B Wholesale & Distributor Portals',
    subtitle: 'Streamline bulk trade ordering, customer credit limits, and real-time inventory quotes.',
    accentColor: '#06b6d4',
    glowClass: 'glass-panel-cyan',
    features: [
      {
        title: 'B2B Trade Customer Portal',
        desc: 'Password-protected login for commercial restaurant buyers with customized contract pricing.'
      },
      {
        title: 'Instant Quote & Bulk Order Cart',
        desc: 'Allows buyers to order pallet-level stock, request custom quotes, and upload Excel POs.'
      },
      {
        title: 'ERP & Inventory Sync',
        desc: 'Live stock level updates across warehouses, preventing stockout orders.'
      },
      {
        title: 'Automated Credit & Invoice Engine',
        desc: 'Manage 30-day trade credit lines, automated PDF invoicing, and GST compliance receipts.'
      }
    ],
    samplePreview: {
      name: 'Apex Food & Grain Wholesale',
      category: 'Bulk Commodity & Spice Supplier',
      rating: 'Trusted by 650+ Commercial Buyers',
      warehouseLocations: 'Mumbai • Delhi • Bengaluru • Hyderabad',
      sampleProducts: [
        { name: 'Basmati Rice Special (50kg Bag)', price: '₹4,200 / Bag', minQty: '10 Bags' },
        { name: 'Cold-Pressed Mustard Oil (20L Tin)', price: '₹3,100 / Tin', minQty: '5 Tins' },
        { name: 'Organic Spices Assortment Box', price: '₹8,500 / Pack', minQty: '2 Packs' }
      ]
    }
  },
  cafe: {
    id: 'cafe',
    title: 'Next-Gen Web Solutions for Artisan Cafes & Bakeries',
    subtitle: 'Drive daily express pickup sales, coffee bean subscriptions, and digital loyalty rewards.',
    accentColor: '#10b981',
    glowClass: 'glass-panel-emerald',
    features: [
      {
        title: '1-Click Express Metro Pickup',
        desc: 'Allow morning commuters to pre-order espresso & croissants for zero-wait counter pickup.'
      },
      {
        title: 'Coffee Bean Subscription Club',
        desc: 'Recurring monthly coffee bean delivery engine generated recurring cash flow.'
      },
      {
        title: 'Digital Stamp Loyalty Card',
        desc: 'Customers save digital stamp passes to Apple Wallet / Google Pay for repeat visits.'
      },
      {
        title: 'Cozy Aesthetic & Instagram Feed',
        desc: 'Live Instagram grid integration showcasing daily bakery pulls and barista latte art.'
      }
    ],
    samplePreview: {
      name: 'Artisan Roast & Bakery Hub',
      type: 'Specialty Espresso & Sourdough',
      rating: '4.9 ★ (1,250+ Coffee Lovers)',
      pickupTime: 'Estimated 8 Mins Pickup',
      sampleItems: [
        { name: 'Single Origin Ethiopia Pour-Over', price: '₹280', tag: 'Fresh Roast' },
        { name: 'Almond Butter Sourdough Croissant', price: '₹220', tag: 'Fresh Baked' },
        { name: 'House Espresso Beans (250g Bag)', price: '₹650', tag: 'Beans' }
      ]
    }
  }
};

export const initialPortfolio = [
  {
    id: 'port-1',
    title: 'Gourmet Atelier Fine Dining',
    category: 'Restaurant',
    industry: 'Fine Dining & Lounge',
    tagline: 'Interactive Table Booking & Dynamic Seasonal Menu Engine',
    description: 'Transformed an upmarket bistro into a digital hotspot with instant online table reservations, high-definition QR menu previews, and chef stories.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Table Bookings', value: '+215%' },
      { label: 'Direct Pickup Orders', value: '4.8k / mo' },
      { label: 'Avg Order Value', value: '+34%' }
    ],
    techStack: ['React', 'Framer Motion', 'Tailwind', 'Node.js', 'Razorpay'],
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
    description: 'Designed a high-performance trade portal enabling 450+ commercial restaurant buyers to place recurring bulk orders seamlessly with automated PDF invoicing.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'B2B Revenue Growth', value: '+185%' },
      { label: 'Bulk Orders Processed', value: '12,400+' },
      { label: 'Order Processing Time', value: '-65%' }
    ],
    techStack: ['React', 'Express', 'MongoDB', 'PostgreSQL Sync', 'Tailwind'],
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
    livePreviewType: 'cafe',
    testimonial: {
      quote: 'Morning rush queues are gone! Customers order their espresso on the metro and pick it up hot at our counter.',
      author: 'Elena Rostova',
      role: 'Head Barista & Co-Founder'
    }
  }
];

export const clientReviews = [
  {
    name: 'Kabir Oberoi',
    company: 'Oberoi Heritage Dining',
    role: 'Managing Partner',
    rating: 5,
    comment: 'The ₹2 strategy booking fee was brilliant—it proved they respect client time. Their team redesigned our menu experience and our direct online orders grew by 190%.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    type: 'Restaurant'
  },
  {
    name: 'Vikram Mehta',
    company: 'Mehta Commercial Grains B2B',
    role: 'Director of Logistics',
    rating: 5,
    comment: 'Building a B2B ordering portal for wholesalers is hard, but AuraCraft made it effortless. Our trade buyers order 24/7 without needing phone reps.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    type: 'Wholesaler'
  },
  {
    name: 'Sophia Chen',
    company: 'Cloud9 Dessert & Espresso',
    role: 'Founder',
    rating: 5,
    comment: 'The express pickup feature and mobile coffee bean subscriptions have given us a steady recurring revenue stream every month. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    type: 'Cafe'
  }
];
