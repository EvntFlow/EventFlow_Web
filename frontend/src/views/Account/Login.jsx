// src/pages/LoginRegistrationHome.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Facebook, Google } from '@mui/icons-material';
import {
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Link,
  TextField
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import SocialLoginCard from '../../components/SocialLoginCard';
import { getApiUrl } from '../../api';

const Login = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";
    const error = urlParams.get("error");

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
                    icon={ () => <Google /> }
                    name="Google"
                />
                <SocialLoginCard
                    icon={ () => <Facebook /> }
                    name="Facebook"
                />
                </Box>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <Box component="form"
                     method="post"
                     action={getApiUrl("Account/Login", { returnUrl: returnUrl })}>

                    <Card sx={{
                            borderRadius: 2,
                            boxShadow: 2,
                            width: "100%",
                            maxWidth: 480,
                            margin: '0 auto',
                          }}>
                        <CardContent sx={{ p: 2 }}>
                            {/* Email Row */}
                            <Box sx={{
                                    backgroundColor: '#f3f3f3',
                                    borderRadius: 2,
                                    p: 2,
                                    mb: 2,
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
                                           fullWidth={true} />
                                </Box>
                            </Box>

                            {/* Password Row */}
                            <Box sx={{
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

                    {/* Optional “Remember me” checkbox */}
                    <FormControlLabel
                        sx={{ mt: 2 }}
                        control={<Checkbox name="remember" />}
                        label="Remember Me"
                    />

                    {
                        error == null ? null :
                        <Typography color="error" align="center" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    }

                    {/* <Button type="submit" variant="contained" disabled={!creds.email || !creds.password}> */}
                    <Button type="submit" variant="contained" fullWidth={true} sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>


                {/* Link to registration */}
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don’t have an account?{' '}
                    <Link component={RouterLink} to="/account/register">
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
