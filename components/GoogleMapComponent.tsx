import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import React from 'react';
import { LocationType } from 'types';

interface IGoogleMapProps {
  location: LocationType;
  googleMapProps?: GoogleMapProps;
  children?: React.ReactNode;
}

const GoogleMapComponent: React.FC<IGoogleMapProps> = ({
  location,
  googleMapProps,
  children,
}) => (
  <GoogleMap
    mapContainerStyle={{ width: '100%', height: '100%' }}
    center={location}
    zoom={17}
    {...googleMapProps}
  >
    {children}
  </GoogleMap>
);

export default React.memo(GoogleMapComponent);
