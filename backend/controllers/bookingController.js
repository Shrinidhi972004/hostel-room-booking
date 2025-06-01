const Booking = require('../models/booking');
const Room = require('../models/room');

// Create a booking (student)
exports.createBooking = async (req, res) => {
  try {
    const { room_id, start_date, end_date } = req.body;

    // --- DATE VALIDATION ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); // For accurate date comparison

    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);

    if (startDateObj < today) {
      return res.status(400).json({ error: 'Start date cannot be in the past.' });
    }
    if (endDateObj <= startDateObj) {
      return res.status(400).json({ error: 'End date must be after start date.' });
    }

    // --- ROOM AVAILABILITY ---
    const room = await Room.findById(room_id);
    if (!room || room.status !== 'available') {
      return res.status(400).json({ error: 'Room is not available' });
    }

    // --- CREATE BOOKING ---
    const booking = new Booking({
      user_id: req.user.id,
      room_id,
      start_date,
      end_date,
      status: 'booked'
    });
    await booking.save();

    // --- UPDATE ROOM STATUS ---
    room.status = 'booked';
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user_id', 'name email')
      .populate('room_id');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bookings for the current student
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.user.id })
      .populate('room_id');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking (student or admin)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Only the student who booked or an admin can cancel
    if (req.user.role !== 'admin' && booking.user_id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Mark the room as available again
    const room = await Room.findById(booking.room_id);
    if (room) {
      room.status = 'available';
      await room.save();
    }

    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
