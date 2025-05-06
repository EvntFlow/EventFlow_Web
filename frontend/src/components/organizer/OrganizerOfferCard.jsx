// @ts-check

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid, Button,
  Stack,
  Link
} from '@mui/material';
import { ArrowForward, ConfirmationNumberOutlined, InsertChartOutlined, MonetizationOnOutlined, OndemandVideo } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OrganizerOfferCard = () => {
  return (
    <Card
      sx={{
        mx: 'auto',    // center horizontally
        p: { xs: 2, md: 4 },
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: grey[100]
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {/* Section Title */}
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Our offers
          </Typography>

          {/* Offers Grid */}
          <Grid container spacing={4} justifyContent="center">
            {/* Offer 1 */}
            <Grid size={2}>
              <Stack alignItems="center" spacing={2}>
                <ConfirmationNumberOutlined
                  fontSize="large"
                  sx={{ width: "3rem", height: "3rem" }} />
                <Link
                  typography={"h6"}
                  sx={{ color: "inherit", textDecorationLine: "underline" }}
                  fontWeight="bold"
                  textAlign="center"
                  href="#"
                >
                  Event Ticketing
                </Link>
              </Stack>
              {/* Description */}
              {/* <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mt: 1 }}
                >
                  Lorem Ipsum is simply dummy text of the printing
                  and typeset industry. Lorem Ipsum has been lorem...
                </Typography> */}
            </Grid>

            {/* Offer 2 */}
            <Grid size={2}>
              <Stack alignItems="center" spacing={2}>
                <OndemandVideo
                  fontSize="large"
                  sx={{ width: "3rem", height: "3rem" }} />
                <Link
                  typography={"h6"}
                  sx={{ color: "inherit", textDecorationLine: "underline" }}
                  fontWeight="bold"
                  textAlign="center"
                  href="#"
                >
                  EventFlow Ads
                </Link>
              </Stack>
            </Grid>

            {/* Offer 3 */}
            <Grid size={2}>
              <Stack alignItems="center" spacing={2}>
                <MonetizationOnOutlined
                  fontSize="large"
                  sx={{ width: "3rem", height: "3rem" }} />
                <Link
                  typography={"h6"}
                  sx={{ color: "inherit", textDecorationLine: "underline" }}
                  fontWeight="bold"
                  textAlign="center"
                  href="#"
                >
                  Payments
                </Link>
              </Stack>
            </Grid>

            {/* Offer 4 */}
            <Grid size={2}>
              <Stack alignItems="center" spacing={2}>
                <InsertChartOutlined
                  fontSize="large"
                  sx={{ width: "3rem", height: "3rem" }} />
                <Link
                  typography={"h6"}
                  sx={{ color: "inherit", textDecorationLine: "underline" }}
                  fontWeight="bold"
                  textAlign="center"
                  href="#"
                >
                  Reporting & Analytics
                </Link>
              </Stack>
            </Grid>
          </Grid>

          {/* Join Button */}
          <Stack alignItems="center">
            <Button
              href="/Event/Create"
              variant="outlined"
              style={{ borderRadius: 25 }}
              endIcon={<ArrowForward />}
              size="large"
            >
              Join us now
            </Button>
          </Stack>

        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrganizerOfferCard;
