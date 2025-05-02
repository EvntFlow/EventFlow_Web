import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  Box,
  TextField,
  IconButton,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from './SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchCard = () => {
  const {searchData,setSearchData} = useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchData.date) {
      queryParams.append('date', new Date(searchData.date).toISOString());
    }
    if (searchData.price) {
      const parsedPrice = parseFloat(searchData.price);
      if (!isNaN(parsedPrice)) {
        queryParams.append('price', parsedPrice.toString());
      }
    }
  
    if (searchData.name?.trim()) {
      queryParams.append('keywords', searchData.name.trim());
    }
  
    if (searchData.location?.trim()) {
      queryParams.append('location', searchData.location.trim());
    }
    navigate(`/event-search?${queryParams.toString()}`);
  };
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 4,
        overflow: 'visible', // Ensures the circular button doesn't get clipped
        position: 'relative',
        top: 302
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Title & Subtitle (optional) */}
        <Typography variant="h4" fontWeight="bold" gutterBottom color= '#008EC4'>
          Welcome back!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Explore exciting events happening now with EventFlow
        </Typography>

        {/* Search Form */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            mt: 3,
            gap: 2,
          }}
          component ="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Location"
            name="location"
            placeholder="Add destination"
            variant="outlined"
            value={searchData.location || ''}
            onChange={handleChange}
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Date"
            name="date"
            placeholder="Add dates"
            variant="outlined"
            type="date"
            value={searchData.date || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Price"
            name="price"
            placeholder="Price range"
            variant="outlined"
            value={searchData.price || ''}
            onChange={handleChange}
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Categories"
            name="category"
            placeholder="Add categories"
            variant="outlined"
            value={searchData.category || ''}
            onChange={handleChange}
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            label="Search event name"
            name ="name"
            placeholder="Search event name"
            variant="outlined"
            value={searchData.name || ''}
            onChange={handleChange}
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
            size="large">
            <SearchIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchCard;