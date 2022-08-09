import { MeQuery } from './../generated/graphql';
export function isCompleteProfile(user: MeQuery['me']) {
  if (!user) return false;

  const { bio, phoneVerified, phone, lat, lng, gender, birthDate } = user;

  return !!(
    phoneVerified &&
    phone &&
    bio &&
    bio !== '' &&
    gender &&
    birthDate &&
    lat &&
    lng
  );
}
