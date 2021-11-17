import CustomLocationPicker from 'components/common/location/CustomLocationPicker';
import { MeQuery } from 'generated/graphql';
import { LocationType } from 'types';
import React from 'react';
import styles from 'styles/register.module.css';

interface Step2Props {
  handleChange: (e: any, field: string) => void;
  userInfo: MeQuery | undefined;
}

export const UserLocationStep: React.FC<Step2Props> = ({
  handleChange,
  userInfo,
}) => {
  const handleLocationChange = (coords: LocationType) => {
    handleChange(coords, 'location');
  };

  return (
    <section
      className={styles['step-container'] + ' ' + styles['location-step']}
      style={{ height: '100%', width: '100%' }}
    >
      <CustomLocationPicker
        handleLocationChange={handleLocationChange}
        includeAutoComplete
        includeMarker
      />
    </section>
  );
};
