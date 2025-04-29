// src/pages/Register.jsx
// import React, { useState, useContext } from 'react';
import { Google, Microsoft } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Link,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getApiUrl } from '../../api';
import SocialLoginCard from '../../components/SocialLoginCard';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// See: https://github.com/facebook/create-react-app/issues/8779#issuecomment-1214839590
import FORCE_IMPORT_POLYFILL from 'core-js/modules/es.regexp.escape';
// eslint-disable-next-line no-unused-expressions
FORCE_IMPORT_POLYFILL;

export default function Register() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";
    const error = urlParams.get("error");

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
                        <Typography variant="h5">
                            <b>Welcome to</b>
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                            <b>EVENTFLOW</b>
                        </Typography>

                        {/* Social logins */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                            <SocialLoginCard
                                icon={ () => <Google /> }
                                action="Register"
                                provider="Google"
                                isPersistent={false}
                                returnUrl={returnUrl}/>
                            <SocialLoginCard
                                icon={ () => <Microsoft /> }
                                action="Register"
                                provider="Microsoft"
                                isPersistent={false}
                                returnUrl={returnUrl}/>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            <Typography>OR</Typography>
                        </Divider>

                        <Box component="form"
                             method="post"
                             action={getApiUrl("Account/Register", { returnUrl: returnUrl })}>

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

                        {/* Link to login */}
                        <Typography variant="body2" align="center" sx={{ my: 3 }}>
                            Already have an account?{' '}
                            <Link component={RouterLink}
                                  to={`/Account/Login?returnUrl=${encodeURIComponent(returnUrl)}`}>
                                Log In
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
