import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/auth/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Normal user login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call backend login API
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user.role === "user") {
        // Save user info in localStorage
        localStorage.setItem("userData", JSON.stringify(data.user));
        alert(`Welcome back, ${data.user.username}!`);
        navigate("/home");
      } else if (res.ok && data.user.role === "admin") {
        alert("Please use the Admin login button!");
      } else {
        // Fallback to old localStorage logic if backend fails
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
          (u) => u.email === email && u.password === password && u.role === "user"
        );
        if (user) {
          localStorage.setItem("userData", JSON.stringify(user));
          alert(`Welcome back, ${user.name}!`);
          navigate("/home");
        } else {
          alert(data.error || "Invalid email or password for user.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  // Admin login
  const handleAdminLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user.role === "admin") {
        localStorage.setItem("userData", JSON.stringify(data.user));
        alert(`Welcome back, Admin ${data.user.username}!`);
        navigate("/admin");
      } else if (res.ok && data.user.role === "user") {
        alert("This is a user account. Please use the normal login button.");
      } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const admin = users.find(
          (u) => u.email === email && u.password === password && u.role === "admin"
        );
        if (admin) {
          localStorage.setItem("userData", JSON.stringify(admin));
          alert(`Welcome back, Admin ${admin.name}!`);
          navigate("/admin");
        } else {
          alert(data.error || "Invalid admin credentials.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
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
        <h2>Sign In to TradeBlazer</h2>
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

          <button
            type="button"
            className="admin-login-btn"
            onClick={handleAdminLogin}
          >
            Login as Administrator
          </button>
        </form>

        <p onClick={() => navigate("/register")} className="auth-link">
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
};

export default Login;