// @ts-check

import {
  AccountCircle,
  ArrowBack,
  CalendarMonth,
  CheckCircle,
  Delete,
  Info,
  Search
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../../../api';
import { getAttendance, getEvent } from '../../../backend';
import Authorized from '../../../components/Authorized';
import GroupableIconButton from '../../../components/GroupableIconButton';
import SubmitButton from '../../../components/SubmitButton';

/**
 * @import { DataGridProps, GridColDef } from "@mui/x-data-grid";
 * @import Event from "../../../models/Event";
 * @import Ticket from "../../../models/Ticket";
 */

export default function AttendanceList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isInvalidEvent, setIsInvalidEvent] = useState(false);
  const [event, setEvent] = useState(/** @type {Event | null} */(null));
  const [tickets, setTickets] = useState(/** @type {Ticket[] | null} */(null));
  const [matchingTickets, setMatchingTickets] = useState(/** @type {Ticket[] | null} */(null));
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    (async function () {
      if (searchParams.has("event")) {
        setIsInvalidEvent(false);
        let event;
        try {
          const eventId = searchParams.get("event") || "";
          event = await getEvent(eventId);
          setEvent(event);
        } finally {
          setIsInvalidEvent(!event);
        }
      } else {
        setIsInvalidEvent(false);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    (async function () {
      if (isInvalidEvent) {
        setTickets(null);
      } else {
        setTickets(event ? await getAttendance(event.id) : await getAttendance());
      }
    })();
  }, [event, isInvalidEvent]);

  useEffect(() => {
    if (tickets) {
      if (keywords) {
        const words = keywords.toLowerCase().split(/\s/).filter(w => !!w);
        if (words.length !== 0) {
          setMatchingTickets(
            tickets
              .map(t => /** @type {[Ticket, string]} */
                ([t, t.holderFullName]))
              .map(([t, str]) => /** @type {[Ticket, Set<string>]} */
                ([t, new Set(str.toLowerCase().split(/\s/).filter(s => !!s))]))
              .filter(([_, wordSet]) => !words.every(w => !wordSet.has(w)))
              .map(([t, _]) => t)
          );
          return;
        }
      }
      setMatchingTickets(tickets);
    }
  }, [keywords, tickets]);

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
            <Stack>
              <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
                Attendance
              </Typography>
              {event &&
                <Typography
                  variant="h4"
                  textTransform="uppercase"
                  noWrap={true}
                  textOverflow="ellipsis"
                >
                  {event.name}
                </Typography>
              }
            </Stack>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack direction="row-reverse">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Attendee"
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

      {event &&
        <Button
          variant="contained"
          size="large"
          sx={{ maxWidth: "15rem" }}
          onClick={() => setSearchParams(params => {
            params.set("remind", "1");
            return params;
          })}
        >
          Send Event Reminder
        </Button>
      }

      {isInvalidEvent ? (
        <Alert severity="error">
          Invalid Event
        </Alert>
      ) : !matchingTickets ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : !matchingTickets.length ? (
        <Alert severity="error">
          No Attendees Found
        </Alert>
      ) : (
        <DataGrid
          {.../** @type {DataGridProps<Ticket>} */({})}
          rows={matchingTickets}
          columns={[
            /** @type {GridColDef<Ticket, string>} */
            ({
              field: "holderFullName",
              headerName: "Name",
              flex: 1,
              type: "string",
              display: "flex",
              valueGetter: (_, t) => t.holderFullName,
            }),
            /** @type {GridColDef<Ticket, string>} */
            ({
              field: "holderEmail",
              headerName: "Email",
              flex: 1,
              type: "string",
              display: "flex",
              valueGetter: (_, t) => t.holderEmail,
            }),
            /** @type {GridColDef<Ticket, Date, string>} */
            ({
              field: "timestamp",
              headerName: "Purchase Date",
              flex: 1,
              type: "dateTime",
              display: "flex",
              valueGetter: (_, t) => new Date(t.timestamp),
              renderCell: (params) => (
                <Typography noWrap={true}>
                  {dayjs(params.value).format("DD/MM/YYYY HH:mm")}
                </Typography>
              )
            }),
            ...(event ? [] : ([
                /** @type {GridColDef<Ticket, string>} */(
                {
                  field: "eventName",
                  headerName: "Event",
                  flex: 1,
                  type: "string",
                  valueGetter: (_, t) => t.ticketOption.name,
                  renderCell: (params) => (
                    <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
                      <Stack>
                        {!event &&
                          <Button
                            href={`/Event/Details?event=${params.row?.event?.id}`}
                            target="_blank"
                            variant="text"
                            sx={{
                              textTransform: "inherit",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              justifyContent: "start",
                              maxWidth: "100%",
                              display: "inline-block",
                              m: 0,
                              p: 0
                            }}
                          >
                            {params.row?.event?.name}
                          </Button>
                        }
                      </Stack>
                    </Stack>
                  )
                }
              )])),
            /** @type {GridColDef<Ticket, string>} */
            ({
              field: "name",
              headerName: "Ticket",
              flex: 0.75,
              type: "string",
              display: "flex",
              valueGetter: (_, t) => t.ticketOption.name,
            }),
            /** @type {GridColDef<Ticket, "pending" | "approved", string>} */
            ({
              field: "status",
              headerName: "Status",
              flex: 0.75,
              type: "singleSelect",
              valueGetter: (_, t) => t.isReviewed ? "approved" : "pending",
              getOptionValue: (/** @type {string} */value) => value,
              getOptionLabel: (/** @type {string} */value) =>
                value ? value[0].toUpperCase() + value.substring(1) : null,
              valueOptions: ["pending", "approved"],
              sortComparator: (v1, v2) => {
                /** @param {typeof v1} v */
                function toNumber(v) {
                  switch (v) {
                    case "pending":
                      return 0;
                    case "approved":
                      return 1;
                    default:
                      return 2;
                  }
                }
                return toNumber(v1) - toNumber(v2);
              },
              renderCell: (params) => (
                <Stack flexDirection="row" alignItems="center" sx={{ height: "100%" }}>
                  <Chip
                    variant="filled"
                    size="small"
                    label={params.formattedValue}
                    color={(() => {
                      switch (params.value) {
                        case "pending":
                          return "info";
                        case "approved":
                          return "success";
                        default:
                          return "primary";
                      }
                    })()}
                    sx={{ width: "6rem", borderRadius: 2 }}
                  />
                </Stack>
              )
            }),
            {
              field: 'actions',
              type: 'actions',
              flex: 0.5,
              headerName: 'Actions',
              cellClassName: 'actions',
              getActions: ({ row }) => {
                return [
                  <ButtonGroup variant="outlined" color="inherit">
                    <GroupableIconButton
                      startIcon={<AccountCircle />}
                      onClick={() => {
                        searchParams.set("review", row.id);
                        setSearchParams(searchParams);
                      }}
                    />,
                    <GroupableIconButton
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => {
                        searchParams.set("reject", row.id);
                        setSearchParams(searchParams);
                      }}
                    />,
                  </ButtonGroup>
                ];
              },
            },
          ]}
          getRowId={(t) => t.id}
          rowHeight={64}
          pageSizeOptions={[8, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
            sorting: {
              sortModel: [
                { field: "timestamp", sort: "desc" },
                { field: "status", sort: "desc" },
              ]
            }
          }}
          autosizeOptions={{
            columns: ["price", "timestamp", "status", "actions"],
            includeOutliers: false,
            includeHeaders: true,
          }}
          disableRowSelectionOnClick={true}
        />
      )}

      {tickets &&
        <>
          <Dialog
            open={searchParams.has("reject")}
            onClose={() => {
              searchParams.delete("reject");
              searchParams.delete("error");
              setSearchParams(searchParams);
            }}
          >
            <DialogTitle>
              Reject Ticket
            </DialogTitle>
            <DialogContent>
              <RejectTicketForm
                event={event} tickets={tickets} id={searchParams.get("reject") ?? ""}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={searchParams.has("review")}
            onClose={() => {
              searchParams.delete("review");
              searchParams.delete("error");
              setSearchParams(searchParams);
            }}

            fullWidth={true}
          >
            <DialogTitle sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}>
              <IconButton
                edge="start"
                onClick={() => {
                  searchParams.delete("review");
                  searchParams.delete("error");
                  setSearchParams(searchParams);
                }}
                sx={{ mr: 1 }}
                size="large"
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h6">Attendee Details</Typography>
            </DialogTitle>
            <DialogContent>
              <ReviewTicketForm
                event={event} tickets={tickets} id={searchParams.get("review") ?? ""}
              />
            </DialogContent>
          </Dialog>
        </>
      }

      {event &&
        <Dialog
          open={searchParams.has("remind")}
          onClose={() => {
            searchParams.delete("remind");
            searchParams.delete("error");
            setSearchParams(searchParams);
          }}
        >
          <DialogTitle>
            Send Event Reminder
          </DialogTitle>
          <DialogContent>
            <SendEventReminderForm event={event} />
          </DialogContent>
        </Dialog>
      }

      <Dialog
        open={searchParams.has("isRejected")}
        onClose={() => clearDialog("isRejected")}>
        <DialogContent>
          <Stack alignItems="center" spacing={4}>
            <Info color="info" style={{ height: "8rem", width: "8rem" }} />
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              This ticket has been rejected.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              A refund to the holder has been processed.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => clearDialog("isRejected")}
              sx={{ minWidth: "16rem" }}
            >
              OK
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={searchParams.has("isSent")}
        onClose={() => clearDialog("isSent")}>
        <DialogContent>
          <Stack alignItems="center" spacing={4}>
            <CheckCircle color="success" style={{ height: "8rem", width: "8rem" }} />
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Your reminder has been sent!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Attendees will be notified shortly via email and EventFlow notifications.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => clearDialog("isSent")}
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

/**
 * @typedef RejectTicketFormProps
 * @property {Event | null=} event
 * @property {Ticket[]} tickets
 * @property {string} id
 */

/**
 * @param {RejectTicketFormProps} props
 */

function RejectTicketForm({ event, tickets, id }) {
  const [ticket, setTicket] = useState(/** @type {Ticket | null} */(null));
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const found = tickets.find(t => t.id === id);
    setTicket(found ?? null);
  }, [tickets, id]);

  return ticket ? (
    <Stack spacing={3}>
      <Typography>
        Are you sure you want to reject the{" "}
        <em>{ticket.ticketOption.name}</em> ticket held by{" "}
        <span style={{ whiteSpace: "pre" }}>
          <strong>{ticket.holderFullName}</strong>{" "}
          (<a href={`mailto:${encodeURIComponent(
            `${ticket.holderFullName}<${ticket.holderEmail}>`)
            }`}>{ticket.holderEmail}</a>
          )?
        </span>
      </Typography>

      {searchParams.has("error") &&
        <Alert severity="error">
          {searchParams.get("error")}
        </Alert>
      }

      <Box
        component={"form"}
        method="post"
        action={
          getApiUrl("Ticket/CancelTicket",
            { returnUrl: `/Ticket/Attendance?${event ? `event=${event.id}&` : ""}isRejected=1` }
          )}
      >
        <Box display="none">
          <input name="ticket" value={ticket.id} hidden={true} readOnly={true} required={true} />
        </Box>

        <Stack width="100%">
          <Button
            variant="contained"
            color="error"
            type="submit"
            fullWidth={true}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Stack>
  ) : (
    <Alert severity="error">
      Invalid Ticket.
    </Alert>
  );
}

/**
 * @typedef ReviewTicketFormProps
 * @property {Event | null=} event
 * @property {Ticket[]} tickets
 * @property {string} id
 */

/**
 * @param {ReviewTicketFormProps} props
 */

function ReviewTicketForm({ event, tickets, id }) {
  const theme = useTheme();
  const [ticket, setTicket] = useState(/** @type {Ticket | null} */(null));
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const found = tickets.find(t => t.id === id);
    setTicket(found ?? null);
  }, [tickets, id]);

  return ticket ? (
    <Box
      component="form"
      method="post"
      action={
        getApiUrl("Ticket/ReviewTicket",
          { returnUrl: `/Ticket/Attendance?${event ? `event=${event.id}&` : ""}isApproved=1` }
        )}
    >
      <Stack spacing={3} sx={{ py: 2 }}>
        <Grid container={true} size={12} spacing={4}>
          <Grid size={6}>
            <Typography variant="body1" color="textSecondary">
              {ticket.event?.name}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Stack direction="row-reverse" alignItems="center" spacing={1}>
              <Typography variant="body1" color="textSecondary">
                {dayjs(ticket.event?.startDate).format("dddd, D MMMM YYYY")}
              </Typography>
              <CalendarMonth sx={{ color: theme.palette.text.secondary }} />
            </Stack>
          </Grid>
        </Grid>

        <Box display="none">
          <input hidden={true} readOnly={true} required={true} name="ticket" value={ticket.id} />
        </Box>

        <Stack spacing={1}>
          <Typography variant="subtitle2">
            {ticket.ticketOption.name}
          </Typography>

          <Box
            sx={{
              borderStyle: "solid",
              borderWidth: "thin",
              borderColor: theme.palette.divider,
              borderTopStyle: "solid",
              borderTopWidth: "medium",
              borderTopColor: theme.palette.primary.main,
              padding: 2
            }}
          >
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Full Name
            </Typography>
            <TextField
              fullWidth={true}
              required={true}
              placeholder="Enter your full name"
              value={ticket.holderFullName}
              name="fullName"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              slotProps={{ htmlInput: { readOnly: true } }}
            />

            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Email
            </Typography>
            <TextField
              fullWidth
              required={true}
              placeholder="Enter your email"
              value={ticket.holderEmail}
              name="email"
              type="email"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              slotProps={{ htmlInput: { readOnly: true } }}
            />

            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              required={true}
              value={ticket.holderPhoneNumber}
              placeholder="Enter your phone number"
              name="phoneNumber"
              type="tel"
              variant="outlined"
              size="small"
              slotProps={{ htmlInput: { readOnly: true } }}
            />
          </Box>
        </Stack>

        {searchParams.has("error") &&
          <Alert severity="error">
            {searchParams.get("error")}
          </Alert>
        }

        <Grid size={12} container={true}>
          <Grid size={4}>
            <Button
              variant="contained"
              color="error"
              fullWidth={true}
              onClick={() => setSearchParams(params => {
                params.delete("review");
                params.delete("error");
                params.set("reject", ticket.id);
                return params;
              })}
            >
              Reject
            </Button>
          </Grid>
          <Grid size={4}></Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              type="submit"
              fullWidth={true}
              disabled={ticket.isReviewed}
            >
              {ticket.isReviewed ? "Approved" : "Approve"}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  ) : (
    <Alert severity="error">
      Invalid Ticket.
    </Alert>
  );
}

/**
 * @typedef SendEventReminderFormProps
 * @property {Event} event
 */

/**
 * @param {SendEventReminderFormProps} props
 */

function SendEventReminderForm({ event }) {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  return (
    <Box
      component="form"
      method="post"
      action={
        getApiUrl("Event/SendReminder",
          { returnUrl: `/Ticket/Attendance?event=${event.id}&isSent=1` }
        )}
    >
      <Stack spacing={3} sx={{ py: 2 }}>
        <Grid container={true} size={12} spacing={4}>
          <Grid size={6}>
            <Typography variant="body1" color="textSecondary">
              {event.name}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Stack direction="row-reverse" alignItems="center" spacing={1}>
              <Typography variant="body1" color="textSecondary">
                {dayjs(event.startDate).format("dddd, D MMMM YYYY")}
              </Typography>
              <CalendarMonth sx={{ color: theme.palette.text.secondary }} />
            </Stack>
          </Grid>
        </Grid>

        <Box display="none">
          <input hidden={true} readOnly={true} required={true} name="event" value={event.id} />
        </Box>

        <TextField
          name="message"
          required={true}
          defaultValue={`${event.name} is coming soon!`}
          multiline={true}
          rows={4}
          slotProps={{
            htmlInput: { maxLength: 128 }
          }}
        />

        {searchParams.has("error") &&
          <Alert severity="error">
            {searchParams.get("error")}
          </Alert>
        }

        <SubmitButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth={true}
          label="Send Reminder"
        />
      </Stack>
    </Box>
  )
}
