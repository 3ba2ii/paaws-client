import { getDataFromTree } from '@apollo/client/react/ssr';
import { Button, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { Layout } from 'components/Layout';
import NotFound from 'components/NotFound';
import { useMissingPostQuery } from 'generated/graphql';
import MissingPostContainer from 'modules/posts/missing/MissingPostContainer';
import router, { useRouter } from 'next/router';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import withApollo from 'utils/withApollo';

const MissingPost: React.FC = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, loading } = useMissingPostQuery({
    variables: { missingPostId: parseInt(id as string) },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layout includeFooter={true}>
      {loading ? (
        <LoadingComponent />
      ) : !data?.missingPost ? (
        <VStack w='100%' justify={'flex-start'} h='60vh' spacing={5}>
          <NotFound
            title='📭 404 Not Found'
            subtitle='We did not find your post, please ty again later'
          />
          <Button
            rightIcon={<FiChevronRight />}
            onClick={() => router.replace('/missing')}
          >
            Go Home
          </Button>
        </VStack>
      ) : (
        <MissingPostContainer post={data?.missingPost} />
      )}
    </Layout>
  );
};
export default withApollo(MissingPost, { getDataFromTree });
