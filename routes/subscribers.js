const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/', async (req, res) => {
  try {
    const subscribers = await Controller.getSubscribersWithDonations();
    res.render('subscribers', { subscribers, title: 'Subscribers | Herald Amplify' });
  } catch (err) {
    res.status(500).send('Error loading subscribers');
  }
});

module.exports = router; 