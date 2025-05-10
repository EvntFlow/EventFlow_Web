// @ts-check

import FORCE_IMPORT_POLYFILL from "core-js/modules/es.map.group-by";
/**
 * @typedef { globalThis.MapConstructor & {
 *  groupBy<K, T>(items: Iterable<T>, keySelector: (item: T, index: number) => K, ): Map<K, T[]>;
 * }} MapConstructor
 */

import InputMask from "@mona-health/react-input-mask";
import {
  AddCircle,
  CalendarToday,
  ExpandMore,
  Label,
  Person,
  Security
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getApiUrl } from "../api";
import { getPaymentMethods } from "../backend";
import CardTypeIcon from "./CardTypeIcon";

// eslint-disable-next-line no-unused-expressions
FORCE_IMPORT_POLYFILL;
const Map = /** @type {MapConstructor} */(window.Map);

/**
 * @import { PaymentMethod } from "../models/PaymentMethod";
 */

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

/**
 * @typedef PaymentMethodsViewProps
 * @property {string} selectedPaymentMethod
 * @property {((value: string) => any)=} onSelectedPaymentMethodChange
 */

/**
 * @param {PaymentMethodsViewProps} props
 */

export default function PaymentMethodsView(props) {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const [paymentMethods, setPaymentMethods]
    = useState(/** @type {Map<PaymentMethod["$type"], PaymentMethod[]> | null} */(null));

  useEffect(() => {
    (async function () {
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
    if (props.selectedPaymentMethod && allMethods.has(props.selectedPaymentMethod)) {
      return;
    }
    const p = searchParams.get("paymentMethod");
    if (p && allMethods.has(p)) {
      setSearchParams((params) => {
        params.delete("paymentMethod");
        return params;
      });
      props.onSelectedPaymentMethodChange?.apply(this, [p]);
    } else {
      const firstKey = Array.from(paymentMethods.keys()).sort(comparePaymentMethodType)[0];
      const firstMethod = paymentMethods.get(firstKey)?.at(0);
      if (firstMethod) {
        props.onSelectedPaymentMethodChange?.apply(this, [firstMethod.id]);
      }
    }
  }, [
      paymentMethods,
      props.selectedPaymentMethod, props.onSelectedPaymentMethodChange,
      searchParams, setSearchParams
  ]);

  const [isAddingCardUserRequested, setIsAddingCardUserRequested] = useState(false);

  return (
    <Stack spacing={5}>
      {paymentMethods ? (paymentMethods.size ? (
        <RadioGroup
          value={props.selectedPaymentMethod}
          onChange={(e) => props.onSelectedPaymentMethodChange?.apply(this, [e.target.value])}
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
                    expandIcon={<ExpandMore />}
                  >
                    <Typography>{formatPaymentMethodType(type)}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      {methods.map((p) => (
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
                                    iconProps={{ style: { minWidth: "3rem" } }} />
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
                                sx={{
                                  ...(!props.onSelectedPaymentMethodChange && {
                                    visibility: "hidden"
                                  })
                                }}
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
        startIcon={<AddCircle fontSize="large" />}
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
          <AddCardForm isAddingCardUserRequested={isAddingCardUserRequested} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

/**
 * @typedef AddCardFormProps
 * @property {boolean} isAddingCardUserRequested
 */

/**
 * @param {AddCardFormProps} props
 */

function AddCardForm(props) {
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

    let url = new URL(window.location.href);

    if (!props.isAddingCardUserRequested) {
      const returnInParams = url.searchParams.get("returnUrl");
      if (returnInParams) {
        url = new URL(returnInParams);
      }
    }

    url.searchParams.delete("isAddingCard");

    setReturnUrl(url.toString());
  }, [searchParams, setSearchParams, props.isAddingCardUserRequested]);

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
                    <CardTypeIcon number={number} iconProps={{ style: { width: "24px" } }} />
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
