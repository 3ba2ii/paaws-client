import { MyOptionType } from 'types';

export const createOption = (label: string): MyOptionType => ({
  label,
  value: label.toLowerCase().replace(/\W/g, '-'),
});
