import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Authorized from '../../../components/Authorized';
import { getEvents, findEvents, getTickets } from '../../../backend';
import { Link } from 'react-router-dom';

// Recharts imports
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';

/**
 * @import Event from "../../models/Event";
 */

 

function Dashboard() {
    // fetch data for dashboard and recent sales and total events/tickets/sales 
    const [events, setEvents] = useState(/** @type {Event[] | null} */(null));

    // const [tickets, setTickets] = useState();

    useEffect(() => {
        (async function() {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
        })();
    }, [])

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        totalEvents: 0,
        totalTickets: 0,
        totalSales: 0,
        monthlyData: [],
        recentSales: []
    });

    const months = useMemo(() => [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ], []); // Empty dependency array since this array never changes

    const processData = useCallback((events, tickets) => {
        if (!events || !tickets) {
            console.error('Events or tickets data is missing');
            return {
                totalEvents: 0,
                totalTickets: 0,
                totalSales: 0,
                monthlyData: [],
                recentSales: []
            };
        }

        // Initialize monthly data structure
        const monthlyData = months.map(month => ({
            month,
            tickets: 0,
            sales: 0,
            dailyData: []
        }));

        // Process events and tickets
        events.forEach(event => {
            try {
                const eventDate = new Date(event.startDate);
                const monthIndex = eventDate.getMonth();
                const day = eventDate.getDate();

                // Get tickets for this event
                const eventTickets = tickets.filter(ticket => ticket.eventId === event._id);
                const eventTotalTickets = eventTickets.length;
                const eventTotalSales = eventTickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0);

                // Update monthly totals
                monthlyData[monthIndex].tickets += eventTotalTickets;
                monthlyData[monthIndex].sales += eventTotalSales;

                // Add to daily data
                if (!monthlyData[monthIndex].dailyData[day - 1]) {
                    monthlyData[monthIndex].dailyData[day - 1] = {
                        day: `${day}${getDaySuffix(day)}`,
                        value: 0
                    };
                }
                monthlyData[monthIndex].dailyData[day - 1].value += eventTotalSales;
            } catch (error) {
                console.error('Error processing event:', event, error);
            }
        });

        // Calculate totals
        const totals = monthlyData.reduce((acc, month) => ({
            totalTickets: acc.totalTickets + month.tickets,
            totalSales: acc.totalSales + month.sales,
        }), {
            totalTickets: 0,
            totalSales: 0
        });

        // Get recent sales (last 5 events)
        const recentSales = events
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .slice(0, 5)
            .map(event => {
                try {
                    const eventTickets = tickets.filter(ticket => ticket.eventId === event._id);
                    return {
                        attendee: event.name,
                        eventName: event.name,
                        location: event.location,
                        dateTime: new Date(event.startDate).toLocaleString(),
                        quantity: eventTickets.length,
                        amount: eventTickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0)
                    };
                } catch (error) {
                    console.error('Error processing recent sale:', event, error);
                    return null;
                }
            })
            .filter(sale => sale !== null);

        return {
            totalEvents: events.length,
            ...totals,
            monthlyData,
            recentSales
        };
    }, [months]);

    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            
            // Fetch events using findEvents from backend.js
            setEvents(await findEvents({
                // Add any filters you need for organizer's events
                // For example, you might want to filter by date range
                minDate: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Start of year
                maxDate: new Date(new Date().getFullYear(), 11, 31).toISOString(), // End of year
            }));
            
            // Fetch tickets using getTickets from backend.js
            const tickets = await getTickets();

            console.log("Check data", events, tickets);
            
            // Process data
            const processedData = processData(events, tickets);
            setDashboardData(processedData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, [events, processData]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }


    // Generate data for all months
    const generateMonthlyData = (month) => {
        const daysInMonth = new Date(2024, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => ({
            day: `${i + 1}${getDaySuffix(i + 1)}`,
            value: Math.floor(Math.random() * 50) + 20 // Random value between 20-70
        }));
    };

    const monthlyDataExample = months.map((_, index) => generateMonthlyData(index));
    const currentMonthDataExample = monthlyDataExample[selectedMonth];
    console.log("Check exmple data for chart", monthlyDataExample, currentMonthDataExample, selectedMonth);

    console.log("Check data for dashboard", dashboardData);
    
    return (
        <Box sx={{ p: 3 }}>
            <Authorized role="organizer" />
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Total Events */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Total Events
                                </Typography>
                                <Avatar sx={{ bgcolor: 'secondary.light' }}>
                                    <ConfirmationNumberIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h5">{dashboardData.totalEvents}</Typography>
                            <Button 
                                component={Link}
                                size="small" 
                                endIcon={<VisibilityIcon />}
                                to="/Event/Manage"
                            >
                                View event list
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Tickets */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Total Tickets
                                </Typography>
                                <Avatar sx={{ bgcolor: 'secondary.light' }}>
                                    <ConfirmationNumberIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h5">{dashboardData.totalTickets}</Typography>
                            <Button href="/Event/Manage" size="small" endIcon={<VisibilityIcon />}>
                                View event list
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Sales */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Total Sales
                                </Typography>
                                <Avatar sx={{ bgcolor: 'success.light' }}>
                                    <MonetizationOnIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h5">${dashboardData.totalSales.toLocaleString()}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ color: 'success.main', fontSize: 'small', mr: 0.5 }} />
                                <Typography variant="caption" color="success.main">
                                    Average ${(dashboardData.totalSales / dashboardData.totalTickets).toFixed(2)} per ticket
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Sales Details Chart */}
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                        Sales Details
                    </Typography>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="month-select-label">Month</InputLabel>
                        <Select
                            labelId="month-select-label"
                            value={selectedMonth}
                            label="Month"
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map((month, index) => (
                                <MenuItem key={month} value={index}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Card>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                                data={currentMonthDataExample}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1976d2" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="day" 
                                    tick={{ fontSize: 12 }}
                                    ticks={['1st', '5th', '10th', '15th', '20th', '25th']}
                                />
                                <YAxis tickFormatter={(val) => `$${val}`} />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip formatter={(val) => `$${val}`} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#1976d2"
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Box>

            {/* Recent Sales */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Recent Sales
                </Typography>
                <Card>
                    <CardContent>
                        <List>
                            {dashboardData.recentSales.map((sale, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText primary="Attendee" secondary={sale.attendee} />
                                        <ListItemText primary="Event Name" secondary={sale.eventName} />
                                        <ListItemText primary="Location" secondary={sale.location} />
                                        <ListItemText primary="Date - Time" secondary={sale.dateTime} />
                                        <ListItemText primary="Quantity" secondary={sale.quantity} />
                                        <ListItemText primary="Amount" secondary={`$${sale.amount}`} />
                                    </ListItem>
                                    {index < dashboardData.recentSales.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default Dashboard;
