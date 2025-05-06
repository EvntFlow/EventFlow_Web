// @ts-check

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import {
  DataGrid
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// See: https://github.com/facebook/create-react-app/issues/8779#issuecomment-1214839590
import FORCE_IMPORT_POLYFILL from 'core-js/modules/es.regexp.escape';
import { getApiUrl } from '../api';
import { Email, Person, Phone } from '@mui/icons-material';
// eslint-disable-next-line no-unused-expressions
FORCE_IMPORT_POLYFILL;

/**
 * @import { SelectProps } from "@mui/material";
 * @import { DataGridProps, GridColDef, GridFilterItem } from "@mui/x-data-grid";
 * @import Category from "../models/Category";
 * @import Event from "../models/Event";
 * @import Ticket from "../models/Ticket";
 */

/**
 * @typedef EventTicketListProps
 * @property {Ticket[]} tickets
 * @property {boolean=} disableFilters
 */

/**
 * @param {EventTicketListProps} props
 */
export default function EventTicketList(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
      <DataGrid
        {.../** @type {DataGridProps<Ticket>} */({})}
        rows={props.tickets}
        columns={[
          /** @type {GridColDef<Ticket, string>} */
          ({
            field: "eventBanner",
            headerName: "Image",
            flex: 1,
            type: "string",
            filterable: false,
            sortable: false,
            valueGetter: (_, t) => t.event?.bannerUri,
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
          /** @type {GridColDef<Ticket, string>} */
          ({
            field: "eventName",
            headerName: "Event/Ticket Name",
            flex: 1.5,
            type: "string",
            valueGetter: (_, t) => t.event?.name,
            renderCell: (params) => (
              <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
                <Stack>
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
                      textWrap: "nowrap",
                      display: "inline-block",
                      m: 0,
                      p: 0
                    }}
                  >
                    {params.row?.event?.name}
                  </Button>
                  <Typography variant="body2">
                    {params.row.ticketOption.name}
                  </Typography>
                </Stack>
              </Stack>
            )
          }),
          /** @type {GridColDef<Ticket, Category[]>} */
          ({
            field: "category",
            headerName: "Category",
            flex: 1,
            type: "string",
            valueGetter: (_, t) => t.event?.categories,
            renderCell: (params) => (
              <Grid size={12} direction="row" alignItems="center" sx={{ height: "100%" }}>
                {params.value?.slice(0, Math.min(params.value?.length ?? 0, 3)).map((cat) => (
                  <Grid size={4} key={cat.id}>
                    <Chip label={cat.name} size="small" />
                  </Grid>
                ))}
              </Grid>
            ),
            filterOperators: [{
              label: "Contains",
              value: "Contains",
              getApplyFilterFn: (i, c) => {
                if (!Array.isArray(i.value) || !i.value.length) {
                  return null;
                }
                return (_, row) => {
                  /** @type {Set<string>} */
                  const idSet = new Set(i.value);
                  return !!row.event?.categories?.find(c => idSet.has(c.id));
                }
              },
              InputComponent: CategoriesInput,
              InputComponentProps: {
                tickets: props.tickets
              }
            }]
          }),
          /** @type {GridColDef<Ticket, number, string>} */
          ({
            field: "price",
            headerName: "Price",
            flex: 0.5,
            type: "string",
            display: "flex",
            valueGetter: (_, t) => t.price,
            valueFormatter: (_, t) => t.price ?
              `$${t.price.toFixed(2)}` : "Free"
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
          /** @type {GridColDef<Ticket, Date, string>} */
          ({
            field: "eventDate",
            headerName: "Event Date",
            flex: 1,
            type: "dateTime",
            display: "flex",
            valueGetter: (_, t) => t.event ? new Date(t.event.startDate) : null,
            renderCell: (params) => (
              <Typography noWrap={true}>
                {dayjs(params.value).format("DD/MM/YYYY HH:mm")}
              </Typography>
            )
          }),
          /** @type {GridColDef<Ticket, "pending" | "upcoming" | "happening" | "ended", string>} */
          ({
            field: "status",
            headerName: "Status",
            flex: 0.75,
            type: "singleSelect",
            valueGetter: (_, t) => {
              if (!t.event) {
                return "pending";
              }
              const startDate = new Date(t.event.startDate);
              const endDate = new Date(t.event.endDate);
              const now = new Date();
              if (now < startDate) {
                return t.isReviewed ? "upcoming" : "pending";
              } else if (now < endDate) {
                return t.isReviewed ? "happening" : "pending";
              } else {
                return "ended";
              }
            },
            getOptionValue: (/** @type {string} */value) => value,
            getOptionLabel: (/** @type {string} */value) =>
              value ? value[0].toUpperCase() + value.substring(1) : null,
            valueOptions: ["pending", "upcoming", "happening", "ended"],
            sortComparator: (v1, v2) => {
              /** @param {typeof v1} v */
              function toNumber(v) {
                switch (v) {
                  case "pending":
                    return 0;
                  case "upcoming":
                    return 1;
                  case "happening":
                    return 2;
                  case "ended":
                    return 3;
                  default:
                    return 4;
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
            flex: 0.5,
            headerName: 'Actions',
            cellClassName: 'actions',
            getActions: ({ row }) => {
              return [
                <ButtonGroup variant="outlined" color="inherit">
                  <GroupableIconButton
                    startIcon={<EditIcon />}
                    onClick={() => {
                      searchParams.set("edit", row.id);
                      setSearchParams(searchParams);
                    }}
                  />,
                  <GroupableIconButton
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      searchParams.set("delete", row.id);
                      setSearchParams(searchParams);
                    }}
                  />,
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
          filter: props.disableFilters ? undefined : {
            filterModel: {
              items: [
                { field: "status", operator: "not", value: "ended" }
              ]
            }
          },
          sorting: {
            sortModel: [
              { field: "eventDate", sort: "asc" },
              { field: "price", sort: "desc" },
              { field: "status", sort: "desc" },
              { field: "timestamp", sort: "desc" },
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

      <Dialog
        open={searchParams.has("delete")}
        onClose={() => {
          searchParams.delete("delete");
          searchParams.delete("error");
          setSearchParams(searchParams);
        }}
      >
        <DialogTitle>
          Delete Ticket
        </DialogTitle>
        <DialogContent>
          <DeleteTicketForm tickets={props.tickets} id={searchParams.get("delete") ?? ""} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={searchParams.has("edit")}
        onClose={() => {
          searchParams.delete("edit");
          searchParams.delete("error");
          searchParams.delete("fullName");
          searchParams.delete("email");
          searchParams.delete("phoneNumber");
          setSearchParams(searchParams);
        }}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>
          Edit Ticket
        </DialogTitle>
        <DialogContent>
          <EditTicketForm tickets={props.tickets} id={searchParams.get("edit") ?? ""} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

/**
 * @typedef CategoriesInputProps
 * @property {Ticket[]} tickets
 * @property {GridFilterItem} item
 * @property {(v: GridFilterItem) => any} applyValue
 */

/**
 * @param {CategoriesInputProps} props
 */
function CategoriesInput(props) {
  return (
    <FormControl variant="standard" sx={{ height: "100%", width: "100%" }}>
      <FormControlLabel
        sx={{ height: "100%", width: "100%", boxSizing: "border-box", mx: 0 }}
        control={
          <Select
            {...(/** @type {SelectProps<string[]>} */({}))}
            value={props.item.value ?? []}
            onChange={(e) => props.applyValue(
              {
                ...props.item,
                value: Array.isArray(e.target.value) ? e.target.value : [e.target.value]
              }
            )}
            sx={{ width: "100%" }}
            multiple={true}
          >
            {Array.from(new Map(
              props.tickets.flatMap(t => t.event?.categories?.map(c => [c.id, c]) ?? [])
            )).map(([id, c]) => (
              <MenuItem key={c.name} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        }
        label={
          <InputLabel>Categories</InputLabel>
        }
        labelPlacement="top"
      />
    </FormControl>
  )
};

const GroupableIconButton = styled(Button)({
  p: 0,
  minWidth: 0,
  maxWidth: 0,
  '& > span': {
    margin: 0,
  }
});

/**
 * @typedef DeleteTicketFormProps
 * @property {Ticket[]} tickets
 * @property {string} id
 */

/**
 * @param {DeleteTicketFormProps} props
 */

function DeleteTicketForm({ tickets, id }) {
  const [ticket, setTicket] = useState(/** @type {Ticket | null} */(null));
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const found = tickets.find(t => t.id === id);
    setTicket(found ?? null);
  }, [tickets, id]);

  return ticket ? (
    <Stack spacing={3}>
      <Typography>
        Are you sure you want to delete the{" "}
        <em>{ticket.ticketOption.name}</em> ticket from the{" "}
        <strong>{ticket.event?.name}</strong> event?
      </Typography>

      <Typography>
        Type{" "}
        <strong>{ticket.event?.name}/{ticket.ticketOption.name}</strong>{" "}
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
        action={getApiUrl("Ticket/CancelTicket", { returnUrl: "/Ticket?isCanceled=1" })}
      >
        <Box display="none">
          <input name="ticket" value={ticket.id} hidden={true} readOnly={true} required={true} />
        </Box>

        <Stack spacing={2}>
          <TextField
            variant="outlined"
            placeholder="Enter the above text to confirm."
            required={true}
            autoComplete="off"
            slotProps={{
              htmlInput: {
                pattern: RegExp.escape(`${ticket.event?.name}/${ticket.ticketOption.name}`)
              }
            }}
          />

          <Button
            variant="contained"
            color="error"
            type="submit"
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Stack>
  ) : (
    <Alert severity="error">
      Invalid Event.
    </Alert>
  );
}

/**
 * @typedef EditTicketFormProps
 * @property {Ticket[]} tickets
 * @property {string} id
 */

/**
 * @param {EditTicketFormProps} props
 */
function EditTicketForm({ tickets, id }) {
  const [ticket, setTicket] = useState(/** @type {Ticket | null} */(null));
  const [searchParams] = useSearchParams();
  const theme = useTheme();

  useEffect(() => {
    const found = tickets.find(t => t.id === id);
    setTicket(found ?? null);
  }, [tickets, id]);

  return (
    <Box
      component="form"
      method="post"
      action={getApiUrl("Ticket/UpdateTicket", { returnUrl: "/Ticket?isUpdated=1" })}
    >
      {ticket && (
        <Stack spacing={3} sx={{ p: 2 }}>
          <Card sx={{
            borderTop: 4,
            borderTopColor: theme.palette.primary.main
          }}>
            <CardContent sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary">
                  {ticket.event?.name}
                </Typography>
                <Grid container={true} size={12}>
                  <Grid size={6}>
                    <Stack>
                      <Typography fontWeight="bold">
                        {dayjs(ticket.event?.startDate).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                      <Typography fontWeight="bold">
                        {ticket.ticketOption.name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction="column-reverse" sx={{ height: "100%" }}>
                      <Stack direction="row-reverse">
                        <Box
                          sx={{
                            minWidth: "6rem",
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            px: 2,
                            mr: -2
                          }}
                        >
                          <Typography textAlign="center">
                            {ticket.price ? `$${ticket?.price.toFixed(2)}` : "Free"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>

          <TextField
            fullWidth={true}
            required={true}
            label="Full Name"
            placeholder="Enter your full name"
            defaultValue={ searchParams.get("fullName") || ticket.holderFullName }
            name="fullName"
            variant="outlined"
            size="medium"
            slotProps={{
              input: {
                startAdornment: <Person sx={{ mr: 1 }} />
              }
            }}
          />

          <TextField
            fullWidth
            required={true}
            label="Email"
            placeholder="Enter your email"
            defaultValue={ searchParams.get("email") || ticket.holderEmail }
            name="email"
            type="email"
            variant="outlined"
            size="medium"
            slotProps={{
              input: {
                startAdornment: <Email sx={{ mr: 1 }} />
              }
            }}
          />

          <TextField
            fullWidth
            required={true}
            label="Phone Number"
            defaultValue={ searchParams.get("phoneNumber") || ticket.holderPhoneNumber }
            placeholder="Enter your phone number"
            name="phoneNumber"
            type="tel"
            variant="outlined"
            size="medium"
            slotProps={{
              input: {
                startAdornment: <Phone sx={{ mr: 1 }} />
              }
            }}
          />

          {searchParams.has("error") &&
            <Alert severity="error">
              {searchParams.get("error")}
            </Alert>
          }

          <Box display="none">
            <input name="ticket" value={ticket?.id} required={true} readOnly={true} hidden={true}  />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"

          >
            Update Details
          </Button>
        </Stack>
      )}
    </Box>
  )
}
