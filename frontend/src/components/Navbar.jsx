import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

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
      {/* Dashboard: Only admin */}
      {role === "admin" && (
        <>
          <Link to="/">Dashboard</Link> |{" "}
        </>
      )}
      {/* Rooms: Everyone who is logged in */}
      {isLoggedIn && (
        <>
          <Link to="/rooms">Rooms</Link>
        </>
      )}
      {/* My Bookings: Only student */}
      {role === "student" && (
        <>
          {"   "}
          <Link to="/bookings">My Bookings</Link>
        </>
      )}
      {/* Add Room: Only admin */}
      {role === "admin" && (
        <>
          {"   "}
          <Link to="/add-room">Add Room</Link>
        </>
      )}
      {/* Auth links */}
      {isLoggedIn ? (
        <button style={{ marginLeft: 8 }} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <span>   </span>
          <Link to="/login">Login</Link>   <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;