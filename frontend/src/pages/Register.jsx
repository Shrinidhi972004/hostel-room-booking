import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student"
  });
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true);
    try {
      await API.post("/users/register", formData);
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-form">
        <h2 className="login-title">Create Account</h2>
        {err && <p className="error-message">{err}</p>}
        <div className="input-group">
          <input
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="login-input"
            disabled={isLoading}
          />
        </div>
        <div className="input-group">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
            disabled={isLoading}
          />
        </div>
        <div className="input-group">
          <input
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="login-input"
            disabled={isLoading}
          />
        </div>
        <div className="input-group">
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
            disabled={isLoading}
          />
        </div>
        <div className="input-group">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="login-input"
            disabled={isLoading}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;