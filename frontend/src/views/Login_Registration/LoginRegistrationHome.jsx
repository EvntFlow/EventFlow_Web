import React from 'react';
import SocialLoginCard from './SocialLoginCard';
import LoginInfoSection from './LoginInfoSection'

import loginImage from '../../img/Login_Image1.png';
import {
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Link,
    Divider,
    FormControlLabel,
    Checkbox} from '@mui/material';

const LoginRegistrationHome = () => {
    console.log('loginImage:', loginImage);
    return (
        <Grid container sx={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F7FA' }}>
            {/* Left Side: Image (40% on larger screens) */}
            <Grid container sx={{width: '40%', justifyContent: 'right', padding: '20px'}}>
                <img
                src={loginImage}
                alt="Your placeholder"
                style={{
                    // width: '100%',
                    // height: '100%',
                    objectFit: 'cover'
                }}
                />
            </Grid>

            {/* Right Side: Login form (60% on larger screens) */}
            <Grid
                item
                xs={12}
                md={7}
                sx={{
                    width: '60%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    padding: '60px',
                }}
            >
                <Card sx={{width: '100%', height: '100%', boxShadow: 4, p: 2 }}>
                    <CardContent>
                        {/* Welcome Heading */}
                        <Typography variant="h3" gutterBottom>
                        Welcome to <br/> EVENTFLOW
                        </Typography>

                        {/* Social Login Options */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                        <SocialLoginCard
                            icon="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            name="Google"
                        />
                        <SocialLoginCard
                            icon="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png"
                            name="Facebook"
                        />
                        </Box>

                        {/* OR Divider */}
                        <Divider sx={{ my: 2 }}>OR</Divider>

                        <LoginInfoSection/>

                        {/* Remember Me */}
                        <FormControlLabel control={<Checkbox />} label="Remember Me" />

                        {/* Login Button */}
                        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                        Login
                        </Button>

                        {/* Sign Up Link */}
                        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Don't have an account? <Link href="#">Sign Up</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default LoginRegistrationHome;
