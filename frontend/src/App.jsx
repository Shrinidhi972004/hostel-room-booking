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
        <Route
          path="/rooms"
          element={isLoggedIn ? <RoomList /> : <Navigate to="/login" />}
        />
        <Route
          path="/bookings"
          element={isLoggedIn ? <Booking /> : <Navigate to="/login" />}
        />
        {/* Only admin can access AddRoom */}
        {role === "admin" && (
          <Route path="/add-room" element={<AddRoom />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
