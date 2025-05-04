// @ts-check

import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import CategoryView from './Category';
import { fetchApi } from '../api';

/** @import Category from "../models/Category" */

const Categories = () => {
  const [categoryData, setCategoryData] = useState(/** @type {Category[]} */([]));

  useEffect(() => {
    (async function () {
      const response = await fetchApi("Event/Category");
      if (!response.ok) {
        setCategoryData([]);
      } else {
        setCategoryData(await response.json());
      }
    })();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {categoryData.map((c) => (
          <CategoryView category={c} />
        ))}
      </Container>
    </Box>
  );
};

export default Categories;
