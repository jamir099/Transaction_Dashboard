const express = require('express');
const {
  seedDatabase,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
  specific
} = require('../controllers/transactionsController');

const router = express.Router();


router.get('/seed', seedDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);
router.get('/combined-data', getCombinedData);
router.post('/get',specific)

module.exports = router;
