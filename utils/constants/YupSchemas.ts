import { PetGender, Breeds, PetSize } from './../../generated/graphql';
import { PetType } from 'generated/graphql';
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(6, 'Name must be at least 6 characters')
    .max(50, 'Name should not exceed 50 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name should contain only english characters')

    .required('Required!'),

  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      'Password must be a combination of upper and lower case english letters and numbers'
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  phone: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/,
      'Please provide a valid phone number '
    )
    .required('Required'),
  agree: Yup.boolean()
    .oneOf([true], 'Must Accept Terms and Conditions')
    .required('You must agree to the terms and conditions'),
});

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

/* breeds: [],
  colors: [],
  size: null,
  birthDate: null,
  about: null,
  petImages: [],
  thumbnailIdx: 0, */
