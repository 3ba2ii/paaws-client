import { Button, Heading, VStack } from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useVerifyUserEmailMutation } from 'generated/graphql';
import useIsMounted from 'hooks/useIsMounted';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import withApollo from 'utils/withApollo';

interface VerifyEmailProps {}

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { query } = useRouter();

  const [verifyEmail, { loading }] = useVerifyUserEmailMutation();
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyEmail = async () => {
    const token = query.token as string;
    if (!token) return;

    const { data } = await verifyEmail({ variables: { token } });
    if (data?.verifyUserEmail) {
      setIsVerified(true);
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, [query, isMounted]);

  return (
    <Layout title='Verify Email'>
      {loading || !isMounted() ? (
        <LoadingComponent />
      ) : isVerified ? (
        <VStack>
          <Heading>🎉</Heading>
          <Heading size='md'>Voilà, Your email has been verified ✅</Heading>
          <Button size='sm' onClick={() => router.push('/')}>
            Go back home
          </Button>
        </VStack>
      ) : (
        <Heading size='md' textAlign={'center'}>
          ❌<br />
          An error occurred while verifying your email
          <br /> Please try again later
        </Heading>
      )}
    </Layout>
  );
};
export default withApollo(VerifyEmail);
