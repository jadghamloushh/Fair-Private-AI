import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./Dashboard.css";

function Dashboard({ children }) {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="navbar">
          <div className="nav-left">
            <Link to="/" className="nav-brand">
              <span className="brand-icon">🏦</span> Loan Approval AI
            </Link>
          </div>
          <nav className="nav-right">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {token && (
              <Link to="/apply" className="nav-link">
                Apply
              </Link>
            )}
            {token ? (
              <button
                onClick={handleLogout}
                className="nav-button logout-button"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="nav-link login-button">
                  Login
                </Link>
                <Link to="/register" className="nav-link register-button">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="dashboard-main">{children}</main>
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>© 2025 Loan Approval AI. All rights reserved.</p>
          <p>Building fair and secure lending experiences.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
