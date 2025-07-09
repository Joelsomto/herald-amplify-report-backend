const pool = require('./connection');

const Controller = {
  async getTotalCampaigns() {
    const [rows] = await pool.query(`SELECT COUNT(*) as total_campaigns FROM herald_campaign WHERE campaign_status = 'active'`);
    return rows;
  },
  async getTotalSubscribers() {
    const [rows] = await pool.query(`SELECT COUNT(*) as total_subscribers FROM subscribers WHERE unsubscribe = 0 AND confirmed = 1`);
    return rows;
  },
  async getSubscribers() {
    const [rows] = await pool.query(`SELECT subscriberId, CONCAT(COALESCE(firstname, ''), ' ', COALESCE(lastname, '')) as fullname, email, phone, country, timestamp as join_date, confirmed, unsubscribe FROM subscribers WHERE confirmed = 1 ORDER BY timestamp DESC`);
    return rows;
  },
  async getSubscribersWithDonations() {
    const [rows] = await pool.query(`SELECT s.subscriberId, CONCAT(COALESCE(s.firstname, ''), ' ', COALESCE(s.lastname, '')) as fullname, s.email, s.phone, s.country, s.timestamp as join_date, s.unsubscribe, s.confirmed, SUM(COALESCE(hc.campaign_cost, 0)) as total_given, MAX(hc.campaign_start_date) as last_donation_date FROM subscribers s LEFT JOIN herald_campaign hc ON s.subscriberId = hc.subscriberId AND hc.campaign_cost > 0 WHERE s.confirmed = 1 GROUP BY s.subscriberId ORDER BY s.timestamp DESC`);
    return rows;
  },
  async getAvgClickRate() {
    const [rows] = await pool.query(`SELECT AVG(clicked/total_reach)*100 as avg_click_rate FROM herald_campaign WHERE total_reach > 0`);
    return rows;
  },
  async newSubscribers() {
    const [rows] = await pool.query(`SELECT COUNT(*) as new_subscribers FROM subscribers WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND confirmed = 1`);
    return rows;
  },
  async getCumulativeByCurrency() {
    const [rows] = await pool.query(`SELECT currency, SUM(campaign_cost) as total_amount, COUNT(cId) as transaction_count FROM herald_campaign WHERE campaign_cost > 0 GROUP BY currency ORDER BY total_amount DESC`);
    return rows;
  },
  async getGivingsByZones() {
    const [rows] = await pool.query(`SELECT z.zone, SUM(hc.campaign_cost) as total_givings, COUNT(hc.cId) as campaign_count, hc.currency FROM herald_campaign hc JOIN zones z ON hc.zoneId = z.zoneId WHERE hc.campaign_cost > 0 GROUP BY hc.zoneId, hc.currency ORDER BY total_givings DESC`);
    return rows;
  },
  async getGivingsPerIndividual() {
    const [rows] = await pool.query(`SELECT s.subscriberId, CONCAT(COALESCE(s.firstname, ''), ' ', COALESCE(s.lastname, '')) as donor_name, s.email, hc.currency, SUM(hc.campaign_cost) as total_given, COUNT(hc.cId) as donation_count, MAX(hc.campaign_start_date) as last_donation_date FROM subscribers s JOIN herald_campaign hc ON s.subscriberId = hc.subscriberId WHERE hc.campaign_cost > 0 GROUP BY s.subscriberId, hc.currency ORDER BY s.subscriberId, total_given DESC`);
    return rows;
  },
  async getSubscriberTransaction(subscriberId) {
    let whereClause = '';
    if (subscriberId) {
      whereClause = `WHERE hc.subscriberId = ?`;
    }
    const [rows] = await pool.query(`SELECT hc.cId as transaction_id, hc.campaign_name, hc.campaign_cost as amount, hc.currency, hc.campaign_start_date as transaction_date, hc.campaign_status, z.zone as location, CONCAT(s.firstname, ' ', s.lastname) as donor_name FROM herald_campaign hc LEFT JOIN zones z ON hc.zoneId = z.zoneId LEFT JOIN subscribers s ON hc.subscriberId = s.subscriberId ${whereClause} ORDER BY hc.campaign_start_date DESC`, subscriberId ? [subscriberId] : []);
    return rows;
  },
  async getRecentActiveCampaigns() {
    const [rows] = await pool.query(`SELECT hc.cId as campaign_id, hc.campaign_name, hc.campaign_cost, hc.currency, hc.campaign_start_date, hc.campaign_status, CONCAT(COALESCE(s.firstname, ''), ' ', COALESCE(s.lastname, '')) as organizer FROM herald_campaign hc LEFT JOIN subscribers s ON hc.subscriberId = s.subscriberId WHERE hc.campaign_status != '-' AND hc.campaign_start_date > '2000-01-01' ORDER BY hc.campaign_start_date DESC LIMIT 5`);
    return rows;
  },
  async getRecentSubscribers() {
    const [rows] = await pool.query(`SELECT subscriberId, CONCAT(firstname, ' ', lastname) as fullname, email, country, timestamp as join_date FROM subscribers WHERE confirmed = 1 ORDER BY timestamp DESC LIMIT 5`);
    return rows;
  },
  
  // Optimized methods for large datasets
  
  // Campaign Cost Summary - optimized for large datasets
  async getCampaignCostSummary(page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(`
      SELECT 
      campaign_name,
        campaign_cost,
        currency,
        SUM(campaign_cost) as total_cost,
        COUNT(cId) as campaign_count
      FROM herald_campaign 
      WHERE approval = 1 
      GROUP BY campaign_cost, currency 
      ORDER BY total_cost DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return rows;
  },
  
  // Get total count for pagination
  async getCampaignCostSummaryCount() {
    const [rows] = await pool.query(`
      SELECT COUNT(DISTINCT CONCAT(campaign_cost, currency)) as total_count
      FROM herald_campaign 
      WHERE approval = 1
    `);
    return rows[0].total_count;
  },
  
  // Givings Data - optimized with pagination
  async getGivingsData(page = 1, limit = 100) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(`
      SELECT 
        hc.cId,
        hc.campaign_name,
        hc.campaign_cost,
        hc.currency,
        hc.campaign_start_date,
        hc.campaign_end_date,
        hc.timestamp,
        CONCAT(COALESCE(s.firstname, ''), ' ', COALESCE(s.lastname, '')) as herald_name,
        s.email as herald_email,
        z.zone as zone_name
      FROM herald_campaign hc
      LEFT JOIN subscribers s ON hc.subscriberId = s.subscriberId
      LEFT JOIN zones z ON hc.zoneId = z.zoneId
      WHERE hc.approval = 1
      ORDER BY hc.timestamp DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return rows;
  },
  
  // Get total count for givings data pagination
  async getGivingsDataCount() {
    const [rows] = await pool.query(`
      SELECT COUNT(*) as total_count
      FROM herald_campaign 
      WHERE approval = 1
    `);
    return rows[0].total_count;
  },
  
  // Zone-based analysis - optimized
  async getGivingsByZonesWithMapping(page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(`
      SELECT 
        z.zoneId,
        z.zone as zone_name,
        z.ref as zone_ref,
        SUM(hc.campaign_cost) as total_givings,
        COUNT(hc.cId) as campaign_count,
        hc.currency,
        AVG(hc.campaign_cost) as avg_campaign_cost
      FROM herald_campaign hc
      JOIN zones z ON hc.zoneId = z.zoneId
      WHERE hc.approval = 1
      GROUP BY hc.zoneId, hc.currency, z.zone, z.ref
      ORDER BY total_givings DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return rows;
  },
  
  // Get total count for zones pagination
  async getGivingsByZonesCount() {
    const [rows] = await pool.query(`
      SELECT COUNT(DISTINCT CONCAT(hc.zoneId, hc.currency)) as total_count
      FROM herald_campaign hc
      WHERE hc.approval = 1
    `);
    return rows[0].total_count;
  },
  
  // Cumulative giving per herald - optimized
  async getCumulativeGivingPerHerald(page = 1, limit = 100) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(`
      SELECT 
        hc.subscriberId,
        CONCAT(COALESCE(s.firstname, ''), ' ', COALESCE(s.lastname, '')) as herald_name,
        s.email as herald_email,
        SUM(hc.audience) as total_audience,
        SUM(hc.audience) * 0.005 as cumulative_giving_amount,
        COUNT(hc.cId) as campaign_count,
        MAX(hc.campaign_start_date) as last_campaign_date
      FROM herald_campaign hc
      LEFT JOIN subscribers s ON hc.subscriberId = s.subscriberId
      WHERE hc.approval = 1
      GROUP BY hc.subscriberId
      ORDER BY cumulative_giving_amount DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return rows;
  },
  
  // Get total count for cumulative giving pagination
  async getCumulativeGivingCount() {
    const [rows] = await pool.query(`
      SELECT COUNT(DISTINCT subscriberId) as total_count
      FROM herald_campaign 
      WHERE approval = 1
    `);
    return rows[0].total_count;
  },
  
  // Total campaign costs - optimized
  async getTotalCampaignCosts() {
    const [rows] = await pool.query(`
      SELECT 
        currency,
        SUM(campaign_cost) as total_cost,
        COUNT(cId) as campaign_count
      FROM herald_campaign 
      WHERE approval = 1 
      GROUP BY currency 
      ORDER BY total_cost DESC
    `);
    return rows;
  },
  
  // Timeline of all givings - optimized with pagination
  async getGivingsTimeline(page = 1, limit = 100) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(`
      SELECT 
        hc.cId,
        hc.campaign_name,
        hc.campaign_cost,
        hc.currency,
        hc.campaign_start_date,
        hc.timestamp,
        CONCAT(COALESCE(s.firstname, ''), ' ', COALESCE(s.lastname, '')) as herald_name,
        z.zone as zone_name
      FROM herald_campaign hc
      LEFT JOIN subscribers s ON hc.subscriberId = s.subscriberId
      LEFT JOIN zones z ON hc.zoneId = z.zoneId
      WHERE hc.approval = 1
      ORDER BY hc.timestamp ASC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return rows;
  },
  
  // Get total count for timeline pagination
  async getGivingsTimelineCount() {
    const [rows] = await pool.query(`
      SELECT COUNT(*) as total_count
      FROM herald_campaign 
      WHERE approval = 1
    `);
    return rows[0].total_count;
  }
};

module.exports = Controller; 