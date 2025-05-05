// @ts-check

import React, { useState, useCallback } from 'react';
import { Typography, CircularProgress, Box, Dialog, DialogContent, Stack, Button } from '@mui/material';
import EventTicketList from '../../components/EventTicketList';
import Authorized from '../../components/Authorized';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';

export default function TicketPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [rows, /* setRows */] = useState([]);
  const [loading, /* setLoading */] = useState(true);
  const [error, /* setError */] = useState(null);

  const clearOrderedDialog = useCallback(() => {
    searchParams.delete("isOrdered");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  // useEffect(() => {
  //   console.log('FindTicket component rendered');
  //   fetch('https://ishar.tail35ead.ts.net:8443/api/Ticket')
  //     .then(res => {
  //       if (!res.ok) throw new Error(`Server returned ${res.status}`);
  //       return res.json();
  //     })
  //     .then(data => {
  //       console.log('Fetched data:', data);
  //       setRows(data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       setError(error);
  //       setLoading(false);
  //     })
  // }, []);

  return (
    <>
      <Authorized role="attendee" />
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
      <div style={{ margin: '40px' }}>
        <EventTicketList initialRows={rows} />
      </div>
      <Dialog
        open={searchParams.has("isOrdered")}
        onClose={clearOrderedDialog}>
          <DialogContent>
            <Stack alignItems="center" spacing={4}>
              <CheckCircle color="success" style={{ height: "8rem", width: "8rem" }} />
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Your tickets have been purchased!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Ticket details can be found under the <em>Tickets</em> tab.<br/>
                Online tickets will be emailed to your registered email.<br/>
                Hope to see you soon!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={clearOrderedDialog}
                sx={{ minWidth: "16rem" }}
              >
                Thanks!
              </Button>
            </Stack>
          </DialogContent>
      </Dialog>
    </>
  )
}
