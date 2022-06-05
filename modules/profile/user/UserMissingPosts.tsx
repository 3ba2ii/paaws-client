import { Box, Center } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import NotFound from 'components/errors/NotFound';
import { useMissingPostsByUserQuery } from 'generated/graphql';
import { MissingPostsList } from 'modules/posts/missing/MissingPostsList';
import React, { useState } from 'react';

interface UserMissingPostsProps {
  userId: number;
}

const UserMissingPosts: React.FC<UserMissingPostsProps> = ({ userId }) => {
  const [paginationLoading, setPaginationLoading] = useState(false);

  const { data, loading, variables, fetchMore } = useMissingPostsByUserQuery({
    variables: { userId, length: 150, input: { cursor: null, limit: 5 } },
  });

  const fetchMorePosts = async () => {
    if (!data?.missingPostsByUser.missingPosts) return;
    const { missingPosts, hasMore } = data.missingPostsByUser;
    if (!hasMore) return;
    const { createdAt: cursor } = missingPosts[missingPosts.length - 1];

    const newVariables = {
      ...variables,
      input: { limit: 5, cursor },
    };

    setPaginationLoading(true);
    fetchMore({ variables: newVariables }).finally(() => {
      setPaginationLoading(false);
    });
  };

  if (loading)
    return (
      <Center w='100%' h='100%' minH='400px'>
        <LoadingComponent />
      </Center>
    );
  if (!loading && (!data || !data?.missingPostsByUser.missingPosts.length))
    return (
      <Box w='100%' h='100%' py='5rem'>
        <NotFound
          title='No posts yet'
          subtitle='User did not add any posts yet, please check back later'
          includeBackButton={false}
        />
      </Box>
    );
  return (
    <Box w='100%' h='100%' py={4}>
      <MissingPostsList
        fetchMorePosts={fetchMorePosts}
        loading={paginationLoading}
        posts={data?.missingPostsByUser.missingPosts || []}
        hasMore={data?.missingPostsByUser.hasMore}
      />
    </Box>
  );
};
export default UserMissingPosts;
