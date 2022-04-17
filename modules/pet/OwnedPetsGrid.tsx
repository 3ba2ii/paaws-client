import {
  Button,
  GridItem,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useUserOwnedPetsQuery } from 'generated/graphql';
import { useContextualRouting } from 'next-use-contextual-routing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { OwnedPetCard } from './OwnedPetCard';
import UserPetContainer from './UserPetContainer';

interface OwnedPetsGridProps {
  userId: number;
}

const OwnedPetsGrid: React.FC<OwnedPetsGridProps> = ({ userId }) => {
  const router = useRouter();
  console.log(`🚀 ~ file: OwnedPetsGrid.tsx ~ line 28 ~ router`, router.query);
  const { makeContextualHref } = useContextualRouting();

  const { data, fetchMore, loading, variables } = useUserOwnedPetsQuery({
    variables: { userId, paginationArgs: { cursor: null, limit: 6 } },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMorePets = async () => {
    if (!data) return;
    const {
      userOwnedPets: { ownedPets, hasMore },
    } = data;
    if (!hasMore) return;

    const newCursor = ownedPets[ownedPets.length - 1].createdAt;
    await fetchMore({
      variables: {
        ...variables,
        paginationArgs: { cursor: newCursor, limit: 6 },
      },
    });
  };

  return (
    <VStack w='100%'>
      <SimpleGrid
        w='100%'
        minChildWidth={['220px', '220px', '220px', 'calc(100% / 3.5)']}
        spacing='30px'
      >
        {loading ? (
          <LoadingComponent />
        ) : data && data.userOwnedPets ? (
          data.userOwnedPets.ownedPets?.map(({ pet, id }) => (
            <Link
              href={makeContextualHref({ petId: id })}
              as={`/pet/${id}`}
              key={id}
              shallow={true}
              scroll={false}
            >
              <GridItem w='100%' h='100%' css={{ aspectRatio: '1' }}>
                <OwnedPetCard pet={pet} />
              </GridItem>
            </Link>
          ))
        ) : null}
      </SimpleGrid>
      {data?.userOwnedPets.hasMore && (
        <Button
          rightIcon={<BsThreeDots />}
          w='fit-content'
          onClick={fetchMorePets}
        >
          Load More
        </Button>
      )}
      <Modal
        isOpen={!!router.query.petId}
        onClose={() =>
          router.push(`/profile/${userId}`, `/profile/${userId}`, {
            shallow: true,
          })
        }
        size={'6xl'}
        closeOnEsc
      >
        <ModalOverlay />
        <ModalContent>
          {router.query.petId && (
            <UserPetContainer petId={parseInt(router.query.petId as string)} />
          )}

          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </VStack>
  );
};
export default OwnedPetsGrid;
