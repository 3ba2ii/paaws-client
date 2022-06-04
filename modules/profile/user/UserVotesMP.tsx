import { Box } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { UserVotesQueryVariables, useUserVotesQuery } from 'generated/graphql';
import { MissingPostsList } from 'modules/posts/missing/MissingPostsList';
import React from 'react';

interface UserVotesMPProps {
  userId: number;
}

const UserVotesMP: React.FC<UserVotesMPProps> = ({ userId }) => {
  const [paginationLoading, setPaginationLoading] = React.useState(false);

  const { data, loading, variables, fetchMore } = useUserVotesQuery({
    variables: {
      userId,
      length: 120,
      paginationArgs: { cursor: null, limit: 3 },
    },
    fetchPolicy: 'no-cache',
  });

  const fetchMorePosts = async () => {
    if (!data?.votes.missingPosts) return;
    const { missingPosts, hasMore } = data.votes;
    if (!hasMore) return;
    const { createdAt: cursor } = missingPosts[missingPosts.length - 1];

    const newVariables: UserVotesQueryVariables = {
      ...variables,
      paginationArgs: { limit: 3, cursor },
      userId,
    };

    fetchMore({ variables: newVariables }).finally(() => {
      setPaginationLoading(false);
    });
  };
  if (loading) return <LoadingComponent />;
  if (!data) return <h1>No data</h1>;

  return (
    <Box w='100%' h='100%' py={4}>
      <MissingPostsList
        fetchMorePosts={fetchMorePosts}
        loading={paginationLoading}
        posts={data?.votes.missingPosts || []}
        hasMore={data?.votes.hasMore}
      />
    </Box>
  );
};
export default UserVotesMP;
