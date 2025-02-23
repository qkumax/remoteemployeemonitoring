import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                minHeight="100vh"
                textAlign="center"
            >
                <Typography variant="h3" gutterBottom>
                    🚀 Добро пожаловать в Task Manager!
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Управляйте своими задачами эффективно и легко.
                </Typography>

                <Box mt={4}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate("/login")} 
                        sx={{ marginRight: 2 }}
                    >
                        Войти
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => navigate("/register")}
                    >
                        Регистрация
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
