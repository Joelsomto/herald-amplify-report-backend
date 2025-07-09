const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const totalCampaignCosts = await Controller.getTotalCampaignCosts();
    res.render('campaignCostByCurrency', { 
      totalCampaignCosts,
      title: 'Campaign Cost By Currency | Herald Amplify' 
    });
  } catch (err) {
    res.status(500).send('Error loading Campaign Cost By Currency');
    console.error('Error loading Campaign Cost By Currency:', err);
  }
});

module.exports = router; 