import { Layout } from 'components/Layout';
import { useRouter } from 'next/router';
import React from 'react';

interface UserOwnedPetProps {}

const UserOwnedPet: React.FC<UserOwnedPetProps> = ({}) => {
  const { petId } = useRouter().query;
  return (
    <Layout>
      <div>Hey hey hey - {petId}</div>
    </Layout>
  );
};
export default UserOwnedPet;
