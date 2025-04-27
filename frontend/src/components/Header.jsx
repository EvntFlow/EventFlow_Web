import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Switch, Box } from '@mui/material';
import { Link } from 'react-router-dom';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { AuthContext } from '../context/AuthContext';  // no longer needed

const Header = () => {
  // Temporarily hard-code guest mode:
  const user = null;                    // always guest
  const logout = () => {};              // no-op
  const toggleRole = () => {};          // no-op

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

  // Pick which set to render
  const mode = user ? user.role : 'guest';
  const links = navConfig[mode];

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: '#0284c7' }}
    >
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
          {!user && (
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
