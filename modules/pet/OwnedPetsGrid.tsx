import {
  Button,
  Center,
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
import NotFound from 'components/errors/NotFound';
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
  if (loading) {
    return (
      <Center w='100%' h='100%' minH='500px'>
        <LoadingComponent progressProps={{ size: '28px' }} />
      </Center>
    );
  }

  if (!loading && (!data || !data?.userOwnedPets.ownedPets.length)) {
    return (
      <Center py={50}>
        <Heading size='md'>There is no owned pets for this user yet</Heading>
      </Center>
    );
  }
  return (
    <VStack w='100%'>
      <SimpleGrid
        w='100%'
        minChildWidth={['220px', '220px', '220px', 'calc(100% / 3.5)']}
        spacing='30px'
      >
        {data?.userOwnedPets.ownedPets?.map(({ pet, id }) => (
          <Link
            key={id}
            href={makeContextualHref({ petId: id })}
            as={`/pet/${id}`}
            shallow={true}
            scroll={false}
          >
            <GridItem w='100%' h='100%' css={{ aspectRatio: '1' }}>
              <OwnedPetCard pet={pet} />
            </GridItem>
          </Link>
        ))}
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
      {!!router.query.petId && (
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
              <UserPetContainer
                petId={parseInt(router.query.petId as string)}
              />
            )}

            <ModalCloseButton />
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};
export default OwnedPetsGrid;
