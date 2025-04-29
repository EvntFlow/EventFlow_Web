// src/pages/LoginRegistrationHome.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Google, Microsoft } from '@mui/icons-material';
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
  TextField,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import SocialLoginCard from '../../components/SocialLoginCard';
import { getApiUrl } from '../../api';

const Login = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") ?? "/";
    const error = urlParams.get("error");

    const [isPersistent, setIsPersistent] = React.useState(false);

    /**
     * @param {string} url
     * @param {string | undefined} currentReturnUrl
     */
    function getPageUrl(url, currentReturnUrl) {
        currentReturnUrl ??= returnUrl;
        return `/${url}?returnUrl=${encodeURIComponent(currentReturnUrl)}`
    }

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
                                action="Login"
                                provider="Google"
                                isPersistent={isPersistent}
                                returnUrl={returnUrl}/>
                            <SocialLoginCard
                                icon={ () => <Microsoft /> }
                                action="Login"
                                provider="Microsoft"
                                isPersistent={isPersistent}
                                returnUrl={returnUrl}/>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            <Typography>OR</Typography>
                        </Divider>

                        <Box component="form"
                             method="post"
                             action={getApiUrl("Account/Login", { returnUrl: returnUrl })}>

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
                                           required={true}
                                           fullWidth={true} />
                                </Box>
                            </Box>

                            <Grid container
                                  sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                  }}>
                                <Grid size={6} sx={{ alignItems: 'start' }}>
                                    {/* Optional “Remember me” checkbox */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox name="isPersistent"
                                                      value={isPersistent}
                                                      onChange={(e) =>
                                                        setIsPersistent(e.target.checked)
                                                      }/>
                                        }
                                        label="Remember Me"
                                    />
                                </Grid>
                                <Grid size={6} sx={{ alignItems: 'end' }}>
                                    <Link component={RouterLink}
                                          to={getPageUrl(
                                                "Account/ForgotPassword",
                                                getPageUrl("Account/Login")
                                             )}>
                                        <Typography width="100%" align="right">
                                            Forgot Password?
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>

                            {
                                error == null ? null :
                                <Typography color="error" align="center" sx={{ my: 2 }}>
                                    {error}
                                </Typography>
                            }

                            <Button type="submit" variant="contained" fullWidth sx={{ my: 2 }}>
                                Login
                            </Button>
                        </Box>

                        {/* Link to registration */}
                        <Typography variant="body2" align="center" sx={{ my: 3 }}>
                            Don’t have an account?{' '}
                            <Link component={RouterLink}
                                  to={getPageUrl("Account/Register", getPageUrl("Account/Login"))}>
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
