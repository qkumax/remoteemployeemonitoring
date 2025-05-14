import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import '../components/Register.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");  // ✅ Добавили поле "Повторите пароль"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError("❌ Пароли не совпадают!");
            setLoading(false);
            return;
        }

        try {
            await axios.post("http://localhost:4444/auth/register", { email, password });
            navigate("/complete-profile");  
        } catch (err) {
            setError(err.response?.data?.message || "11Ошибка сервера");
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ padding: 4, marginTop: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        📝 Регистрация
                    </Typography>

                    {error && <Typography color="error" textAlign="center">{error}</Typography>}

                    <form onSubmit={handleSubmit}>
                        <TextField 
                            fullWidth 
                            label="Email" 
                            type="email"
                            margin="normal" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                        <TextField 
                            fullWidth 
                            label="Пароль" 
                            type="password" 
                            margin="normal" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        <TextField 
                            fullWidth 
                            label="Повторите пароль" 
                            type="password" 
                            margin="normal" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            sx={{ mt: 2 }} 
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Зарегистрироваться"}
                        </Button>
                    </form>

                    <Typography textAlign="center" sx={{ mt: 2 }}>
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Register;