import { MyOptionType } from 'types/MyOptionType';

export const createOption = (label: string): MyOptionType => ({
  label,
  value: label.toLowerCase().replace(/\W/g, '-'),
});
