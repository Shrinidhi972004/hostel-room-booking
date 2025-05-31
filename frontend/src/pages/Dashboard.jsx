import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard/admin");
        setData(res.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };
    fetchDashboard();
  }, [navigate]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>Total Rooms: {data.totalRooms}</li>
        <li>Available Rooms: {data.availableRooms}</li>
        <li>Booked Rooms: {data.bookedRooms}</li>
        <li>Vacant Rooms: {data.vacantRooms}</li>
        <li>Maintenance Rooms: {data.maintenanceRooms}</li>
      </ul>
    </div>
  );
}

export default Dashboard;
