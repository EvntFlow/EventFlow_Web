// @ts-check

import {
  Box,
  Button, CircularProgress,
  FormControl,
  FormControlLabel, Grid,
  MenuItem,
  Radio,
  RadioGroup, Stack, TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import CategorySelect from './CategorySelect';
import GoogleMapsFrame from './GoogleMapsFrame';

/**
 * @import {
 *  CreateEventModelContext,
 *  CreateEventStepElementProps
 * } from "../views/Organizer/CreateEventPage";
 * @import Category from "../models/Category";
 */

/**
 * @typedef {CreateEventStepElementProps} CreateEventDetailsProps
 */

/**
 * @param {CreateEventDetailsProps} props
 */
export default function CreateEventDetails({ context, step }) {
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);

  return (
    <Stack spacing={8}>

      {/* Event Details Section */}
      <Stack spacing={3}>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2} />
          <Grid size={10}>
            <Typography variant="h4">Event Details</Typography>
          </Grid>
        </Grid>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2}>
            <Stack direction="row-reverse" alignItems="center" height="100%">
              <Typography variant="h6" textAlign="right">
                Event Title<RequiredLabel>*</RequiredLabel>
              </Typography>
            </Stack>
          </Grid>
          <Grid size={10}>
            <TextField
              fullWidth={true}
              required={context.step >= step}
              name="name"
              value={context.get.name}
              onChange={(e) => context.set.name(e.target.value)}
              placeholder="Enter the name of your event"
              variant="outlined"
              size="medium"
            />
          </Grid>
        </Grid>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2}>
            <Stack direction="row-reverse" alignItems="center" height="100%">
              <Typography variant="h6" textAlign="right">
                Event Category<RequiredLabel>*</RequiredLabel>
              </Typography>
            </Stack>
          </Grid>
          <Grid size={10}>
            <CategorySelect
              categories={context.availableCategories}
              required={context.step >= step}
              value={context.get.category}
              onChange={(e) => context.set.category(
                Array.isArray(e.target.value) ? e.target.value : [e.target.value]
              )}
              placeholder="Please select one or more"
              sx={{ width: "100%" }}
            >
              {context.availableCategories ? (
                context.availableCategories.map((c) => (
                  <MenuItem key={c.name} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))
              ) : (
                <Stack alignItems="center" sx={{ width: "100%" }}>
                  <CircularProgress />
                </Stack>
              )}
            </CategorySelect>
          </Grid>
        </Grid>
      </Stack>

      {/* Date & Time Section */}
      <Stack spacing={3}>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2} />
          <Grid size={10}>
            <Typography variant="h4">Date & Time</Typography>
          </Grid>
        </Grid>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2}>
            <Stack direction="row-reverse" alignItems="center" height="100%">
              <Typography variant="h6" textAlign="right">
                Event Type<RequiredLabel>*</RequiredLabel>
              </Typography>
            </Stack>
          </Grid>
          <Grid size={10}>
            <FormControl>
              <RadioGroup defaultValue="false" defaultChecked={true}>
                <Stack direction="row" spacing={4}>
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Single Event"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio disabled={true} />}
                    label="Recurring Event"
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2}>
            <Stack direction="row-reverse" alignItems="center" height="100%">
              <Typography variant="h6" textAlign="right">
                Session(s)<RequiredLabel>*</RequiredLabel>
              </Typography>
            </Stack>
          </Grid>
          <Grid size={10}>
            <Stack direction="row" spacing={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disablePast
                  label="Start Date"
                  value={context.get.startDate ? dayjs(context.get.startDate) : null}
                  onChange={(value) => { context.set.startDate(value?.toDate() ?? null) }}
                  format="DD/MM/YYYY HH:mm"
                  ampm={false}
                  slotProps={{
                    field: { openPickerButtonPosition: "start" },
                    textField: {
                      required: context.step >= step
                    }
                  }}
                />

                <DateTimePicker
                  disablePast
                  label="End Date"
                  value={context.get.endDate ? dayjs(context.get.endDate) : null}
                  minDateTime={context.get.startDate ? dayjs(context.get.startDate) : dayjs()}
                  onChange={(value) => { context.set.endDate(value?.toDate() ?? null) }}
                  format="DD/MM/YYYY HH:mm"
                  ampm={false}
                  slotProps={{
                    field: { openPickerButtonPosition: "start" },
                    textField: {
                      required: context.step >= step
                    }
                  }}
                />
              </LocalizationProvider>

              <Box display="none">
                <input
                  name="startDate"
                  value={context.get.startDate?.toISOString() || ""}
                  required={context.step >= step}
                  hidden={true}
                  readOnly={true}
                />
                <input
                  name="endDate"
                  value={context.get.endDate?.toISOString() || ""}
                  required={context.step >= step}
                  hidden={true}
                  readOnly={true}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>


      {/* Location Section */}
      <Stack spacing={3}>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2} />
          <Grid size={10}>
            <Typography variant="h4">Location</Typography>
          </Grid>
        </Grid>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2}>
            <Stack direction="row-reverse" alignItems="center" height="100%">
              <Typography variant="h6" alignSelf="start">
                <RequiredLabel>*</RequiredLabel>
              </Typography>
              <Typography variant="h6" textAlign="right">
                Is your event online?
              </Typography>
            </Stack>
          </Grid>
          <Grid size={10}>
            <RadioGroup
              value={`${isOnlineEvent}`}
              defaultChecked={true}
              onChange={(e) => {
                if (e.target.value === "false") {
                  context.set.location("");
                  setIsOnlineEvent(false);
                } else {
                  context.set.location("Online");
                  setIsOnlineEvent(true);
                }
              }}
            >
              <Stack direction="row" spacing={4}>
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
              </Stack>
            </RadioGroup>
          </Grid>
        </Grid>

        <Box display={isOnlineEvent ? "none" : "block"}>
          <Grid container={true} size={12} spacing={3}>
            <Grid size={2}>
              <Stack direction="row-reverse" alignItems="center" height="100%">
                <Typography variant="h6" alignSelf="start">
                  <RequiredLabel>*</RequiredLabel>
                </Typography>
                <Typography variant="h6" textAlign="right">
                  Where will your event take place?
                </Typography>
              </Stack>
            </Grid>
            <Grid size={10}>
              <TextField
                fullWidth={true}
                required={context.step >= step}
                name="location"
                value={context.get.location}
                onChange={(e) => context.set.location(e.target.value)}
                placeholder="Enter a location"
                variant="outlined"
                size="medium"
              />
            </Grid>
          </Grid>
        </Box>

        {!isOnlineEvent && context.get.location &&
          <Grid container={true} size={12} spacing={3}>
            <Grid size={2} />
            <Grid size={10}>
              <GoogleMapsFrame
                query={context.get.location}
                sx={{ minHeight: "30rem", width: "100%" }}
              />
            </Grid>
          </Grid>
        }
      </Stack>


      {/* Additional Information Section */}
      <Stack spacing={3}>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2} />
          <Grid size={10}>
            <Typography variant="h4">Additional Information</Typography>
          </Grid>
        </Grid>
        <Grid container={true} size={12} spacing={3}>
          <Grid size={2}>
            <Stack direction="row-reverse" alignItems="start" height="100%">
              <Typography variant="h6" textAlign="right">
                Event Description<RequiredLabel>*</RequiredLabel>
              </Typography>
            </Stack>
          </Grid>
          <Grid size={10}>
            <TextField
              fullWidth={true}
              required={context.step >= step}
              multiline={true}
              minRows={8}
              name="description"
              value={context.get.description}
              onChange={(e) => context.set.description(e.target.value)}
              placeholder="Describe what's special about your event & other important details."
              variant="outlined"
              size="medium"
            />
          </Grid>
        </Grid>
      </Stack>

      {/* Submit Button */}
      <Stack direction="row-reverse">
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
      </Stack>
    </Stack>
  );
};

const RequiredLabel = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: theme.spacing(0.5)
}));
