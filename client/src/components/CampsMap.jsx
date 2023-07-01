import React, { useState, useMemo, useEffect } from 'react'
import Map, { Marker, Popup, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import MapPin from "./MapPin"
import { MapSearch } from './MapSearch'
import { Message } from './common/Message'
import { Loader } from './common/Loader'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import Chip from '@mui/material/Chip'
import LocationOnIcon from '@mui/icons-material/LocationOn'


import 'mapbox-gl/dist/mapbox-gl.css'
import '../style/CampsMap.scss'


//Solution for react-map-gl issue on deployed version: https://github.com/visgl/react-map-gl/issues/1266
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


export const CampsMap = ({ 
  camps, 
  loading,
  error, 
  handleOpenReviewModal, 
  selectedCamp, 
  setSelectedCamp,
  handleOpenCampDrawer,
  authUser,
  addReviewAllowed
}) => {
    const [viewport, setViewport] = useState({
        latitude: 47.13,
        longitude: 27.57,
        zoom: 6
    });

    const MapPins = useMemo(
      () =>
      camps?.map(camping => (
        <Marker
          key={camping.id}
          latitude={camping?.location?.latitude}
          longitude={camping?.location?.longitude}
          onClick={e => {
            e.originalEvent.stopPropagation();
            setSelectedCamp(camping);
          }}
        >
          <MapPin />
        </Marker>
      )),
      [camps]
    );

    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedCamp(null);
        }
      };
      window.addEventListener("keydown", listener);
  
      return () => {
        window.removeEventListener("keydown", listener);
      };
      }, []);
    
    const handleMapClick = (e) => {
      const features = e.features || [];
      // if (features.length > 0) {
      //   setPopupInfo({
      //     lngLat: features[0].geometry.coordinates,
      //     text: features[0].properties.title,
      //   });
      // }
    };


  return (
    <div>
      <Message 
        showMessage={error} 
        type="error" 
        message="Locatiile nu au putut fi incarcate!" 
      />
      { loading && <Loader /> }
      
        <Map
            initialViewState={{...viewport}}
            style={{width: "100vw", height: "100vh"}}
            mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            onClick={handleMapClick}

        >
          <MapSearch mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} position="top-left"/>
          <FullscreenControl />
          <GeolocateControl />
          <NavigationControl />
          <ScaleControl />
          
          { MapPins }

        {selectedCamp ? (
          <Popup
            latitude={selectedCamp?.location?.latitude}
            longitude={selectedCamp?.location?.longitude}
            onClose={() => {
              setSelectedCamp(null);
            }}
            className='pointer-popup'
          >
            <div>
              <h2>{selectedCamp?.name}</h2>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Rating name="camp-review" value={selectedCamp?.rating} readOnly />({selectedCamp?.reviews?.length})
              </Stack>
              <Chip icon={<LocationOnIcon />} label={selectedCamp?.location?.adress} /> 
            </div>
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            { authUser?.isAuthenticated && addReviewAllowed(selectedCamp?.reviews) ?
              <Button 
                size="small" 
                variant="text" 
                color="secondary" 
                onClick={() => handleOpenReviewModal(selectedCamp)}
              >Add review</Button> : '' 
            }
              <Button size="small" variant="contained" onClick={() => handleOpenCampDrawer(selectedCamp)}>View more</Button>
            </Stack>
          </Popup>
        ) : null}
        </Map>
    </div>
  )
}