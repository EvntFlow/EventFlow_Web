// @ts-check

import { ContentCopy, FacebookRounded, LinkedIn, WhatsApp, X } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import * as ics from "ics";
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEvent } from '../../backend';
import EventDetailsView from '../../components/EventDetailsView';
import EventSection from '../../components/EventSection';
import PaymentPage from '../../components/PaymentPage';
import TicketOverlay from '../../components/TicketOverlay';
import Authorized from '../../components/Authorized';

/**
 * @import Event from "../../models/Event";
 */

/**
 * @typedef EventDetailsPageProps
 * @property {boolean} isEdit
 */

/**
 * @param {EventDetailsPageProps} props
 */
export default function EventDetailsPage(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [event, setEvent] = useState(/** @type {Event | null} */(null));
  const [eventError, setEventError] = useState(/** @type {string | null} */(null));

  const [anchorShare, setAnchorShare] = useState(/** @type {HTMLElement | null} */(null));

  const [isTicketOverlayOpen, setIsTicketOverlayOpen] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    (async function () {
      const eventId = searchParams.get("event");
      if (!eventId) {
        setEvent(null);
      } else {
        const result = await getEvent(eventId);
        if (!result) {
          setEventError("Failed to retrieve event.");
        }
        setEvent(await getEvent(eventId));
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.has("ticketOption") && !isTicketOverlayOpen) {
      setIsTicketOverlayOpen(true);
    }
  }, [isTicketOverlayOpen, searchParams, setSearchParams])

  const handleCheckout = (data) => {
    setOrderData(data);
    setShowPaymentPage(true);
  };

  const handleBackToEvent = () => {
    setShowPaymentPage(false);
    setOrderData(null);
  };

  const getEventUrl = useCallback(() => {
    if (!event) {
      return null;
    }
    return new URL(`/Event?event=${event.id}`, window.location.href).toString();
  }, [event]);

  const addToCalendar = useCallback(() => {
    if (!event) {
      return;
    }
    const result = ics.createEvent({
      start: Date.parse(event.startDate),
      end: Date.parse(event.endDate),
      title: event.name,
      description: event.description,
      location: event.location,
      url: getEventUrl() ?? undefined,
      categories: event.categories?.map(c => c.name),
      organizer: {
        name: event.organizer.name,
        email: event.organizer.email
      }
    });
    if (result.error || !result.value) {
      return;
    }

    const icsBlob = new Blob([result.value], { type: "text/calendar" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(icsBlob);
    a.download = "event.ics";
    a.click();
  }, [event, getEventUrl]);

  return (
    <Box>
      {props.isEdit && <Authorized role="organizer" />}

      {!showPaymentPage ? (
        <>
          <Container sx={{ py: 4, flexGrow: 1 }}>
            {!event ? (
              !eventError ? (
                <Stack alignContent="center" alignItems="center">
                  <CircularProgress />
                </Stack>
              ) : (
                <Alert severity="error">{eventError}</Alert>
              )
            ) : (
              <Stack spacing={3}>

                <EventDetailsView
                  event={event}
                  onShareEvent={props.isEdit ? undefined : (e) => setAnchorShare(e.currentTarget)}
                  onBuyTickets={props.isEdit ? undefined : () => setIsTicketOverlayOpen(true)}
                  onAddCalendar={props.isEdit ? undefined : addToCalendar}
                />

                {!props.isEdit &&
                  <Grid container spacing={4}>
                    <EventSection
                      title="Other events you may like"
                      query={{}}
                      rowSize={3}
                      limit={3} />
                  </Grid>
                }

                {props.isEdit &&
                  <Stack direction="row-reverse" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ minWidth: "10rem" }}
                      href="/Event/Manage"
                    >
                      Back to Events
                    </Button>
                  </Stack>
                }
              </Stack>
            )}
          </Container>

          {!props.isEdit &&
            <Popover
              open={!!anchorShare}
              anchorEl={anchorShare}
              onClose={() => setAnchorShare(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}>
              <Stack
                spacing={1}
                alignItems="center"
                sx={{
                  minWidth: "20rem",
                  padding: 1
                }}>
                <Typography variant="h6" textAlign="center" sx={{ m: 2 }}>
                  Share with friends
                </Typography>
                <Divider sx={{ width: "100%" }} />
                <Stack alignItems="center">
                  <Stack direction="row" minHeight="5rem" spacing={4} alignItems="center">
                    <IconButton
                      color="primary"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${
                        encodeURIComponent(getEventUrl() || "")
                      }`}
                      target="_blank">
                      <FacebookRounded />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href={`https://www.x.com/share?url=${
                        encodeURIComponent(getEventUrl() || "")
                      }`}
                      target="_blank">
                      <X />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href={`https://api.whatsapp.com/send?text=${
                        encodeURIComponent(getEventUrl() || "")
                      }`}
                      target="_blank">
                      <WhatsApp />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${
                        encodeURIComponent(getEventUrl() || "")
                      }`}
                      target="_blank">
                      <LinkedIn />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack minHeight="5rem" alignContent="center" justifyItems="center">
                  <TextField
                    label="Event URL"
                    value={getEventUrl()}
                    slotProps={{
                      htmlInput: {
                        readOnly: true,
                        disabled: true
                      },
                      input: {
                        endAdornment:
                          <InputAdornment position="end">
                            <IconButton onClick={(e) => {
                              const eventUrl = getEventUrl();
                              if (eventUrl) {
                                navigator.clipboard.writeText(eventUrl);
                              }
                            }}>
                              <ContentCopy />
                            </IconButton>
                          </InputAdornment>
                      }
                    }}>
                  </TextField>
                </Stack>
              </Stack>
            </Popover>
          }

          {event && (
            <TicketOverlay
              event={event}
              isOpen={isTicketOverlayOpen}
              onClose={() => {
                searchParams.delete("ticketOption");
                setSearchParams(searchParams);
                setIsTicketOverlayOpen(false);
              }}
              onCheckout={handleCheckout}
            />
          )}
        </>
      ) : (
        <PaymentPage orderData={orderData} onBackToOverlay={handleBackToEvent} />
      )}
    </Box>
  );
};
