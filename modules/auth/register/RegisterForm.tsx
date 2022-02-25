import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Text, WrapItem } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import InputField from 'components/common/input/InputField';
import { Field, Form, Formik } from 'formik';
import styles from 'styles/register.module.css';
import { SignupSchema } from 'utils/yupSchemas/SignupSchema';

export const RegisterForm = () => {
  /* Step 1 in registration - (in case of using username and password) */

  return (
    <section>
      <Formik
        initialValues={{
          full_name: '',
          password: '',
          confirmPassword: '',
          email: '',
          agree: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={async ({ agree, email }, { setErrors }) => {}}
      >
        {({ submitForm, values, setErrors, errors, touched, isSubmitting }) => (
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
              autoComplete='confirm-password'
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
              type='submit'
              isLoading={isSubmitting}
              w={'100%'}
              colorScheme='teal'
            >
              Create Account
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
