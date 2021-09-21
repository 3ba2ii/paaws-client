import { getDataFromTree } from '@apollo/client/react/ssr';
import { useUsersQuery } from 'generated/graphql';
import React from 'react';
import withApollo from 'utils/withApollo';

interface usersProps {}

const UsersPage: React.FC<usersProps> = () => {
  const { data } = useUsersQuery();
  console.log(`🚀 ~ file: users.tsx ~ line 14 ~ data`, data);

  return <ul>{JSON.stringify(data, null, 2)}</ul>;
};

export default withApollo(UsersPage, { getDataFromTree });
