import { getDataFromTree } from '@apollo/client/react/ssr';
import { useUsersQuery } from 'generated/graphql';
import React from 'react';
import { useIsAuth } from 'utils/useIsAuth';
import withApollo from 'utils/withApollo';

interface usersProps {}

const UsersPage: React.FC<usersProps> = () => {
  useIsAuth();
  const { data } = useUsersQuery();

  return <ul>{JSON.stringify(data, null, 2)}</ul>;
};

export default withApollo(UsersPage, { getDataFromTree });
