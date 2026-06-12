import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { useAuth } from "./AuthContext";   // ✅ FIX

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();   // ✅ FIX

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login:", { email, password });

      const res = await api.post("/auth/login", { email, password });
      console.log("Login response:", res.data);

      // 🔥 SAVE USER + TOKEN IN CONTEXT
      loginUser(res.data.user, res.data.token);   // ✅ FIX

      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login error";
      alert("Login failed: " + msg);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      <input type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />

      <br />

      <input type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />

      <br />

      <button onClick={handleSubmit}
        style={{ width: "300px", padding: "10px", background: "red", color: "white" }}>
        Login
      </button>
    </div>
  );
}

export default Login;




