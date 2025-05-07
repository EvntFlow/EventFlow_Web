// @ts-check

import React from 'react';
import {
  Step,
  StepLabel, styled,
  Stepper,
  Box,
  useTheme,
  Stack
} from '@mui/material';
import { Check } from '@mui/icons-material';

/**
 * @import { CreateEventStep } from "../views/Organizer/CreateEventPage";
 */

/**
 * @typedef CreateEventStepperProps
 * @property {number} activeStep
 * @property {CreateEventStep[]} steps
 */

/**
 *
 * @param {CreateEventStepperProps} props
 */
export default function CreateEventStepper({ activeStep, steps }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={null}
      sx={{ width: "100%" }}
    >
      {steps.map((step, index) => (
        <Step key={step.name} completed={ activeStep > index } sx={{ px: 0 }}>
          <CreateEventStepLabel index={index} activeIndex={activeStep} step={step} />
        </Step>
      ))}
    </Stepper>
  )
}

/**
 * @typedef CreateEventStepLabelProps
 * @property {number} index
 * @property {number} activeIndex
 * @property {CreateEventStep} step
 */

/**
 * @param {CreateEventStepLabelProps} props
 */
function CreateEventStepLabel({ index, activeIndex, step }) {
  const theme = useTheme();

  // Label styling
  const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    '& .MuiStepLabel-root': {
      width: "100%"
    },
    '& .MuiStepLabel-iconContainer': {
      width: "100%"
    },
    "& .MuiStepLabel-label": {
      fontSize: theme.typography.fontSize,
      ...(index <= activeIndex && {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.text.primary
      }),
      ...(index > activeIndex && {
        color: theme.palette.text.disabled
      }),
    }
  }));

  return (
    <StyledStepLabel
      slotProps={{
        stepIcon: {
          component: () =>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                width: "100%",
                borderColor: (index <= activeIndex) ?
                  theme.palette.text.primary : theme.palette.text.disabled
              }}
            >
              <Box sx={{
                width: "calc((100% - 1rem) / 2)",
                borderTopStyle: "solid",
                borderWidth: "medium",
                borderColor: "inherit"
              }} />
              <Box sx={{
                minHeight: "1rem",
                minWidth: "1rem",
                borderRadius: "100%",
                borderStyle: "solid",
                borderWidth: "thick",
                borderColor: "inherit"
              }} />
              <Box sx={{
                width: "calc((100% - 1rem) / 2)",
                borderTopStyle: "solid",
                borderWidth: "medium",
                borderColor: "inherit"
              }} />
            </Stack>
        }
      }}
    >
      {step.name}
    </StyledStepLabel>
  );
}

/**
 * @typedef CreateEventStepIconProps
 * @property {boolean} active
 * @property {boolean} completed
 */

/**
 * @param {CreateEventStepIconProps} props
 */

function CreateEventStepIcon(props) {
  const { active, completed } = props;

  // Custom step icon styling
  const CustomStepIcon = styled('div')(({ theme }) => ({
    backgroundColor: '#ffffff',
    border: `2px solid ${completed || active ? '#1e293b' : '#d1d5db'}`,
    color: completed || active ? '#ffffff' : '#d1d5db',
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(active && {
      backgroundColor: '#1e293b',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.15)',
    }),
    ...(completed && {
      backgroundColor: '#1e293b',
    }),
  }));

  return (
    <CustomStepIcon>
      {completed ? <Check style={{ fontSize: 12 }} /> : null}
    </CustomStepIcon>
  );
}
