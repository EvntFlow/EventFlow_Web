// @ts-check

import {
  CalendarMonth,
  ConfirmationNumber,
  Email,
  Person,
  Phone,
  Verified
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

/**
 * @import Ticket from "../models/Ticket";
 */

/**
 * @typedef TicketViewProps
 * @property {Ticket[]} tickets
 * @property {string} id
 */

export default function TicketView({ tickets, id }) {
  const theme = useTheme();
  const [ticket, setTicket] = useState(/** @type {Ticket | null} */(null));
  const [isTicketValid, setIsTicketValid] = useState(true);
  const [ticketUrl, setTicketUrl] = useState("");

  useEffect(() => {
    const found = tickets.find(t => t.id === id);
    setTicket(found ?? null);
    if (found) {
      setTicketUrl(
        new URL(`/Ticket/Attendance/?review=${found.id}`, window.location.href).toString()
      );
    } else {
      setIsTicketValid(false);
      setTicketUrl("");
    }
  }, [tickets, id]);

  return (
    <Box>
      {!ticket ? ( isTicketValid ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Alert severity="error">
          Invalid Ticket.
        </Alert>
      )) : (
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
                  <Grid size={9}>
                    <Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Person />
                        <Typography>
                          {ticket.holderFullName}
                        </Typography>
                        {ticket.isReviewed &&
                          <Verified color="success" />
                        }
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Email />
                        <Typography>
                          {ticket.holderEmail}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Phone />
                        <Typography>
                          {ticket.holderPhoneNumber}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={3}>
                    <Stack direction="row-reverse">
                      {ticketUrl &&
                        <Box
                          sx={{
                            background: theme.palette.common.white,
                            width: "6rem"
                          }}>
                          <QRCode
                            value={ticketUrl}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          />
                        </Box>
                      }
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container={true} size={12}>
                  <Grid size={9}>
                    <Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarMonth />
                        <Typography>
                          {dayjs(ticket.event?.startDate).format("DD/MM/YYYY HH:mm")}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ConfirmationNumber />
                        <Typography>
                          {ticket.ticketOption.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={3}>
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
        </Stack>
      )}
    </Box>
  );
}
