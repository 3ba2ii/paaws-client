import { Button } from '@chakra-ui/react';
import InputField from 'components/input/InputField';
import { Form, Formik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import Link from 'next/link';
import React from 'react';
import styles from 'styles/login.module.css';
import { toErrorMap } from 'utils/toErrorMap';

interface LoginFormProps {
  onSuccess: Function;
  onFailure: Function;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onFailure,
}) => {
  const auth = useAuth();
  return (
    <Formik
      initialValues={{
        identifier: '',
        password: '',
      }}
      onSubmit={async ({ identifier, password }, { setErrors }) => {
        const data = await auth.signin({ identifier, password });

        if (data?.login?.errors?.length || !data?.login.user) {
          const mappedErrors = toErrorMap(data?.login?.errors || []);
          setErrors(mappedErrors);
          onFailure();
          return;
        }

        onSuccess();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles['login-form']}>
          <InputField
            name='identifier'
            placeholder='example@gmail.com'
            label='Email or Phone Number'
            autoFocus={true}
            id='identifier'
          />

          <InputField
            name='password'
            placeholder='*********'
            label='Password'
            type='password'
            autoComplete='new-password'
            id='password'
          />
          <Link href='/forgot-password'>
            <Button
              colorScheme={'blue'}
              variant={'link'}
              fontSize='xs'
              w='fit-content'
              ml='auto'
              fontWeight={'medium'}
            >
              Forgot Password?
            </Button>
          </Link>

          <Button
            type='submit'
            isLoading={isSubmitting}
            w={'100%'}
            colorScheme='teal'
          >
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
};
