import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link> | <Link to="/rooms">Rooms</Link> |{" "}
      <Link to="/bookings">My Bookings</Link>
      {role === "admin" && (
        <>
          {" "} | <Link to="/add-room">Add Room</Link>
        </>
      )}
      {isLoggedIn ? (
        <button style={{ marginLeft: 8 }} onClick={handleLogout}>Logout</button>
      ) : (
        <>
          {" "} | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
