import React, { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ManageCampingLocation } from './ManageCampingLocation';
import { FacilitiesSelect } from './FacilitiesSelect';
import { usePostQuery } from '../hooks/usePostQuery'
import { usePutQuery } from '../hooks/usePutQuery'
import { Message } from './common/Message'
import { ImageUploader } from './ImageUploader';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FormSkeleton } from './global/skeleton/FormSkeleton';

const steps = ['General info', 'Location', 'Facilities & images'];

export function ManageCampingForm({ data, type, loadingCamping }) {
  const [formData, setFormData] = useState(data)
 

  const [openingHours, setOpeningHours] = useState({ 
    start: null, 
    end: null,
  })
  const [location, setLocation] = useState(data?.location)
  const [campingFacilities, setCampingFacilities] = useState(data?.facilities)

  useEffect(() => {
    setCampingFacilities(data?.facilities)
  }, [data?.facilities])

  useEffect(() => {
    setFormData(data)
  }, [data])

  //Search query params function
  const useQuery = () => {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const navigate = useNavigate()
  const { id } = useParams()
  const query = useQuery()
  const selectedStep = query.get("selectedStep")

  const [activeStep, setActiveStep] = useState(Number(selectedStep) || 0)

  const updatedCampingData = {
    ...formData,
    openingHours: `${ openingHours?.start ? dayjs(openingHours?.start) : data?.openingHours?.split('-')[0]}-${openingHours?.end ? dayjs(openingHours?.end) :  data?.openingHours?.split('-')[1]}`,
    location,
    facilities: String(campingFacilities)

  }

  const  {postRequest, response: responseAdd, loading: loadingAdd, error: errorAdd } = usePostQuery(
    `Campings`, 
    updatedCampingData
  )

  const  {putRequest, response: responseEdit,  error: errorEdit } = usePutQuery(
    `Campings/${id}`, 
    updatedCampingData
  )

  if(responseEdit || responseAdd) {
    setTimeout(() => {
        navigate('/dashboard')
    }, 3000)
}

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
    } else {
      putRequest()
    }
  }

  const AddRequestMessage = () => {
   return (
    !!responseAdd && !!formData && !loadingAdd ? 
      <Message 
        showMessage={responseAdd} 
        type="success" 
        message={`Camping was successfully added.`}
      />
      :
      (
        <Message 
          showMessage={errorAdd} 
          type="error" 
          message={`Camping could not be added.`} 
        />
      )
   )
  }

  const EditRequestMessage = () => {
    return (
     !!responseEdit && !!formData ?   
       <Message 
         showMessage={responseEdit} 
         type="success" 
         message={`Camping was successfully edit.`}
       />
       :
       (
         <Message 
           showMessage={errorEdit} 
           type="error" 
           message={`Camping could not be edited.`} 
         />
       )
    )
   }

  const FormFirstStep = () => {
    return (
      loadingCamping ? 
      <FormSkeleton />
       :
      (
        <>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, paddingBottom: '20px' }}>
        <TextField
            key="name"
            label="Name"
            name="name"
            value={formData?.name ?? data?.name}
            onChange={handleFormChange}
          />
          <TextField
            key="description"
            label="Description"
            name="description"
            value={formData?.description ?? data?.description}
            onChange={handleFormChange}
          />
          <TextField
            key="phoneNumber"
            label="Phone"
            name="phoneNumber"
            value={formData?.phoneNumber ?? data?.phoneNumber}
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
                defaultValue={dayjs(formData?.openingHours?.split('-')[0] ?? data?.openingHours?.split('-')[0])}
                closeOnSelect={false}
                onAccept={handleStartHour}
            />   
            <MobileTimePicker 
              label="Opening hour end"
              name="end"
              defaultValue={dayjs(formData?.openingHours?.split('-')[1] ?? data?.openingHours?.split('-')[1])}
              closeOnSelect={false}
              onAccept={handleEndHour}
            />
          </LocalizationProvider>
        </Box>
       </>
      )
    )}
  
  const FormSecondStep = () => {
    return (
      <ManageCampingLocation location={location} setLocation={setLocation} userSavedAddress={location?.adress} />
    )
  }

  const FormThirdStep = () => {
    return (
      <Grid container spacing={8}>
        <Grid item md={6} xs={12}>
          <FacilitiesSelect 
            campingFacilities={campingFacilities}
            setCampingFacilities={setCampingFacilities} 
          />
        </Grid>
        <Grid item md={6} xs={12}>
          { type === 'edit' ? 
            <ImageUploader 
              campingId={id ?? responseAdd?.id} 
              campingImages={data?.photos} 
            /> : '' 
          }
        </Grid>
      </Grid>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AddRequestMessage />
      <EditRequestMessage />
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