import { Heading } from '@chakra-ui/layout';
import { Button, Checkbox } from '@chakra-ui/react';
import InputField from 'components/InputField';
import { Layout } from 'components/Layout';
import { Form, Formik } from 'formik';
import { MeDocument, MeQuery, useLoginMutation, User } from 'generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from 'styles/login.module.css';
import { toErrorMap } from 'utils/toErrorMap';
import withApollo from 'utils/withApollo';

interface loginProps {}

const LoginPage: React.FC<loginProps> = ({}) => {
  const [loginMutation] = useLoginMutation();
  const router = useRouter();

  return (
    <Layout title='Welcome Back'>
      <div className={styles['login-page-container']}>
        <Heading size='xl'>
          Welcome Back{' '}
          <span aria-label='waving hand' role='img'>
            👋
          </span>
        </Heading>
        <Button
          borderRadius='lg'
          leftIcon={<FcGoogle size='20px' />}
          w={'100%'}
          variant='outline'
          boxShadow='sm'
          size='lg'
        >
          Continue with Google
        </Button>

        <p className='divider-with-centered-value'>or</p>

        <Formik
          initialValues={{
            identifier: '',
            password: '',
            remember: false,
          }}
          onSubmit={async ({ identifier, password }, { setErrors }) => {
            const { data } = await loginMutation({
              variables: { loginOptions: { identifier, password } },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: data?.login?.user as User | null,
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
                type='email'
              />

              <InputField
                name='password'
                placeholder='*********'
                label='Password'
                type='password'
                autoComplete='new-password'
              />
              <Link href='/forgot-password'>Forgot Password?</Link>
              <Checkbox name='remember'>Remember Me?</Checkbox>

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
      </div>
    </Layout>
  );
};
export default withApollo(LoginPage);
