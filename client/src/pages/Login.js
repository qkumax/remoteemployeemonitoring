import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../components/Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:4444/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка сервера");
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ padding: 4, marginTop: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        🔑 Вход
                    </Typography>

                    {error && <Typography color="error" textAlign="center">{error}</Typography>}

                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField fullWidth label="Пароль" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : "Войти"}
                        </Button>
                    </form>

                    <Typography textAlign="center" sx={{ mt: 2 }}>
                        Нет аккаунта? <Link to="/register">Регистрация</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
