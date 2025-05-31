const express = require('express');
const { authenticate, adminOnly } = require('../middleware/auth');
const { adminDashboard } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/admin', authenticate, adminOnly, adminDashboard);

module.exports = router;
