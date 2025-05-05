import React, { useState, useEffect } from 'react';
import { Toolbar, Typography, CircularProgress, Box } from '@mui/material';
import EventTicketList from '../../components/EventTicketList';

// import { Link as RouterLink } from 'react-router-dom';
// import { getApiUrl } from '../../api';


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

    // const urlParams = new URLSearchParams(window.location.search);
    // const returnUrl = urlParams.get("returnUrl") ?? "/";
    // const error = urlParams.get("error");

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('FindTicket component rendered');
        fetch('https://ishar.tail35ead.ts.net:8443/api/Ticket')
            .then(res => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                setRows(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            })
    }, []);


    return (
        <>
            <Box m={4}>
                <Typography variant="h4" fontWeight="bold">
                FIND YOUR TICKET
                </Typography>
            </Box>
            <Box m={4}>
                {loading && (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
                )}
                {error && (
                <Typography color="error">
                    Error loading tickets: {error}
                </Typography>
                )}
                {!loading && !error && (
                <EventTicketList initialRows={rows} />
                )}
            </Box>
            {/* <div style={{ margin: '40px' }}>
                <EventTicketList initialRows={rows}/>
            </div> */}
        </>
    )}

export default FindTicket;
