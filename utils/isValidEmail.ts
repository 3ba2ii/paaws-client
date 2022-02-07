//check if the email is valid or not
export const isValidEmail = (email: string): boolean => {
  const regEx = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+');
  return regEx.test(email);
};
