import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Text, WrapItem } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import InputField from 'components/InputField';
import { Field, Form, Formik } from 'formik';
import { useSendOtpMutation } from 'generated/graphql';
import React, { useState } from 'react';
import styles from 'styles/register.module.css';
import { SignupSchema } from 'utils/constants/YupSchemas';
import { toErrorMap } from 'utils/toErrorMap';
import { OTPModal } from './_otpModal';

export const RegistrationFormComponent = () => {
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [sendOTPMutation] = useSendOtpMutation();

  const closeModal = () => {
    setOpenOTPModal(false);
  };

  return (
    <section>
      <Heading fit='cover'>
        Sign up now and join <br />
        <Text as='span' color='teal.400'>
          pet lovers
        </Text>{' '}
        around the world
      </Heading>

      <Formik
        initialValues={{
          full_name: '',
          password: '',
          confirmPassword: '',
          email: '',
          agree: false,
          phone: '',
          otp: null,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (
          { full_name, password, confirmPassword, phone, agree, email },
          { setErrors }
        ) => {
          //Check for agree
          if (!agree)
            return setErrors({
              agree: 'You must agree to the terms and conditions',
            });
          //Send an OTP and open a modal that asks for their OTP
          const { data } = await sendOTPMutation({
            variables: {
              sendOtpPhone: phone,
              email,
            },
          });
          //Check if the phone number is already in use
          if (data?.sendOTP?.errors) {
            const errorsMap = toErrorMap(data?.sendOTP?.errors);
            return setErrors(errorsMap);
          }

          //Open up a modal that asks for their OTP
          setOpenOTPModal(true);
        }}
      >
        {({ submitForm, values, setErrors, errors, touched, isSubmitting }) => (
          <Form className={styles['register-form']}>
            <InputField
              name='email'
              placeholder='example@gmail.com'
              label='Email'
              autoFocus={true}
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
              autoComplete='password'
            />
            <InputField
              name='confirmPassword'
              placeholder='*********'
              label='Confirm Password'
              type='password'
              autoComplete='confirm-password'
            />
            <InputField
              name='phone'
              label='Phone Number'
              type='tel'
              autoComplete='tel'
              placeholder='+20123456789'
              helperText='This phone number will be verified on registering'
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
            {openOTPModal && (
              <OTPModal
                isOpen={openOTPModal}
                onClose={closeModal}
                handleResendOTP={submitForm}
                userInfo={values}
                setErrors={setErrors}
                isSubmitting={isSubmitting}
              />
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
};
