import React from 'react';
import Header from '../../../components/Header';
import OrganizerStartCard from './OrganizerStartCard';
import SolutionCard from './SolutionsCard';
import OfferCard from './OfferCard';
import Feature from './Feature';
import FeatureNews from './FeatureNews';
import TestimonialSection from '../../../components/TestimonialSection';
import SubscribeSection from '../../../components/SucribeCard';
import Footer from '../../../components/Footer';

import { Toolbar } from '@mui/material';
// import { AppBar, Toolbar, Button, Container, Box, TextField, MenuItem } from '@mui/material';

const testimonialsData = [
  {
    avatar: 'https://via.placeholder.com/100?text=Avatar+1',
    name: 'Alice Johnson',
    role: 'Product Manager',
    stars: 5,
    description: 'This product exceeded my expectations. Truly outstanding!',
  },
  {
    avatar: 'https://via.placeholder.com/100?text=Avatar+2',
    name: 'Bob Smith',
    role: 'Designer',
    stars: 4,
    description: 'A great experience with a few minor hiccups. Would recommend.',
  },
  {
    avatar: 'https://via.placeholder.com/100?text=Avatar+3',
    name: 'Charlie Lee',
    role: 'Developer',
    stars: 5,
    description: 'Amazing quality and support. Highly satisfied with my purchase!',
  },
  // Add more testimonials as needed
];

const OrganizerHomepage = () => {
  return (
    <div>
        
        {/* Fixed header */}
        <Header />
        {/* <Toolbar /> */}
        <Toolbar />
        {/* Main Content */}
        <OrganizerStartCard />
        <SolutionCard/>
        <OfferCard/>
        <Feature />
        <FeatureNews />
        <SubscribeSection/>
        <TestimonialSection testimonials={testimonialsData} />
        <Footer />
    </div>
  );
}

export default OrganizerHomepage;
