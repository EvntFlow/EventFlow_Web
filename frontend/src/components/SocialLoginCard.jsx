import React from 'react';
import { Card, CardActionArea, Box, Typography } from '@mui/material';

const SocialLoginCard = ({ icon, name }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <CardActionArea
        onClick={() => {
          // Handle login logic here (e.g., redirect to OAuth)
          console.log(`Login with ${name}`);
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            gap: 2,
          }}
        >
          {/* Application Icon */}
          <Box
            component="img"
            src={icon}
            alt={`${name} icon`}
            sx={{ width: 24, height: 24 }}
          />
          {/* Login Text */}
          <Typography variant="body1" fontWeight="bold">
            Login with {name}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default SocialLoginCard;
