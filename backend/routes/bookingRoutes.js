const express = require('express');
const { authenticate, adminOnly } = require('../middleware/auth');
const {
  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking
} = require('../controllers/bookingController');

const router = express.Router();

// Student: book room, view my bookings, cancel my booking
router.post('/', authenticate, createBooking);
router.get('/my', authenticate, getMyBookings);
router.post('/cancel/:id', authenticate, cancelBooking);

// Admin: view all bookings
router.get('/', authenticate, adminOnly, getAllBookings);

module.exports = router;
