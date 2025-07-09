const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const [totalCampaignCosts, campaignCostSummary] = await Promise.all([
      Controller.getTotalCampaignCosts(),
      Controller.getCampaignCostSummary()
    ]);
    res.render('cumulativeByCurrency', { 
      totalCampaignCosts, 
      campaignCostSummary,
      title: 'Campaign Cost Summary | Herald Amplify' 
    });
  } catch (err) {
    res.status(500).send('Error loading Campaign Cost Summary');
    console.error('Error loading Campaign Cost Summary:', err);
  }
});

module.exports = router; 