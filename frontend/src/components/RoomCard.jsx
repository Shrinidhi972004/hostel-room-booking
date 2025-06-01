import { useState } from "react";
import API from "../api/axios";
import "../css/RoomCard.css";

const RoomCard = ({ room, onBook, fetchRooms }) => {
  const role = localStorage.getItem("role");
  const [showForm, setShowForm] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  const handleBook = () => setShowForm(!showForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onBook) {
      onBook(room._id, start, end, () => {
        setShowForm(false);
        setStart("");
        setEnd("");
      });
    }
  };

  // Admin: set room status
  const handleSetStatus = async (newStatus) => {
    setActionMsg("");
    try {
      await API.put(`/rooms/${room._id}`, { status: newStatus });
      setActionMsg(`Room marked as "${newStatus}"`);
      if (fetchRooms) fetchRooms();
    } catch (err) {
      setActionMsg("Failed to update status.");
    }
  };

  // Capitalize status for display
  const statusDisplay = room.status.charAt(0).toUpperCase() + room.status.slice(1);

  return (
    <div className={`room-card ${room.status}`}>
      <div className="room-header">
        <h3 className="room-number">Room {room.room_number} - {room.type}</h3>
        <span className={`room-status ${room.status}`} data-status={room.status}>{statusDisplay}</span>
      </div>
      <div className="room-details">
        <div className="room-detail">
          <span className="room-detail-label">Capacity</span>
          <span className="room-detail-value">{room.capacity} persons</span>
        </div>
        <div className="room-detail">
          <span className="room-detail-label">Price</span>
          <span className="room-detail-value">₹{room.price}/night</span>
        </div>
      </div>
      <div className="room-amenities">
        <span className="amenities-label">Amenities</span>
        <div className="amenities-list">
          {(room.amenities || []).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
        </div>
      </div>
      {/* Admin Controls */}
      {role === "admin" && (
        <div className="room-actions">
          {room.status === "available" && (
            <button
              className="admin-action-btn"
              onClick={() => handleSetStatus("maintenance")}
            >
              Set as Maintenance
            </button>
          )}
          {room.status === "maintenance" && (
            <button
              className="admin-action-btn"
              onClick={() => handleSetStatus("available")}
            >
              Set as Available
            </button>
          )}
          {actionMsg && <div className="action-msg">{actionMsg}</div>}
        </div>
      )}
      {/* Student Booking */}
      {role === "student" && room.status === "available" && (
        <div className="room-actions">
          <button className="book-button" onClick={handleBook}>
            {showForm ? "Cancel" : "Book Now"}
          </button>
          {showForm && (
            <form onSubmit={handleSubmit} className="booking-form">
              <label>
                Start Date: <input type="date" value={start} onChange={e => setStart(e.target.value)} required />
              </label><br />
              <label>
                End Date: <input type="date" value={end} onChange={e => setEnd(e.target.value)} required />
              </label><br />
              <button type="submit" className="book-button">Confirm Booking</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomCard;
