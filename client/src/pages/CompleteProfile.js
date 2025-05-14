import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Токен отсутствует');
        navigate('/login');
        return;
      }

      console.log("Данные, отправленные на сервер:", { fullName, position }); 

      await axios.post('http://localhost:4444/auth/complete-profile', 
        { fullName, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/profile');
    } catch (err) {
      setError('Ошибка при заполнении профиля');
      console.error('Ошибка сервера:', err.response?.data);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ padding: 4, marginTop: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Заполнение профиля
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Полное имя"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Должность"
              margin="normal"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Сохранить'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CompleteProfile;
