import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import TestimonialCard from './TestimonialCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      right: '-20px',
      transform: 'translateY(-50%)',
      backgroundColor: 'white',
      boxShadow: 1,
      '&:hover': { backgroundColor: '#eee' },
      zIndex: 1,
    }}
  >
    <ArrowForwardIos fontSize="small" />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      left: '-20px',
      transform: 'translateY(-50%)',
      backgroundColor: 'white',
      boxShadow: 1,
      '&:hover': { backgroundColor: '#eee' },
      zIndex: 1,
    }}
  >
    <ArrowBackIos fontSize="small" />
  </IconButton>
);

const TestimonialSection = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '1px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: '#f5f5f5',
        backgroundImage: 'url(/img/testimonial.png)',
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <Container>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }} color="white">
          Testimonials
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <Box key={index}>
                <TestimonialCard 
                  avatar={testimonial.avatar}
                  name={testimonial.name}
                  role={testimonial.role}
                  stars={testimonial.stars}
                  description={testimonial.description}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialSection;
