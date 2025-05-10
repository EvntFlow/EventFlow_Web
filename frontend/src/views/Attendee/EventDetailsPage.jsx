// @ts-check

import { ContentCopy, Delete, FacebookRounded, LinkedIn, WhatsApp, X } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as ics from "ics";
import React, { createElement, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../../api';
import { getCategories, getEvent } from '../../backend';
import Authorized from '../../components/Authorized';
import CategorySelect from '../../components/CategorySelect';
import EventDetailsView from '../../components/EventDetailsView';
import EventSection from '../../components/EventSection';
import GoogleMapsFrame from '../../components/GoogleMapsFrame';
import PaymentPage from '../../components/PaymentPage';
import TicketOverlay from '../../components/TicketOverlay';
import GroupableIconButton from '../../components/GroupableIconButton';

/**
 * @import Category from "../../models/Category";
 * @import Event from "../../models/Event";
 * @import { FindEventParams } from "../../backend";
 */


/**
 * @typedef EventDetailsInputContext
 * @property {Event} event
 */

/**
 * @typedef EventDetailsFieldInfo
 * @property {string} title
 * @property {(e: EventDetailsInputContext) => React.JSX.Element} input
 */

/**
 * @typedef {"date" | "location" | "description" | "tickets" | "categories"} EventDetailsFields
 */

/** @type {Record<EventDetailsFields, EventDetailsFieldInfo>} */
const fields = {
  "date": {
    title: "Edit Date and Time",
    input: (ctx) => createElement(/** @param {EventDetailsInputContext} ctx */
      ({ event }) => {
        const [searchParams] = useSearchParams();
        const [startDate, setStartDate] = useState(
          searchParams.get("startDate") || event.startDate
        );
        const [endDate, setEndDate] = useState(
          searchParams.get("endDate") || event.endDate
        );
        const [startError, setStartError] = useState(false);
        const [endError, setEndError] = useState(false);
        const [startDateChanged, setStartDateChanged] = useState(searchParams.has("startDate"));
        const [endDateChanged, setEndDateChanged] = useState(searchParams.has("endDate"));
        const [isValid, setIsValid] = useState(true);

        useEffect(() => {
          setIsValid(
            !startError && !endError &&
            dayjs(startDate).isBefore(dayjs(endDate)) &&
            (!startDateChanged || dayjs(startDate).isAfter(dayjs()))
          );
        }, [startDateChanged, startError, endError, startDate, endDate]);

        return (
          <Stack spacing={2} py={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                disablePast
                label="Start Date"
                value={dayjs(startDate)}
                onChange={(value, context) => {
                  setStartDate(value?.toISOString() ?? event.startDate);
                  setStartError(!!context.validationError);
                  setStartDateChanged(true);
                }}
                format="DD/MM/YYYY HH:mm"
                ampm={false}
                slotProps={{
                  field: { openPickerButtonPosition: "start" },
                  textField: { required: true }
                }}
              />

              <DateTimePicker
                disablePast
                label="End Date"
                value={dayjs(endDate)}
                minDateTime={dayjs(startDate)}
                onChange={(value, context) => {
                  setEndDate(value?.toISOString() ?? event.endDate);
                  setEndError(!!context.validationError);
                  setEndDateChanged(true);
                }}
                format="DD/MM/YYYY HH:mm"
                ampm={false}
                slotProps={{
                  field: { openPickerButtonPosition: "start" },
                  textField: { required: true }
                }}
              />
            </LocalizationProvider>

            <Box display="none">
              {startDateChanged &&
                <input
                  name="startDate"
                  value={isValid ? startDate : ''}
                  required={true}
                  hidden={true}
                  onChange={() => { }}
                />
              }
              {endDateChanged &&
                <input
                  name="endDate"
                  value={isValid ? endDate : ''}
                  required={true}
                  hidden={true}
                  onChange={() => { }}
                />
              }
            </Box>
          </Stack>
        )
      }, ctx)
  },
  "location": {
    title: "Edit Location",
    input: (ctx) => createElement(/** @param {EventDetailsInputContext} ctx */(ctx) => {
      const [searchParams] = useSearchParams();
      const [isOnlineEvent, setIsOnlineEvent]
        = useState((searchParams.get("location") || ctx.event.location).toLowerCase() === "online");
      const [location, setLocation] = useState(searchParams.get("location") || ctx.event.location);

      return (
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h6">
              Is your event online?
            </Typography>
            <RadioGroup
              value={`${isOnlineEvent}`}
              defaultChecked={true}
              onChange={(e) => {
                if (e.target.value === "false") {
                  setLocation("");
                  setIsOnlineEvent(false);
                } else {
                  setLocation("Online");
                  setIsOnlineEvent(true);
                }
              }}
            >
              <Stack direction="row" spacing={4}>
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
              </Stack>
            </RadioGroup>
          </Stack>

          <Box display={isOnlineEvent ? "none" : "block"}>
            <Stack spacing={1}>
              <Typography variant="h6">
                Event Location?
              </Typography>
              <TextField
                fullWidth={true}
                required={true}
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter a location"
                variant="outlined"
                size="medium"
              />
            </Stack>
          </Box>

          {!isOnlineEvent && location &&
            <GoogleMapsFrame
              query={location}
              sx={{ width: "100%" }}
            />
          }
        </Stack>
      )
    }, ctx)
  },
  "description": {
    title: "Edit Description",
    input: (ctx) => createElement(/** @param {EventDetailsInputContext} ctx */(ctx) => {
      const [searchParams] = useSearchParams();
      const [description, setDescription]
        = useState(searchParams.get("description") || ctx.event.description);

      return (
        <TextField
          fullWidth={true}
          required={true}
          multiline={true}
          minRows={8}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what's special about your event & other important details."
          variant="outlined"
          size="medium"
        />
      )
    }, ctx)
  },
  "tickets": {
    title: "Edit Ticket Information",
    input: (ctx) => createElement(/** @param {EventDetailsInputContext} ctx */(ctx) => {
      const [searchParams] = useSearchParams();
      const [ticketId, setTicketId] = useState(
        searchParams.has("ticketId") ?
          searchParams.getAll("ticketId") : ctx.event.ticketOptions?.map(to => to.id) ?? []
      );
      const [ticketName, setTicketName] = useState(
        searchParams.has("ticketName") ?
          searchParams.getAll("ticketName") : ctx.event.ticketOptions?.map(to => to.name) ?? []
      );
      const [ticketPrice, setTicketPrice] = useState(
        searchParams.has("ticketPrice") ?
          searchParams.getAll("ticketPrice").map(Number.parseFloat) :
          ctx.event.ticketOptions?.map(to => to.additionalPrice) ?? []
      );
      const [ticketCount, setTicketCount] = useState(
        searchParams.has("ticketCount") ?
          searchParams.getAll("ticketCount").map(Number.parseInt) :
          ctx.event.ticketOptions?.map(to => to.amountAvailable) ?? []
      );
      const [price, setPrice] = useState(ctx.event.price);

      const empty = "00000000-0000-0000-0000-000000000000";

      return (
        <Box>
          <Stack spacing={2} sx={{ py: 2 }}>
            {Array(ticketId.length).fill(0).map((_, index) =>
              <Grid key={index} size={12} container={true} spacing={4}>
                <Box display="none">
                  <input
                    name="ticketId"
                    value={ticketId[index]}
                    required={true}
                    readOnly={true}
                    hidden={true}
                  />
                </Box>

                <Grid size={1}>
                  <Stack direction="row" height="100%" alignItems="center">
                    <GroupableIconButton
                      variant="contained"
                      color="error"
                      size="large"
                      disabled={ticketId.length <= 1 || ticketId[index] !== empty}
                      startIcon={<Delete />}
                      onClick={() => {
                        setTicketId(
                          arr => [...arr.slice(0, index), ...arr.slice(index + 1)]
                        );
                        setTicketName(
                          arr => [...arr.slice(0, index), ...arr.slice(index + 1)]
                        );
                        setTicketCount(
                          arr => [...arr.slice(0, index), ...arr.slice(index + 1)]
                        );

                        let prices = ticketPrice;
                        prices = [...prices.slice(0, index), ...prices.slice(index + 1)];
                        const diff = Math.min(...prices);
                        setPrice(price + diff);
                        prices = prices.map(p => p - diff);

                        setTicketPrice(prices);
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid size={6}>
                  <TextField
                    name="ticketName"
                    value={ticketName[index]}
                    required={true}
                    fullWidth={true}
                    label="Ticket Name"
                    placeholder="Ticket Name e.g. General Admission"
                    onChange={(e) =>
                      setTicketName(arr => {
                        arr[index] = e.target.value; return [...arr];
                      })}
                  />
                </Grid>

                <Grid size={2}>
                  <TextField
                    value={price + ticketPrice[index]}
                    required={true}
                    fullWidth={true}
                    type="number"
                    label="Ticket Price"
                    placeholder="0.00"
                    onChange={(e) => {
                      let prices = [...ticketPrice];
                      let newPrice = Math.trunc(Number.parseFloat(e.target.value) * 100) / 100;

                      const basePrice = price;
                      newPrice -= basePrice;
                      prices[index] = newPrice;

                      if (newPrice < 0) {
                        const diff = -newPrice;
                        setPrice(basePrice - diff);
                        prices = prices.map(p => p + diff);
                      } else {
                        const diff = Math.min(...prices);
                        if (diff > 0) {
                          setPrice(basePrice + diff);
                          prices = prices.map(p => p - diff);
                        }
                      }

                      setTicketPrice(prices);
                    }}
                    slotProps={{
                      htmlInput: { step: 0.01, min: 0.00 }
                    }}
                  />
                </Grid>
                <Box display="none">
                  <input
                    name="ticketPrice"
                    value={ticketPrice[index]}
                    type="number"
                    required={true}
                    readOnly={true}
                    hidden={true}
                  />
                </Box>

                <Grid size={2}>
                  <TextField
                    name="ticketCount"
                    value={ticketCount[index]}
                    required={true}
                    fullWidth={true}
                    type="number"
                    label="Ticket Count"
                    placeholder="0"
                    onChange={(e) =>
                      setTicketCount(arr => {
                        arr[index] = Number.parseInt(e.target.value); return [...arr];
                      })}
                    slotProps={{ htmlInput: { min: ticketId[index] !== empty ? 0 : 1 } }}
                  />
                </Grid>
              </Grid>
            )}
            <Stack direction="row">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setTicketId(
                    arr => [...arr, empty]
                  );
                  setTicketName(
                    arr => [...arr, ""]
                  );
                  setTicketPrice(
                    arr => [...arr, 0]
                  );
                  setTicketCount(
                    arr => [...arr, 0]
                  );
                }}
              >
                Add Ticket
              </Button>
            </Stack>
          </Stack>
          <Box display="none">
            <input
              name="price"
              value={price}
              hidden={true}
              required={true}
              type="number"
              onChange={() => {}}
            />
          </Box>
        </Box>
      )
    }, ctx)
  },
  "categories": {
    title: "Edit Categories",
    input: (ctx) => createElement(/** @param {EventDetailsInputContext} ctx */(ctx) => {
      const [availableCategories, setAvailableCategories]
        = useState(/** @type {Category[] | null} */(null));

      const [searchParams] = useSearchParams();
      const [categories, setCategories] = useState(
        searchParams.has("category") ?
          [...new Set(searchParams.getAll("category"))] : ctx.event.categories?.map(c => c.id)
      );

      useEffect(() => {
        (async function () {
          setAvailableCategories(await getCategories());
        })();
      }, []);

      return (
        <Box>
          <CategorySelect
            categories={availableCategories}
            required={true}
            value={categories}
            onChange={(e) => setCategories(
              Array.isArray(e.target.value) ? e.target.value : [e.target.value]
            )}
            placeholder="Please select one or more"
            sx={{ width: "100%" }}
          >
            {availableCategories ? (
              availableCategories.map((c) => (
                <MenuItem key={c.name} value={c.id}>
                  {c.name}
                </MenuItem>
              ))
            ) : (
              <Stack alignItems="center" sx={{ width: "100%" }}>
                <CircularProgress />
              </Stack>
            )}
          </CategorySelect>

          <Box display="none">
            {categories?.map(c =>
              <input
                key={c}
                name="category"
                value={c}
                hidden={true}
                readOnly={true}
                required={true}
              />
            )}
          </Box>
        </Box>
      )
    }, ctx)
  }
};

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
  const [otherEventsQuery, setOtherEventsQuery] = useState(/** @type {FindEventParams} */({}));
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
      } else if (eventId !== event?.id) {
        const result = await getEvent(eventId);
        if (!result) {
          setEventError("Failed to retrieve event.");
        }
        setEvent(await getEvent(eventId));
        // In reality we would base this on the current event.
        setOtherEventsQuery({});
      }
    })();
  }, [searchParams, event]);

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

  const openEditDialog = useCallback(
    /**
     * @param {EventDetailsFields} field
     */
    (field) => {
      setSearchParams(params => {
        params.set("edit", field);
        return params;
      })
    },
    [setSearchParams]);

  const [editType, setEditType] = useState(/** @type {EventDetailsFields | null} */(null));
  useEffect(() => {
    const edit = searchParams.get("edit");
    if (edit && edit in fields) {
      setEditType(/** @type {EventDetailsFields} */(edit));
    } else {
      setEditType(null);
    }
  }, [searchParams]);

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
                  onEditDate={props.isEdit ? () => { openEditDialog("date") } : undefined}
                  onEditLocation={props.isEdit ?
                    () => { openEditDialog("location") } : undefined
                  }
                  onEditDescription={props.isEdit ?
                    () => { openEditDialog("description") } : undefined
                  }
                  onEditTickets={props.isEdit ?
                    () => { openEditDialog("tickets") } : undefined
                  }
                  onEditCategories={props.isEdit ?
                    () => { openEditDialog("categories") } : undefined
                  }
                />

                {!props.isEdit &&
                  <Grid container spacing={4}>
                    <EventSection
                      title="Other events you may like"
                      query={otherEventsQuery}
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

          {event && editType &&
            <Dialog
              open={true}
              onClose={() => {
                setSearchParams((params) => {
                  params.delete("edit");
                  params.delete("error");
                  params.delete("startDate");
                  params.delete("endDate");
                  params.delete("location");
                  params.delete("description");
                  params.delete("category");
                  params.delete("ticketId");
                  params.delete("ticketName");
                  params.delete("ticketPrice");
                  params.delete("ticketCount");
                  return params
                });
              }}
              maxWidth="md"
              fullWidth={true}
            >
              <DialogTitle>
                {fields[editType].title}
              </DialogTitle>
              <DialogContent>
                <Box
                  component="form"
                  method="post"
                  action={getApiUrl("Event/UpdateEvent",
                    { returnUrl: `/Event/Edit?event=${event.id}` }
                  )}
                >
                  <Stack spacing={2}>
                    {fields[editType].input(
                      { event: event }
                    )}
                    {searchParams.has("error") &&
                      <Alert severity="error">
                        {searchParams.get("error")}
                      </Alert>
                    }
                    <Button
                      fullWidth={true}
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Stack>
                  <Box display="none">
                    <input
                      name="event"
                      value={event.id}
                      hidden={true}
                      readOnly={true}
                      required={true}
                    />
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
          }
        </>
      ) : (
        <PaymentPage orderData={orderData} onBackToOverlay={handleBackToEvent} />
      )}
    </Box>
  );
};
