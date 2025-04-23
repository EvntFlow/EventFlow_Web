import React from 'react';
//import Slider from 'react-slick';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

const FeatureNews = () => {
  // Sample data, but you can fetch yours dynamically
  const newsData = [
    {
      id: 1,
      date: 'February 20, 2024',
      image: '/img/OrganizerHomepage/FeatureNews_1.png',
      title: 'How to Sell Tickets: A Guidebook for Event Organizers',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been lorem...',
      link: '#',
    },
    {
      id: 2,
      date: 'February 20, 2024',
      image: '/img/OrganizerHomepage/FeatureNews_2.png',
      title: '9 Insider Tips for Building Your Events Community',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been lorem...',
      link: '#',
    },
    {
      id: 3,
      date: 'February 20, 2024',
      image: '/img/OrganizerHomepage/FeatureNews_3.png',
      title:
        'How to Build Lasting Partnerships With Brands, Nonprofits, and Governments',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been lorem...',
      link: '#',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: { xs: 3, md: 4 } }}
      >
        Feature News
      </Typography>

      {/* Cards */}
      <Grid container spacing={3}>
        {newsData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}
            sx={{ maxWidth: { xs: '100%', md: 'calc((100% - 48px) / 3)' } }}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Date */}
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  {item.date}
                </Typography>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                  gutterBottom
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  {item.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ mt: 'auto' }}>
                {/* "See more" button */}
                <Box sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="text"
                    endIcon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      p: 0,
                      minWidth: 'auto',
                    }}
                    href={item.link}
                  >
                    See more
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


export default FeatureNews;