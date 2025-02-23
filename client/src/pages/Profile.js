import React from "react";
import "./Profile.css"; 
 import Navbar from "..//components/Navbar"; // Ensure Navbar is correctly implemented
import Footer from "../components/Footer"; 
const Profile = () => {
  return (
    <>
      <Navbar/>
      <div className="profile-container">
        <div className="profile-header">
          <h1>Anel Nurzhatayeva</h1>
        </div>

        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-picture"></div>
            <div className="profile-info">
              <p><strong>Position:</strong> UX/UI Designer</p>
              <p><strong>Email:</strong> aneln0504@gmail.com</p>
            </div>
            <div className="profile-stats">
              <p><strong>Hours worked this month:</strong> 35</p>
              <p><strong>Number of tasks in progress:</strong> 12</p>
              <p><strong>Number of closed tasks:</strong> 5</p>
              <p><strong>Number of frozen tasks:</strong> 1</p>
            </div>
          </div>

          <div className="profile-right">
            <div className="projects">
              <h2>Projects</h2>
              <div className="project-card">Project 1</div>
              <div className="project-card">Project 2</div>
              <div className="project-card">Project 3</div>
            </div>

            <div className="task-status">
              <h2>In Progress</h2>
              <div className="task-card">Notifications - Low</div>
              <div className="task-card">Task types - Low</div>
            </div>

            <div className="closed-tasks">
              <h2>Closed</h2>
              <p>No closed tasks yet.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
