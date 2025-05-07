// @ts-check

import React from 'react';
import {
  Button, Stack, useTheme
} from '@mui/material';

/**
 * @import { CreateEventStepElementProps } from "../views/Organizer/CreateEventPage";
 */

/**
 * @typedef {CreateEventStepElementProps} CreateEventReviewProps
 */

/**
 * @param {CreateEventReviewProps} props
 */
export default function CreateEventReview({ context, step }) {
  const theme = useTheme();

  return (
    <Stack spacing={4}>
      {/* Navigation Buttons */}
      <Stack direction="row-reverse" spacing={2}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{ minWidth: "10rem" }}
          type="submit"
        >
          Publish
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
