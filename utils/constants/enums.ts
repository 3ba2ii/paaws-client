import { createObjFromEnum } from '../helpers/createObjectFromEnum';
import {
  PrivacyType,
  DateFilters,
  LocationFilters,
  SortingOrder,
  MissingPostTypes,
  PetType,
  PetGender,
  PetSize,
  Breeds,
  PetColors,
} from './../../generated/graphql';

export const PrivacyTypeCustomized = Object.entries(PrivacyType)
  .reverse()
  .map(([key, value]) => ({
    key,
    value,
  }));

export enum SelectLocationOptions {
  MAP = 'Select using Map',
  MANUAL = 'Enter Manually',
}

export const SelectLocationObj = Object.entries(SelectLocationOptions)
  .reverse()
  .map(([key, value]) => ({
    key,
    value,
  }));
export const DateFiltersObj = Object.entries(DateFilters).map(
  ([key, value]) => ({
    key,
    value,
  })
);
export const LocationFiltersObject = Object.entries(LocationFilters).map(
  ([key, value]) => ({
    key,
    value,
  })
);
export const SortingOrderFilterObject = Object.entries(SortingOrder).map(
  ([key, value]) => ({
    key,
    value,
  })
);
export const MP_POST_TYPES = [
  { label: 'Missing', value: MissingPostTypes.Missing },
  { label: 'Found', value: MissingPostTypes.Found },
];

export const PetTypeObj = createObjFromEnum(PetType);
export const PetGenderObj = createObjFromEnum(PetGender);
export const PetSizeObj = createObjFromEnum(PetSize);
export const PetColorObj = createObjFromEnum(PetColors);
export const PetBreedsObj = createObjFromEnum(Breeds);
