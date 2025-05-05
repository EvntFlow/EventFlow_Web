// @ts-check

import { AddCircle, ExpandMore } from "@mui/icons-material";
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
  Divider,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPaymentMethods } from "../../backend";
import CardTypeIcon from "../../components/CardTypeIcon";

/**
 * @import { PaymentMethod } from "../../models/PaymentMethod";
 */

import { blue } from "@mui/material/colors";
import FORCE_IMPORT_POLYFILL from "core-js/modules/es.map.group-by";
import { getApiUrl } from "../../api";
// eslint-disable-next-line no-unused-expressions
FORCE_IMPORT_POLYFILL;
/**
 * @typedef { globalThis.MapConstructor & {
 *  groupBy<K, T>(items: Iterable<T>, keySelector: (item: T, index: number) => K, ): Map<K, T[]>;
 * }} MapConstructor
 */
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
      searchParams.delete("paymentMethod");
      setSearchParams(searchParams);
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
                                  <CardTypeIcon number={p.number} />
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

            {searchParams.has("error") &&
              <Alert severity="error">
                {searchParams.get("error")}
              </Alert>
            }

            <Box
              component="form"
              method="post"
              action={getApiUrl("Ticket/FinishTicketPayment",
                { returnUrl: searchParams.get("returnUrl") ?? "/Ticket" }
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
    </Grid>
  );
}
