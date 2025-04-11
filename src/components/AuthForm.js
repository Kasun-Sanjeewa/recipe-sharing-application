import { useState } from "react";
import {
    Container, TextField, Button, Typography, Paper, Box, ToggleButtonGroup, ToggleButton
} from "@mui/material";

export default function AuthForm({ onLogin }) {
    const [authMode, setAuthMode] = useState("login");
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleToggle = (_, newMode) => {
        if (newMode) setAuthMode(newMode);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8000/users");
        const users = await res.json();

        if (authMode === "signup") {
            const userExists = users.find(u => u.username === formData.username);
            if (userExists) {
                alert("Username already exists!");
                return;
            }
            await fetch("http://localhost:8000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            alert("Signup successful! Please login.");
            setAuthMode("login");
        } else {
            const user = users.find(
                u => u.username === formData.username && u.password === formData.password
            );
            if (user) {
                alert("Login successful!");
                onLogin(user); // store in parent state or localStorage
            } else {
                alert("Invalid credentials!");
            }
        }

        setFormData({ username: "", password: "" });
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {authMode === "login" ? "Login" : "Sign Up"}
                </Typography>

                <ToggleButtonGroup
                    color="primary"
                    value={authMode}
                    exclusive
                    onChange={handleToggle}
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    <ToggleButton value="login">Login</ToggleButton>
                    <ToggleButton value="signup">Sign Up</ToggleButton>
                </ToggleButtonGroup>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained">
                        {authMode === "login" ? "Login" : "Sign Up"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
