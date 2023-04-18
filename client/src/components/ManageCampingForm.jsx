import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ManageCampingLocation } from './ManageCampingLocation';
import { FacilitiesSelect } from './FacilitiesSelect';
import { usePostQuery } from '../hooks/usePostQuery'
import { Message } from './common/Message'

const steps = ['General info', 'Location', 'Facilities'];

export function ManageCampingForm({ data, type }) {
  const [activeStep, setActiveStep] = useState(0)
  const [ defaultFormData, setDefaultFormData] = useState()
  const [formData, setFormData] = useState({
    name: defaultFormData?.name
  })
  const [openingHours, setOpeningHours] = useState({})
  const [location, setLocation] = useState({})
  const [campingFacilities, setCampingFacilities] = useState([])

  const updatedCampingData = {
    ...formData,
    openingHours: `${dayjs(openingHours?.start).locale('en').format('h:mm A')} - ${dayjs(openingHours?.end).locale('en').format('h:mm A')}`,
    location,
    facilities: String(campingFacilities)

  }
  const  {postRequest, response: responseAdd,  error: errorAdd } = usePostQuery(
    `api/Campings`, 
    updatedCampingData
  )

  useEffect(() => {
    setDefaultFormData(data)
  }, [data])

  useEffect(() => {
    if(!!responseAdd) {
      setFormData(null)
      setOpeningHours(null)
      setLocation(null)
      setCampingFacilities([])

    }
  }, [responseAdd])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleStartHour = (value) => {
    setOpeningHours(prevState => ({
      ...prevState,
      start: value,
    }));
  };
  
  const handleEndHour = (value) => {
    setOpeningHours(prevState => ({
      ...prevState,
      end: value,
    }));
  };

  const handleFormSubmit = () => {
    if(type === 'add') {
      postRequest()
    }
  }

  const RequestMessage = () => {
   return (
    !!responseAdd && !!formData ?   
      <Message 
        showMessage={responseAdd} 
        type="success" 
        message={`Camping was successfully ${type === 'add' ? 'added' : 'edited'}.`}
      />
      :
      (
        <Message 
          showMessage={errorAdd} 
          type="error" 
          message={`Camping could not be ${type === 'add' ? 'added' : 'edited'}.`} 
        />
      )
   )
  }

  const FormFirstStep = () => {
    return (
     <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, paddingBottom: '20px' }}>
      <TextField
          key="name"
          label="Name"
          name="name"
          // defaultValue={defaultFormData?.name}
          value={formData?.name}
          onChange={handleFormChange}
        />
        <TextField
          key="description"
          label="Description"
          name="description"
          value={formData?.description}
          onChange={handleFormChange}
        />
        <TextField
          key="phoneNumber"
          label="Phone"
          name="phoneNumber"
          value={formData?.phoneNumber}
          onChange={handleFormChange}
        />
        <TextField
          key="price"
          label="Price"
          name="price"
          type="number"
          value={formData?.price ?? data?.price}
          onChange={handleFormChange}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, paddingBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>  
          <MobileTimePicker 
              label="Opening hour start"
              name="start"
              // value={dayjs(openingHours?.end) ?? dayjs(data?.openingHours?.split('-')[1])}
              value={openingHours?.start}
              closeOnSelect={false}
              onAccept={handleStartHour}
          />   
          <MobileTimePicker 
            label="Opening hour end"
            name="end"
            // value={dayjs(openingHours?.end) ?? dayjs(data?.openingHours?.split('-')[1])}
            value={openingHours?.end}
            closeOnSelect={false}
            onAccept={handleEndHour}
          />
        </LocalizationProvider>
      </Box>
     </>
    )}
  
  const FormSecondStep = () => {
    return (
      <ManageCampingLocation location={location} setLocation={setLocation} />
    )
  }

  const FormThirdStep = () => {
    return (
      <FacilitiesSelect 
        campingFacilities={campingFacilities}
        setCampingFacilities={setCampingFacilities} 
      />
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <RequestMessage />
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
      <>
        <Box sx={{ mt: 2, mb: 1 }}>
            { activeStep === 0 && FormFirstStep() }
            { activeStep === 1 && FormSecondStep() }
            { activeStep === 2 && FormThirdStep() }
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

          { activeStep !== steps.length - 1 ?
            <Button variant="outlined" onClick={handleNext}>Next</Button>
            :
            <Button variant="contained" onClick={handleFormSubmit}>Save</Button>
          }
        </Box>
      </>
    </Box>
  );
}