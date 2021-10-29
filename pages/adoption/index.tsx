import { getDataFromTree } from '@apollo/client/react/ssr';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import {
  Address,
  PetBreed,
  PetType,
  Photo,
  useAdoptionPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import styles from 'styles/missing-page.module.css';
import withApollo from 'utils/withApollo';
import { CreateAdoptionPostModal } from './_createPostModal';

export interface createPostProps {
  isOpen: boolean;
  onClose: () => void;
}
interface MissingPostProps {
  pet: {
    id: number;
    name: string;
    type: PetType;
    breeds: PetBreed[];
    thumbnail?: Photo | null;
  };
  address?: Address | null;
}
const MissingPost: React.FC<MissingPostProps> = ({ pet }) => {
  return <div></div>;
};

const MissingPage: React.FC = ({}) => {
  const { data, error, loading, fetchMore, variables } = useAdoptionPostsQuery({
    variables: {
      limit: 2,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [openModal, setOpenModal] = useState(false);

  if (loading) {
    return <Layout>Loading...</Layout>;
  }
  //Not Loading case but there is an error
  if (error || data?.adoptionPosts?.errors?.length) {
    return <Layout>Error</Layout>;
  }

  //No errors but no posts
  if (!data?.adoptionPosts?.posts?.length) {
    return <Layout>No posts</Layout>;
  }

  const { hasMore, posts } = data.adoptionPosts;

  return (
    <Layout>
      <div className={styles.grid_container}>
        <section className={styles.filters_container}>FILTERS</section>
        <section>
          <ul>
            {posts.map(({ pet, createdAt, address }) => {
              return (
                <li>
                  {JSON.stringify(pet, null, 2)}
                  <MissingPost pet={pet} address={address} />
                </li>
              );
            })}
          </ul>
          {hasMore && (
            <Button
              onClick={() => {
                const latestCreatedAt = posts[posts.length - 1].createdAt;
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor: latestCreatedAt,
                  },
                });
              }}
            >
              Load More
            </Button>
          )}
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Create Post
          </Button>
        </section>
      </div>

      {openModal && (
        <CreateAdoptionPostModal
          {...{
            isOpen: openModal,
            onClose: () => setOpenModal(false),
          }}
        />
      )}
    </Layout>
  );
};

export default withApollo(MissingPage, { getDataFromTree });