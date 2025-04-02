import React from 'react';
import { Box, Container } from '@mui/material';
import Category from './Category';

const categoryData = [
  {
    image: '/logo192.png',
    title: 'Music',
  },
  {
    image: 'https://via.placeholder.com/64?text=Nightlife',
    title: 'Nightlife',
  },
  {
    image: 'https://via.placeholder.com/64?text=Performing',
    title: 'Performing',
  },
  {
    image: 'https://via.placeholder.com/64?text=Dating',
    title: 'Dating',
  },
  {
    image: 'https://via.placeholder.com/64?text=Marketing',
    title: 'Marketing',
  },
  {
    image: 'https://via.placeholder.com/64?text=Business',
    title: 'Business',
  },
  {
    image: 'https://via.placeholder.com/64?text=Food+and+Drinks',
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
