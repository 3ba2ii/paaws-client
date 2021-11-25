import { Box, HStack, Text } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { AddressInput } from 'generated/graphql';
import React, { useEffect, useMemo, useState } from 'react';
import { Libraries, LocationType } from 'types';
import { Country, SelectLocationOptions } from 'utils/constants/enums';
import { isProduction } from 'utils/isProduction';
import GenericInputComponent from '../input/CustomInputComponent';
import SelectComponent from '../input/SelectFieldComponent';
import { CustomLocationAutocomplete } from './LocationAutoComplete';

interface CustomLocationPickerProps {
  includeAutoComplete?: boolean;
  handleLocationChange?: (coords: LocationType) => void;
  includeMarker?: boolean;
  selectLocationType?: SelectLocationOptions;
}

const bounceTransition = {
  y: {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeOut',
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: 'easeOut',
    repeatDelay: 0.8,
  },
};
const ballStyle = {
  display: 'block',
  background: 'transparent',
  fontSize: '2.5rem',
};
const MapLoadingComponent: React.FC = () => (
  <Box
    display={'block'}
    position={'absolute'}
    top='50%'
    left='50%'
    transform={'translate(-50%, -50%)'}
    textAlign='center'
  >
    <motion.span
      style={ballStyle}
      transition={bounceTransition}
      animate={{
        y: ['0%', '-100%'],
      }}
    >
      🌍
    </motion.span>
    <Text>Loading Google Maps for you...</Text>
  </Box>
);
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
  }, [handleLocationChange]);

  useEffect(() => {
    //this will be fired when location changes to update the referer
    handleLocationChange && handleLocationChange(userLocation);
  }, [handleLocationChange]);

  const GoogleMapComponent = useMemo(
    () => (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={userLocation}
        zoom={17}
        onClick={({ latLng }) => {
          onLocationChange(latLng);
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
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
      </GoogleMap>
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
  const AddressFormComponent = () => {
    const [address] = useState<Partial<AddressInput>>({
      city: null,
      country: null,
      street: null,
      state: null,
      zip: null,
      lat: undefined,
      lng: undefined,
    });
    /* 
      A. User needs to select address from the list
        1. Country
        2. State
        3. City
        4. Street
        5. Zip Code

      B. On user selects address from the list, the address will be validated with google api
        1. If the address is valid, the address will be updated in the state
        2. If the address is invalid, we will show an error for the user

    */
    return (
      <Formik initialValues={address} onSubmit={() => {}}>
        {({ setFieldValue }) => (
          <Form>
            <HStack w='100%'>
              <GenericInputComponent label='Country' name='country'>
                <Box w='100%'>
                  <SelectComponent
                    selectProps={{
                      placeholder: 'Country',
                      menuPlacement: 'top',
                    }}
                    options={Object.entries(Country).map(([key, value]) => ({
                      value: value,
                      label: key,
                    }))}
                    handleChange={(value) => {
                      setFieldValue('country', value?.label);
                    }}
                  />
                </Box>
              </GenericInputComponent>
              <GenericInputComponent label='State' name='state'>
                <Box w='100%'>
                  <SelectComponent
                    selectProps={{
                      placeholder: 'State',
                      menuPlacement: 'top',
                    }}
                    options={Object.entries(Country).map(([key, value]) => ({
                      value: value,
                      label: key,
                    }))}
                    handleChange={(value) => {
                      setFieldValue('state', value?.label);
                    }}
                  />
                </Box>
              </GenericInputComponent>
            </HStack>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={
        !isProduction ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY : ''
      }
      onLoad={() => {
        setLoaded(true);
      }}
      loadingElement={<MapLoadingComponent />}
    >
      {/* todo: we need to add custom address selection form */}
      {selectLocationType === SelectLocationOptions.MAP ? (
        GoogleMapComponent
      ) : (
        <AddressFormComponent />
      )}
    </LoadScript>
  );
};
export default CustomLocationPicker;