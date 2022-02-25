import { Button, Checkbox, Text } from '@chakra-ui/react';
import InputField from 'components/common/input/InputField';
import { Form, Formik } from 'formik';
import { MeDocument, MeQuery, useLoginMutation, User } from 'generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from 'styles/login.module.css';
import { toErrorMap } from 'utils/toErrorMap';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loginMutation] = useLoginMutation();

  return (
    <Formik
      initialValues={{
        identifier: '',
        password: '',
        remember: false,
      }}
      onSubmit={async ({ identifier, password }, { setErrors }) => {
        const { data } = await loginMutation({
          variables: { loginOptions: { identifier, password } },
          update: (cache, { data: returnedData }) => {
            if (!returnedData) return;

            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: returnedData?.login?.user as User | null,
              },
            });
          },
        });

        if (data?.login?.errors?.length) {
          const mappedErrors = toErrorMap(data?.login?.errors);
          return setErrors(mappedErrors);
        } else if (data?.login?.user) {
          if (router.query.next) {
            router.replace(router.query.next + '');
          } else {
            router.push('/');
          }
        }
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
