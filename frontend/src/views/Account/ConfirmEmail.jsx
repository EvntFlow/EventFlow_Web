// src/pages/ConfirmEmail.jsx
import React from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Input
} from '@mui/material';
import { getApiUrl } from '../../api';

const ConfirmEmail = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";
    const error = urlParams.get("error");

    const userId = urlParams.get("userId");
    const code = urlParams.get("code");

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
                        <Typography variant="h4" gutterBottom sx={{ my: 2 }}>
                            <b>Confirm Email</b>
                        </Typography>

                        <Typography variant="body1">
                            Please click on "Confirm" if you have created a
                            EventFlow account using this email.
                        </Typography>

                        <Box component="form"
                             method="post"
                             action={getApiUrl("Account/ConfirmEmail", { returnUrl: returnUrl })}>

                            <Input hidden={true}
                                   name="userId"
                                   value={userId}
                                   required={true}
                                   readOnly={true}
                                   style={{display: 'none'}} />

                            <Input hidden={true}
                                   name="code"
                                   value={code}
                                   required={true}
                                   readOnly={true}
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
                                Confirm
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ConfirmEmail;
