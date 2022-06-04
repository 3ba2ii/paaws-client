import { PetGender, PetSize, PetType } from 'generated/graphql';
import React, { ReactElement } from 'react';
import { BiHash, BiUpload } from 'react-icons/bi';
import { MdContentPaste } from 'react-icons/md';
import * as Yup from 'yup';

export const Step1ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Name should not exceed 50 characters')
    .required('Please provide a name for your pet.'),

  type: Yup.mixed()
    .oneOf(Object.values(PetType), 'Invalid pet type!')
    .required('Please provide a valid pet type.'),

  breeds: Yup.array()
    .min(1, 'Please provide at least one breed')
    .max(4, 'Pet breeds can not be more than 4')
    .required('Required!'),
  colors: Yup.array()
    .min(1, 'Please provide at least one color for your pet')
    .max(4, 'Pet colors can not be more than 4')
    .required('Required!'),

  gender: Yup.mixed()
    .oneOf(Object.values(PetGender), 'Invalid pet gender!')
    .required('Required!'),
  size: Yup.mixed()
    .oneOf(Object.values(PetSize), 'Invalid pet size!')
    .required('Required!'),
});
export const Step2ValidationSchema = Yup.object().shape({
  about: Yup.string()
    .min(50, 'About should be at least 50 characters')
    .required('Please add a description of your pet.'),

  birthDate: Yup.date().required('Required!'),
});

export const Step3ValidationSchema = Yup.object().shape({
  images: Yup.array().required('Required!'),
});
export const FormStepsContent: {
  icon: ReactElement;
  title: string;
  subtitle: string;
}[] = [
  {
    icon: <MdContentPaste size='20px' />,
    title: 'Tell us more about your pet',
    subtitle: 'Give us more info about your pet',
  },
  {
    icon: <BiHash size='22px' />,
    title: 'Add character to your pet',
    subtitle: 'Make your pet stand out',
  },
  {
    icon: <BiUpload size='22px' />,
    title: 'Upload your pet’s images ',
    subtitle: 'Show us the beauty of your pet',
  },
];
