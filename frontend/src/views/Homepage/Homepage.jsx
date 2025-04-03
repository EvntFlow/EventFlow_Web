import React from 'react';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Categories from '../../components/Categories';
import Feature from '../../components/Feature';
import EventSection from '../../components/EventSection';
import TestimonialSection from '../../components/TestimonialSection';
import Footer from '../../components/Footer';

import { Toolbar } from '@mui/material';
// import { AppBar, Toolbar, Button, Container, Box, TextField, MenuItem } from '@material-ui/core';

// Top events array with event details
const eventsData = [
  {
    id: 1,
    image: 'https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png',
    dateMonth: 'NOV',
    dateDay: '22',
    title: 'Event title that can go up to two lines',
    address: 'Venue 1',
    timeStart: '10:00 AM',
    timeEnd: '12:00 PM',
    price: '$10',
    interested: 10,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/320x180?text=Event+Image',
    dateMonth: 'NOV',
    dateDay: '23',
    title: 'Another event title that might be a bit longer',
    address: 'Venue 2',
    timeStart: '1:00 PM',
    timeEnd: '3:00 PM',
    price: '$10',
    interested: 5,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/320x180?text=Event+Image',
    dateMonth: 'NOV',
    dateDay: '24',
    title: 'A third event title goes here',
    address: 'Venue 3',
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    price: '$10',
    interested: 8,
  },
  // Add more event objects as needed
];

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

const Homepage = () => {
  return (
    <div>
        {/* Fixed header */}
        <Header />
        {/* <Toolbar /> */}
        <Toolbar />
        {/* Main Content */}
        <Search />
        <Categories />
        <Feature />
        <EventSection headTitle="TOP EVENTS $10 AND UNDER" events={eventsData} />
        <EventSection headTitle="POPULAR ONLINE EVENTS" events={eventsData} />
        <EventSection headTitle="THIS WEEKEND" events={eventsData} />
        <TestimonialSection testimonials={testimonialsData} />
        <Footer />
    </div>
  );
}

export default Homepage;
