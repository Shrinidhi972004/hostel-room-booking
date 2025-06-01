import { useEffect, useState } from "react";
import API from "../api/axios";
import "../css/Booking.css";

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
    <div className="booking-container">
      <div className="booking-content">
        <h2 className="booking-title">My Bookings</h2>
        
        {message && (
          <div className={`message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="no-bookings">
            No bookings found.
          </div>
        ) : (
          <ul className="bookings-list">
            {bookings.map(booking => (
              <li key={booking._id} className="booking-item">
                <div className="booking-details">
                  <span>
                    <strong>Room:</strong> {booking.room_id?.room_number || "-"}
                  </span>
                  <span>
                    <strong>From:</strong> {booking.start_date?.substring(0, 10)}
                  </span>
                  <span>
                    <strong>To:</strong> {booking.end_date?.substring(0, 10)}
                  </span>
                  <span>
                    <strong>Status:</strong> {booking.status}
                  </span>
                </div>
                {booking.status === "booked" && (
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Booking;