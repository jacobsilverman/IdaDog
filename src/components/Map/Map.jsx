import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = ({ coordinates }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  };


  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
    >
      {/* <Marker position={center} icon={{url: havi}} width='50px' height='50px' /> */}
    </GoogleMap>
  );
};

export default Map;