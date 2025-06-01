import { useState } from "react";

const RoomCard = ({ room, onBook }) => {
  const role = localStorage.getItem("role");
  const [showForm, setShowForm] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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

  // Capitalize status for display
  const statusDisplay = room.status.charAt(0).toUpperCase() + room.status.slice(1);

  return (
    <div style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
      <h3>Room {room.room_number} - {room.type}</h3>
      <p>Status: <b>{statusDisplay}</b></p>
      <p>Capacity: {room.capacity}</p>
      <p>Price: ₹{room.price}</p>
      <p>Amenities: {(room.amenities || []).join(", ")}</p>
      {role === "student" && room.status === "available" && (
        <>
          <button onClick={handleBook}>{showForm ? "Cancel" : "Book"}</button>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <label>
                Start Date: <input type="date" value={start} onChange={e => setStart(e.target.value)} required />
              </label><br />
              <label>
                End Date: <input type="date" value={end} onChange={e => setEnd(e.target.value)} required />
              </label><br />
              <button type="submit">Confirm Booking</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default RoomCard;
