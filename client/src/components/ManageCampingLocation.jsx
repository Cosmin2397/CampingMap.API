import React, { useState, useCallback, useRef } from 'react'
import Map, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl'
import { MapSearch } from './MapSearch'

export const ManageCampingLocation = ({
  location,
  setLocation,
  userSavedAddress,
}) => {
  const [viewport, setViewport] = useState({
    latitude: location?.latitude || 44.479360,
    longitude: location?.longitude || 26.140590,
    zoom: 8
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  const handleSelectedResult = useCallback(({ result }) => {
      setLocation({
        ...location,
        latitude: result?.geometry?.coordinates[1], 
        longitude: result?.geometry?.coordinates[0],
        adress: result?.place_name,
        city: result?.context[1]?.text,
        region: result?.context[2]?.text,
        county: result?.context[2]?.text
      })
    }, [location, setLocation])

  return (
    <div style={{ height: "400px" }}>
       <Map
            initialViewState={{...viewport}}
            mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={handleViewportChange}
            ref={mapRef}
        >
          <MapSearch 
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
            onViewportChange={handleGeocoderViewportChange}
            mapRef={mapRef}
            position="top-left"   
            countries="ro"
            minLength={4}
            onResult={handleSelectedResult}
            inputValue={userSavedAddress}
            placeholder="Search location"
          />
          <FullscreenControl />
          <GeolocateControl />
          <NavigationControl />
          <ScaleControl />
        </Map>
    </div>
  );
};