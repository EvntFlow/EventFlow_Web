import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const EventCard = ({
  image,
  dateMonth,
  dateDay,
  title,
  address,
  timeStart,
  timeEnd,
  price,
  interested,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: 320, // Adjust as needed
      }}
    >
      {/* Image with a star icon in the top-right corner */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'grey.200',
            },
          }}
          // Optionally handle "favorite" logic here
        >
          <StarBorderIcon />
        </IconButton>
      </Box>

      {/* Card Content: Date, Title, Address, Time, Price, Interested */}
      <CardContent sx={{ display: 'flex', gap: 2 }}>
        {/* Date Section */}
        <Box
          sx={{
            minWidth: 50,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: '#5B4B8A', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            {dateMonth}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            {dateDay}
          </Typography>
        </Box>

        {/* Event Details */}
        <Box sx={{ flex: 1 }}>
          {/* Title (allow up to two lines) */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 'bold',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // Limit to two lines
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>

          {/* Address (Venue) */}
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>

          {/* Time */}
          <Typography variant="body2" color="text.secondary">
            {timeStart} - {timeEnd}
          </Typography>

          {/* Price & Interested */}
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.primary">
              {price}
            </Typography>
            <Typography variant="body2" color="text.primary">
              • {interested} interested
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
