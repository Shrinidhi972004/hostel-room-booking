import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await API.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Navigate based on user role
      if (res.data.user.role === "admin") {
        navigate("/"); // Admin dashboard
      } else {
        navigate("/rooms"); // Student room list
      }
    } catch (error) {
      setErr(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
