// src/pages/LoginInfoSection.jsx
// import React, { useState, useContext } from 'react';
import { Card, CardContent, Button, Box, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
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
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          width: "100%",
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          {/* Email Row */}
          <Box
            sx={{
              backgroundColor: '#f3f3f3',
              borderRadius: 2,
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <EmailIcon sx={{ fontSize: 28 }} />
            <Box sx={{ ml: 2 }} width="100%">
              <TextField variant="standard"
                        placeholder="name@example.com"
                        title="Email"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth={true} />
            </Box>
          </Box>

          {/* Password Row */}
          <Box
            sx={{
              backgroundColor: '#f3f3f3',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <KeyIcon sx={{ fontSize: 28 }} />
            <Box sx={{ ml: 2 }} width="100%">
              <TextField variant="standard"
                        placeholder="password"
                        title="Password"
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth={true} />
            </Box>
          </Box>
        </CardContent>
      </Card>
      {/* <Button type="submit" variant="contained" disabled={!creds.email || !creds.password}> */}
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Box>
  );
}
