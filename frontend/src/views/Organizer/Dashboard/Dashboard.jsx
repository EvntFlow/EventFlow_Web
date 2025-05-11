// @ts-check

import {
  Analytics,
  AppRegistration,
  ArrowForward,
  CalendarMonth,
  People,
  TrendingDown,
  TrendingUp
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useRef, useState } from 'react';
import { getAttendance, getStatistics } from '../../../backend';
import Authorized from '../../../components/Authorized';

// Recharts imports
import {
  Area,
  AreaChart,
  CartesianGrid,
  Dot,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

/**
 * @import { ComponentRef } from "react";
 * @import { DataGridProps, GridColDef } from "@mui/x-data-grid";
 * @import Statistics from "../../../models/Statistics";
 * @import Ticket from "../../../models/Ticket";
 */

dayjs.extend(utc);

export default function Dashboard() {
  const theme = useTheme();

  const [recentTickets, setRecentTickets] = useState(/** @type {Ticket[] | null} */(null));
  const [currentMonthStats, setCurrentMonthStats]
    = useState(/** @type {Statistics | null} */(null));
  const [lastMonthStats, setLastMonthStats]
    = useState(/** @type {Statistics | null} */(null));
  const [selectedMonth, setSelectedMonth]
    = useState(dayjs().utc().startOf("month").toISOString());
  const [selectedMonthStats, setSelectedMonthStats]
    = useState(/** @type {Statistics | null} */(null));

  useEffect(() => {
    (async function () {
      setRecentTickets((await getAttendance()).slice(0, 3));
    })();
  }, []);

  useEffect(() => {
    (async function () {
      setCurrentMonthStats(await getStatistics());
      setLastMonthStats(
        await getStatistics(dayjs().utc().subtract(1, 'month').startOf('month').toDate())
      );
    })();
  }, []);

  useEffect(() => {
    (async function () {
      setSelectedMonthStats(await getStatistics(new Date(selectedMonth)));
    })();
  }, [selectedMonth]);

  const [position, setPosition] = useState(/** @type {{x: number, y: number} | null} */(null));
  const [tooltipLabel, setTooltipLabel] = useState("");
  const chartRef = useRef(/** @type {import('react').ComponentRef<AreaChart> | null} */(null));

  return (
    <Stack sx={{ p: 4 }} spacing={2}>
      <Authorized role="organizer" />
      <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
        Dashboard
      </Typography>
      <Grid size={12} container={true} spacing={4}>
        {/* Total Checked-in (reviewed tickets) */}
        <Grid size={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={1}>
                <Grid size={12} container={true}>
                  <Grid size={6}>
                    <Stack spacing={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Total Checked-in
                      </Typography>
                      {currentMonthStats ? (
                        <Typography fontWeight="bold" variant="h5">
                          {currentMonthStats.totalReviewed}
                        </Typography>
                      ) : (
                        <CircularProgress size={theme.typography.h5.fontSize} />
                      )}
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction="row-reverse">
                      <Box
                        sx={{
                          backgroundColor:
                            `color-mix(in srgb, ${theme.palette.primary.light} 40%, transparent)`,
                          color: theme.palette.primary.dark,
                          p: 1,
                          borderRadius: "1rem"
                        }}>
                        <People fontSize="large" />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Box sx={{ height: "100%" }} />
                {currentMonthStats &&
                  <PercentageDiffView
                    current={currentMonthStats.totalReviewed}
                    previous={lastMonthStats?.totalReviewed}
                    label="last month"
                  />
                }
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* Total events */}
        <Grid size={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={1}>
                <Grid size={12} container={true} spacing={4}>
                  <Grid size={6}>
                    <Stack spacing={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Total Events
                      </Typography>
                      {currentMonthStats ? (
                        <Typography fontWeight="bold" variant="h5">
                          {currentMonthStats.totalEvents}
                        </Typography>
                      ) : (
                        <CircularProgress size={theme.typography.h5.fontSize} />
                      )}
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction="row-reverse">
                      <Box
                        sx={{
                          backgroundColor:
                            `color-mix(in srgb, ${theme.palette.warning.light} 40%, transparent)`,
                          color: theme.palette.warning.dark,
                          p: 1,
                          borderRadius: "1rem"
                        }}>
                        <CalendarMonth fontSize="large" />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Stack direction="row-reverse">
                  <Button
                    href="/Event/Manage"
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      textTransform: "inherit",
                      borderRadius: "4rem"
                    }}
                  >
                    View event list
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* Total sales */}
        <Grid size={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={1}>
                <Grid size={12} container={true}>
                  <Grid size={6}>
                    <Stack spacing={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Total Sales
                      </Typography>
                      {currentMonthStats ? (
                        <Typography fontWeight="bold" variant="h5">
                          ${currentMonthStats.totalSales.toFixed(2)}
                        </Typography>
                      ) : (
                        <CircularProgress size={theme.typography.h5.fontSize} />
                      )}
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction="row-reverse">
                      <Box
                        sx={{
                          backgroundColor:
                            `color-mix(in srgb, ${theme.palette.success.light} 40%, transparent)`,
                          color: theme.palette.success.dark,
                          p: 1,
                          borderRadius: "1rem"
                        }}>
                        <Analytics fontSize="large" />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Box sx={{ height: "100%" }} />
                {currentMonthStats &&
                  <PercentageDiffView
                    current={currentMonthStats.totalSales}
                    previous={
                      lastMonthStats?.dailySales
                        .slice(0, dayjs().utc().date())
                        .reduce((a, b) => a + b, 0)
                    }
                    label="last month"
                  />
                }
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* Total registered */}
        <Grid size={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={1}>
                <Grid size={12} container={true} spacing={4}>
                  <Grid size={6}>
                    <Stack spacing={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Total Registered
                      </Typography>
                      {currentMonthStats ? (
                        <Typography fontWeight="bold" variant="h5">
                          {currentMonthStats.totalTickets}
                        </Typography>
                      ) : (
                        <CircularProgress size={theme.typography.h5.fontSize} />
                      )}
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction="row-reverse">
                      <Box
                        sx={{
                          backgroundColor:
                            `color-mix(in srgb, ${theme.palette.error.light} 40%, transparent)`,
                          color: theme.palette.error.dark,
                          p: 1,
                          borderRadius: "1rem"
                        }}>
                        <AppRegistration fontSize="large" />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Stack direction="row-reverse">
                  <Button
                    href="/Ticket/Attendance"
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      textTransform: "inherit",
                      borderRadius: "4rem"
                    }}
                  >
                    View attendance list
                  </Button>
                </Stack>
              </Stack>

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sales Details Chart */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Grid size={12} container={true}>
              <Grid size={6}>
                <Typography variant="h5" fontWeight={theme.typography.fontWeightMedium}>
                  Sales Details
                </Typography>
              </Grid>
              <Grid size={6}>
                <Stack direction="row-reverse">
                  <Select
                    sx={{ minWidth: "8rem" }}
                    value={selectedMonth}
                    size="small"
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {Array(12).fill(0)
                      .map((_, index) => dayjs().utc().subtract(index, "month").startOf("month"))
                      .map((day, index) =>
                        <MenuItem key={index} value={day.toISOString()}>
                          {day.format("MMMM")}
                        </MenuItem>
                      )}
                  </Select>
                </Stack>
              </Grid>
            </Grid>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                ref={chartRef}
                data={
                  selectedMonthStats?.dailySales
                    .map((value, index) => { return { "day": `${index + 1}`, "value": value } })
                }
                width={730} height={250}
                onMouseMove={(e) => {
                  if (e.activeCoordinate) {
                    const domain = chartRef.current?.getYScales()["0"]["domain"]();
                    const range = chartRef.current?.getYScales()["0"]["range"]();
                    const value = e.activePayload?.at(0).payload.value.toFixed(2);

                    const yCoords = range[0] +
                      ((value - domain[0]) * ((range[1] - range[0]) / (domain[1] - domain[0])));

                    const box = chartRef.current?.container?.getBoundingClientRect();
                    if (box) {
                      setTooltipLabel(`$${value}`);
                      setPosition({
                        x: e.activeCoordinate.x + box.x,
                        y: yCoords + box.y
                      });
                      return;
                    }
                    setPosition(null);
                  }
                }}
                onMouseLeave={(_) => setPosition(null)}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={0} stopColor={theme.palette.primary.main} stopOpacity={0.6} />
                    <stop offset={1} stopColor={theme.palette.primary.main} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tickFormatter={(v) => {
                    /** @param {Number} day */
                    function getDaySuffix(day) {
                      if (day > 3 && day < 21) return 'th';
                      switch (day % 10) {
                        case 1: return 'st';
                        case 2: return 'nd';
                        case 3: return 'rd';
                        default: return 'th';
                      }
                    };
                    return `${v}${getDaySuffix(Number.parseInt(v))}`
                  }}
                  tick={{
                    fontSize: theme.typography.body2.fontSize,
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.secondary,
                  }}
                  tickMargin={10}
                  type="number"
                  ticks={['1', '5', '10', '15', '20', '25', '30']}
                  domain={[1, dayjs(selectedMonth).utc().daysInMonth()]}
                />
                <YAxis
                  tickFormatter={(v) => `$${v}`}
                  tick={{
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.secondary
                  }} />
                <CartesianGrid vertical={false} />
                <Area
                  type="linear"
                  dataKey="value"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  dot={<Dot fill={theme.palette.primary.main} />}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Stack>
        </CardContent>

        <Tooltip
          title={tooltipLabel}
          placement="top"
          arrow
          open={!!position}
          slotProps={{
            popper: {
              anchorEl: {
                getBoundingClientRect: () => {
                  if (!position) {
                    return new DOMRect(-Number.MAX_VALUE, -Number.MAX_VALUE, 0, 0);
                  } else {
                    return new DOMRect(position.x, position.y, 0, 0);
                  }
                },
              },
            },
            tooltip: {
              sx: {
                backgroundColor: `color-mix(in srgb, ${theme.palette.primary.main}, transparent 20%)`,
                border: "none"
              }
            },
            arrow: {
              sx: { color: `color-mix(in srgb, ${theme.palette.primary.main}, transparent 20%)` }
            }
          }}
        >
          <Box display="none" />
        </Tooltip>
      </Card>

      {/* Recent Sales */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={theme.typography.fontWeightMedium}>
              Recent Sales
            </Typography>

            <DataGrid
              {.../** @type {DataGridProps<Ticket>} */({})}
              rows={recentTickets || undefined}
              columns={[
                /** @type {GridColDef<Ticket, string>} */
                ({
                  field: "holderFullName",
                  headerName: "Attendee",
                  flex: 1,
                  type: "string",
                  display: "flex",
                  valueGetter: (_, t) => t.holderFullName,
                }),
                /** @type {GridColDef<Ticket, string>} */
                ({
                  field: "eventName",
                  headerName: "Event",
                  flex: 1,
                  type: "string",
                  valueGetter: (_, t) => t.ticketOption.name,
                  renderCell: (params) => (
                    <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
                      <Stack>
                        <Button
                          href={`/Ticket/Attendance?event=${params.row?.event?.id}`}
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
                      </Stack>
                    </Stack>
                  )
                }),
                /** @type {GridColDef<Ticket, string>} */
                ({
                  field: "name",
                  headerName: "Ticket",
                  flex: 0.75,
                  type: "string",
                  display: "flex",
                  valueGetter: (_, t) => t.ticketOption.name,
                }),
                /** @type {GridColDef<Ticket, Date, string>} */
                ({
                  field: "timestamp",
                  headerName: "Date",
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
              ]}
              getRowId={(t) => t.id}
              rowHeight={64}
              initialState={{
                sorting: {
                  sortModel: [
                    { field: "timestamp", sort: "desc" },
                    { field: "status", sort: "desc" },
                  ]
                }
              }}
              disableRowSelectionOnClick={true}
              hideFooter={true}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

/**
 * @typedef PercentageDiffViewProps
 * @property {string} label
 * @property {number} current
 * @property {number | null=} previous
 */

/**
 * @param {PercentageDiffViewProps} props
 */
function PercentageDiffView({ label, current, previous }) {
  const [percentage, setPercentage] = useState(0.0);

  useEffect(() => {
    if (!previous) {
      setPercentage(0.0)
    } else {
      setPercentage(current / previous);
    }
  }, [current, previous]);

  if (!previous) {
    return null;
  }

  return percentage > 1.0 ? (
    <Stack direction="row" spacing={1} height="100%" alignItems="center">
      <TrendingUp color="success" />
      <Typography variant="body2" color="success" fontWeight="bold">
        {Math.round((percentage - 1.0) * 1000) / 10}%
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Up from {label}
      </Typography>
    </Stack>
  ) : (
    <Stack direction="row" spacing={1}>
      <TrendingDown color="error" />
      <Typography variant="body2" color="error" fontWeight="bold">
        {Math.round((1.0 - percentage) * 1000) / 10}%
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Down from {label}
      </Typography>
    </Stack>
  );
}
