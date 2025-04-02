import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const TestimonialCard = ({ avatar, name, role, stars, description }) => {
  // Utility to render star icons
  const renderStars = (count) => {
    const starElements = [];
    for (let i = 0; i < count; i++) {
      starElements.push(
        <StarIcon key={i} sx={{ color: '#FFC107' }} />
      );
    }
    return starElements;
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header: Avatar, Name, Role, and Stars */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {role}
            </Typography>
            {/* Stars */}
            <Stack direction="row" spacing={0.5}>
              {renderStars(stars)}
            </Stack>
          </Box>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.primary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
