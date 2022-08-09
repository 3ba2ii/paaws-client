//compare two strings
const areTwoStringsEqual = (s1: string, s2: string): boolean => {
  return s1?.trim()?.toLowerCase() === s2?.trim()?.toLowerCase();
};
export default areTwoStringsEqual;
