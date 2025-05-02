import React, { useContext, useEffect, useState, useRef } from 'react';
import Header from './Header';
import Search from './Search';
import EventSection from './EventSection';
import Footer from './Footer';
import { fetchApi } from '../api';
import { Toolbar,Box } from '@mui/material';
import SortByDropdown from './SortByBox';
import FilterSidebar from './FilterSideBar';
import { SearchContext } from './SearchContext';
import { useLocation } from 'react-router-dom';

const event_filters = {
    Price: ['Free', 'Paid'],
    Date: ['Today', 'This Week', 'This Month', 'Pick a Date'],
    Category: ['Adventure', 'Art Performance', 'Auction', 'Festival', 'Music Show', 'Sports', 'Theater', 'Food & Drink', 'Workshop', 'Networking'],
    Location: ['Wollongong', 'Sydney CBD', 'Dapto', 'Canberra', 'Pick a Location',],
  };

const EventSearchPage = () => {
  const { searchData } = useContext(SearchContext);
  const location = useLocation();
  
  const [events, setEvents] = useState([]);
  const frozenSearchData = useRef({
    date: searchData.date,
    price: searchData.price,
    name: searchData.name,
    location: searchData.location,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    const query = new URLSearchParams(window.location.search);

    const date = query.get('date') || frozenSearchData.current.date;
    const price = query.get('price') || frozenSearchData.current.price;
    const keywords = query.get('keywords') || frozenSearchData.current.name || '';
    const locationParam = query.get('location') || frozenSearchData.current.location;

    if (keywords.trim()) params.append('keywords', keywords);
    if (locationParam) params.append('location', locationParam);
    if (date) params.append('date', date);
    if (price) params.append('price', price);

    fetchApi('Event/FindEvents', params)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, [location.search]); 
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
                <EventSection events={events} button_flag={false} />
            </Box>
        </Box>
        <Footer />
        
    </div>
  );
}

export default EventSearchPage;
