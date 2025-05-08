// @ts-check

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button, CircularProgress, Stack, useTheme
} from '@mui/material';
import EventDetailsView from './EventDetailsView';
import { useAuth } from '../context/AuthContext';

/**
 * @import { CreateEventStepElementProps } from "../views/Organizer/CreateEventPage";
 * @import TicketOption from "../models/TicketOption";
 */

/**
 * @typedef {CreateEventStepElementProps} CreateEventReviewProps
 */

/**
 * @param {CreateEventReviewProps} props
 */
export default function CreateEventReview({ context, step }) {
  const theme = useTheme();
  const auth = useAuth();
  const [urlBlob, setUrlBlob] = useState(/** @type {string | null} */(null));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (context.step && context.get.bannerFile) {
      setUrlBlob(URL.createObjectURL(context.get.bannerFile.files[0]));
    } else {
      setUrlBlob(u => {
        if (u) {
          URL.revokeObjectURL(u);
        }
        return u;
      })
    }
  }, [context.step, context.get.bannerFile]);

  return (
    <Stack spacing={4}>
      {context.step === step && auth.role === "organizer" &&
        <Box
          sx={{
            padding: 4,
            borderStyle: "solid",
            borderRadius: "2rem"
          }}>
          {/* View based on synthesized event. */}
          <EventDetailsView
            event={{
              id: "",
              organizer: auth.organizer,
              name: context.get.name,
              description: context.get.description,
              startDate: context.get.startDate?.toISOString() || "",
              endDate: context.get.endDate?.toISOString() || "",
              bannerUri: context.get.bannerUri || urlBlob || undefined,
              location: context.get.location,
              price: context.get.price,
              interested: 0,
              categories: context.get.category
                .map(id => context.availableCategories?.find(c => c.id === id))
                .filter(c => !!c),
              ticketOptions: Array(context.get.ticketPrice.length).fill(0).map((_, index) =>
                /** @type {TicketOption} */({
                id: "",
                name: context.get.ticketName[index],
                additionalPrice: context.get.ticketPrice[index],
                amountAvailable: context.get.ticketCount[index]
              })
              ),
              savedEvent: undefined
            }}
            isPreview={true}
          />
        </Box>
      }

      {/* Navigation Buttons */}
      <Stack direction="row-reverse" spacing={2}>
        {!isSubmitting ? (
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ minWidth: "10rem" }}
            type="submit"
            disabled={isSubmitting}
            onClick={(e) => {
              setIsSubmitting(true);
              e.currentTarget.closest("form")?.requestSubmit();
            }}
          >
            Publish
          </Button>
        ) : (
          <Stack alignItems={"center"} sx={{ minWidth: "10rem" }}>
            <CircularProgress />
          </Stack>
        )}

        <Button
          variant="text"
          size="large"
          sx={{
            minWidth: "10rem",
            color: theme.palette.text.primary
          }}
          onClick={() => {
            setIsSubmitting(false);
            context.prev();
          }}
        >
          Go Back
        </Button>
      </Stack>
    </Stack>
  );
};
