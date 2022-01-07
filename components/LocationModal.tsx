import {
  Box,
  Divider,
  Heading,
  HStack,
  ModalProps,
  Text,
} from '@chakra-ui/react';
import {
  Circle,
  GoogleMapProps,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import React, { useState } from 'react';
import { Libraries, LocationType } from 'types';
import { isProduction } from 'utils/isProduction';
import { MapLoadingComponent } from './common/location/MapLoadingComponent';
import GenericModal from './common/overlays/CustomModal';
import GoogleMapComponent from './GoogleMapComponent';

interface LocationModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  location: LocationType;
  googleMapProps?: GoogleMapProps;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  location,
  googleMapProps,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [libraries] = useState<Libraries>(['places']);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      modalProps={{ size: 'xl' } as ModalProps}
      modalContentProps={{
        width: '100%',
        css: { aspectRatio: '4/5' },
      }}
      modalBodyProps={{
        width: '100%',
      }}
      title={
        <Box
          align={'flex-start'}
          justify={'flex-start'}
          textAlign={'start'}
          pt={4}
        >
          <HStack w='100%' align={'flex-start'} mb={2}>
            <Heading size='md'>🗺 Location on Map</Heading>
          </HStack>
          <Text textStyle='p1' fontSize='.825rem' maxW={'60ch'} mb={3}>
            The pet was missed or found around the red marked location on the
            map below, If you got any information that might help, Please
            contact the owner of the pet.
          </Text>
          <Divider />
        </Box>
      }
      body={
        <LoadScript
          libraries={libraries}
          googleMapsApiKey={
            !isProduction ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY : ''
          }
          onLoad={() => setLoaded(true)}
          loadingElement={<MapLoadingComponent />}
          onUnmount={() => setLoaded(false)}
        >
          <GoogleMapComponent
            location={location}
            googleMapProps={{
              ...googleMapProps,
              mapContainerStyle: { width: '100%', height: '100%' },
            }}
          >
            <Marker
              position={location}
              animation={loaded ? google.maps.Animation.DROP : undefined}
              draggable={false}
            />
            <Circle
              center={location}
              radius={50}
              options={{
                fillColor: 'red',
                strokeColor: 'red',
                strokeWeight: 1,
              }}
            />
          </GoogleMapComponent>
        </LoadScript>
      }
      footer={<div></div>}
    />
  );
};
