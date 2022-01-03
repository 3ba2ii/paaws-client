import {
  PrivacyType,
  DateFilters,
  LocationFilters,
  SortingOrder,
  MissingPostTypes,
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
