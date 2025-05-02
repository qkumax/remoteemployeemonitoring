import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./Navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:4444/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/team">My Team</Link></li>
        <li><Link to="/Tasks">Dashboard</Link></li>
        <li><Link to="/profile">My Account</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>

      {user ? (
        <div className="nav-user-info" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <p>👤 {user.fullName}</p>
          <p>💼 {user.position}</p>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-buttons">
          <button 
            onClick={() => navigate("/login")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
