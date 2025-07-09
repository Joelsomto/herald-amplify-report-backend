const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    
    const [cumulativeGivingPerHerald, totalCount] = await Promise.all([
      Controller.getCumulativeGivingPerHerald(page, limit),
      Controller.getCumulativeGivingCount()
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    res.render('cumulativeGivingPerHerald', { 
      cumulativeGivingPerHerald,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      },
      title: 'Cumulative Giving Per Herald | Herald Amplify' 
    });
  } catch (err) {
    res.status(500).send('Error loading Cumulative Giving Per Herald');
    console.error('Error loading Cumulative Giving Per Herald:', err);
  }
});

module.exports = router; 