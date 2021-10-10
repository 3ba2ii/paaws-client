import { getDataFromTree } from '@apollo/client/react/ssr';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import {
  Breeds,
  PetGender,
  PetSize,
  PetType,
  useAdoptionPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import withApollo from 'utils/withApollo';
import { CreateAdoptionPostModal } from './_createPostModal';
export interface createPostProps {
  isOpen: boolean;
  onClose: () => void;
}
interface postInputProps {
  name: string | null;
  type: PetType | null;
  gender: PetGender | null;
  breeds: [Breeds] | [];
  size: PetSize | null;
  birthDate: Date | null;
  about: string | null;
  postImages: FileList | [];
  thumbnailIdx: number | null;
  address: {
    lat: number | null;
    lng: number | null;
    country: string | null;
    city: string | null;
    street: string | null;
    zip: number | null;
  };
}

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
      <h1>Missing Page</h1>
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
