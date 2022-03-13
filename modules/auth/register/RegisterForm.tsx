import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  WrapItem,
} from '@chakra-ui/layout';
import {
  ModalProps,
  PinInput,
  PinInputField,
  useToast,
} from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/tooltip';
import InputField from 'components/common/input/InputField';
import GenericModal from 'components/common/overlays/CustomModal';
import { Field, Form, Formik } from 'formik';
import { useRegisterMutation } from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import styles from 'styles/register.module.css';
import { toErrorMap } from 'utils/toErrorMap';
import { SignupSchema } from 'utils/yupSchemas/SignupSchema';

const VerifyEmailComponent: React.FC<{
  handleChange: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}> = ({ handleChange, isOpen, setIsOpen }) => {
  return (
    <GenericModal
      title={
        <Box w='100%' textAlign={'left'}>
          <Heading w='100%' size='md' fontWeight='semibold'>
            Verify your Email
          </Heading>
        </Box>
      }
      body={
        <VStack w='100%' spacing={5}>
          <Text>
            We have sent a 6-digit code to your email. Please enter the code
            below to verify your email.
          </Text>
          <HStack>
            <PinInput
              otp
              size='lg'
              placeholder='🔢'
              onChange={(val) => handleChange(val.toString())}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </VStack>
      }
      modalProps={{ size: 'md' } as ModalProps}
      footer={
        <HStack pt={4}>
          <Button variant='ghost' color='gray.500'>
            Cancel
          </Button>
          <Button px={5} colorScheme='teal'>
            Verify Email 🙌
          </Button>
        </HStack>
      }
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
};

export const RegisterForm = () => {
  /* Step 1 in registration - (in case of using username and password) */
  const toaster = useToast();
  const [register] = useRegisterMutation();

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
        try {
          if (!agree)
            return setErrors({
              agree:
                'You must agree to the terms, conditions, and cookies policy',
            });
          const { data } = await register({
            variables: {
              registerOptions: {
                email,
                password,
                confirmPassword,
                full_name,
              },
            },
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
              position: 'top-right',
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
        } catch (err) {
          return toaster({
            title: 'Something went wrong',
            description:
              'We could not create your account right now, Please try again later.',
            status: 'error',
            isClosable: true,
            position: 'top-right',
          });
        }
      }}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
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
