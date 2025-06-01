import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../css/AddRoom.css";

function AddRoom() {
  const [form, setForm] = useState({
    room_number: "",
    type: "",
    capacity: "",
    status: "available",
    price: "",
    amenities: ""
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const roomData = {
        ...form,
        capacity: Number(form.capacity),
        price: Number(form.price),
        amenities: form.amenities.split(",").map((a) => a.trim()),
      };
      await API.post("/rooms", roomData);
      navigate("/rooms");
    } catch (error) {
      setErr(error.response?.data?.error || "Room creation failed");
    }
  };

  return (
    <div className="add-room-container">
      <form className="add-room-form" onSubmit={handleSubmit}>
        <h2 className="add-room-title">Add New Room</h2>
        {err && <div className="error-message">{err}</div>}
        
        <div className="form-group">
          <label htmlFor="room_number">Room Number</label>
          <input
            id="room_number"
            name="room_number"
            className="form-input"
            placeholder="Room Number"
            value={form.room_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Room Type</label>
          <input
            id="type"
            name="type"
            className="form-input"
            placeholder="Type (single/double)"
            value={form.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            className="form-input"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select 
            id="status"
            name="status" 
            className="form-select"
            value={form.status} 
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            className="form-input"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amenities">Amenities</label>
          <input
            id="amenities"
            name="amenities"
            className="form-input"
            placeholder="Amenities (comma separated)"
            value={form.amenities}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">Create Room</button>
      </form>
    </div>
  );
}

export default AddRoom;