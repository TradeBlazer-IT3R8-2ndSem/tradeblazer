import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/auth/register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !studentId || !department || !number || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      alert("Email already registered.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      studentId,
      department,
      number,
      address,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userData", JSON.stringify(newUser));

    alert(`Welcome, ${name}!`);
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img
          src="/public/logo.png"
          alt="TradeBlazer Logo"
          className="auth-logo"
        />
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="CITC">CITC</option>
            <option value="CEA">CEA</option>
            <option value="COT">COT</option>
            <option value="CSTE">CSTE</option>
            <option value="CSM">CSM</option>
            <option value="COM">COM</option>
            <option value="CON">CON</option>
            <option value="SHS">SHS</option>
          </select>

          <input
            type="text"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        <p onClick={() => navigate("/login")} className="auth-link">
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;