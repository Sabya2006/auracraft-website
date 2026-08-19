const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { portfolioProjects } = require('../data/store');

// Middleware for JWT protection on admin actions
const protectStaff = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized staff access required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'JWT configuration error.' });
    }
    const decoded = jwt.verify(token, secret);
    req.staff = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};

// GET /api/portfolio - Fetch client project showcase items
router.get('/', (req, res) => {
  const { category } = req.query;

  let projects = [...portfolioProjects];
  if (category && category !== 'All') {
    projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  return res.json({
    success: true,
    count: projects.length,
    projects
  });
});

// POST /api/portfolio - Add new client project (Protected)
router.post('/', protectStaff, (req, res) => {
  const { title, category, industry, tagline, description, image, metrics, techStack, demoUrl, livePreviewType, testimonial } = req.body;

  if (!title || !category || !tagline) {
    return res.status(400).json({ success: false, message: 'Title, category, and tagline are required.' });
  }

  const newProject = {
    id: 'port-' + (portfolioProjects.length + 1),
    title,
    category,
    industry: industry || category,
    tagline,
    description: description || '',
    image: image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    metrics: metrics || [{ label: 'Growth', value: '+150%' }],
    techStack: techStack || ['React', 'Tailwind', 'Node.js'],
    demoUrl: demoUrl || 'https://example.com',
    livePreviewType: livePreviewType || category.toLowerCase(),
    testimonial: testimonial || { quote: 'Outstanding work by AuraCraft!', author: 'Client Partner', role: 'Founder' }
  };

  portfolioProjects.push(newProject);

  return res.status(201).json({
    success: true,
    message: 'New portfolio showcase project published successfully.',
    project: newProject
  });
});

module.exports = router;
