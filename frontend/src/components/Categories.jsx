import React from 'react';
import { Box, Container } from '@mui/material';
import Category from './Category';

const categoryData = [
  {
    image: '/img/TopEvent.png',
    title: 'Music',
  },
  {
    image: '/img/TopEvent.png',
    title: 'Nightlife',
  },
  {
    image: '/img/TopEvent.png',
    title: 'Performing',
  },
  {
    image: '/img/TopEvent.png',
    title: 'Dating',
  },
  {
    image: '/img/TopEvent.png',
    title: 'Marketing',
  },
  {
    image: '/img/TopEvent.png',
    title: 'Business',
  },
  {
    image: '/img/TopEvent.png',
    title: 'Food and Drinks',
  },
];

const Categories = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: '#f9f9f9' }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {categoryData.map((cat) => (
          <Category key={cat.title} image={cat.image} title={cat.title} />
        ))}
      </Container>
    </Box>
  );
};

export default Categories;
