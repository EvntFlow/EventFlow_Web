import React from 'react';
import { 
  Stepper as MUIStepper, 
  Step, 
  StepLabel, 
  StepConnector, 
  styled 
} from '@mui/material';
import { Check } from '@mui/icons-material';

// Custom connector styling
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-root`]: {
    marginLeft: 8,
    marginRight: 8,
  },
  [`&.MuiStepConnector-active, &.MuiStepConnector-completed`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundColor: '#1e293b', // dark gray (similar to bg-gray-800)
    },
  },
  [`& .MuiStepConnector-line`]: {
    height: 2,
    border: 0,
    backgroundColor: '#d1d5db', // light gray (similar to bg-gray-300)
    borderRadius: 1,
  },
}));

// Custom step icon styling
const ColorlibStepIconRoot = styled('div')(({ theme, active, completed }) => ({
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

// Custom step icon
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot active={active} completed={completed} className={className}>
      {completed ? <Check style={{ fontSize: 12 }} /> : null}
    </ColorlibStepIconRoot>
  );
}

// Label styling
const StyledStepLabel = styled(StepLabel)(({ theme, active }) => ({
  "& .MuiStepLabel-label": {
    marginTop: 4,
    fontSize: 14,
    ...(active && {
      fontWeight: 500,
      color: '#1e293b', // dark gray (similar to text-gray-800)
    }),
    ...(!active && {
      color: '#6b7280', // medium gray (similar to text-gray-500)
    }),
  }
}));

const Stepper = ({ currentStep = 0 }) => {
  const steps = [
    { label: 'Edit', step: 0 },
    { label: 'Banner', step: 1 },
    { label: 'Ticketing', step: 2 },
    { label: 'Review', step: 3 }
  ];

  return (
    <MUIStepper
      activeStep={currentStep}
      alternativeLabel
      connector={<ColorlibConnector />}
      sx={{ width: '100%', my: 4 }}
    >
      {steps.map((step) => (
        <Step key={step.label} completed={currentStep > step.step}>
          <StyledStepLabel
            StepIconComponent={ColorlibStepIcon}
            active={currentStep === step.step}
          >
            {step.label}
          </StyledStepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};

export default Stepper;