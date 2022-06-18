import { Box, Heading } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useGetUserUpdootsQuery } from 'generated/graphql';
import { MissingPostsList } from 'modules/posts/missing/MissingPostsList';
import React from 'react';

interface UserVotesProps {
  userId: number;
}

const UserVotes: React.FC<UserVotesProps> = ({ userId }) => {
  const { data, loading } = useGetUserUpdootsQuery({ variables: { userId } });
  if (loading) return <LoadingComponent />;

  if (!data) return <Heading size='md'>No votes yet</Heading>;

  return (
    <Box w='100%' h='100%' py={4}>
      <MissingPostsList
        fetchMorePosts={() => {}}
        loading={false}
        posts={[]}
        hasMore={false}
      />
    </Box>
  );
};
export default UserVotes;
