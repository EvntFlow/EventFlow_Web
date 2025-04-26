// src/pages/LoginRegistrationHome.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SocialLoginCard from '../../components/SocialLoginCard';
import LoginInfoSection from './LoginInfoSection';

import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';

const Login = () => {
    return (
        <Grid
        container
        sx={{
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4F7FA'
        }}
        >
        {/* Left Side: Illustration */}
        <Grid
            item
            xs={12}
            md={5}
            sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', p: 2 }}
        >
            <img
            src="/img/Login_Image1.png"
            alt="Login illustration"
            style={{ maxWidth: '100%', objectFit: 'cover' }}
            />
        </Grid>

        {/* Right Side: Login card */}
        <Grid item xs={12} md={7} sx={{ p: 4 }}>
            <Card sx={{ boxShadow: 4 }}>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom>
                Welcome to <br />
                EVENTFLOW
                </Typography>

                {/* Social logins */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <SocialLoginCard
                    icon="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    name="Google"
                />
                <SocialLoginCard
                    icon="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png"
                    name="Facebook"
                />
                </Box>

                <Divider sx={{ my: 3 }}>OR</Divider>

                {/* This component now includes your email/password inputs + Login button */}
                <LoginInfoSection />

                {/* Optional “Remember me” checkbox */}
                <FormControlLabel
                sx={{ mt: 2 }}
                control={<Checkbox name="remember" />}
                label="Remember Me"
                />

                {/* Link to registration */}
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link component={RouterLink} to="/Account/Register">
                    Sign Up
                </Link>
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        </Grid>
    );
};

export default Login;
