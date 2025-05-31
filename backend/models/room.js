const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room_number: { type: String, required: true, unique: true },
  type: { type: String, required: true },    // 'single', 'double', etc.
  capacity: { type: Number, required: true }, // persons per room
  status: { type: String, enum: ['available', 'booked', 'maintenance'], default: 'available' },
  price: { type: Number, required: true },
  amenities: [String],
  quantity: { type: Number, required: true, default: 1 } // <--- NEW
});

module.exports = mongoose.model('Room', roomSchema);
