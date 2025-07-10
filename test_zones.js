const fs = require('fs');
const path = require('path');

// Test the zones data loading function
function loadZonesData() {
  try {
    const zonesData = fs.readFileSync(path.join(__dirname, 'data/zones_6.json'), 'utf8');
    const zonesJson = JSON.parse(zonesData);
    // Parse PHPMyAdmin export format - find the data array
    const zonesDataArray = zonesJson.find(item => item.type === 'table' && item.name === 'zones')?.data || [];
    return zonesDataArray.reduce((acc, zone) => {
      acc[zone.zoneId] = zone;
      return acc;
    }, {});
  } catch (err) {
    console.error('Error loading zones data:', err);
    return {};
  }
}

// Test the function
const zonesData = loadZonesData();
console.log('Zones data loaded successfully!');
console.log('Number of zones:', Object.keys(zonesData).length);
console.log('Sample zone data:', Object.values(zonesData).slice(0, 3)); 