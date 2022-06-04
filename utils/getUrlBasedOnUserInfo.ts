import { MeQuery } from 'generated/graphql';
import { isCompleteProfile } from './isCompletedProfile';
export const getUrlBaseOnUserInfo = (
  user: MeQuery['me'],
  currentUrl:
    | 'phone-number'
    | 'bio'
    | 'location'
    | 'login'
    | 'register'
    | '/profile/complete-info'
): string => {
  if (!user) {
    return '/';
  }

  const isCompleted = isCompleteProfile(user);

  if (currentUrl === '/profile/complete-info' || isCompleted) {
    return '/';
  }
  return '/profile/complete-info';
};
