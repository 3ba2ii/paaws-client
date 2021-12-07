import { Box, Button, Grid, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { Layout } from 'components/Layout';
import NotFound from 'components/NotFound';
import { useMissingPostQuery } from 'generated/graphql';
import router, { useRouter } from 'next/router';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import withApollo from 'utils/withApollo';

interface MissingPostProps {}

const MissingPost: React.FC<MissingPostProps> = ({}) => {
  const {
    query: { id },
  } = useRouter();
  if (!id || Array.isArray(id)) {
    return (
      <NotFound
        title='Invalid URL'
        subtitle='This is and invalid url please make sure you are in the right page'
      />
    );
  }

  const { data, loading } = useMissingPostQuery({
    variables: { missingPostId: parseInt(id) },
  });

  const post = data?.missingPost.missingPost;
  const isFound = !loading && post;

  console.log(`🚀 ~ file: [id].tsx ~ line 14 ~ data`, data);
  console.log(`🚀 ~ file: [id].tsx ~ line 8 ~ query`, id);
  return (
    <Layout>
      {loading ? (
        <LoadingComponent />
      ) : !isFound ? (
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
        <div>{post?.title}</div>
      )}
    </Layout>
  );
};
export default withApollo(MissingPost);
