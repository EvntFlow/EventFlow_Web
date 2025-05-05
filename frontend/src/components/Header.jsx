// @ts-check

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Popover, Stack, Alert, CircularProgress, AlertTitle, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitch from './RoleSwitch';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getNotifications } from '../backend';

/** @import Notification from "../models/Notification"; */

// Define your nav items per role
const navConfig = {
  guest: [
    { label: 'Events', to: '/Event/Search' },
    { label: 'Register', to: '/Account/Register' },
  ],
  attendee: [
    { label: '', to: '/Home/Attendee' },
    { label: 'Events', to: '/Event/Search' },
    { label: 'Tickets', to: '/Ticket' },
    { label: 'Account', to: '/Account' },
  ],
  organizer: [
    { label: '', to: '/Home/Organizer' },
    { label: 'Create Events', to: '/create-event' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Account', to: '/account' },
  ],
};

const Header = () => {
  const { user, role, logout } = useAuth();
  const links = navConfig[role];

  const [notifications, setNotifications] = useState(/** @type {Notification[] | null} */(null));
  const [anchorEl, setAnchorEl] = React.useState(/** @type {HTMLElement | null} */(null));

  useEffect(() => {
    (async function(){
      if (!user) {
        return;
      }
      setNotifications(await getNotifications());
    })();
  }, [user]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0284c7' }}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to={links[0].to}
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
                sx={{ mr: 2 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Badge
                    color="error"
                    badgeContent={notifications?.length ?? 0}
                    invisible={!notifications || !notifications.length}>
                      <NotificationsIcon />
                  </Badge>
              </IconButton>

              {/* Role‐toggle button */}
              <RoleSwitch />

              {/* Logout stub */}
              <Button
                variant="outlined"
                color="inherit"
                onClick={logout}
                sx={{ ml: 2 }}
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
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}>
          <Stack
            spacing={1}
            sx={{
              p: 2,
              px: 4,
              width: "20rem",
              maxHeight: "20rem",
              overflowY: "auto",
              overflowX: "clip",
            }}
            alignItems="center">
            {notifications ?
              (notifications.length ? (
                notifications.map(n => (
                  <Alert
                    key={n.id}
                    severity="info"
                    sx={{ width: "100%" }}
                    slotProps={{ icon: { sx: { alignSelf: "center" }}}}>
                      <AlertTitle>{n.topic}</AlertTitle>
                      {n.message}
                  </Alert>
                ))
              ) : (
                <Alert
                  severity="success"
                  sx={{ width: "100%" }}
                  slotProps={{ icon: { sx: { alignSelf: "center" }}}}>
                    <AlertTitle>You're all set!</AlertTitle>
                    You have no notifications.
                </Alert>
            )) : (
              <CircularProgress />
            )}
          </Stack>
      </Popover>
    </AppBar>
  );
};

export default Header;
