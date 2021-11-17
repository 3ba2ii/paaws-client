import { Layout } from 'components/Layout';
import React from 'react';
import withApollo from 'utils/withApollo';
import { RegisterForm } from 'modules/auth/register/RegisterForm';

const RegisterViaEmail = () => {
  return (
    <Layout title='Join us Now'>
      <main>
        <RegisterForm />
        {/* Left Section that includes the form */}
        <section></section> {/* Right section includes the  illustration*/}
      </main>
    </Layout>
  );
};
export default withApollo(RegisterViaEmail);
