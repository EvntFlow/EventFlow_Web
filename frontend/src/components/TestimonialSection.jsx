import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import TestimonialCard from './TestimonialCard';

const TestimonialSection = ({ testimonials }) => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5',backgroundImage:'url(/img/testimonial.png)', backgroundSize: 'cover' }}>
      <Container>
        {/* Section Title */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: '', color: 'white' }}>
          Testimonials
        </Typography>
        
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
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