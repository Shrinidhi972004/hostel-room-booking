import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard/admin"); // Using working backend route
        setData(res.data);
        console.log("Dashboard API response:", res.data); // Debug: see what the API returns
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.clear();
          navigate("/login");
        } else {
          console.error("Dashboard fetch error:", err);
        }
      }
    };
    fetchDashboard();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <ul className="stats-grid">
          <li className="stat-card">
            <div className="stat-content">
              <p className="stat-label">Total Rooms</p>
              <h3 className="stat-number">{data.totalRooms || 0}</h3>
            </div>
          </li>
          <li className="stat-card">
            <div className="stat-content">
              <p className="stat-label">Available Rooms</p>
              <h3 className="stat-number">{data.availableRooms || 0}</h3>
            </div>
          </li>
          <li className="stat-card">
            <div className="stat-content">
              <p className="stat-label">Booked Rooms</p>
              <h3 className="stat-number">{data.bookedRooms || 0}</h3>
            </div>
          </li>
          <li className="stat-card">
            <div className="stat-content">
              <p className="stat-label">Vacant Rooms</p>
              <h3 className="stat-number">{data.vacantRooms || 0}</h3>
            </div>
          </li>
          <li className="stat-card">
            <div className="stat-content">
              <p className="stat-label">Maintenance Rooms</p>
              <h3 className="stat-number">{data.maintenanceRooms || 0}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
