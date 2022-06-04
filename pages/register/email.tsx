import { Layout } from 'components/common/Layout';
import React from 'react';
import withApollo from 'utils/withApollo';
import { RegisterForm } from 'modules/auth/register/RegisterForm';
import { Heading, Text } from '@chakra-ui/react';

const RegisterViaEmail = () => {
  return (
    <Layout title='Join us Now'>
      <main>
        <Heading fit='cover'>
          Sign up and join{' '}
          <Text as='span' color='teal.400'>
            pet lovers
          </Text>{' '}
          <br /> around the world 🐶
        </Heading>
        <RegisterForm />
        {/* Left Section that includes the form */}
      </main>
    </Layout>
  );
};
export default withApollo(RegisterViaEmail);
