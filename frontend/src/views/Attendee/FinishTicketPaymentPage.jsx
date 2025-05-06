// @ts-check

import FORCE_IMPORT_POLYFILL from "core-js/modules/es.map.group-by";
/**
 * @typedef { globalThis.MapConstructor & {
 *  groupBy<K, T>(items: Iterable<T>, keySelector: (item: T, index: number) => K, ): Map<K, T[]>;
 * }} MapConstructor
 */

import InputMask from "@mona-health/react-input-mask";
import { AddCircle, CalendarToday, ExpandMore, Label, Person, Security } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getApiUrl } from "../../api";
import { getPaymentMethods } from "../../backend";
import Authorized from "../../components/Authorized";
import CardTypeIcon from "../../components/CardTypeIcon";

/**
 * @import { PaymentMethod } from "../../models/PaymentMethod";
 */

// eslint-disable-next-line no-unused-expressions
FORCE_IMPORT_POLYFILL;
const Map = /** @type {MapConstructor} */(window.Map);

/**
 *
 * @param {PaymentMethod["$type"]} type
 */
function formatPaymentMethodType(type) {
  switch (type) {
    case "CardPaymentMethod":
      return "Card";
    default:
      return "Other";
  }
}

/**
 * @param {PaymentMethod["$type"]} typeA
 * @param {PaymentMethod["$type"]} typeB
 * @returns {Number}
 */
function comparePaymentMethodType(typeA, typeB) {
  /**
   * @param {PaymentMethod["$type"]} type
   */
  function toIndex(type) {
    switch (type) {
      case "CardPaymentMethod":
        return 0;
      default:
        return Number.MAX_SAFE_INTEGER;
    }
  }
  return toIndex(typeA) - toIndex(typeB);
}

export default function FinishTicketPayment() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const [paymentMethods, setPaymentMethods]
    = useState(/** @type {Map<PaymentMethod["$type"], PaymentMethod[]> | null} */(null));

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isAddingCardUserRequested, setIsAddingCardUserRequested] = useState(false);

  useEffect(() => {
    (async function() {
      const arr = await getPaymentMethods();
      setPaymentMethods(Map.groupBy(arr, (p) => p.$type));
    })();
  }, []);

  // Enforce one valid method selected.
  useEffect(() => {
    if (!paymentMethods || !paymentMethods.size) {
      return;
    }
    const allMethods = new Set(
      [...Array.from(paymentMethods.entries()).flatMap(([key, value]) => value).map(p => p.id)]
    );
    if (selectedPaymentMethod && allMethods.has(selectedPaymentMethod)) {
      return;
    }
    const p = searchParams.get("paymentMethod");
    if (p && allMethods.has(p)) {
      setSearchParams((params) => {
        params.delete("paymentMethod");
        return params;
      });
      setSelectedPaymentMethod(p);
    } else {
      const firstKey = Array.from(paymentMethods.keys()).sort(comparePaymentMethodType)[0];
      const firstMethod = paymentMethods.get(firstKey)?.at(0);
      if (firstMethod) {
        setSelectedPaymentMethod(firstMethod.id);
      }
    }
  }, [paymentMethods, selectedPaymentMethod, searchParams, setSearchParams]);

  return (
    <Grid container={true} size={12} sx={{ p: 6, py: 8 }} spacing={8}>
      <Authorized role="attendee" />
      <Grid size={7}>
        <Stack spacing={5}>
          <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
            Payment Methods
          </Typography>
          {paymentMethods ? (paymentMethods.size ? (
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <Stack spacing={3}>
                {Array.from(paymentMethods)
                  .sort(([k1, _1], [k2, _2]) => comparePaymentMethodType(k1, k2))
                  .map(([type, methods], i) =>
                (
                  <Accordion
                    key={type}
                    sx={{
                      border: 1,
                      borderColor: theme.palette.grey[400],
                    }}
                    defaultExpanded={true}
                  >
                    <AccordionSummary
                      expandIcon={ <ExpandMore /> }
                    >
                      <Typography>{formatPaymentMethodType(type)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        {methods.map((p, j) => (
                          <Grid
                            key={p.id}
                            container={true}
                            size={12}
                            sx={{
                              border: 1,
                              borderColor: theme.palette.grey[400],
                              borderRadius: 2
                            }}
                            spacing={2}
                          >
                            {p.$type === "CardPaymentMethod" ? (
                              <>
                              <Grid size={4}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  height="100%"
                                  sx={{ ml: 2 }}
                                >
                                  <CardTypeIcon
                                    number={p.number}
                                    iconProps={{ style: { minWidth: "3rem" }}} />
                                  <Typography noWrap={true} textOverflow="ellipsis">
                                    {p.displayName}
                                  </Typography>
                                </Stack>
                              </Grid>
                              <Grid size={6}>
                                <Stack direction="row" alignItems="center" height="100%">
                                  <Typography>
                                    {Array.from(p.number)
                                      .reverse()
                                      .map((c, i) => (i >= 4 && !/\s/.test(c)) ? '*' : c)
                                      .reverse()}
                                  </Typography>
                                </Stack>
                              </Grid>
                              </>
                            ) : (
                              <Grid size={10}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  height="100%"
                                  sx={{ ml: 2 }}
                                >
                                  <Typography>{p.displayName}</Typography>
                                </Stack>
                              </Grid>
                            )}
                            <Grid size={2}>
                              <Stack direction="row-reverse" alignItems="center">
                                <Radio
                                  value={p.id}
                                />
                              </Stack>
                            </Grid>
                          </Grid>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </RadioGroup>
          ) : (
            <Alert severity="error">
              You have no registered payment method!
            </Alert>
          )) : (
            <Stack alignItems="center">
              <CircularProgress sx={{ m: "4rem" }} />
            </Stack>
          )}
          <Button
            variant="text"
            size="large"
            startIcon={ <AddCircle fontSize="large" /> }
            sx={{
              textTransform: "inherit",
              display: "inline-flex",
              justifyContent: "flex-start",
              mr: "auto",
            }}
            onClick={() => {
              setIsAddingCardUserRequested(true);
              setSearchParams((params) => {
                params.set("isAddingCard", "1");
                return params;
              });
            }}
          >
            Add New Card
          </Button>
        </Stack>
      </Grid>
      <Grid size={5}>
        <Paper
          sx={{
            background: blue[50],
            borderRadius: 4,
            p: "3rem",
            minHeight: "80%"
          }}
        >
          <Stack spacing={3}>
            <Card sx={{
              borderTop: 4,
              borderTopColor: theme.palette.primary.main
            }}>
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary">
                    Your Tickets
                  </Typography>
                  <Grid container={true} size={12}>
                    <Grid size={6}>
                      <Stack>
                        <Typography fontWeight="bold">
                          {searchParams.get("fullName")}
                        </Typography>
                        <Typography fontWeight="bold">
                          {searchParams.get("email")}
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
                              ${searchParams.get("totalPrice")}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">
                    Payment Details
                  </Typography>
                  <Divider />
                  <Grid container={true} size={12}>
                    <Grid size={6}>
                      <Stack direction="row">
                        <Typography color="textSecondary">
                          Order
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={6}>
                      <Stack direction="row-reverse">
                        <Typography color="textSecondary">
                          ${searchParams.get("totalPrice")}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container={true} size={12}>
                    <Grid size={6}>
                      <Stack direction="row">
                        <Typography color="textSecondary">
                          Tax (Included)
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={6}>
                      <Stack direction="row-reverse">
                        <Typography color="textSecondary">
                          ${(Number
                              .parseFloat(searchParams.get("totalPrice") ?? "0") / 11)
                              .toFixed(2)}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container={true} size={12}>
                    <Grid size={6}>
                      <Stack direction="row">
                        <Typography fontWeight="bold">
                          Total
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={6}>
                      <Stack direction="row-reverse">
                        <Typography fontWeight="bold">
                          ${searchParams.get("totalPrice")}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            {searchParams.has("error") && !searchParams.has("isAddingCard") &&
              <Alert severity="error">
                {searchParams.get("error")}
              </Alert>
            }

            <Box
              component="form"
              method="post"
              action={getApiUrl("Ticket/FinishTicketPayment",
                { returnUrl: searchParams.get("returnUrl") ?? "/Ticket?isOrdered=1" }
              )}
            >
              <Box sx={{ display: "none" }}>
                {searchParams.getAll("ticketOption").map((to, index) => (
                  <input
                    key={index}
                    name="ticketOption"
                    value={to}
                    readOnly={true}
                    required={true}
                    hidden={true}
                  />
                ))}
                {["fullName", "email", "phoneNumber", "totalPrice"].map(prop => (
                  <input
                    key={prop}
                    name={prop}
                    value={searchParams.get(prop) || ""}
                    readOnly={true}
                    required={true}
                    hidden={true}
                  />
                ))}
                <input
                  name="paymentMethod"
                  value={selectedPaymentMethod}
                  readOnly={true}
                  required={true}
                  hidden={true}
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                disabled={!paymentMethods || !paymentMethods.size}
              >
                Pay Now
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Dialog
        open={!!searchParams.get("isAddingCard")}
        onClose={() => {
          setSearchParams((params) => {
            params.delete("isAddingCard");
            params.delete("error");
            return params;
          });
          if (isAddingCardUserRequested) {
            setIsAddingCardUserRequested(false);
          } else {
            // We're meant to continue adding our card,
            // but we aborted the process.
            // Return to the previous target ourselves.
            const realUrl = searchParams.get("returnUrl");
            if (realUrl) {
              window.location.href = realUrl;
            }
          }
        }}
      >
        <DialogTitle>
            Add New Card
        </DialogTitle>
        <DialogContent>
          <AddCardForm />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

function AddCardForm() {
  const [displayName, setDisplayName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const [returnUrl, setReturnUrl] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    /** @typedef {"displayName" | "number" | "expiry" | "cvv" | "name"} AddCardFormParams */
    /** @type {Record<AddCardFormParams, (s: string) => any>} */
    const setters = {
      "displayName": setDisplayName,
      "number": setNumber,
      "expiry": setExpiry,
      "cvv": setCvv,
      "name": setName
    };

    setSearchParams((params) => {
      // Hack: sometimes params may be outdated!
      if (params.toString() !== window.location.search) {
        params = new URL(window.location.href).searchParams;
      }

      /** @type {AddCardFormParams[]} */
      const propertyList = ["displayName", "number", "expiry", "cvv", "name"];
      for (let property of propertyList) {
        if (params.has(property)) {
          setters[property](params.get(property) || "");
          params.delete(property);
        }
      }
      return params;
    });

    const cleanSearchParams = new URLSearchParams(searchParams);
    cleanSearchParams.delete("isAddingCard");

    const url = new URL(window.location.href);
    url.search = cleanSearchParams.toString();
    setReturnUrl(url.toString());

  }, [searchParams, setSearchParams]);

  return (
      <Box
        component="form"
        method="post"
        action={getApiUrl("Payment/Card", { returnUrl: returnUrl })}
        sx={{ p: 2 }}
      >
        <Stack
          spacing={2}
          alignItems="stretch"
        >
          {/* Card Nickname */}
          <TextField
            label="Card Nickname (for your reference)"
            fullWidth={true}
            variant="outlined"
            name="displayName"
            placeholder="Enter your card's display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Label />
                  </InputAdornment>
                ),
              }
            }}
            sx={{
              maxWidth: "100%",
              boxSizing: "border-box"
            }}
          />

          {/* Card Number */}
          <InputMask
            mask="9999 9999 9999 9999"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          >
            <TextField
              label="Card Number"
              fullWidth={true}
              required={true}
              variant="outlined"
              name="number"
              placeholder="Enter your card number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CardTypeIcon number={number} iconProps={{ style: { width: "24px" }}} />
                    </InputAdornment>
                  ),
                  }
              }}
            />
          </InputMask>

          {/* Expiry Date and CVV */}
          <Grid size={12} container={true} spacing={2}>
            <Grid size={7}>
              <InputMask
                mask="99/99"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              >
                <TextField
                  label="Expiry Date"
                  fullWidth={true}
                  required={true}
                  variant="outlined"
                  name="expiry"
                  placeholder="MM/YY"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday />
                        </InputAdornment>
                      ),
                    },
                    htmlInput: {
                      pattern: "(0[1-9]|1[0-2])/\\d{2}"
                    }
                  }}
                />
              </InputMask>
            </Grid>
            <Grid size={5}>
              <InputMask
                mask="999"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              >
                <TextField
                  label="CVV/CVC"
                  fullWidth={true}
                  required={true}
                  type="password"
                  variant="outlined"
                  name="cvv"
                  placeholder="CVV"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Security />
                        </InputAdornment>
                      ),
                    }
                  }}
                />
              </InputMask>
            </Grid>
          </Grid>

          {/* Cardholder Name */}
          <TextField
            label="Cardholder Name"
            fullWidth={true}
            required={true}
            variant="outlined"
            name="name"
            placeholder="Enter your card's holder's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }
            }}
          />

          {searchParams.has("error") &&
            <Alert severity="error">
              {searchParams.get("error")}
            </Alert>
          }

          <Button
            fullWidth={true}
            variant="contained"
            type="submit"
            color="primary"
          >
            Add Card
          </Button>
        </Stack>
      </Box>
  )
}
