// @ts-check

import React, { useState, useCallback, useEffect } from 'react';
import { Typography, CircularProgress, Dialog, DialogContent, Stack, Button, Alert } from '@mui/material';
import EventTicketList from '../../components/EventTicketList';
import Authorized from '../../components/Authorized';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Info } from '@mui/icons-material';
import { getTickets } from '../../backend';

/**
 * @import Ticket from "../../models/Ticket";
 */

export default function TicketPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tickets, setTickets] = useState(/** @type {Ticket[] | null} */(null));

  const clearDialog = useCallback(
    /**
     * @param {string} key
     */
    function (key) {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  , [searchParams, setSearchParams]);

  useEffect(() => {
    (async function() {
      setTickets(await getTickets());
    })()
  });

  return (
    <>
      <Authorized role="attendee" />
      <Stack spacing={3} sx={{ m: 4 }}>
        <Stack direction="row" sx={{ width: "100%" }}>
          <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
            Find Your Ticket
          </Typography>
        </Stack>
        {searchParams.has("error") &&
          <Alert severity="error">{searchParams.get("error")}</Alert>
        }
        {tickets ? (tickets.length ? (
          <EventTicketList tickets={tickets} />
        ) : (
          <Alert severity="error">No Tickets Found</Alert>
        )) : (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}
      </Stack>

      <Dialog
        open={searchParams.has("isOrdered")}
        onClose={() => clearDialog("isOrdered")}>
          <DialogContent>
            <Stack alignItems="center" spacing={4}>
              <CheckCircle color="success" style={{ height: "8rem", width: "8rem" }} />
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Your tickets have been purchased!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Ticket details can be found under the <em>Tickets</em> tab.
                Online tickets will be emailed to your registered email.
                Hope to see you soon!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => clearDialog("isOrdered")}
                sx={{ minWidth: "16rem" }}
              >
                Thanks!
              </Button>
            </Stack>
          </DialogContent>
      </Dialog>

      <Dialog
        open={searchParams.has("isCanceled")}
        onClose={() => clearDialog("isCanceled")}>
          <DialogContent>
            <Stack alignItems="center" spacing={4}>
              <Info color="info" style={{ height: "8rem", width: "8rem" }} />
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Your ticket has been canceled
              </Typography>
              <Typography variant="body1" color="textSecondary">
                We are sorry to see you go. A refund has bene processed,
                which might take a few days to come through. Hope to see
                you in other events soon!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => clearDialog("isCanceled")}
                sx={{ minWidth: "16rem" }}
              >
                OK
              </Button>
            </Stack>
          </DialogContent>
      </Dialog>
    </>
  )
}
