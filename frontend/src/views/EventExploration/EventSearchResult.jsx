import React from 'react';
import Header from '../../components/Header';
import Search from '../../components/Search';
import EventSection from '../../components/EventSection';
import Footer from '../../components/Footer';

import { Toolbar,Box } from '@mui/material';
import SortByDropdown from '../../components/SortByBox';
import FilterSidebar from '../../components/FilterSideBar';

// Top events array with event details
const eventsData = [
  {
    id: 1,
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
    dateMonth: 'NOV',
    dateDay: '24',
    title: 'A third event title goes here',
    address: 'Venue 3',
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    price: '$10',
    interested: 8,
  },
  {
    id: 1,
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
    dateMonth: 'NOV',
    dateDay: '24',
    title: 'A third event title goes here',
    address: 'Venue 3',
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    price: '$10',
    interested: 8,
  },
  {
    id: 1,
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
    dateMonth: 'NOV',
    dateDay: '24',
    title: 'A third event title goes here',
    address: 'Venue 3',
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    price: '$10',
    interested: 8,
  },
  {
    id: 1,
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
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
    image: '../../img/TopEvent.png',
    dateMonth: 'NOV',
    dateDay: '24',
    title: 'A third event title goes here',
    address: 'Venue 3',
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    price: '$10',
    interested: 8,
  },
];

const event_filters = {
    Price: ['Free', 'Paid'],
    Date: ['Today', 'This Week', 'This Month', 'Pick a Date'],
    Category: ['Adventure', 'Art Performance', 'Auction', 'Festival', 'Music Show', 'Sports', 'Theater', 'Food & Drink', 'Workshop', 'Networking'],
    Location: ['Wollongong', 'Sydney CBD', 'Dapto', 'Canberra', 'Pick a Location',],
  };

const EventSearchPage = () => {
  return (
    <div>
        {/* Fixed header */}
        <Header />
        {/* <Toolbar /> */}
        <Toolbar />
        <div style={{ marginBottom: '40px' }}>
            <Search />  
        </div>
        <Box sx={{ display: 'flex' }}>
            <FilterSidebar filters={event_filters} />
            
            {/* Main content area */}
            <Box sx={{ flexGrow: 1, ml: '10%', p: 1 }}>
                {/* Main Content */}
                <SortByDropdown/>
                <EventSection events={eventsData} button_flag={false} />
            </Box>
        </Box>
        <Footer />
        
    </div>
  );
}

export default EventSearchPage;
