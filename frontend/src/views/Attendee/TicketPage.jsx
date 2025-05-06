// @ts-check

import { CheckCircle, Info, Search } from '@mui/icons-material';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTickets } from '../../backend';
import Authorized from '../../components/Authorized';
import EventTicketList from '../../components/EventTicketList';

/**
 * @import Ticket from "../../models/Ticket";
 */

export default function TicketPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tickets, setTickets] = useState(/** @type {Ticket[] | null} */(null));
  const [matchingTickets, setMatchingTickets] = useState(/** @type {Ticket[] | null} */(null));
  const [disableFilters, setDisableFilters] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [error, setError] = useState("");

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
  }, []);

  useEffect(() => {
    if (tickets) {
      console.log(keywords);
      if (keywords) {
        const words = keywords.toLowerCase().split(/\s/).filter(w => !!w);
        if (words.length !== 0) {
          setDisableFilters(true);
          setMatchingTickets(
            tickets
              .map(t => /** @type {[Ticket, string]} */
                ([ t, `${t.event?.name} ${t.event?.description} ${t.ticketOption.name}` ]))
              .map(([t, str]) => /** @type {[Ticket, Set<string>]} */
                ([t, new Set(str.toLowerCase().split(/\s/).filter(s => !!s))]))
              .filter(([_, wordSet]) => !words.every(w => !wordSet.has(w)))
              .map(([t, _]) => t)
          );
          return;
        }
      }
      setDisableFilters(false);
      setMatchingTickets(tickets);
    }
  }, [keywords, tickets]);

  useEffect(() => {
    if (!searchParams.has("error")) {
      return;
    }
    if (!(["delete", "edit"].every((d) => !searchParams.has(d)))) {
      return;
    }
    setError(searchParams.get("error") ?? "");
    searchParams.delete("error");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <>
      <Authorized role="attendee" />
      <Stack spacing={3} sx={{ m: 4 }}>
        <Grid container={true} size={12}>
          <Grid size={6}>
            <Stack direction="row" sx={{ width: "100%" }}>
              <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
                Find Your Ticket
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
                    startAdornment:
                      <Search sx={{ mr: 1 }} />
                  }
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        {error &&
          <Alert severity="error">{error}</Alert>
        }
        {matchingTickets ? (matchingTickets.length ? (
          <EventTicketList tickets={matchingTickets} disableFilters={disableFilters} />
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
        open={searchParams.has("isUpdated")}
        onClose={() => clearDialog("isUpdated")}>
          <DialogContent>
            <Stack alignItems="center" spacing={4}>
              <CheckCircle color="success" style={{ height: "8rem", width: "8rem" }} />
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Your ticket has been updated!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                The organizer will review these changes shortly.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => clearDialog("isUpdated")}
                sx={{ minWidth: "16rem" }}
              >
                OK
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
                We are sorry to see you go. A refund has been processed,
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
