import * as Yup from 'yup';

export const AboutYouSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Name must be at least 6 characters')
    .max(50, 'Name should not exceed 50 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name should contain only english characters')
    .required('Required!'),

  email: Yup.string().email('Invalid email address').required('Required'),

  bio: Yup.string()
    .min(6, 'Bio must be at least 6 characters')
    .max(250, 'Bio should  be short and not exceed 250 characters')
    .required('Required'),
});
