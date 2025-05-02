import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, CircularProgress } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Токен отсутствует");
      return;
    }

    axios
      .get("http://localhost:4444/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Ошибка при загрузке профиля");
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <div className="profile-container">
          <div className="profile-header">
            <h1>{user?.fullName || "Имя не указано"}</h1>
          </div>

          <div className="profile-content">
            <div className="profile-left">
              <div className="profile-picture"></div>
              <div className="profile-info">
                <p>
                  <strong>Position:</strong> {user?.position || "Должность не указана"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
              </div>
              <div className="profile-stats">
                <p>
                  <strong>Hours worked this month:</strong> 35
                </p>
                <p>
                  <strong>Number of tasks in progress:</strong> 12
                </p>
                <p>
                  <strong>Number of closed tasks:</strong> 5
                </p>
                <p>
                  <strong>Number of frozen tasks:</strong> 1
                </p>
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
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
