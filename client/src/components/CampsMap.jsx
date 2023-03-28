import React, { useState, useMemo, useEffect } from 'react'
import Map, { Marker, Popup, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DATA } from "../data";
import MapPin from "./MapPin";
import { MapSearch } from './MapSearch';


export const CampsMap = () => {
    const [selectedPark, setSelectedPark] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        zoom: 10
    });

    const MapPins = useMemo(
      () =>
       DATA.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
          onClick={e => {
            e.originalEvent.stopPropagation();
            setSelectedPark(park);
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
            setSelectedPark(null);
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

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
        </Map>
    </div>
  )
}