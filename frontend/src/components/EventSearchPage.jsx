import React, { use, useContext, useEffect, useState } from 'react';
import Header from './Header';
import Search from './Search';
import EventSection from './EventSection';
import Footer from './Footer';
import { getApiUrl } from '../api';
import { Toolbar,Box } from '@mui/material';
import SortByDropdown from './SortByBox';
import FilterSidebar from './FilterSideBar';
import { SearchContext } from './SearchContext';
import { useLocation } from 'react-router-dom';

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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
  const { searchData } = useContext(SearchContext);
  const location = useLocation();
  const query = new URLSearchParams(window.location.search);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();

    const category = query.get('category') || searchData.category;
    const minDate = query.get('minDate') || searchData.minDate;
    const maxDate = query.get('maxDate') || searchData.maxDate;
    const minPrice = query.get('minPrice') || searchData.minPrice;
    const maxPrice = query.get('maxPrice') || searchData.maxPrice;
    const keywords = query.get('keywords') || searchData.keywords || '';
    const [name, locationFromQuery] = keywords.split(', ');

    if (name) params.append('name', name);
    if (locationFromQuery) params.append('location', locationFromQuery);
    if (category) params.append('category', category);
    if (minDate) params.append('minDate', minDate);
    if (maxDate) params.append('maxDate', maxDate);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    const apiUrl = getApiUrl("Event/FindEvents", params);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [location.search, searchData]); 
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
