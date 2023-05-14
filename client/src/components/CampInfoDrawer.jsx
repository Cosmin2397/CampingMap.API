import React from 'react'
import { Drawer } from "@mui/material"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider'
import PhonelinkRingOutlinedIcon from '@mui/icons-material/PhonelinkRingOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';


export const CampInfoDrawer = ({ selectedCamp, drawerOpen, handleDrawerClose }) => {
  return (
    <div>
    <Drawer 
        anchor="right" 
        open={!!drawerOpen} 
        onClose={handleDrawerClose}
      >
       <Box sx={{ p: 3, width: 400 }}>
        <Typography gutterBottom variant="h5" component="h2" display="flex" justifyContent="space-between">
            { selectedCamp?.name }
            <CloseIcon onClick={handleDrawerClose} sx={{'cursor': 'pointer' }} color='primary'/>
        </Typography>
        <Rating name="camp-review" value={selectedCamp?.rating} readOnly precision={0.5} size="large" />

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Chip icon={<PhonelinkRingOutlinedIcon />} color='primary'  label={selectedCamp?.phoneNumber} /> 
            <Chip icon={<AttachMoneyOutlinedIcon />} color='primary' label={`${selectedCamp?.price} $/HOUR`} /> 
        </Stack>

        <Divider textAlign="left" sx={{ mb: 1 }}>Location</Divider>
        <Chip icon={<LocationOnIcon />} label={selectedCamp?.location?.adress} /> 

        <Divider textAlign="left" sx={{ my: 1 }}>Facilities</Divider>
        { selectedCamp?.facilities?.split(',')?.map(facility => (
            <Chip label={facility} sx={{ mr: 1 }} /> 
        )) }
    
        <Divider textAlign="left" sx={{ mt: 2 }}>Description</Divider>
        <Typography variant="body2" color="text.secondary">
        { selectedCamp?.description }
        </Typography>
       </Box>
      </Drawer>
    </div>
  )
}