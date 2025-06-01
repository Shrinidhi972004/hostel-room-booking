import { useEffect, useState } from "react";
import API from "../api/axios";
import RoomCard from "../components/RoomCard";

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
    <div>
      <h2>Rooms</h2>
      {message && <p style={{ color: message === "Room booked successfully!" ? "green" : "red" }}>{message}</p>}
      {filteredRooms.length === 0 ? (
        <p>No available rooms!</p>
      ) : (
        <div>
          {filteredRooms.map(room => (
            <RoomCard key={room._id} room={room} onBook={handleBook} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomList;
