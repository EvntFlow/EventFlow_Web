// @ts-check

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton, Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField, Typography
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import Authorized from '../../components/Authorized';
import { CheckCircle, Search } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

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

export default function ManageEventPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keywords, setKeywords] = useState("");

  const clearDialog = useCallback(
    /**
     * @param {string} key
     */
    function (key) {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  , [searchParams, setSearchParams]);

  return (
    <Stack spacing={3} sx={{ m: 4 }}>
      <Authorized role="organizer" />

      <Grid container={true} size={12}>
        <Grid size={6}>
          <Stack direction="row" sx={{ width: "100%" }}>
            <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
              Events
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack direction="row-reverse">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Events"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: <Search sx={{ mr: 1 }} />,
                  sx: { borderRadius: "8rem" }
                }
              }}
            />
          </Stack>
        </Grid>
      </Grid>

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

      <Dialog
        open={searchParams.has("isCreated")}
        onClose={() => clearDialog("isCreated")}>
          <DialogContent>
            <Stack alignItems="center" spacing={4}>
              <CheckCircle color="success" style={{ height: "8rem", width: "8rem" }} />
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Your event has been created!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Your event has been saved to the system.
                Please check your notifications regularly for
                updates on attendee registration.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => clearDialog("isCreated")}
                sx={{ minWidth: "16rem" }}
              >
                OK
              </Button>
            </Stack>
          </DialogContent>
      </Dialog>
    </Stack>
  );
}
