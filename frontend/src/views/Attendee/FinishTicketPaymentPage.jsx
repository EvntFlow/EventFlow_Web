// @ts-check

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getApiUrl } from "../../api";
import Authorized from "../../components/Authorized";
import PaymentMethodsView from "../../components/PaymentMethodsView";

export default function FinishTicketPayment() {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  return (
    <Grid container={true} size={12} sx={{ p: 6, py: 8 }} spacing={8}>
      <Authorized role="attendee" />
      <Grid size={7}>
        <Stack spacing={5}>
          <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
            Payment Methods
          </Typography>
          <PaymentMethodsView
            selectedPaymentMethod={selectedPaymentMethod}
            onSelectedPaymentMethodChange={(value) => setSelectedPaymentMethod(value)}
          />
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
                disabled={!selectedPaymentMethod}
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
