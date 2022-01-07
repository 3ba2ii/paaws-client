import { getDataFromTree } from '@apollo/client/react/ssr';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { Layout } from 'components/Layout';
import NotFound from 'components/NotFound';
import { useMissingPostQuery } from 'generated/graphql';
import MissingPostContainer from 'modules/posts/missing/post-details/MissingPostContainer';
import { useRouter } from 'next/router';
import React from 'react';
import withApollo from 'utils/withApollo';

const MissingPost: React.FC = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, loading } = useMissingPostQuery({
    variables: { missingPostId: parseInt(id as string) },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    ssr: true,
  });

  return (
    <Layout includeFooter={true}>
      {loading ? (
        <LoadingComponent />
      ) : !data?.missingPost ? (
        <NotFound
          title='📭 404 Not Found'
          subtitle='We did not find your post, please ty again later'
          backPath='/missing'
        />
      ) : (
        <MissingPostContainer post={data?.missingPost} />
      )}
    </Layout>
  );
};
export default withApollo(MissingPost, { getDataFromTree });
