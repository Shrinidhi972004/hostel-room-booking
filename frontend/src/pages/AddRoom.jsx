import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <h2>Add New Room</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <input
        name="room_number"
        placeholder="Room Number"
        value={form.room_number}
        onChange={handleChange}
        required
      /><br />
      <input
        name="type"
        placeholder="Type (single/double)"
        value={form.type}
        onChange={handleChange}
        required
      /><br />
      <input
        name="capacity"
        type="number"
        placeholder="Capacity"
        value={form.capacity}
        onChange={handleChange}
        required
      /><br />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="available">Available</option>
        <option value="booked">Booked</option>
        <option value="maintenance">Maintenance</option>
      </select><br />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      /><br />
      <input
        name="amenities"
        placeholder="Amenities (comma separated)"
        value={form.amenities}
        onChange={handleChange}
      /><br />
      <button type="submit">Create Room</button>
    </form>
  );
}

export default AddRoom;
