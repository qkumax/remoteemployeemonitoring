import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
    const [fullName, setFullName] = useState('');
    const [position, setPosition] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4444/auth/complete-profile', 
                { fullName, position },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            navigate('/dashboard');
        } catch (err) {
            console.error('Ошибка при заполнении профиля');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Заполните профиль</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} margin="normal" />
                <TextField fullWidth label="Должность" value={position} onChange={(e) => setPosition(e.target.value)} margin="normal" />
                <Button type="submit" variant="contained" color="primary">Сохранить</Button>
            </form>
        </Container>
    );
};

export default CompleteProfile;
