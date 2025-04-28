// src/pages/Register.jsx
// import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

export default function Register() {
    // const [form, setForm] = useState({ email:'', password:'', confirmPassword:'' });
    // const { register } = useContext(AuthContext);
    // const nav = useNavigate();

    // const handleChange = e => {
    //     setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    // }

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     // simple client‐side check
    //     if (form.password !== form.confirmPassword) return alert("Passwords must match");
    //     try {
    //         await register({ email: form.email, password: form.password });
    //         nav('/login');      // send user to login
    //     } catch (err) {
    //         console.error(err);
    //         alert(err.response?.data?.message || 'Registration failed');
    //     }
    // };

    return (
        // <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
        <Box component="form" sx={{ maxWidth: 400, mx: 'auto' }}>
        <TextField
            fullWidth label="Email" name="email"
            // value={form.email} onChange={handleChange}
            margin="normal"
        />
        <TextField
            fullWidth label="Password" name="password" type="password"
            // value={form.password} onChange={handleChange}
            margin="normal"
        />
        <TextField
            fullWidth label="Confirm Password" name="confirmPassword" type="password"
            // value={form.confirmPassword} onChange={handleChange}
            margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt:2 }}>
            Register
        </Button>
        </Box>
    );
}
