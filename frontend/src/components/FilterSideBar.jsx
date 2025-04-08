import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Button, Divider } from '@mui/material';

const FilterSidebar = ({ filters }) => {
  // Initialize the selectedFilters state dynamically based on the filters object
  const [selectedFilters, setSelectedFilters] = useState(
    Object.keys(filters).reduce((acc, key) => {
      acc[key] = filters[key].reduce((filterAcc, option) => {
        filterAcc[option] = false; // Initialize each option as unchecked
        return filterAcc;
      }, {});
      return acc;
    }, {})
  );

  const handleFilterChange = (filterCategory, filterOption) => (event) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterCategory]: {
        ...selectedFilters[filterCategory],
        [filterOption]: event.target.checked,
      },
    });
  };

  return (
    <Box
      sx={{
        width: '10%',
        minHeight: '100vh',
        bgcolor: 'background.paper',
        p: 2,
        position: 'relative',
        top: 0,
        left: 0,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
      
      {/* Iterate over each filter category */}
      {Object.keys(filters).map((filterCategory) => (
        <Box key={filterCategory} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {filterCategory}
          </Typography>
          {/* Iterate over each filter option */}
          {filters[filterCategory].map((filterOption) => (
            <FormControlLabel
              key={filterOption}
              control={
                <Checkbox
                  checked={selectedFilters[filterCategory][filterOption]}
                  onChange={handleFilterChange(filterCategory, filterOption)}
                  name={filterOption}
                />
              }
              label={filterOption}
            />
          ))}
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Apply Filters Button */}
      <Button variant="contained" color="primary" fullWidth>
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;