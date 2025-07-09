const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const [cumulativeGivingPerHerald, givingsData] = await Promise.all([
      Controller.getCumulativeGivingPerHerald(),
      Controller.getGivingsData()
    ]);
    
    res.render('GivingsPerIndividual', { 
      cumulativeGivingPerHerald, 
      givingsData,
      title: 'Cumulative Giving Per Herald | Herald Amplify' 
    });
  } catch (err) {
    res.status(500).send('Error loading Cumulative Giving Per Herald');
    console.error('Error loading Cumulative Giving Per Herald:', err);
  }
});

module.exports = router; 