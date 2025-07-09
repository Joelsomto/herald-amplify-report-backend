const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    
    const [campaignCostSummary, totalCampaignCosts, totalCount] = await Promise.all([
      Controller.getCampaignCostSummary(page, limit),
      Controller.getTotalCampaignCosts(),
      Controller.getCampaignCostSummaryCount()
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    res.render('campaignCostSummary', { 
      campaignCostSummary,
      totalCampaignCosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      },
      title: 'Campaign Cost Summary | Herald Amplify' 
    });
  } catch (err) {
    res.status(500).send('Error loading Campaign Cost Summary');
    console.error('Error loading Campaign Cost Summary:', err);
  }
});

module.exports = router; 