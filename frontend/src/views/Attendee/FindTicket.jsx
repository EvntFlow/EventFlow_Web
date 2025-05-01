import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Toolbar, Typography } from '@mui/material';
import EventTicketList from '../../components/EventTicketList';

const rows = [
  { 
    id: 1, 
    eventName: 'Summer Music Festival', 
    category: 'Music', 
    price: 75.99, 
    quantity: 1, 
    status: 'Upcoming' 
  },
  { 
    id: 2, 
    eventName: 'Tech Conference 2025', 
    category: 'Technology', 
    price: 199.99, 
    quantity: 3, 
    status: 'Upcoming' 
  },
  { 
    id: 3, 
    eventName: 'Comedy Night', 
    category: 'Entertainment', 
    price: 35.50, 
    quantity: 2, 
    status: 'Happening' 
  },
  { 
    id: 4, 
    eventName: 'Basketball Championship', 
    category: 'Sports', 
    price: 89.99, 
    quantity: 1, 
    status: 'Happening' 
  },
  { 
    id: 5, 
    eventName: 'Wine Tasting Tour', 
    category: 'Food & Drink', 
    price: 49.99, 
    quantity: 1, 
    status: 'Closed' 
  },
  { 
    id: 6, 
    eventName: 'Art Exhibition', 
    category: 'Arts', 
    price: 25.00, 
    quantity: 3, 
    status: 'Upcoming' 
  },
  { 
    id: 7, 
    eventName: 'Business Workshop', 
    category: 'Professional', 
    price: 149.99, 
    quantity: 2, 
    status: 'Closed' 
  },
  { 
    id: 8, 
    eventName: 'Film Festival', 
    category: 'Entertainment', 
    price: 65.50, 
    quantity: 4, 
    status: 'Upcoming' 
  },
  { 
    id: 9, 
    eventName: 'Cooking Masterclass', 
    category: 'Food & Drink', 
    price: 85.00, 
    quantity: 1, 
    status: 'Happening' 
  },
  { 
    id: 10, 
    eventName: 'Science Exhibition', 
    category: 'Education', 
    price: 15.50, 
    quantity: 8, 
    status: 'Upcoming' 
  }
 ];

const FindTicket = () => {
    return (
      <div>
          {/* Fixed header */}
          <Header />
          {/* <Toolbar /> */}
          <Toolbar />
          {/* Main Content */}
          <div style={{ margin: '40px' }}>
            <Typography variant="h4" fontWeight="bold">FIND YOUR TICKET</Typography>
          </div>
          <div style={{ margin: '40px' }}>
            <EventTicketList initialRows={rows}/>
          </div>
          <Footer />
      </div>
    )}

export default FindTicket;
