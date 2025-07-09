const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const [totalCampaigns, totalSubscribers, avgClickRate, newSubscribers, recentSubscribers, recentCampaigns, totalCampaignCosts, cumulativeGivingPerHerald] = await Promise.all([
      Controller.getTotalCampaigns(),
      Controller.getTotalSubscribers(),
      Controller.getAvgClickRate(),
      Controller.newSubscribers(),
      Controller.getRecentSubscribers(),
      Controller.getRecentActiveCampaigns(),
      Controller.getTotalCampaignCosts(),
      Controller.getCumulativeGivingPerHerald()
    ]);
    
    // Calculate total cumulative giving
    const totalCumulativeGiving = cumulativeGivingPerHerald.reduce((sum, herald) => sum + parseFloat(herald.cumulative_giving_amount || 0), 0);
    
    // Calculate total approved campaign costs
    const totalApprovedCosts = totalCampaignCosts.reduce((sum, cost) => sum + parseFloat(cost.total_cost || 0), 0);
    
    res.render('index', {
      title: 'Dashboard | Herald Amplify',
      totalCampaigns: totalCampaigns[0]?.total_campaigns || 0,
      totalSubscribers: totalSubscribers[0]?.total_subscribers || 0,
      avgClickRate: avgClickRate[0]?.avg_click_rate || 0,
      newSubscribers: newSubscribers[0]?.new_subscribers || 0,
      recentSubscribers,
      recentCampaigns,
      totalCampaignCosts,
      cumulativeGivingPerHerald,
      totalCumulativeGiving,
      totalApprovedCosts
    });
  } catch (err) {
    res.status(500).send('Error loading dashboard');
    console.error('Error loading dashboard:', err);
  }
});

module.exports = router; 