const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const SubscriberTransaction = await Controller.getSubscriberTransaction(id);
    res.render('subscriber_details', { SubscriberTransaction, title: 'Subscriber Transaction | Herald Amplify' });
  } catch (err) {
    res.status(500).send('Error loading subscriber details');
  }
});

module.exports = router; 