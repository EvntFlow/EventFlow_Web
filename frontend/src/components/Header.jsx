// @ts-check

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitch from './RoleSwitch';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Define your nav items per role
const navConfig = {
    guest: [
        { label: 'Events', to: '/Event/Search' },
        { label: 'Register', to: '/Account/Register' },
    ],
    attendee: [
        { label: 'Events', to: '/Event/Search' },
        { label: 'Tickets', to: '/Ticket' },
        { label: 'Account', to: '/Account' },
    ],
    organizer: [
        { label: 'Create Events', to: '/create-event' },
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Account', to: '/account' },
    ],
};

const Header = () => {
    const { role, logout } = useAuth();
    const links = navConfig[role];

    const [anchorEl, setAnchorEl] = React.useState(/** @type {HTMLElement | null} */(null));

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
                    EventFlow
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

                {/* {user ? ( */}
                {role !== 'guest' ? (
                    <>
                        {/* Notification Icon */}
                        <IconButton
                            color="inherit"
                            sx={{mr: 2}}
                            onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <NotificationsIcon />
                        </IconButton>

                        {/* Role‐toggle button */}
                        <RoleSwitch />

                        {/* Logout stub */}
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={logout}
                            sx={{ml: 2}}
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

            <Popover
                open={anchorEl !== null}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Typography sx={{ p: 2 }}>Notifications</Typography>
            </Popover>
        </AppBar>
  );
};

export default Header;
