import { Button, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { Layout } from 'components/Layout';
import NotFound from 'components/NotFound';
import { MissingPostQuery, useMissingPostQuery } from 'generated/graphql';
import MissingPostContainer from 'modules/posts/missing/MissingPostContainer';
import router, { useRouter } from 'next/router';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import withApollo from 'utils/withApollo';

interface MissingPostProps {}

const MissingPost: React.FC<MissingPostProps> = () => {
  const [post, setPost] = React.useState<
    MissingPostQuery['missingPost'] | null
  >(null);
  const {
    query: { id },
  } = useRouter();

  const { data, loading } = useMissingPostQuery({
    variables: { missingPostId: parseInt(id as string) },
    onCompleted: (d) => {
      setPost(d.missingPost);
    },
  });

  const isFound = !loading && post && !data?.missingPost.errors?.length;

  return (
    <Layout includeFooter={true}>
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
