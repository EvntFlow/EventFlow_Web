import React, { useState } from 'react';
import {
  Box,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Dummy data for demonstration
const sampleEvents = [
  {
    id: 1,
    image: 'https://source.unsplash.com/random/80x80?sig=1',
    name: 'Event 1',
    category: 'Digital',
    price: '$10.00',
    soldTickets: 63,
    status: 'Upcoming',
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/random/80x80?sig=2',
    name: 'Event 2',
    category: 'Digital',
    price: '$19.00',
    soldTickets: 13,
    status: 'Closed',
  },
  {
    id: 3,
    image: 'https://source.unsplash.com/random/80x80?sig=3',
    name: 'Women\'s Day',
    category: 'Fashion',
    price: '$64.00',
    soldTickets: 635,
    status: 'Happening',
  },
  {
    id: 4,
    image: 'https://source.unsplash.com/random/80x80?sig=4',
    name: 'Event 3',
    category: 'Art',
    price: '$40.00',
    soldTickets: 67,
    status: 'Upcoming',
  },
];

function EventList() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Implement your search logic
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        EVENT LIST
      </Typography>

      <Toolbar sx={{ justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          size="small"
          label="Search event name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchChange}
        />
      </Toolbar>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Sold tickets</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Avatar src={event.image} sx={{ width: 40, height: 40 }} />
                </TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>{event.soldTickets}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      bgcolor:
                        event.status === 'Upcoming' ? 'success.light' : event.status === 'Closed' ? 'error.light' : event.status === 'Happening' ? 'purple.light' : 'grey.300',
                      color:
                        event.status === 'Upcoming' ? 'success.main' : event.status === 'Closed' ? 'error.main' : event.status === 'Happening' ? 'purple.main' : 'grey.800',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      display: 'inline-block',
                      fontSize: '0.8rem',
                    }}
                  >
                    {event.status}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default EventList;