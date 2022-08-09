import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Text, WrapItem } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/tooltip';
import InputField from 'components/input/InputField';
import { Field, Form, Formik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import router from 'next/router';
import styles from 'styles/register.module.css';
import { toErrorMap } from 'utils/helpers/toErrorMap';
import { SignupSchema } from 'utils/yupSchemas/SignupSchema';

export const RegisterForm = () => {
  /* Step 1 in registration - (in case of using username and password) */
  const toaster = useToast();
  const { signup } = useAuth();

  return (
    <Formik
      initialValues={{
        full_name: '',
        password: '',
        confirmPassword: '',
        email: '',
        agree: false,
      }}
      validateOnBlur
      validationSchema={SignupSchema}
      onSubmit={async (
        { email, agree, confirmPassword, full_name, password },
        { setErrors }
      ) => {
        if (!agree)
          return setErrors({
            agree:
              'You must agree to the terms, conditions, and cookies policy',
          });

        const data = await signup({
          email,
          password,
          full_name,
          confirmPassword,
        });

        if (data?.register.errors?.length) {
          return setErrors(toErrorMap(data.register.errors));
        }

        if (!data?.register.user) {
          return toaster({
            title: 'Something went wrong',
            description:
              'We could not create your account right now, Please try again later.',
            status: 'error',
            isClosable: true,
            position: 'bottom-right',
          });
        }

        const { phone, phoneVerified, lat, lng } = data.register.user;
        if (!phoneVerified && !phone)
          return router.push('/profile/complete-info/phone-number');

        //redirect the user to the next step
        if (!lat || !lng) {
          return router.push('/profile/complete-info/location');
        }

        return router.push('/');
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles['register-form']}>
          <InputField
            name='email'
            placeholder='example@gmail.com'
            label='Email'
            autoFocus={true}
            type='email'
          />
          <InputField
            name='full_name'
            placeholder='Sarah Doe'
            label='Full Name'
            type='text'
          />
          <InputField
            name='password'
            placeholder='*********'
            label='Password'
            type='password'
            autoComplete='new-password'
          />
          <InputField
            name='confirmPassword'
            placeholder='*********'
            label='Confirm Password'
            type='password'
            autoComplete='new-password'
          />

          <WrapItem>
            <Field position='relative' as={Checkbox} name='agree' id='agree'>
              <Tooltip
                label={errors.agree}
                placement='right'
                isOpen={!!errors.agree && touched.agree}
                hasArrow
                colorScheme='red'
              >
                <Text fontWeight='regular' color='gray.500'>
                  I agree to Paaws's{' '}
                  <Text fontWeight='semibold' as={'span'} color='blue.500'>
                    Terms of Service{' '}
                  </Text>
                  and{' '}
                  <Text fontWeight='semibold' as={'span'} color='blue.500'>
                    Cookies Policy
                  </Text>
                </Text>
              </Tooltip>
            </Field>
          </WrapItem>
          <Button
            rightIcon={<ChevronRightIcon />}
            isLoading={isSubmitting}
            w={'100%'}
            colorScheme='teal'
            type='submit'
          >
            Create Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};
