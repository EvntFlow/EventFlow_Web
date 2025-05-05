// @ts-check

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TestimonialCard from './TestimonialCard';

const TestimonialSection = ({ testimonials }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        backgroundImage:'url(/img/testimonial.png)',
        backgroundSize: 'cover'
      }}>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          boxSizing: "border-box",
          width: "100%",
          p: 4
        }}>
        {/* Section Title */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: '', color: 'white' }}>
          Testimonials
        </Typography>

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {testimonials.map((testimonial, index) => (
            <Grid size={6} key={index} sx={{ alignItems: "center", justifyItems: "center" }} >
              <TestimonialCard
                avatar={testimonial.avatar}
                name={testimonial.name}
                role={testimonial.role}
                stars={testimonial.stars}
                description={testimonial.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TestimonialSection;
