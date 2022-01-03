import * as Yup from 'yup';

export const CreateMPSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, 'Title must be at least 8 characters')
    .max(70, 'Title should not exceed 70 characters')
    .required('Required!'),

  description: Yup.string()
    .min(15, 'Description must be at least 15 characters')
    .max(500, 'Title should not exceed 500 characters')
    .required('Required!'),
});
