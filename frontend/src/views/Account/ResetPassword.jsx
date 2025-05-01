// src/pages/ResetPassword.jsx
import React from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Input
} from '@mui/material';
import { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import { getApiUrl } from '../../api';

const ResetPassword = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";
    const error = urlParams.get("error");

    const email = urlParams.get("email");
    const code = urlParams.get("code");

    const [password, setPassword] = useState("");

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

                        <Typography variant="h4" gutterBottom sx={{ my: 2 }}>
                            <b>Set a password</b>
                        </Typography>

                        <Typography variant="body1">
                            Your previous password has been reset.
                            Please set a new password for your account.
                        </Typography>

                        <Box component="form"
                             method="post"
                             action={getApiUrl("Account/ResetPassword", { returnUrl: returnUrl })}>

                            {/* Password Row */}
                            <Box sx={{
                                        backgroundColor: '#f3f3f3',
                                        borderRadius: 2,
                                        p: 2,
                                        my: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                 }}>
                                <KeyIcon sx={{ fontSize: 28 }} />
                                <Box sx={{ ml: 2 }} width="100%">
                                <TextField variant="standard"
                                           placeholder="password"
                                           title="Password"
                                           label="Password"
                                           name="password"
                                           type="password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           required={true}
                                           fullWidth={true} />
                                </Box>
                            </Box>

                            {/* Confirm Password Row */}
                            <Box sx={{
                                        backgroundColor: '#f3f3f3',
                                        borderRadius: 2,
                                        p: 2,
                                        my: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                 }}>
                                <KeyIcon sx={{ fontSize: 28 }} />
                                <Box sx={{ ml: 2 }} width="100%">
                                <TextField variant="standard"
                                           placeholder="password"
                                           title="Confirm Password"
                                           label="Confirm Password"
                                           type="password"
                                           slotProps={{
                                            htmlInput: {
                                              pattern: RegExp.escape(password)
                                            }
                                           }}
                                           onInvalid={(e) =>
                                            e.target.setCustomValidity("Passwords do not match.")
                                           }
                                           onChange={(e) =>
                                            e.target.setCustomValidity("")
                                           }
                                           required={true}
                                           fullWidth={true} />
                                </Box>
                            </Box>

                            <Input hidden={true}
                                   name="email"
                                   value={email}
                                   required={true}
                                   style={{display: 'none'}} />

                            <Input hidden={true}
                                   name="code"
                                   value={code}
                                   required={true}
                                   style={{display: 'none'}} />

                            {
                                error == null ? null :
                                <Typography color="error" align="center" sx={{ my: 2 }}>
                                    {error}
                                </Typography>
                            }

                            <Button type="submit"
                                    variant="contained"
                                    fullWidth={true}
                                    sx={{ my: 2 }}>
                                Set password
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;
