import React from 'react';
import { Box, Typography } from '@mui/material';

const Category = ({ image, title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          objectFit: 'cover',
          mb: 1,
        }}
      />
      <Typography variant="body1" fontWeight="medium">
        {title}
      </Typography>
    </Box>
  );
};

export default Category;
