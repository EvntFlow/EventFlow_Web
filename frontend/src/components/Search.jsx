import React from 'react';
import {
  Card,
  CardContent,
  Box,
  TextField,
  IconButton,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchCard = () => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 4,
        overflow: 'visible', // Ensures the circular button doesn't get clipped
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Title & Subtitle (optional) */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome back!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Explore exciting events happening now with EventFlow
        </Typography>

        {/* Search Form */}
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            mt: 3,
            gap: 2,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
          }}
        >
          <TextField
            label="Location"
            placeholder="Add destination"
            variant="outlined"
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Date"
            placeholder="Add dates"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Price"
            placeholder="Price range"
            variant="outlined"
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Categories"
            placeholder="Add categories"
            variant="outlined"
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Search event name"
            placeholder="Search event name"
            variant="outlined"
            sx={{ flex: 2, minWidth: 200 }}
          />

          {/* Circular search button */}
          <IconButton
            type="submit"
            color="primary"
            sx={{
              borderRadius: '50%',
              width: 56,
              height: 56,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
