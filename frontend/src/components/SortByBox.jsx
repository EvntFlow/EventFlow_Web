// @ts-check

import React, { useState } from 'react';
import { Box, Select, MenuItem, Typography } from '@mui/material';

/** @typedef {"relevance" | "date" | "price"} SortOption */

/**
 * @typedef SortByDropdownProps
 * @property {(s: SortOption) => void} onChange
 */

/**
 *
 * @param {SortByDropdownProps} props
 * @returns
 */
export default function SortByDropdown(props) {
  const [sortOption, setSortOption] = useState(/** @type {SortOption} */('relevance'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 3 }}>
      <Typography sx={{ m: 1 }}>Sort by: </Typography>
      <Select
        variant="outlined"
        value={sortOption}
        onChange={(e) => {
          setSortOption(/** @type {SortOption} */(e.target.value));
          props.onChange?.apply(props, [e.target.value])
        }}
        sx={{ m: 1, minWidth: "10rem" }}>
          <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="price">Price</MenuItem>
      </Select>
    </Box>
  );
};
