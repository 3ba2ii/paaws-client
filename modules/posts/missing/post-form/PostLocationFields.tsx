import { Heading, HStack, VStack } from '@chakra-ui/layout';
import { Button, MenuProps, SlideFade } from '@chakra-ui/react';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import { DropdownMenu } from 'components/input/DropdownMenu';
import React from 'react';
import { GoChevronRight } from 'react-icons/go';
import { PostInputType } from 'types';
import { SelectLocationObj } from 'utils/constants/enums';

interface PostLocFieldProps {
  values: PostInputType;
  isOpen: boolean;
  setFieldValue: (name: string, value: any) => void;
  setLocationOption: (value: any) => void;
}

export const PostLocationFields: React.FC<PostLocFieldProps> = ({
  values,
  setFieldValue,
  isOpen,
  setLocationOption,
}) => {
  return (
    <SlideFade in={isOpen} id='post-location-input-field'>
      <VStack>
        <InputFieldWrapper
          label='Location'
          name='location'
          helperText={`Select the location where you missed or found the pet,
                       Locations are used to send notifications and alerts to nearby users`}
          required={false}
        />

        <HStack w='100%' alignItems='center' spacing={2}>
          <DropdownMenu
            options={SelectLocationObj}
            menuButtonText={
              values.address != null ? 'Selected' : 'Select Location'
            }
            handleChange={(value) => {
              setLocationOption(value);
            }}
            menuOptionGroupProps={{ title: 'Select Method', opacity: '.5' }}
            menuButtonProps={{
              as: Button,
              size: 'sm',
              minW: '110px',
              height: '38px',
              rightIcon:
                values.address != null ? (
                  <Heading size='md'>🤝</Heading>
                ) : (
                  <GoChevronRight />
                ),
              boxShadow: 'base',
              colorScheme: values.address != null ? 'green' : 'gray',
              alignSelf: 'flex-start',
            }}
            menuProps={{ placement: 'right' } as MenuProps}
          />
          {values.address && (
            <Button
              onClick={() => setFieldValue('address', null)}
              variant='ghost'
              size='sm'
              height='38px'
              colorScheme={'red'}
            >
              Clear Location
            </Button>
          )}
        </HStack>
      </VStack>
    </SlideFade>
  );
};
