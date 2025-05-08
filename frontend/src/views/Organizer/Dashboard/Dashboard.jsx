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
} from '@mui/material';

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

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

function Dashboard() {
    const [selectedMonth, setSelectedMonth] = useState(0); // 0-11 for months

    // Generate data for all months
    const generateMonthlyData = (month) => {
        const daysInMonth = new Date(2024, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => ({
            day: `${i + 1}${getDaySuffix(i + 1)}`,
            value: Math.floor(Math.random() * 50) + 20 // Random value between 20-70
        }));
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

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthlyData = months.map((_, index) => generateMonthlyData(index));
    const currentMonthData = monthlyData[selectedMonth];

    return (
        <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
            Dashboard
        </Typography>

        <Grid container spacing={3}>
            {/* Total Checked-in */}
            <Grid item xs={12} sm={6} md={3}>
            <Card>
                <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" color="textSecondary">
                    Total Checked-in
                    </Typography>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <PersonAddIcon />
                    </Avatar>
                </Box>
                <Typography variant="h5">401</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 'small', mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                    8.5% Up from last month
                    </Typography>
                </Box>
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
                    <Avatar sx={{ bgcolor: 'secondary.light' }}>
                    <ConfirmationNumberIcon />
                    </Avatar>
                </Box>
                <Typography variant="h5">679</Typography>
                <Button size="small" endIcon={<VisibilityIcon />}>
                    View event list
                </Button>
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
                <Typography variant="h5">$1,234</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingDownIcon sx={{ color: 'error.main', fontSize: 'small', mr: 0.5 }} />
                    <Typography variant="caption" color="error.main">
                    4.3% Down from last month
                    </Typography>
                </Box>
                </CardContent>
            </Card>
            </Grid>

            {/* Total Registered */}
            <Grid item xs={12} sm={6} md={3}>
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
                <Typography variant="h5">123</Typography>
                <Button size="small" endIcon={<VisibilityIcon />}>
                    View attendance list
                </Button>
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
                    data={currentMonthData}
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
                <ListItem>
                    <ListItemText primary="Attendee" secondary="6096 Marjolaine Landing" />
                    <ListItemText primary="Event Name" secondary="Event 1" />
                    <ListItemText primary="Location" secondary="6096 Marjolaine Landing" />
                    <ListItemText primary="Date - Time" secondary="12.09.2019 - 12:53 PM" />
                    <ListItemText primary="Quantity" secondary="2" />
                    <ListItemText primary="Amount" secondary="$34" />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Attendee" secondary="6096 Marjolaine Landing" />
                    <ListItemText primary="Event Name" secondary="Event 1" />
                    <ListItemText primary="Location" secondary="6096 Marjolaine Landing" />
                    <ListItemText primary="Date - Time" secondary="12.09.2019 - 12:53 PM" />
                    <ListItemText primary="Quantity" secondary="5" />
                    <ListItemText primary="Amount" secondary="$67" />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Attendee" secondary="6096 Marjolaine Landing" />
                    <ListItemText primary="Event Name" secondary="Event 2" />
                    <ListItemText primary="Location" secondary="6096 Marjolaine Landing" />
                    <ListItemText primary="Date - Time" secondary="12.09.2019 - 12:53 PM" />
                    <ListItemText primary="Quantity" secondary="1" />
                    <ListItemText primary="Amount" secondary="$12" />
                </ListItem>
                </List>
            </CardContent>
            </Card>
        </Box>
        </Box>
    );
}

export default Dashboard;