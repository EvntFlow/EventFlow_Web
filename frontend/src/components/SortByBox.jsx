import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortByDropdown = () => {
  const [sortOption, setSortOption] = useState('relevance'); // Default value

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Handle sorting logic based on selected option here
    console.log('Selected Sort Option:', event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 3 }}>
      <FormControl sx={{width: 200}}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOption}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortByDropdown;