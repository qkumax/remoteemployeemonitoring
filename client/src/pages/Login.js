import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Сброс ошибки перед новым запросом

        try {
            const { data } = await axios.post("/auth/login", { email, password });

            localStorage.setItem("token", data.token); // Сохраняем токен в localStorage

            alert("✅ Успешный вход!");
            navigate("/dashboard"); // Перенаправление на дашборд
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка сервера");
        }
    };

    return (
        <Container>
            <Typography variant="h4">🔑 Вход</Typography>
            {error && <Alert severity="error">{error}</Alert>} {/* Отображаем ошибку */}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Пароль"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Войти
                </Button>
            </form>
        </Container>
    );
};

export default Login;
