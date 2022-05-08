import { MyOptionType } from '../types/MyOptionType';
export const createObjFromEnum = (enumObj: any): MyOptionType[] => {
  try {
    return Object.entries(enumObj)
      .reverse()
      .map(([label, value]) => ({ label, value })) as MyOptionType[];
  } catch (e) {
    console.log(e);
    return [];
  }
};
