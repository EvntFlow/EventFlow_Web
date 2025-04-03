import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginInfoCard = ({
  email = 'example@gmail.com',
  password = 'password123',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Email Row */}
        <Box
          sx={{
            backgroundColor: '#f3f3f3',
            borderRadius: 2,
            p: 2,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EmailIcon sx={{ fontSize: 28 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              example@gmail.com
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {email}
            </Typography>
          </Box>
        </Box>

        {/* Password Row */}
        <Box
          sx={{
            backgroundColor: '#f3f3f3',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <KeyIcon sx={{ fontSize: 28 }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Password
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {showPassword ? password : '•'.repeat(password.length)}
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={handleTogglePassword}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginInfoCard;
