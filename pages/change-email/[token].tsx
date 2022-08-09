import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import {
  ChangeEmailMutationResult,
  useChangeEmailMutation,
} from 'generated/graphql';
import useIsMounted from 'hooks/useIsMounted';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { capitalizeString } from 'utils/helpers/capitalizeString';

const ChangeEmailPage: React.FC = () => {
  const [response, setResponse] =
    useState<ChangeEmailMutationResult['data']>(null);

  const isMounted = useIsMounted();
  const { query, push } = useRouter();
  const [changeEmailMutation] = useChangeEmailMutation();

  useEffect(() => {
    isMounted();
    if (query.token) {
      changeEmailMutation({ variables: { token: query.token as string } }).then(
        (res) => setResponse(res.data)
      );
    }
  }, [isMounted, query]);

  return (
    <Layout title='Change Email - Paaws'>
      {!isMounted() || !response ? (
        <LoadingComponent />
      ) : (
        <VStack w='100%'>
          {response.changeUserEmail.response ? (
            <VStack>
              <Heading size='4xl'>🥳</Heading>
              <Heading>Email changed successfully</Heading>
              <Text textAlign='center' textStyle='p1'>
                You can now login to your account with your new email,
                <br /> Feel free to close this page now
              </Text>
            </VStack>
          ) : (
            <VStack>
              <Heading size='4xl'>😕</Heading>
              <Heading>
                {capitalizeString(
                  response.changeUserEmail.errors?.[0].message ||
                    'An error occurred'
                )}
              </Heading>
              <Text textAlign='center' textStyle='p1'>
                There is something wrong with your change email token,
                <br /> Please recheck the url or try sending a new one
              </Text>
              <Button onClick={() => push('/settings')}>Go to settings</Button>
            </VStack>
          )}
        </VStack>
      )}
    </Layout>
  );
};
export default ChangeEmailPage;
