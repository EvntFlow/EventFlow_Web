// @ts-check

import { ArrowBack, CalendarToday, KeyboardArrowRight } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog, DialogContent, DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../api';
import { useAuth } from '../context/AuthContext';

/**
 * @import Event from "../models/Event";
 * @import TicketOption from "../models/TicketOption";
 */

/**
 * @typedef AttendeeDetailsFormProps
 * @property {boolean} isOpen
 * @property {() => any} onClose
 * @property {() => any} onContinue
 * @property {Event} event
 * @property {[TicketOption, number][]} ticketDetails
 * @property {number} totalQuantity
 * @property {number} totalPrice
 */

/**
 * @param {AttendeeDetailsFormProps} props
 */
export default function AttendeeDetailsForm(props) {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(/** @type {string | null} */(null));

  // Consume the error to avoid polluting callbacks.
  useEffect(() => {
    if (searchParams.has("error")) {
      setError(searchParams.get("error"));
      searchParams.delete("error");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1,
            maxHeight: '90vh'
          }
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <IconButton edge="start" onClick={props.onClose} sx={{ mr: 1 }} size="large">
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Attendee Details</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 0, bgcolor: 'grey.50' }}>
        <Box
          component="form"
          method="post"
          action={getApiUrl("Ticket", { returnUrl: "/Ticket" })}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2"><b>{props.event.name}</b></Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarToday />
                <Typography variant="body2">
                  {dayjs(props.event.startDate).format("dddd, D MMMM YYYY")}
                </Typography>
              </Stack>
            </Box>

            <Typography
              variant="subtitle2"
              sx={{
                p: 1.5,
                borderBottom: '2px solid',
                borderColor: 'primary.main',
                bgcolor: 'white',
                mb: 2
              }}
            >
              {props.ticketDetails.map(([to, count]) =>
                `${to.name}: ${count}x`).join(', ')
              }
            </Typography>

            <Box display="none">
              {props.ticketDetails
                .flatMap(([to, count]) => Array(count).fill(null).map(() => to.id))
                .map((id, index) => (
                  <input key={index} hidden readOnly name="ticketOption" value={id} />
                ))}
            </Box>

            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Full Name</Typography>
              <TextField
                fullWidth={true}
                required={true}
                placeholder="Enter your full name"
                defaultValue={
                  searchParams.get("fullName") || `${user?.firstName} ${user?.lastName}`
                }
                name="fullName"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />

              <Typography variant="subtitle1" gutterBottom>Email</Typography>
              <TextField
                fullWidth
                required={true}
                placeholder="Enter your email"
                defaultValue={searchParams.get("email") || `${user?.email}`}
                name="email"
                type="email"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />

              <Typography variant="subtitle1" gutterBottom>Phone Number</Typography>
              <TextField
                fullWidth
                required={true}
                defaultValue={searchParams.get("phoneNumber") || `${user?.phoneNumber}`}
                placeholder="Enter your phone number"
                name="phoneNumber"
                type="tel"
                variant="outlined"
                size="small"
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    required={true}
                  />
                }
                label={
                  <>
                    I accept the{' '}
                    <Link href="#" color="primary">Terms of Service</Link>{' '}
                    and have read the{' '}
                    <Link href="#" color="primary">Privacy Policy</Link>
                  </>
                }
                slotProps={{
                  typography: {
                    variant: "body2"
                  }
                }}
              />
            </Box>

            {error &&
              <Alert severity="error">
                {error}
              </Alert>
            }
          </Box>

          <Divider />

          <Box sx={{ p: 2, bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Qty: {props.totalQuantity}</Typography>
              <Typography>
                Total:{' '}
                <Box component="span" color="primary.main">
                  {props.totalPrice ? `$${props.totalPrice.toFixed(2)}` : "Free"}
                </Box>
              </Typography>
            </Box>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              endIcon={<KeyboardArrowRight />}
              sx={{ py: 1.5 }}
            >
              Submit Order
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
