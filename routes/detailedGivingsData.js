const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    
    const [givingsData, totalCount] = await Promise.all([
      Controller.getGivingsData(page, limit),
      Controller.getGivingsDataCount()
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    res.render('detailedGivingsData', { 
      givingsData,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      },
      title: 'Detailed Givings Data | Herald Amplify' 
    });
  } catch (err) {
    res.status(500).send('Error loading Detailed Givings Data');
    console.error('Error loading Detailed Givings Data:', err);
  }
});

module.exports = router; 