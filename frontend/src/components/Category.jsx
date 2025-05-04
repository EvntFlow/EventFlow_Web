// @ts-check

import React from 'react';
import { Box, Button, Typography } from '@mui/material';

/** @typedef {import("../models/Category").default} Category */

/**
 * @typedef CategoryViewProps
 * @property {Category} category
 */

/**
 * @param {CategoryViewProps} props
 */
export default function CategoryView({ category }) {
  return (
    <Button
      variant="text"
      href={`/Event/Search?category=${category.id}`}
      sx={{
        textTransform: "inherit",
        color: "inherit",
        width: "8rem",
      }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          overflow: "hidden"
        }}
      >
        <Box
          component="img"
          src={category.imageUri || undefined}
          alt={category.name}
          onError={(e) => /** @type {HTMLImageElement} */(e.target).src = "/img/TopEvent.png"}
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            objectFit: 'cover',
            mb: 1,
          }}
        />
          <Typography
            variant="body1"
            fontWeight="medium"
            textOverflow="ellipsis"
            maxWidth="100%">
              {category.name}
          </Typography>
      </Box>
    </Button>
  );
};
