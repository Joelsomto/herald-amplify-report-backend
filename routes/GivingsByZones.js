const express = require('express');
const router = express.Router();
const Controller = require('../db/controller');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const [givingsByZones, totalCount] = await Promise.all([
      Controller.getGivingsByZonesWithMapping(page, limit),
      Controller.getGivingsByZonesCount()
    ]);
    let zonesMapping = {};
    try {
      const zonesData = fs.readFileSync(path.join(__dirname, '../zones.json'), 'utf8');
      const zonesJson = JSON.parse(zonesData);
      zonesMapping = zonesJson.zones.reduce((acc, zone) => {
        acc[zone.zoneId] = zone;
        return acc;
      }, {});
    } catch (err) {
      console.error('Error loading zones mapping:', err);
    }
    const totalPages = Math.ceil(totalCount / limit);
    res.render('givingsByZones', {
      givingsByZones,
      zonesMapping,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      },
      title: 'Givings By Zones | Herald Amplify'
    });
  } catch (err) {
    res.status(500).send('Error loading Givings By Zones');
    console.error('Error loading Givings By Zones:', err);
  }
});

module.exports = router; 