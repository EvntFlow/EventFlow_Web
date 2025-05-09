import React from 'react';
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
} from '@mui/material';

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function Dashboard() {
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
                <Button href="/Event/Manage" size="small" endIcon={<VisibilityIcon />}>
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
                <Button href="/Ticket/Attendance" size="small" endIcon={<VisibilityIcon />}>
                    View attendance list
                </Button>
                </CardContent>
            </Card>
            </Grid>
        </Grid>

        {/* Sales Details Chart (Placeholder - you'd integrate a charting library here) */}
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
            Sales Details
            </Typography>
            <Card>
            <CardContent>
                {/* Replace this with your actual chart component */}
                <Box sx={{ height: 300, bgcolor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                    Sales Chart Goes Here
                </Typography>
                </Box>
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
