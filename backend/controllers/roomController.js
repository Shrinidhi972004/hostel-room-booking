const Room = require('../models/room');

// Create a room (admin only)
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      query.status = "available";
    }
    const rooms = await Room.find(query);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a room (admin only)
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a room (admin only)
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin Dashboard Stats API
exports.getDashboardStats = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments({});
    const availableRooms = await Room.countDocuments({ status: 'available' });
    const bookedRooms = await Room.countDocuments({ status: 'booked' });
    const maintenanceRooms = await Room.countDocuments({ status: 'maintenance' });

    // For this model, Vacant = Available
    const vacantRooms = availableRooms;

    res.json({
      totalRooms,
      availableRooms,
      bookedRooms,
      vacantRooms,
      maintenanceRooms,
    });
  } catch (err) {
    console.log("DASHBOARD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
