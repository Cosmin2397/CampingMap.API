import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ManageCampingLocation } from './ManageCampingLocation';
import { FacilitiesSelect } from './FacilitiesSelect';

const steps = ['General info', 'Location', 'Facilities'];

export function ManageCampingForm({ columns, drawerOpen, formData, handleFormChange }) {
  const [activeStep, setActiveStep] = useState(0);
  const [location, setLocation] = useState({});



  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const FormFirstStep = () => {
    return (
      columns?.slice(0, 5)?.map(column => (
       <React.Fragment key={column.headerName}>
        { column.type === 'text' &&
            (
              <TextField
                key={column.field}
                label={column.headerName}
                name={column.field}
                value={drawerOpen === 'edit' ? formData[column.field] : ''}
                onChange={handleFormChange}
              />
            )
          }

          { column.type === 'time-picker' &&
            (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Start hour">
                  <MobileTimePicker defaultValue={dayjs('2023-04-01T08:30')} />
                </DemoItem>
                <DemoItem label="End hour">
                  <MobileTimePicker defaultValue={dayjs('2023-04-01T17:30')} />
                </DemoItem>
              </LocalizationProvider>
            )
          }
          </React.Fragment>
          
        ))
    )}
  
  const FormSecondStep = () => {
    return (
      columns?.map(column => (
        <React.Fragment key={column.headerName}>
          {  column.type === 'location' && 
            <ManageCampingLocation location={location} setLocation={setLocation} />
          }
      </React.Fragment>
      ))
    )
  }

  const FormThirdStep = () => {
    return (
      columns?.map(column => (
        <React.Fragment key={column.headerName}>
          {  column.type === 'multi-select' && 
            <FacilitiesSelect />
          }
      </React.Fragment>
      ))
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
    
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ mt: 2, mb: 1 }}>
             { activeStep === 0 && <FormFirstStep /> }
             { activeStep === 1 && <FormSecondStep /> }
             { activeStep === 2 && <FormThirdStep /> }
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}