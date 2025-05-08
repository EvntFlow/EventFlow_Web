// @ts-check

import { CheckCircle, Search } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
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
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEvents } from '../../backend';
import Authorized from '../../components/Authorized';

/**
 * @import Event from "../../models/Event";
 */

export default function ManageEventPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keywords, setKeywords] = useState("");
  const [events, setEvents] = useState(/** @type {Event[] | null} */(null));

  useEffect(() => {
    (async function() {
      setEvents(await getEvents());
    })();
  }, [])

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
            {events?.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Avatar src={event.bannerUri} sx={{ width: 40, height: 40 }} />
                </TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.categories?.map(c => c.name).join(", ")}</TableCell>
                <TableCell>{event.price}</TableCell>
                {/* <TableCell>{event.soldTickets}</TableCell> */}
                {/* <TableCell>
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
                </TableCell> */}
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
