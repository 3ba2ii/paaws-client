import { Box, HStack } from '@chakra-ui/layout';
import { Button, ModalProps } from '@chakra-ui/react';
import CustomLocationPicker from 'components/location/CustomLocationPicker';
import GenericModal from 'components/overlays/CustomModal';
import ModalHeader from 'components/overlays/ModalHeader';
import React, { useState } from 'react';
import { LocationType } from 'types';
import { SelectLocationOptions } from 'utils/constants/enums';

export const LocationPickerModal: React.FC<{
  onClose: VoidFunction;
  onConfirm: (latLng: LocationType | null) => void;
  isOpen: boolean;
}> = ({ onClose, onConfirm, isOpen }) => {
  const [locationLatLng, setLocationLatLng] = useState<LocationType | null>(
    null
  );
  return (
    <GenericModal
      title={
        <ModalHeader
          title='Select Location'
          subtitle='Select the location where you missed or found the pet on map, Locations
are used to send notifications and alerts to nearby users'
        />
      }
      footer={
        <HStack alignItems='flex-start'>
          <Button h='38px' mr={3} variant='ghost' size='sm' onClick={onClose}>
            Cancel
          </Button>
          <Button
            h='38px'
            w={'100%'}
            colorScheme='teal'
            size='sm'
            onClick={() => {
              onConfirm(locationLatLng);
            }}
          >
            Confirm Address
          </Button>
        </HStack>
      }
      modalProps={{ size: 'xl' } as ModalProps}
      modalHeaderProps={{
        display: 'flex',
        alignContent: 'flex-start',
      }}
      body={
        <Box
          w='100%'
          h='450px'
          position={'relative'}
          borderRadius='6px'
          overflow={'hidden'}
          boxShadow={'md'}
        >
          <CustomLocationPicker
            includeMarker
            selectLocationType={SelectLocationOptions.MAP}
            handleLocationChange={(coords) => {
              setLocationLatLng(coords);
            }}
          />
        </Box>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
