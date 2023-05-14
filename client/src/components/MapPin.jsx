import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MapPin = ({size = 20}) => {
  return (
    <LocationOnIcon color='primary' fontSize='large'/>
  );
}

export default React.memo(MapPin);