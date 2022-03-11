import { Layout } from 'components/Layout';
import React from 'react';

interface SelectILocationPageProps {}

const SelectLocationPage: React.FC<SelectILocationPageProps> = ({}) => {
  return (
    <Layout
      title='Select Location - Paaws'
      includeFooter={false}
      includeNavbar={false}
      childrenProps={{ mt: '0' }}
      layoutProps={{ mt: '0', p: '0' }}
    >
      <div>hello</div>
    </Layout>
  );
};
export default SelectLocationPage;
