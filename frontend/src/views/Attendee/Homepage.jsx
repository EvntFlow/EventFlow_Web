import React from 'react';
import Categories from '../../components/Categories';
import Featured from '../../components/Featured';
import EventSection from '../../components/EventSection';
import TestimonialSection from '../../components/TestimonialSection';
import SubscribeSection from '../../components/SubscribeCard';
import { Box, Stack } from '@mui/material';
import SearchCard from '../../components/Search';
import dayjs from 'dayjs';
// import { AppBar, Toolbar, Button, Container, Box, TextField, MenuItem } from '@mui/material';

/** @typedef {import('../../backend').FindEventParams} FindEventParams */

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

/** @type {FindEventParams} */
const query10AndUnder = {
  maxPrice: 10.0
};
/** @type {FindEventParams} */
const queryOnline = {
  location: ["Online"]
};
/** @type {FindEventParams} */
const queryWeekend = {
  minDate: dayjs(Date.now()).startOf("week").day(6).toISOString(),
  maxDate: dayjs(Date.now()).startOf("week").day(6).add(2, "day").toISOString()
};

export default function Homepage() {
  return (
    <div>
      <Box sx={{ position: "relative", mb: "15vh" }}>
        {/* Background Image Layer */}
        <img alt="" src="/img/header.jpeg" width="100%" />
        <SearchCard title="Welcome Back!" />
      </Box>
      <Categories />
      <Featured />
      <Stack sx={{ mx: 10, my: 5 }} spacing={5}>
        <EventSection title="TOP EVENTS $10 AND UNDER" query={query10AndUnder} limit={6} />
        <EventSection title="POPULAR ONLINE EVENTS" query={queryOnline} limit={6} />
        <EventSection title="THIS WEEKEND" query={queryWeekend} limit={6} />
      </Stack>
      <TestimonialSection testimonials={testimonialsData} />
      <SubscribeSection />
    </div>
  );
}
