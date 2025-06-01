const express = require('express');
const { authenticate, adminOnly } = require('../middleware/auth');
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getDashboardStats  // <-- Import the new controller function!
} = require('../controllers/roomController');

const router = express.Router();

// Public: get all rooms, get one room
router.get('/', authenticate, getAllRooms);
router.get('/:id', authenticate, getRoomById);

// Admin Dashboard stats (must come BEFORE /:id, to avoid route conflict)
router.get('/dashboard-stats', authenticate, adminOnly, getDashboardStats);

// Admin only: create, update, delete
router.post('/', authenticate, adminOnly, createRoom);
router.put('/:id', authenticate, adminOnly, updateRoom);
router.delete('/:id', authenticate, adminOnly, deleteRoom);

module.exports = router;
