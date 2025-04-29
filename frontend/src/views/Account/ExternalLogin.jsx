// src/pages/ExternalLogin.jsx
import React from 'react';
import {
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Input,
  Typography,
} from '@mui/material';
import { getApiUrl } from '../../api';

const ExternalLogin = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";
    const error = urlParams.get("error");

    const email = urlParams.get("email");
    const providerDisplalyName = urlParams.get("providerDisplayName");

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
                        <Typography variant="h5">
                            <b>Welcome to</b>
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                            <b>EVENTFLOW</b>
                        </Typography>

                        <Typography variant="body1" sx={{ my: 1 }}>
                            You have successfully authenticated with{' '}
                            <strong>{providerDisplalyName}</strong>.
                        </Typography>

                        <Typography variant="body1" sx={{ my: 1 }}>
                            Please click "Register" to create a new EventFlow account
                            using the email <strong>{email}</strong>.
                        </Typography>

                        <Box component="form"
                             method="post"
                             action={getApiUrl(
                                "Account/ExternalRegister", { returnUrl: returnUrl }
                             )}>

                            <Input hidden={true}
                                   name="email"
                                   value={email}
                                   required={true}
                                   readOnly={true}
                                   style={{display: 'none'}} />

                            {
                                error == null ? null :
                                <Typography color="error" align="center" sx={{ my: 2 }}>
                                    {error}
                                </Typography>
                            }

                            <Button type="submit" variant="contained" fullWidth sx={{ my: 2 }}>
                                Register
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ExternalLogin;
