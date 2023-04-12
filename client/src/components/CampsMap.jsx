import React, { useState, useMemo, useEffect } from 'react'
import Map, { Marker, Popup, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl'
import MapPin from "./MapPin"
import { MapSearch } from './MapSearch'
import { useGetQuery } from '../hooks/useGetQuery'
import { Message } from './common/Message'
import { Loader } from './common/Loader'


import 'mapbox-gl/dist/mapbox-gl.css'


export const CampsMap = () => {
    const [selectedCamping, setSelectedCamping] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        zoom: 10
    });

    const {getRequest, data, loading, error} = useGetQuery('api/Campings')

    useEffect(() => {
      getRequest()
    }, [])

    const MapPins = useMemo(
      () =>
      data?.map(camping => (
        <Marker
          key={camping.id}
          latitude={camping.location.latitude}
          longitude={camping.location.longitude}
          onClick={e => {
            e.originalEvent.stopPropagation();
            setSelectedCamping(camping);
          }}
        >
          <MapPin />
        </Marker>
      )),
      []
    );

    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedCamping(null);
        }
      };
      window.addEventListener("keydown", listener);
  
      return () => {
        window.removeEventListener("keydown", listener);
      };
      }, []);
    
    const handleMapClick = (e) => {
      const features = e.features || [];
      console.log({features})
  
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

        {selectedCamping ? (
          <Popup
            latitude={selectedCamping.location.latitude}
            longitude={selectedCamping.location.longitude}
            onClose={() => {
              setSelectedCamping(null);
            }}
          >
            <div>
              <h2>{selectedCamping.name}</h2>
              <p>{selectedCamping.description}</p>
            </div>
          </Popup>
        ) : null}
        </Map>
    </div>
  )
}