import React, { useState, useEffect } from 'react';
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useSearchParams } from 'react-router-dom';
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [keywords, setKeywords] = useState("");
    const [events, setEvents] = useState(/** @type {Event[] | null} */(null));
    const [tickets, setTickets] = useState();
    useEffect(() => {
        (async function() {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
        })();
    }, [])

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        totalCheckedIn: 0,
        totalTickets: 0,
        totalSales: 0,
        totalRegistered: 0,
        monthlyData: [],
        recentSales: []
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch events using findEvents from backend.js
            const events = await findEvents({
                // Add any filters you need for organizer's events
                // For example, you might want to filter by date range
                minDate: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Start of year
                maxDate: new Date(new Date().getFullYear(), 11, 31).toISOString(), // End of year
            });

            // Fetch tickets using getTickets from backend.js
            const tickets = await getTickets();

            // Process data
            const processedData = processData(events, tickets);
            setDashboardData(processedData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const processData = (events, tickets) => {
        // Initialize monthly data structure
        const monthlyData = months.map(month => ({
            month,
            checkedIn: 0,
            tickets: 0,
            sales: 0,
            registered: 0,
            dailyData: []
        }));

        // Process events and tickets
        events.forEach(event => {
            const eventDate = new Date(event.date);
            const monthIndex = eventDate.getMonth();
            const day = eventDate.getDate();

            // Get tickets for this event
            const eventTickets = tickets.filter(ticket => ticket.eventId === event.id);
            const eventTotalTickets = eventTickets.length;
            const eventTotalSales = eventTickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0);
            const eventCheckedIn = eventTickets.filter(ticket => ticket.checkedIn).length;

            // Update monthly totals
            monthlyData[monthIndex].tickets += eventTotalTickets;
            monthlyData[monthIndex].sales += eventTotalSales;
            monthlyData[monthIndex].registered += eventTotalTickets;
            monthlyData[monthIndex].checkedIn += eventCheckedIn;

            // Add to daily data
            if (!monthlyData[monthIndex].dailyData[day - 1]) {
                monthlyData[monthIndex].dailyData[day - 1] = {
                    day: `${day}${getDaySuffix(day)}`,
                    value: 0
                };
            }
            monthlyData[monthIndex].dailyData[day - 1].value += eventTotalSales;
        });

        // Calculate totals
        const totals = monthlyData.reduce((acc, month) => ({
            totalCheckedIn: acc.totalCheckedIn + month.checkedIn,
            totalTickets: acc.totalTickets + month.tickets,
            totalSales: acc.totalSales + month.sales,
            totalRegistered: acc.totalRegistered + month.registered
        }), {
            totalCheckedIn: 0,
            totalTickets: 0,
            totalSales: 0,
            totalRegistered: 0
        });

        // Get recent sales (last 5 events)
        const recentSales = events
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map(event => {
                const eventTickets = tickets.filter(ticket => ticket.eventId === event.id);
                return {
                    attendee: event.organizerName,
                    eventName: event.name,
                    location: event.location,
                    dateTime: new Date(event.date).toLocaleString(),
                    quantity: eventTickets.length,
                    amount: eventTickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0)
                };
            });

        return {
            ...totals,
            monthlyData,
            recentSales
        };
    };

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

    return (
        <Box sx={{ p: 3 }}>
            <Authorized role="organizer" />
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Grid container spacing={3}>

                {/* Total Event */}
                <Grid item xs={12} sm={6} md={3}>
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
                            <Typography variant="h5">{dashboardData.totalTickets}</Typography>
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
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Total Tickets
                                </Typography>
                                <Avatar sx={{ bgcolor: 'primary.light' }}>
                                    <PersonAddIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h5">{dashboardData.totalCheckedIn}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ color: 'success.main', fontSize: 'small', mr: 0.5 }} />
                                <Typography variant="caption" color="success.main">
                                    {((dashboardData.totalCheckedIn / dashboardData.totalRegistered) * 100).toFixed(1)}% Check-in Rate
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>


                {/* Total Sales */}
                <Grid item xs={12} sm={6} md={3}>
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

                {/* Total Registered */}
                {/* <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Total Registered
                                </Typography>
                                <Avatar sx={{ bgcolor: 'warning.light' }}>
                                    <PersonAddIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h5">{dashboardData.totalRegistered}</Typography>
                            <Button size="small" endIcon={<VisibilityIcon />}>
                                View attendance list
                            </Button>
                        </CardContent>
                    </Card>
                </Grid> */}
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
                                data={dashboardData.monthlyData[selectedMonth]?.dailyData || []}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1976d2" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
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