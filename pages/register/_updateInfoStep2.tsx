import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import { MeQuery } from 'generated/graphql';
import React, { useEffect, useMemo, useState } from 'react';
import styles from 'styles/register.module.css';
import { isProduction } from 'utils/isProduction';

interface Step2Props {
  handleChange: (e: any, field: string) => void;
  userInfo: MeQuery | undefined;
}
type LocationType = {
  lat: number;
  lng: number;
};
declare type Libraries = (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[];

export const Step2: React.FC<Step2Props> = ({ handleChange, userInfo }) => {
  //const GoogleMapComponent = GoogleMap(handleChange);
  const [userLocation, setUserLocation] = useState<LocationType>({
    lat: 0,
    lng: 0,
  });
  const [loaded, setLoaded] = useState(false);
  const [autoCompleteRef, setAutoCompleteRef] = useState<any>(null);
  const [libraries] = useState<Libraries>(['places']);

  const updateUserLocation = ({
    latLng,
  }: {
    latLng: google.maps.LatLng | null;
  }): void => {
    if (!latLng) return;
    const currentCoords = {
      lat: latLng?.lat() || userLocation.lat,
      lng: latLng?.lng() || userLocation.lng,
    };
    setUserLocation(currentCoords);
    handleChange(currentCoords, 'location');
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(currentCoords);
        handleChange(currentCoords, 'location');
      });
    }
  }, []);
  const onLoad = (ref: google.maps.places.Autocomplete) => {
    setAutoCompleteRef(ref);
  };
  const onPlaceChanged = () => {
    if (autoCompleteRef !== null) {
      const location = autoCompleteRef?.getPlace()?.geometry
        ?.location as google.maps.LatLng;
      if (location) {
        updateUserLocation({ latLng: location });
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const GoogleMapComponent = useMemo(
    () => (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={userLocation}
        zoom={17}
        onClick={({ latLng }) => updateUserLocation({ latLng })}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          position={userLocation}
          animation={loaded ? google.maps.Animation.DROP : undefined}
          draggable={true}
          onDragEnd={({ latLng }) => {
            setUserLocation({
              lat: latLng?.lat() || userLocation.lat,
              lng: latLng?.lng() || userLocation.lng,
            });
          }}
        />

        {/* Auto Complete */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type='text'
            placeholder='Type your address'
            className={styles.autocomplete_input}
          />
        </Autocomplete>
      </GoogleMap>
    ),
    [userLocation, libraries]
  );
  return (
    <section
      className={styles['step-container'] + ' ' + styles['location-step']}
      style={{ height: '100%', width: '100%' }}
    >
      <LoadScript
        libraries={libraries}
        googleMapsApiKey={
          !isProduction ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY + '' : ''
        }
        onLoad={() => {
          setLoaded(true);
        }}
      >
        {GoogleMapComponent}
      </LoadScript>
    </section>
  );
};
