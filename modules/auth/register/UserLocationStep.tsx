import CustomLocationPicker from 'components/location/CustomLocationPicker';
import React from 'react';
import { LocationType } from 'types';

interface Step2Props {
  handleChange: (coords: LocationType) => void;
}

export const UserLocationStep: React.FC<Step2Props> = ({ handleChange }) => {
  const handleLocationChange = (coords: LocationType) => {
    handleChange(coords);
  };

  return (
    <section style={{ height: '100%', width: '100%' }}>
      <CustomLocationPicker
        handleLocationChange={handleLocationChange}
        includeAutoComplete
        includeMarker
      />
    </section>
  );
};
