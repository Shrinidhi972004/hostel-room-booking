import { useEffect, useState } from "react";
import API from "../api/axios";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      setMessage("Error fetching bookings");
    }
  };

  const handleCancel = async (bookingId) => {
    setMessage("");
    try {
      await API.delete(`/bookings/${bookingId}`);
      setMessage("Booking cancelled successfully!");
      fetchBookings();
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Cancellation failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map(b => (
            <li key={b._id}>
              Room: {b.room_id?.room_number || "-"} | 
              From: {b.start_date?.substring(0, 10)} | 
              To: {b.end_date?.substring(0, 10)} | 
              Status: {b.status}
              {b.status === "booked" && (
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleCancel(b._id)}
                >
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Booking;
