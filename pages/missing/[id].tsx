import { Button, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { Layout } from 'components/Layout';
import NotFound from 'components/NotFound';
import { useMissingPostQuery } from 'generated/graphql';
import MissingPostContainer from 'modules/posts/missing/MissingPostContainer';
import router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import withApollo from 'utils/withApollo';

interface MissingPostProps {}

const MissingPost: React.FC<MissingPostProps> = () => {
  const {
    query: { id },
  } = useRouter();

  if (!id || Array.isArray(id))
    return (
      <NotFound
        title='Invalid URL'
        subtitle='This is and invalid url please make sure you are in the right page'
      />
    );

  const { data, loading } = useMissingPostQuery({
    variables: { missingPostId: parseInt(id) },
  });

  const post = data?.missingPost;
  const isFound = !loading && post?.missingPost && !post.errors?.length;

  return (
    <Layout includeFooter={false}>
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
        <MissingPostContainer post={post} />
      )}
    </Layout>
  );
};
export default withApollo(MissingPost);
