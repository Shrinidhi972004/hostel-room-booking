import { useEffect, useState } from "react";
import API from "../api/axios";

function Booking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            Room: {b.room_id?.room_number || "-"} | From: {b.start_date?.substring(0,10)} | To: {b.end_date?.substring(0,10)} | Status: {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Booking;
