import { useEffect, useState } from "react";
import API from "../api/axios";
import RoomCard from "../components/RoomCard";
import "../css/RoomList.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      setMessage("Error fetching rooms");
    }
  };

  // Booking handler for students (no quantity)
  const handleBook = async (roomId, startDate, endDate, cb) => {
    setMessage("");
    try {
      await API.post("/bookings", {
        room_id: roomId,
        start_date: startDate,
        end_date: endDate
      });
      setMessage("Room booked successfully!");
      fetchRooms();
      if (cb) cb();
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Booking failed. Please try again."
      );
    }
  };

  // Backend already filters available rooms for students
  const filteredRooms = rooms;

  return (
    <div className="rooms-container">
      <div className="rooms-content">
        <h2 className="rooms-title">Available Rooms</h2>
        
        {message && (
          <div className={`message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </div>
        )}
        
        {filteredRooms.length === 0 ? (
          <div className="no-rooms">
            <div className="no-rooms-icon">🏨</div>
            <p className="no-rooms-text">No rooms available at the moment!</p>
          </div>
        ) : (
          <div className="rooms-grid">
            {filteredRooms.map(room => (
              <RoomCard key={room._id} room={room} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomList;