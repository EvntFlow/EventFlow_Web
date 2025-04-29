// src/pages/ForgotPasswordConfirmation.jsx
import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material';

const ForgotPasswordConfirmation = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";

    return (
        <Grid container
              sx={{
                    minHeight: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F4F7FA'
              }}>

            {/* Left Side: Illustration */}
            <Grid item
                  size={5}
                  alignContent="center"
                  sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', p: 2 }}>
                <img src="/img/Login_Image1.png"
                     alt="Login illustration"
                     style={{ width: '100%', objectFit: 'scale-down' }} />
            </Grid>

            {/* Right Side: Login card */}
            <Grid item size={7} md={7} sx={{ p: 4, maxWidth: 800 }}>
                <Card sx={{ boxShadow: 4 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Button variant="text" href={returnUrl}
                                startIcon={<ArrowBack />}>
                            Back to Login
                        </Button>

                        <Typography variant="h4" sx={{ my: 2 }}>
                            <b>Verify your email</b>
                        </Typography>

                        <Typography variant="body1" gutterBottom={true}>
                            Please check your email to finish resetting your password.
                        </Typography>

                        <Button variant="contained"
                                fullWidth={true}
                                href={returnUrl}
                                sx={{ my: 2 }}>
                            Back to Login
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ForgotPasswordConfirmation;
