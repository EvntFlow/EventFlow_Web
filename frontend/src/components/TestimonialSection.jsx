import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import TestimonialCard from './TestimonialCard';

const TestimonialSection = ({ testimonials }) => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
      <Container>
        {/* Section Title */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: '' }}>
          Testimonials
        </Typography>

        {/* Render testimonial cards */}
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
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
      </Container>
    </Box>
  );
};

export default TestimonialSection;
