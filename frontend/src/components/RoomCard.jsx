import { useState } from "react";

const RoomCard = ({ room, onBook }) => {
  const role = localStorage.getItem("role");
  const [showForm, setShowForm] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleBook = () => setShowForm(!showForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onBook) {
      onBook(room._id, start, end, () => {
        setShowForm(false);
        setStart("");
        setEnd("");
        setQuantity(1);
      }, quantity);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
      <h3>Room {room.room_number} - {room.type}</h3>
      <p>Status: {room.status}</p>
      <p>Available: {room.quantity}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Price per room: ₹{room.price}</p>
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
              <label>
                Number of Rooms: <input type="number" min={1} max={room.quantity} value={quantity} onChange={e => setQuantity(e.target.value)} required />
              </label><br />
              <p>
                Total Price: ₹{room.price * quantity}
              </p>
              <button type="submit">Confirm Booking</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default RoomCard;
