// AdminLogin.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUser({ role: data.role });
        setLoginMessage(data.message);
        navigate("/apply"); // Redirect to loan application page
      } else {
        setLoginMessage(data.message || "Admin login failed.");
      }
    } catch (error) {
      setLoginMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {loginMessage && <p className="login-message">{loginMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
