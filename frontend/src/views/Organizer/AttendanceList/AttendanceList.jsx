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
  Select,
  MenuItem,
  Button,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// Dummy data for demonstration
const sampleAttendees = [
  { id: 1, name: 'Christine Brooks', email: 'abc@gmail.com', date: '04 Sep 2019', event: 'Event name', status: 'Approved' },
  { id: 2, name: 'Rosie Pearson', email: 'abc@gmail.com', date: '28 May 2019', event: 'Event name', status: 'Approved' },
  { id: 3, name: 'Darrell Caldwell', email: 'abc@gmail.com', date: '23 Nov 2019', event: 'Event name', status: 'Rejected' },
  { id: 4, name: 'Gilbert Johnston', email: 'abc@gmail.com', date: '05 Feb 2019', event: 'Event name', status: 'Approved' },
  { id: 5, name: 'Alan Cain', email: 'abc@gmail.com', date: '29 Jul 2019', event: 'Event name', status: 'Approved' },
  { id: 6, name: 'Alfred Murray', email: 'abc@gmail.com', date: '15 Aug 2019', event: 'Event name', status: 'Approved' },
];

function AttendanceList() {
  const [filterBy, setFilterBy] = useState('');
  const [eventFilter, setEventFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
    // Implement your filtering logic based on the selected field
  };

  const handleEventFilterChange = (event) => {
    setEventFilter(event.target.value);
    // Implement your event filtering logic
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    // Implement your date filtering logic
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    // Implement your status filtering logic
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Implement your search logic
  };

  const handleResetFilter = () => {
    setFilterBy('');
    setEventFilter('');
    setDateFilter('');
    setStatusFilter('');
    // Reset your filtering logic
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        ATTENDANCE LIST
      </Typography>

      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <Select
            value={filterBy}
            onChange={handleFilterChange}
            displayEmpty
            size="small"
            sx={{ mr: 1 }}
          >
            <MenuItem value="" disabled>
              Filter By
            </MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            {/* Add other filter options */}
          </Select>
          <TextField
            select
            value={eventFilter}
            onChange={handleEventFilterChange}
            size="small"
            label="Event"
            sx={{ mr: 1 }}
          >
            <MenuItem value="">All Events</MenuItem>
            <MenuItem value="event1">Event 1</MenuItem>
            <MenuItem value="event2">Event 2</MenuItem>
            {/* Populate with actual event names */}
          </TextField>
          <TextField
            select
            value={dateFilter}
            onChange={handleDateFilterChange}
            size="small"
            label="Date"
            sx={{ mr: 1 }}
          >
            <MenuItem value="">All Dates</MenuItem>
            {/* Add date filter options */}
          </TextField>
          <TextField
            select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            size="small"
            label="Status"
            sx={{ mr: 2 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            {/* Populate with actual status options */}
          </TextField>
          <Button size="small" onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </Box>
        <TextField
          size="small"
          label="Search attendee name"
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
              <TableCell>ACTION</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleAttendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary" size="small">
                    <PersonIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{attendee.date}</TableCell>
                <TableCell>{attendee.event}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      bgcolor:
                        attendee.status === 'Approved' ? 'success.light' : attendee.status === 'Rejected' ? 'error.light' : 'warning.light',
                      color:
                        attendee.status === 'Approved' ? 'success.main' : attendee.status === 'Rejected' ? 'error.main' : 'warning.main',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      display: 'inline-block',
                    }}
                  >
                    {attendee.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2">Showing 1-09 of 78</Typography>
        <Box>
          <IconButton>
            <ArrowLeftIcon />
          </IconButton>
          <IconButton>
            <ArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default AttendanceList;