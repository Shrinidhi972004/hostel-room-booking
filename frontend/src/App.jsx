import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RoomList from "./pages/RoomList";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import AddRoom from "./pages/AddRoom";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Root route: Dashboard for admin, RoomList for students */}
        <Route
          path="/"
          element={
            isLoggedIn
              ? role === "admin"
                ? <Dashboard />
                : <RoomList />
              : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rooms: All logged-in users */}
        <Route
          path="/rooms"
          element={isLoggedIn ? <RoomList /> : <Navigate to="/login" />}
        />
        {/* Bookings: Only students */}
        {role === "student" && (
          <Route path="/bookings" element={<Booking />} />
        )}
        {/* Add Room: Only admins */}
        {role === "admin" && (
          <Route path="/add-room" element={<AddRoom />} />
        )}
        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
