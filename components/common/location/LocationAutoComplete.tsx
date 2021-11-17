import { Autocomplete } from '@react-google-maps/api';
import React, { useState } from 'react';
import styles from 'styles/register.module.css';

interface AutoCompleteProps {
  onLocationChange: (latLng: google.maps.LatLng | null) => void;
}
export const CustomLocationAutocomplete: React.FC<AutoCompleteProps> = ({
  onLocationChange,
}) => {
  const [autoCompleteRef, setAutoCompleteRef] = useState<any>(null);

  const onPlaceChanged = () => {
    //handle change in location using the autocomplete
    if (autoCompleteRef !== null) {
      const location = autoCompleteRef?.getPlace()?.geometry
        ?.location as google.maps.LatLng;
      if (location) {
        onLocationChange(location);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  const onLoad = (ref: google.maps.places.Autocomplete) => {
    setAutoCompleteRef(ref);
  };
  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type='text'
        placeholder='Type your address'
        className={styles.autocomplete_input}
      />
    </Autocomplete>
  );
};
