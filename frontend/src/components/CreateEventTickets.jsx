// @ts-check

import { ConfirmationNumberOutlined, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { getPaymentMethods } from '../backend';

/**
 * @import { CreateEventStepElementProps } from "../views/Organizer/CreateEventPage";
 */

/**
 * @typedef {CreateEventStepElementProps} CreateEventTicketsProps
 */

/**
 * @param {CreateEventTicketsProps} props
 */
export default function CreateEventTickets({ context, step }) {
  const theme = useTheme();

  const [isTicketed, setIsTicketed] = useState(false);
  const [ticketCount, setTicketCount] = useState(0);
  const [hasPaymentMethods, setHasPaymentMethods] = useState(false);

  useEffect(() =>
  {
    (async function ()
    {
      const paymentMethods = await getPaymentMethods();
      setHasPaymentMethods(paymentMethods.length > 0);
    })();
  }, []);

  useEffect(() => {
    if (context.get.price > 0) {
      setIsTicketed(true);
    }
  }, [context.get.price])

  useEffect(() => {
    setTicketCount(context.get.ticketPrice.length);
  }, [context.get.ticketPrice]);

  useEffect(() => {
    context.set.ticketName((c) => {
      return c.length ? c : ["Default"];
    });
    context.set.ticketPrice((c) => {
      return c.length ? c : [0]
    });
    context.set.ticketCount((c) => {
      return c.length ? c : [0]
    });
  }, [context.set]);

  return (
    <Stack spacing={4}>
      {/* Ticketing Options */}
      <Stack spacing={1}>
        <Typography variant="h4">
          Event Type
        </Typography>

        <Typography variant="h6">
          What type of event are you running?
        </Typography>
      </Stack>

      <ToggleButtonGroup
        value={`${isTicketed}`}
        exclusive
        onChange={(_, newValue) => {
          if (newValue === "false") {
            context.set.price(0);
            context.set.ticketName(["Default"]);
            context.set.ticketPrice([0]);
            context.set.ticketCount([0]);
            setIsTicketed(false);
          } else {
            setIsTicketed(true);
          }
        }}
      >
        <Grid container={true} size={12} spacing={4} sx={{ width: "100%" }}>
          <Grid size={5}>
            <ToggleButton
              value="true"
              disabled={!hasPaymentMethods}
              sx={{
                textTransform: "inherit",
                width: "100%",
                ...isTicketed && {
                  borderWidth: "medium",
                  borderColor: theme.palette.text.primary
                }
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <ConfirmationNumberOutlined sx={{ width: "3rem", height: "3rem" }} />
                <Stack>
                  <Typography variant="subtitle1" color="inherit" fontWeight="bold">
                    Ticketed Event
                  </Typography>

                  {hasPaymentMethods ? (
                    <Typography variant="body2" color="inherit" align="center">
                      My event requires tickets for entry
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="error" align="center">
                      Please add a payment method to host ticketed events
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </ToggleButton>
          </Grid>
          <Grid size={5}>
            <ToggleButton
              value="false"
              sx={{
                textTransform: "inherit",
                width: "100%",
                ...!isTicketed && {
                  borderWidth: "medium",
                  borderColor: theme.palette.text.primary
                }
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <Box sx={{ position: "relative", width: "3rem", height: "3rem" }}>
                  <svg
                    viewBox="0 0 100 100"
                    style={{ position: "absolute", left: 0, top: 0, width: "3rem", height: "3rem" }}
                  >
                    <defs>
                      <clipPath id="cut">
                        <rect x="0" y="0" width="100" height="35" />
                        <rect x="0" y="65" width="100" height="35" />
                      </clipPath>
                    </defs>
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none" stroke="currentColor" strokeWidth="5"
                    />
                    <circle
                      cx="50" cy="50" r="30"
                      fill="none" stroke="currentColor" strokeWidth="5"
                      clipPath="url(#cut)"
                    />
                  </svg>
                  <Stack direction="row" height="100%" alignItems="center">
                    <Stack width="100%">
                      <Typography
                        variant="body2"
                        fontSize="0.75rem"
                        fontWeight="bold"
                        textAlign="center"
                        lineHeight="0"
                      >
                        FREE
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Stack>
                  <Typography variant="subtitle1" color="inherit" fontWeight="bold">
                    Free Event
                  </Typography>
                  <Typography variant="body2" color="inherit" align="center">
                    I'm running a free event
                  </Typography>
                </Stack>
              </Stack>
            </ToggleButton>
          </Grid>
        </Grid>
      </ToggleButtonGroup>

      <Stack spacing={1}>
        <Typography variant="h4">
          Ticket Type
        </Typography>

        <Typography variant="h6">
          What tickets are you selling?
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {context.step >= step && Array(ticketCount).fill(0).map((_, index) =>
          <Grid key={index} size={12} container={true} spacing={4}>
            <Grid size={1}>
              <Stack direction="row" height="100%" alignItems="center">
                <CustomIconButton
                  variant="contained"
                  color="error"
                  size="large"
                  disabled={ticketCount <= 1}
                  startIcon={<Delete />}
                  onClick={() => {
                    context.set.ticketName(
                      arr => [...arr.slice(0, index), ...arr.slice(index + 1)]
                    );
                    context.set.ticketCount(
                      arr => [...arr.slice(0, index), ...arr.slice(index + 1)]
                    );

                    let prices = context.get.ticketPrice;
                    prices = [...prices.slice(0, index), ...prices.slice(index + 1)];
                    const diff = Math.min(...prices);
                    context.set.price(context.get.price + diff);
                    prices = prices.map(p => p - diff);

                    context.set.ticketPrice(prices);
                  }}
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <TextField
                name="ticketName"
                value={context.get.ticketName[index]}
                required={context.step >= step}
                fullWidth={true}
                label="Ticket Name"
                placeholder="Ticket Name e.g. General Admission"
                onChange={(e) =>
                  context.set.ticketName(arr => {
                    arr[index] = e.target.value; return [...arr];
                  })}
                slotProps={{
                  htmlInput: {
                    formNoValidate: context.step < step
                  }
                }}
              />
            </Grid>
            {isTicketed &&
              <Grid size={2}>
                <TextField
                  value={context.get.price + context.get.ticketPrice[index]}
                  required={context.step >= step}
                  fullWidth={true}
                  type="number"
                  label="Ticket Price"
                  placeholder="0.00"
                  onChange={(e) => {
                    let prices = [...context.get.ticketPrice];
                    let newPrice = Math.trunc(Number.parseFloat(e.target.value) * 100) / 100;

                    const basePrice = context.get.price;
                    newPrice -= basePrice;
                    prices[index] = newPrice;

                    if (newPrice < 0) {
                      const diff = -newPrice;
                      context.set.price(basePrice - diff);
                      prices = prices.map(p => p + diff);
                    } else {
                      const diff = Math.min(...prices);
                      if (diff > 0) {
                        context.set.price(basePrice + diff);
                        prices = prices.map(p => p - diff);
                      }
                    }

                    context.set.ticketPrice(prices);
                  }}
                  slotProps={{
                    htmlInput: {
                      step: 0.01,
                      min: 0.00,
                      formNoValidate: context.step < step
                    }
                  }}
                />
              </Grid>
            }
            <Box display="none">
              <input
                name="ticketPrice"
                value={context.get.ticketPrice[index]}
                type="number"
                required={context.step >= step}
                readOnly={true}
                hidden={true}
              />
            </Box>

            <Grid size={2}>
              <TextField
                name="ticketCount"
                value={context.get.ticketCount[index]}
                required={context.step >= step}
                fullWidth={true}
                type="number"
                label="Ticket Count"
                placeholder="0"
                onChange={(e) =>
                  context.set.ticketCount(arr => {
                    arr[index] = Number.parseInt(e.target.value); return [...arr];
                  })}
                slotProps={{
                  htmlInput: {
                    min: 1,
                    formNoValidate: context.step < step
                  }
                }}
              />
            </Grid>
          </Grid>
        )}
        {isTicketed &&
          <Stack direction="row">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                context.set.ticketName(
                  arr => [...arr, ""]
                );
                context.set.ticketPrice(
                  arr => [...arr, 0]
                );
                context.set.ticketCount(
                  arr => [...arr, 0]
                );
              }}
            >
              Add Ticket
            </Button>
          </Stack>
        }
      </Stack>

      <Box display="none">
        <input
          name="price"
          value={context.get.price}
          hidden={true}
          required={true}
          readOnly={true}
          formNoValidate={context.step < step}
          type="number"
        />
        <input
          hidden={true}
          required={true}
          readOnly={true}
          formNoValidate={context.step < step}
          type="number"
          value={ticketCount}
          min={1}
        />
      </Box>

      {/* Navigation Buttons */}
      <Stack direction="row-reverse" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: "10rem" }}
          onClick={() => {
            context.next();
          }}
        >
          Next
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{
            minWidth: "10rem",
            color: theme.palette.text.primary
          }}
          onClick={() => {
            context.prev();
          }}
        >
          Go Back
        </Button>
      </Stack>
    </Stack>
  );
};

const CustomIconButton = styled(Button)({
  p: 0,
  minWidth: 0,
  maxWidth: 0,
  '& > span': {
    margin: 0,
  }
});

