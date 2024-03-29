import { LoadScript, Marker } from '@react-google-maps/api';
import GoogleMapComponent from 'components/GoogleMapComponent';
import React, { useEffect, useMemo, useState } from 'react';
import { Libraries, LocationType } from 'types';
import { SelectLocationOptions } from 'utils/constants/enums';
import { isProduction } from 'utils/isProduction';
import { CustomLocationAutocomplete } from './LocationAutoComplete';
import { MapLoadingComponent } from './MapLoadingComponent';

interface CustomLocationPickerProps {
  includeAutoComplete?: boolean;
  handleLocationChange?: (coords: LocationType) => void;
  includeMarker?: boolean;
  selectLocationType?: SelectLocationOptions;
}
export const CustomLocationPicker: React.FC<CustomLocationPickerProps> = ({
  handleLocationChange,
  includeMarker,
  includeAutoComplete,
  selectLocationType = SelectLocationOptions.MAP,
}) => {
  const [userLocation, setUserLocation] = useState<LocationType>({
    lat: 0,
    lng: 0,
  });

  const [loaded, setLoaded] = useState(false);
  const [libraries] = useState<Libraries>(['places']);

  const onLocationChange = (latLng: google.maps.LatLng | null) => {
    //no google api support
    if (!latLng) return;
    const currentCoords = {
      lat: latLng?.lat() || userLocation.lat,
      lng: latLng?.lng() || userLocation.lng,
    };
    if (!currentCoords.lat || !currentCoords.lng) return;
    setUserLocation(currentCoords);
  };

  useEffect(() => {
    //this will be used on mounting to select user's current location

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(currentCoords);
      });
    }
  }, []);

  useEffect(() => {
    //this will be fired when location changes to update the referer
    handleLocationChange && handleLocationChange(userLocation);
  }, [handleLocationChange, userLocation]);

  const MapComponent = useMemo(
    () => (
      <GoogleMapComponent
        location={userLocation}
        googleMapProps={{
          onClick: ({ latLng }) => {
            onLocationChange(latLng);
          },
          mapContainerStyle: { width: '100%', height: '100%' },
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {includeMarker && (
            <Marker
              position={userLocation}
              animation={loaded ? google.maps.Animation.DROP : undefined}
              draggable={true}
              onDragEnd={({ latLng }) => {
                onLocationChange(latLng);
              }}
            />
          )}

          {/* Auto Complete */}
          {includeAutoComplete && (
            <CustomLocationAutocomplete onLocationChange={onLocationChange} />
          )}
        </>
      </GoogleMapComponent>
    ),
    [
      userLocation,
      includeAutoComplete,
      includeMarker,
      loaded,
      libraries,
      onLocationChange,
    ]
  );

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={
        !isProduction ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY : ''
      }
      onLoad={() => setLoaded(true)}
      onUnmount={() => setLoaded(false)}
      loadingElement={<MapLoadingComponent />}
    >
      {MapComponent}
    </LoadScript>
  );
};
export default CustomLocationPicker;
