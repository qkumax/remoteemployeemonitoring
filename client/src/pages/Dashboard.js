import React from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import ActivityChart from "../components/ActivityChart";
import ActivityTable from "../components/ActivityTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
    return (
        <>
            <Navbar />  {/* ✅ Добавлен Navbar */}
            <Box sx={{ display: "flex" }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Container>
                        <Typography variant="h4" gutterBottom>
                            📊 Панель управления
                        </Typography>

                        <Grid container spacing={3}>
                            {/* Карточка общей статистики */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant="h6">⏳ Общее время работы</Typography>
                                    <Typography variant="h4">8 ч 15 мин</Typography>
                                </Paper>
                            </Grid>

                            {/* Карточка количества задач */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant="h6">📌 Выполненные задачи</Typography>
                                    <Typography variant="h4">34</Typography>
                                </Paper>
                            </Grid>

                            {/* Карточка продуктивности */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant="h6">🚀 Продуктивность</Typography>
                                    <Typography variant="h4">82%</Typography>
                                </Paper>
                            </Grid>

                            {/* График активности */}
                            <Grid item xs={12}>
                                <ActivityChart />
                            </Grid>

                            {/* Таблица активности */}
                            <Grid item xs={12}>
                                <ActivityTable />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Footer />  {/* ✅ Добавлен Footer */}
        </>
    );
};

export default Dashboard;
