import { FaGlobeAmericas } from 'react-icons/fa';
import { PrivacyType } from './../../generated/graphql';

export const PrivacyTypeCustomized = Object.entries(PrivacyType)
  .reverse()
  .map(([key, value]) => ({
    key,
    value,
  }));
