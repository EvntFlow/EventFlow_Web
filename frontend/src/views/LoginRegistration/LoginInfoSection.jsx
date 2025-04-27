// src/pages/LoginInfoSection.jsx
// import React, { useState, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
// import { AuthContext } from '../../context/AuthContext';
// import api from '../../services/api';           // ← your axios instance
// import { useNavigate } from 'react-router-dom';

export default function LoginInfoSection() {
  // const { setUser /* or your context’s login() */ } = useContext(AuthContext);
  // const navigate = useNavigate();

  // const [creds, setCreds] = useState({ email: '', password: '' });

  // const handleChange = e =>
  //   setCreds(c => ({ ...c, [e.target.name]: e.target.value }));

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     // 1) Send email/password
  //     const response = await api.post('/api/Account/Login', {
  //       email: creds.email,
  //       password: creds.password
  //     });
  //     // 2) Grab the token & user from the response
  //     const { token, user } = response.data;
  //     // 3) Persist them (your context’s login() can do this too)
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(user));
  //     setUser(user);
  //     // 4) Navigate on success
  //     navigate('/events');
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.response?.data?.message || 'Login failed');
  //   }
  // };

  return (
    <Box
      component="form"
      // onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        name="email"
        label="Email"
        type="email"
        // value={creds.email}
        // onChange={handleChange}
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        // value={creds.password}
        // onChange={handleChange}
        required
      />
      {/* <Button type="submit" variant="contained" disabled={!creds.email || !creds.password}> */}
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Box>
  );
}
