// src/pages/ForgotPassword.jsx
import React from 'react';
import {
    Button,
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { getApiUrl } from '../../api';

const ForgotPassword = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";
    const error = urlParams.get("error");

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
                            <b>Forgot your password?</b>
                        </Typography>

                        <Typography variant="body1" gutterBottom={true}>
                            Don’t worry, it happens to all of us.
                            Enter your email below to recover your password.
                        </Typography>

                        <Box component="form"
                             method="post"
                             action={getApiUrl("Account/ForgotPassword", { returnUrl: returnUrl })}>

                            {/* Email Row */}
                            <Box sx={{
                                        backgroundColor: '#f3f3f3',
                                        borderRadius: 2,
                                        p: 2,
                                        my: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                 }}>
                                <EmailIcon sx={{ fontSize: 28 }} />
                                <Box sx={{ ml: 2 }} width="100%">
                                <TextField variant="standard"
                                           placeholder="name@example.com"
                                           title="Email"
                                           label="Email"
                                           name="email"
                                           type="email"
                                           required={true}
                                           fullWidth={true} />
                                </Box>
                            </Box>

                            {
                                error == null ? null :
                                <Typography color="error" align="center" sx={{ my: 2 }}>
                                    {error}
                                </Typography>
                            }

                            <Button type="submit" variant="contained" fullWidth sx={{ my: 2 }}>
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
