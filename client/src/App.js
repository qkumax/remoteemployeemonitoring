import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import CompleteProfile from "./pages/CompleteProfile";
import TaskManager from "./pages/TaskManager";

const theme = createTheme(); // ✅ Создаём тему Material UI

function App() {
    return (
        <ThemeProvider theme={theme}> 
            <CssBaseline /> 
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/complete-profile" element={<CompleteProfile />} />
                    <Route path="/tasks" element={<TaskManager />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </ThemeProvider>  
    );
}

export default App;
