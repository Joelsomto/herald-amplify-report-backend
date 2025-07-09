const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Routers
const indexRouter = require('./routes/index');
const subscribersRouter = require('./routes/subscribers');
const subscriberDetailsRouter = require('./routes/subscriber_details');
const cumulativeGivingPerHeraldRouter = require('./routes/cumulativeGivingPerHerald');
const campaignCostSummaryRouter = require('./routes/campaignCostSummary');
const givingsTimelineRouter = require('./routes/givingsTimeline');
const givingsByZonesRouter = require('./routes/givingsByZones');
const campaignCostByCurrencyRouter = require('./routes/campaignCostByCurrency');
const detailedGivingsDataRouter = require('./routes/detailedGivingsData');
// Remove old/duplicate routes
// const givingsPerIndividualRouter = require('./routes/GivingsPerIndividual');
// const cumulativeByCurrencyRouter = require('./routes/cumulativeByCurrency');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Layouts setup
app.use(expressLayouts); 
app.set('layout', 'layout'); 

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/subscribers', subscribersRouter);
app.use('/subscriber_details', subscriberDetailsRouter);
app.use('/cumulative-giving-per-herald', cumulativeGivingPerHeraldRouter);
app.use('/campaign-cost-summary', campaignCostSummaryRouter);
app.use('/givings-timeline', givingsTimelineRouter);
app.use('/givings-by-zones', givingsByZonesRouter);
app.use('/campaign-cost-by-currency', campaignCostByCurrencyRouter);
app.use('/detailed-givings-data', detailedGivingsDataRouter);
// Add more as needed for other unique tables/pages

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
