import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "student" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await API.post("/users/register", form);
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required /><br />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
