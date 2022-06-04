import { Layout } from 'components/common/Layout';
import UserPetContainer from 'modules/pet/UserPetContainer';
import { useRouter } from 'next/router';
import React from 'react';
import withApollo from 'utils/withApollo';

interface UserOwnedPetProps {}

const UserOwnedPet: React.FC<UserOwnedPetProps> = ({}) => {
  const { petId } = useRouter().query;

  if (!petId) return null;

  return (
    <Layout>
      <UserPetContainer petId={parseInt(petId as string)} />
    </Layout>
  );
};
export default withApollo(UserOwnedPet);
