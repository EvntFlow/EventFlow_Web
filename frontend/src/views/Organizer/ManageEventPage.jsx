// @ts-check

import { CheckCircle, Info, People, Search } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert, Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEvents } from '../../backend';
import Authorized from '../../components/Authorized';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import GroupableIconButton from '../../components/GroupableIconButton';
import { getApiUrl } from '../../api';

/**
 * @import { DataGridProps, GridColDef, GridFilterItem } from "@mui/x-data-grid";
 * @import Category from "../../models/Category";
 * @import Event from "../../models/Event";
 */

// See: https://github.com/facebook/create-react-app/issues/8779#issuecomment-1214839590
import FORCE_IMPORT_POLYFILL from 'core-js/modules/es.regexp.escape';
// eslint-disable-next-line no-unused-expressions
FORCE_IMPORT_POLYFILL;

export default function ManageEventPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keywords, setKeywords] = useState("");
  const [events, setEvents] = useState(/** @type {Event[] | null} */(null));
  const [matchingEvents, setMatchingEvents] = useState(/** @type {Event[] | null} */(null));

  useEffect(() => {
    (async function () {
      setEvents(await getEvents());
    })();
  }, []);

  useEffect(() => {
    if (events) {
      if (keywords) {
        const words = keywords.toLowerCase().split(/\s/).filter(w => !!w);
        if (words.length !== 0) {
          setMatchingEvents(
            events
              .map(t => /** @type {[Event, string]} */
                ([t, `${t.name} ${t.description}`]))
              .map(([t, str]) => /** @type {[Event, Set<string>]} */
                ([t, new Set(str.toLowerCase().split(/\s/).filter(s => !!s))]))
              .filter(([_, wordSet]) => !words.every(w => !wordSet.has(w)))
              .map(([t, _]) => t)
          );
          return;
        }
      }
    }
    setMatchingEvents(events);
  }, [events, keywords]);

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

      {matchingEvents ? (matchingEvents.length ? (
        <DataGrid
          {.../** @type {DataGridProps<Event>} */({})}
          rows={matchingEvents}
          columns={[
            /** @type {GridColDef<Event, string>} */
            ({
              field: "banner",
              headerName: "Image",
              flex: 1,
              type: "string",
              filterable: false,
              sortable: false,
              valueGetter: (_, e) => e.bannerUri,
              renderCell: (params) => (
                <Box component="img"
                  src={params.value ?? "/img/TopEvent.png"}
                  onError={(e) => e.currentTarget.src = "/img/TopEvent.png"}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    p: 2,
                    boxSizing: "border-box"
                  }}
                />
              )
            }),
            /** @type {GridColDef<Event, string>} */
            ({
              field: "name",
              headerName: "Event Name",
              flex: 1.5,
              type: "string",
              valueGetter: (_, e) => e.name,
              renderCell: (params) => (
                <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
                  <Stack>
                    <Button
                      href={`/Event/Details?event=${params.row.id}`}
                      target="_blank"
                      variant="text"
                      sx={{
                        textTransform: "inherit",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        justifyContent: "start",
                        maxWidth: "100%",
                        textWrap: "nowrap",
                        display: "inline-block",
                        m: 0,
                        p: 0
                      }}
                    >
                      {params.row.name}
                    </Button>
                  </Stack>
                </Stack>
              )
            }),
            /** @type {GridColDef<Event, number, string>} */
            ({
              field: "price",
              headerName: "Price",
              flex: 0.5,
              type: "string",
              display: "flex",
              valueGetter: (_, e) => e.price,
              valueFormatter: (_, e) => e.price ?
                `$${e.price.toFixed(2)}` : "Free"
            }),
            /** @type {GridColDef<Event, number>} */
            ({
              field: "sold",
              headerName: "Sold Tickets",
              flex: 0.5,
              type: "string",
              display: "flex",
              valueGetter: (_, e) => e.sold
            }),
            /** @type {GridColDef<Event, Date, string>} */
            ({
              field: "eventDate",
              headerName: "Event Date",
              flex: 1,
              type: "dateTime",
              display: "flex",
              valueGetter: (_, e) => e ? new Date(e.startDate) : null,
              renderCell: (params) => (
                <Typography noWrap={true}>
                  {dayjs(params.value).format("DD/MM/YYYY HH:mm")}
                </Typography>
              )
            }),
            /** @type {GridColDef<Event, "upcoming" | "happening" | "ended", string>} */
            ({
              field: "status",
              headerName: "Status",
              flex: 0.75,
              type: "singleSelect",
              valueGetter: (_, e) => {
                const startDate = new Date(e.startDate);
                const endDate = new Date(e.endDate);
                const now = new Date();
                if (now < startDate) {
                  return "upcoming";
                } else if (now < endDate) {
                  return "happening";
                } else {
                  return "ended";
                }
              },
              getOptionValue: (/** @type {string} */value) => value,
              getOptionLabel: (/** @type {string} */value) =>
                value ? value[0].toUpperCase() + value.substring(1) : null,
              valueOptions: ["upcoming", "happening", "ended"],
              sortComparator: (v1, v2) => {
                /** @param {typeof v1} v */
                function toNumber(v) {
                  switch (v) {
                    case "upcoming":
                      return 0;
                    case "happening":
                      return 1;
                    case "ended":
                      return 2;
                    default:
                      return 3;
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
                        case "upcoming":
                          return "success";
                        case "happening":
                          return "secondary";
                        case "ended":
                          return "error";
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
              flex: 0.75,
              headerName: 'Actions',
              cellClassName: 'actions',
              getActions: ({ row }) => {
                return [
                  <ButtonGroup variant="outlined" color="inherit">
                    <Tooltip title="Edit Event">
                      <GroupableIconButton
                        startIcon={<EditIcon />}
                        href={`/Event/Edit?event=${row.id}`}
                      />
                    </Tooltip>
                    <Tooltip title="View Attendance">
                      <GroupableIconButton
                        startIcon={<People />}
                        href={`/Ticket/Attendance?event=${row.id}`}
                      />
                    </Tooltip>
                    <Tooltip title="Cancel Event">
                      <GroupableIconButton
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                          setSearchParams(params => {
                            params.set("delete", row.id);
                            return params;
                          })
                        }
                      />
                    </Tooltip>
                  </ButtonGroup>
                ];
              },
            },
          ]}
          getRowId={(t) => t.id}
          rowHeight={128}
          pageSizeOptions={[4, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 4,
              },
            },
            sorting: {
              sortModel: [
                { field: "status", sort: "asc" },
                { field: "date", sort: "asc" },
                { field: "price", sort: "desc" },
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
      ) : (
        <Alert severity="error">No Events Found</Alert>
      )) : (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}

      {matchingEvents &&
        <Dialog
          open={searchParams.has("delete")}
          onClose={() => {
            searchParams.delete("delete");
            searchParams.delete("error");
            setSearchParams(searchParams);
          }}
        >
          <DialogTitle>
            Delete Event
          </DialogTitle>
          <DialogContent>
            <DeleteEventForm events={matchingEvents} id={searchParams.get("delete") ?? ""} />
          </DialogContent>
        </Dialog>
      }

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

      <Dialog
        open={searchParams.has("isCanceled")}
        onClose={() => clearDialog("isCanceled")}>
        <DialogContent>
          <Stack alignItems="center" spacing={4}>
            <Info color="info" style={{ height: "8rem", width: "8rem" }} />
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Your event has been canceled
            </Typography>
            <Typography variant="body1" color="textSecondary">
              The event has been unlisted and refunds are being processed.
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
    </Stack>
  );
}

/**
 * @typedef DeleteEventFormProps
 * @property {Event[]} events
 * @property {string} id
 */

/**
 * @param {DeleteEventFormProps} props
 */

function DeleteEventForm({ events, id }) {
  const [event, setEvent] = useState(/** @type {Event | null} */(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const found = events.find(t => t.id === id);
    setEvent(found ?? null);
  }, [events, id]);

  return event ? (
    <Stack spacing={3}>
      <Typography>
        Are you sure you want to delete the{" "}
        <em>{event.name}</em> event{" "}?
      </Typography>

      <Typography color="error">
        All <strong>{event.sold}</strong> sold tickets{" "}
        will be canceled and refunded.
      </Typography>

      <Typography>
        Type{" "}
        <strong>{event.name}</strong>{" "}
        to continue.
      </Typography>

      {searchParams.has("error") &&
        <Alert severity="error">
          {searchParams.get("error")}
        </Alert>
      }

      <Box
        component={"form"}
        method="post"
        action={getApiUrl("Event/CancelEvent", { returnUrl: "/Event/Manage?isCanceled=1" })}
      >
        <Box display="none">
          <input name="event" value={event.id} hidden={true} readOnly={true} required={true} />
        </Box>

        <Stack spacing={2}>
          <TextField
            variant="outlined"
            placeholder="Enter the above text to confirm."
            required={true}
            autoComplete="off"
            slotProps={{
              htmlInput: {
                pattern: RegExp.escape(event.name)
              }
            }}
          />

          <Button
            variant="contained"
            color="error"
            disabled={isSubmitting}
            onClick={(e) => {
              setIsSubmitting(true);
              e.currentTarget.closest("form")?.requestSubmit();
            }}
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

