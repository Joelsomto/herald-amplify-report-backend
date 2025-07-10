const axios = require('axios');

const DB_API_URL = 'http://localhost/Herald_Amplify_NodeJS/db_api.php?action=query'; // Change to your actual URL
//
async function remoteQuery(sql) {
  try {
    const response = await axios.post(DB_API_URL, new URLSearchParams({ sql }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    return response.data;
  } catch (error) {
    // Handle error (log, throw, etc.)
    console.error('Remote DB error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = remoteQuery;
