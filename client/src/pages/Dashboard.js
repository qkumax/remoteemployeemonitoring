import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [stats, setStats] = useState({ totalWorkTime: 0, topApps: [] });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4444/activity/stats", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => setStats(res.data))
        .catch((err) => console.error("Ошибка загрузки статистики:", err));
    }, []);

    useEffect(() => {
        axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => setUser(res.data))
        .catch(() => {
            localStorage.removeItem("token"); // Удаляем токен если он недействителен
            navigate("/");
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Удаляем токен
        navigate("/"); // Перенаправляем на страницу входа
    };

    if (!user) return <Typography>Загрузка...</Typography>;

    return (
        <Container>
            <Typography variant="h4">📊 Дашборд продуктивности</Typography>
            <Card sx={{ padding: 2, marginTop: 2 }}>
                <Typography>⏳ Общее время работы: {stats.totalWorkTime} мин</Typography>
            </Card>

            <Typography variant="h4" sx={{ marginTop: 4 }}>👤 Привет, {user.fullName}!</Typography>
            <Typography>Твоя роль: {user.role}</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ marginTop: 2 }}>
                Выйти
            </Button>
        </Container>
    );
};

export default Dashboard;
