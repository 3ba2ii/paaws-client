import { useQuery } from '@apollo/client';
import {
  Box,
  Divider,
  Heading,
  HStack,
  ModalProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  MissingPostQuery,
  UserContactInfoQuery,
  UserContactInfoQueryVariables,
  useUserContactInfoQuery,
} from 'generated/graphql';
import gql from 'graphql-tag';
import React from 'react';
import { LoadingComponent } from './common/loading/LoadingSpinner';
import GenericModal from './common/overlays/CustomModal';

interface ContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingPost: MissingPostQuery['missingPost']['missingPost'];
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({
  isOpen,
  onClose,
  missingPost,
}) => {
  if (!missingPost) return null;
  const { user, showEmail, showPhoneNumber } = missingPost;
  if (!showEmail && !showPhoneNumber) return null;
  const query = gql`
          query GetUserInfo($userId: Int!) {
            user(id: $userId) {
              id
              displayName
              ${showEmail ? 'email' : ''}
              ${showPhoneNumber ? 'phone' : ''}
            }
          }
`;
  const { data, loading } = useQuery<
    Partial<UserContactInfoQuery>,
    UserContactInfoQueryVariables
  >(query, { variables: { userId: user.id } });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <VStack w='100%' align={'flex-start'} justify={'flex-start'} py={3}>
            <Heading size='md'> Contact Information</Heading>
            <Text textAlign={'left'} fontWeight={'medium'} textStyle={'p2'}>
              If you got any information about this missing/found pet, please
              contact the post author on of the following methods.
            </Text>
          </VStack>
          <Divider />
        </>
      }
      body={
        <VStack w='100%' spacing={5}>
          {loading ? (
            <LoadingComponent />
          ) : data?.user ? (
            <VStack
              w='100%'
              align='flex-start'
              spacing={4}
              divider={<Divider w='90%' />}
            >
              {showPhoneNumber && data.user.phone && (
                <VStack align={'flex-start'}>
                  <Heading fontWeight={'medium'} size='xs' opacity={0.5}>
                    Phone Number
                  </Heading>
                  <Text
                    as='a'
                    href={`tel:${data.user.phone}`}
                    textStyle={'p1'}
                    color='whiteAlpha.800'
                  >
                    📞 {data.user?.phone}
                  </Text>
                </VStack>
              )}
              {showEmail && (
                <VStack w='100%' align='flex-start'>
                  <Heading fontWeight={'medium'} size='xs' opacity={0.5}>
                    Email Address
                  </Heading>
                  <Text
                    as='a'
                    href={`mailto:${data.user?.email}?subject= Paaws - Missing/Found Pet Report`}
                    textStyle={'p1'}
                    color='whiteAlpha.800'
                  >
                    📬 {data.user?.email}
                  </Text>
                </VStack>
              )}
            </VStack>
          ) : null}
        </VStack>
      }
      footer={<div></div>}
      modalProps={{ size: 'lg' } as ModalProps}
    />
  );
};
export default ContactInfoModal;
