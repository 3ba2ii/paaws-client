import { MeQuery } from 'generated/graphql';
export const getUrlBaseOnUserInfo = (
  user: MeQuery['me'],
  currentUrl: 'phone-number' | 'bio' | 'location' | 'login' | 'register'
): string => {
  if (!user) {
    return '/';
  }
  const { bio, phoneVerified, phone, lat, lng } = user;

  if (!phoneVerified && !phone && currentUrl !== 'phone-number') {
    //if the user did not verify his phone number then redirect to the verify phone number page
    return '/profile/complete-info/phone-number';
  }
  //otherwise redirect the user to the bio step
  if (!bio || (bio === '' && currentUrl !== 'bio')) {
    return '/profile/complete-info/bio';
  }

  if ((!lat || !lng) && currentUrl !== 'location') {
    return '/profile/complete-info/location';
  }

  return '/';
};
