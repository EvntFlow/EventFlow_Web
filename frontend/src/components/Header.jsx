import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { useAuth } from '../context/AuthContext';

// Define your nav items per role
const navConfig = {
    guest: [
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
    { label: 'Find your ticket', to: '/ticket' },
    { label: 'Account', to: '/account' },
    ],
    attendee: [
    { label: 'Events', to: '/events' },
    { label: 'Contact us', to: '/contact' },
    { label: 'Find your ticket', to: '/ticket', variant: 'contained' },
    ],
    organizer: [
    { label: 'Create Events', to: '/create' },
    { label: 'Contact us', to: '/contact' },
    { label: 'Dashboard', to: '/dashboard', variant: 'contained' },
    ],
};

const Header = () => {
    // const { user, login, logout } = useAuth();
    // const mode = user ? user.role : 'guest';
    // read role from localStorage on first render

    const [mode, setMode] = useState('guest');
    const navigate = useNavigate();
    useEffect(() => {
        const r = localStorage.getItem('role');
        if (r === 'attendee' || r === 'organizer') {
            setMode(r);
        }
    }, []);
    const links = navConfig[mode];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#0284c7' }}>
            <Toolbar>
                {/* Logo */}
                <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                    flexGrow: 1,
                    fontWeight: 'bold',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                EVENTFLOW
                </Typography>

                {/* Nav Links */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {links.map(({ label, to, variant }) => (
                    <Button
                    key={label}
                    component={Link}
                    to={to}
                    color="inherit"
                    variant={variant || 'text'}
                    sx={{ mr: 2 }}
                    >
                    {label}
                    </Button>
                ))}

                {/* Guest view → Sign In */}
                {/* {user ? ( */}
                {mode !== 'guest' ? (
                    <>
                        {/* Role‐toggle button */}
                        <Button
                            variant="outlined"
                            color="inherit"
                            // onClick={() => user.role === 'attendee' ? login('organizer') : login('attendee') }
                            onClick={()  => {
                                const next = mode === 'attendee' ? 'organizer' : 'attendee';
                                localStorage.setItem('role', next);
                                setMode(next);
                                navigate(next === 'organizer'
                                    ? '/organizer-homepage'
                                    : '/');
                            }}
                            sx={{ mr: 2 }}
                        >
                            Switch to {mode === 'attendee' ? 'Organizer' : 'Attendee'}
                        </Button>
                        {/* Logout stub */}
                        <Button 
                            variant="outlined" 
                            color="inherit" 
                            // onClick={logout}
                            onClick={() => {
                                localStorage.removeItem('role');
                                setMode('guest');
                                navigate('/');        // back to public home
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    /* Guest view → Sign In */
                    <Button
                        variant="outlined"
                        color="inherit"
                        component={Link}
                        to="/Account/Login"
                    >
                    Sign In
                    </Button>
                )}
                </Box>
            </Toolbar>
        </AppBar>
  );
};

export default Header;
