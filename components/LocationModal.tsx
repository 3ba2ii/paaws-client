import { Divider, HStack, Text } from '@chakra-ui/react';
import { LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Libraries, LocationType } from 'types';
import { isProduction } from 'utils/isProduction';
import { MapLoadingComponent } from './common/location/MapLoadingComponent';
import GenericModal from './common/overlays/CustomModal';
import GoogleMapComponent from './GoogleMapComponent';

interface LocationModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  userLocation: LocationType;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  userLocation,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [libraries] = useState<Libraries>(['places']);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <HStack w='100%' align={'flex-start'} pb={3}>
            <Text>Location on Map</Text>
          </HStack>
          <Divider />
        </>
      }
      body={
        <LoadScript
          libraries={libraries}
          googleMapsApiKey={
            !isProduction ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY : ''
          }
          onLoad={() => setLoaded(true)}
          loadingElement={<MapLoadingComponent />}
        >
          <GoogleMapComponent location={userLocation}>
            <Marker
              position={userLocation}
              animation={loaded ? google.maps.Animation.DROP : undefined}
              draggable={false}
            />
          </GoogleMapComponent>
        </LoadScript>
      }
    />
  );
};
export default LocationModal;
