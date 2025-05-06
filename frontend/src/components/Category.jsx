// @ts-check

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

/** @import Category from "../models/Category" */

/**
 * @typedef CategoryViewProps
 * @property {Category} category
 */

/**
 * @param {CategoryViewProps} props
 */
export default function CategoryView({ category }) {
  const { role } = useAuth();

  return (
    <Button
      variant="text"
      href={
        role !== "organizer" ?
          `/Event/Search?category=${category.id}` :
          `/Event/Create?category=${category.id}`
      }
      sx={{
        textTransform: "inherit",
        color: "inherit",
        width: "8rem",
      }}>
      <Stack
        spacing={2}
        alignItems="center"
        justifyItems="start"
        sx={{ width: "100%", height: "100%" }}>
        <Box
          component="img"
          src={category.imageUri || undefined}
          alt={category.name}
          onError={(e) => /** @type {HTMLImageElement} */(e.target).src = "/img/TopEvent.png"}
          sx={{
            width: "6rem",
            height: "6rem",
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <Typography
          variant="body1"
          fontWeight="medium"
          textOverflow="ellipsis"
          textAlign="center"
          maxWidth="100%">
            {category.name}
        </Typography>
      </Stack>
    </Button>
  );
};
