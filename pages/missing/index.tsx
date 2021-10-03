import { Layout } from 'components/Layout';
import { AdoptionPostsQuery, useAdoptionPostsQuery } from 'generated/graphql';
import { Button } from '@chakra-ui/react';
import React from 'react';
import withApollo from 'utils/withApollo';
import Image from 'next/image';

interface missingPageProps {}

const MissingPage: React.FC<missingPageProps> = ({}) => {
  const { data, error, loading, fetchMore, variables } = useAdoptionPostsQuery({
    variables: {
      adoptionPostsLimit: 2,
      adoptionPostsCursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  var content = <div>Loading...</div>;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (!data) {
    content = <div>No data</div>;
  } else {
    const {
      adoptionPosts: { posts, hasMore, errors },
    } = data;

    content = (
      <ul>
        {posts.map(({ id, pet, createdAt, user, address }) => {
          const { name, size, gender, images, birthDate, type } = pet;

          return (
            <li key={id}>
              {id}-{name}
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <Layout>
      <h1>Missing Page</h1>
      {content}
      <Button
        onClick={() => {
          const latestCreatedAt =
            data?.adoptionPosts.posts[data?.adoptionPosts.posts.length - 1]
              .createdAt;
          fetchMore({
            variables: {
              adoptionPostsLimit: variables?.adoptionPostsLimit,
              adoptionPostsCursor: latestCreatedAt,
            },
          });
        }}
      >
        Load More
      </Button>
    </Layout>
  );
};

export default withApollo(MissingPage);
