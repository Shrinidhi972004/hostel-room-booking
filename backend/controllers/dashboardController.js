const Room = require('../models/room');
const Booking = require('../models/booking');

exports.adminDashboard = async (req, res) => {
  try {
    // Total rooms
    const totalRooms = await Room.countDocuments();

    // Available rooms
    const availableRooms = await Room.countDocuments({ status: 'available' });

    // Booked rooms
    const bookedRooms = await Room.countDocuments({ status: 'booked' });

    // Vacant rooms (same as available, or you can have a custom logic)
    const vacantRooms = availableRooms;

    // Rooms under maintenance
    const maintenanceRooms = await Room.countDocuments({ status: 'maintenance' });

    res.json({
      totalRooms,
      availableRooms,
      bookedRooms,
      vacantRooms,
      maintenanceRooms
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
