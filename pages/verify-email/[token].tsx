import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

interface VerifyEmailProps {}

const VerifyEmail: React.FC<VerifyEmailProps> = ({}) => {
  const { pathname, query } = useRouter();
  return <Text>{query.token}</Text>;
};
export default VerifyEmail;
