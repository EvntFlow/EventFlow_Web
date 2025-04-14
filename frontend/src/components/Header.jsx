import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom'; // added import
const Header = () => {
  return (
    <AppBar
      position="fixed" 
      sx={{ 
        backgroundColor: '#0284c7', // Adjust to match your preferred color/gradient
      }}
    >
      <Toolbar>
        {/* Logo / Brand Name */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          EVENTFLOW
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" sx={{ mr: 2 }}>Events</Button>
        <Button color="inherit" sx={{ mr: 2 }}>Contact</Button>
        <Button color="inherit" sx={{ mr: 2 }}>Find your ticket</Button>
        <Button color="inherit" sx={{ mr: 2 }}>Account</Button>

        {/* "Sign In" Button or User Icon */}
        <Button 
          variant="outlined" 
          color="inherit"
          // component={Link}
          // to="/login" 
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
