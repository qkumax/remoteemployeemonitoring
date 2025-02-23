import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import Link and useNavigate
import "./Navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate(); // ✅ Define navigate

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/team">My Team</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">My Account</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
      
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
    </nav>
  );
};

export default Navbar;
