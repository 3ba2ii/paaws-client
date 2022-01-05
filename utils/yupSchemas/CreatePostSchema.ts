import { PetGender, PetSize } from '../../generated/graphql';
import { PetType } from 'generated/graphql';
import * as Yup from 'yup';

export const CreatePostSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name must be at least 4 characters')
    .max(50, 'Name should not exceed 50 characters')
    .required('Required!'),
  type: Yup.mixed()
    .oneOf(Object.values(PetType), 'Invalid pet type!')
    .required('Required!'),
  gender: Yup.mixed()
    .oneOf(Object.values(PetGender), 'Invalid pet gender!')
    .required('Required!'),

  size: Yup.mixed()
    .oneOf(Object.values(PetSize), 'Invalid pet size!')
    .required('Required!'),

  breeds: Yup.array()
    .min(1, 'Please provide at least one breed')
    .max(4, 'Pet breeds can not be more than 4')
    .required('Required!'),

  birthDate: Yup.date().required('Required!'),
});
