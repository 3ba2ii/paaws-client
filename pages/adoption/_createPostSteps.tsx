import { Box, Flex, Text } from '@chakra-ui/react';
import CustomDatePicker from 'components/CustomDatePicker';
import { MyDropzone } from 'components/CustomDropzone';
import CustomSwitch from 'components/CustomSwitch';
import CustomLocationPicker from 'components/GenericLocationPicker';
import InputField from 'components/InputField';
import SelectComponent from 'components/SelectFieldComponent';
import { useFormikContext } from 'formik';
import { Breeds, PetGender, PetSize, PetType } from 'generated/graphql';
import Image from 'next/image';

import React, { useState } from 'react';
import s from 'styles/createPostForm.module.css';
import { LocationType } from 'types';

export const FirstStepComponent = () => {
  return (
    <>
      <div className={s['horizontal-input-fields']}>
        <InputField
          name='name'
          placeholder='Kitty Kitty'
          label='Pet Name'
          autoFocus={true}
        />

        <SelectComponent
          options={Object.entries(PetType).map(([key, value]) => ({
            label: key,
            value,
          }))}
        />
      </div>

      <div className={s['horizontal-input-fields']}>
        <SelectComponent
          options={Object.entries(PetSize).map(([key, value]) => ({
            label: key,
            value,
          }))}
        />
        <SelectComponent
          options={Object.entries(PetGender).map(([key, value]) => ({
            label: key,
            value,
          }))}
        />
      </div>
      <SelectComponent
        required
        isMulti
        placeholder='Please select all breeds'
        helperText='If your pet is a mixture of breeds, please select all of them'
        options={Object.entries(Breeds).map(([key, value]) => ({
          label: key,
          value,
        }))}
      />

      <div className={s['horizontal-input-fields']}>
        <SelectComponent
          required
          placeholder='Mini'
          options={Object.entries(PetSize).map(([key, value]) => ({
            label: key,
            value,
          }))}
        />

        <CustomDatePicker
          label='Birth Date'
          name='birthDate'
          placeholder='mm/dd/yyyy'
        />
      </div>
    </>
  );
};
export const SecondStepComponent = () => {
  const { values }: { values: any } = useFormikContext();
  return (
    <>
      <InputField
        name='about'
        placeholder='Tell us about your pet'
        label='About Pet'
        textarea
      />
      <MyDropzone
        label='Pet Images'
        name='petImages'
        helperText='The first image will be used as a thumbnail in case you did not specify one.'
      />
      <Flex flexDirection='row' gridGap={2}>
        <CustomSwitch
          label='Vaccinated?'
          defaultValue={false}
          name='vaccinated'
          required={false}
          helpIcon
          helperText='💉 Select if your pet is vaccinated up-to-date'
        />
        {values.gender === 'FEMALE' && (
          <CustomSwitch
            label='Spayed?'
            defaultValue={false}
            name='spayed'
            required={false}
            helpIcon
            helperText='Female Animals must be spayed before they are given up for adoption'
          />
        )}
        {values.gender === 'MALE' && (
          <CustomSwitch
            label='Neutered?'
            defaultValue={false}
            name='neutered'
            required={false}
            helpIcon
            helperText='Male Animals must be neutered before they are given up for adoption'
          />
        )}
      </Flex>
    </>
  );
};
export const ThirdStepComponent = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const form = useFormikContext();
  //This step include user'preferred location
  const handleLocationChange = (coords: LocationType) => {
    form.setFieldValue('address', {
      ...coords,
    });
  };
  const handleShowMap = () => {
    setSelected(1);
    //recompute the height by adding a specific proprety to class name
    const element = document.getElementById(
      'chakra-modal-post-modal-container'
    );

    if (element) {
      element.style.height = '100%';
    }
  };
  const handleSelectCurrentLocation = () => {
    const element = document.getElementById(
      'chakra-modal-post-modal-container'
    );

    if (element) {
      element.style.height = 'min-content';
    }
  };

  return (
    <>
      <Box>
        <Text textStyle='h5'> Location Preferences</Text>
        <Text textStyle='p3'>Deserunt ex excepteur velit quis sit magna.</Text>
      </Box>
      {/* Select between current location or add new location*/}
      <section className={s.locationSelection}>
        <div
          className={`${s.card} ${selected === 0 ? s.selectedLocation : ''}`}
          onClick={() => {
            setSelected(0);
            handleSelectCurrentLocation();
          }}
        >
          <Image
            src='/illustrations/gummy-sweet-home.svg'
            width={'100%'}
            height={'100%'}
          />
          <Text textStyle='p1' color={selected === 0 ? 'blue.600' : 'gray.500'}>
            My Location
          </Text>
        </div>
        <div
          className={`${s.card} ${selected === 1 ? s.selectedLocation : ''}`}
          onClick={handleShowMap}
        >
          <Image
            src='/illustrations/gummy-location.svg'
            width={'100%'}
            height={'100%'}
          />
          <Text textStyle='p1' color={selected === 1 ? 'blue.600' : 'gray.500'}>
            Add new Location
          </Text>
        </div>
      </section>
      {/* Location Maps */}
      {selected === 1 ? (
        <div style={{ height: '100%', width: '100%' }}>
          <CustomLocationPicker
            includeMarker
            includeAutoComplete
            handleLocationChange={handleLocationChange}
          />
        </div>
      ) : null}
    </>
  );
};
