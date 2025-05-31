const express = require('express');
const { authenticate, adminOnly } = require('../middleware/auth');
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

const router = express.Router();

// Public: get all rooms, get one room
router.get('/', authenticate, getAllRooms);
router.get('/:id', authenticate, getRoomById);

// Admin only: create, update, delete
router.post('/', authenticate, adminOnly, createRoom);
router.put('/:id', authenticate, adminOnly, updateRoom);
router.delete('/:id', authenticate, adminOnly, deleteRoom);

module.exports = router;
