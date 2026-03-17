import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/auth/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
      alert(`Welcome back, ${user.name}!`);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img
          src="/public/logo.png"
          alt="TradeBlazer Logo"
          className="auth-logo"
        />
        <h2>Sign In to TradeBlazer  </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p onClick={() => navigate("/register")} className="auth-link">
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
};

export default Login;