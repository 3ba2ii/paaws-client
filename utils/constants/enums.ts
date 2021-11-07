import { PrivacyType } from './../../generated/graphql';

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
