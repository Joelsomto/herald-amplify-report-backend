const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    
    const [givingsTimeline, totalCount] = await Promise.all([
      Controller.getGivingsTimeline(page, limit),
      Controller.getGivingsTimelineCount()
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    res.render('givingsTimeline', { 
      givingsTimeline,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      },
      title: 'Givings Timeline | Herald Amplify' 
    });
  } catch (err) {
    res.status(500).send('Error loading Givings Timeline');
    console.error('Error loading Givings Timeline:', err);
  }
});

module.exports = router; 