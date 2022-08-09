import { useQuery } from '@apollo/client';
import {
  Divider,
  Heading,
  ModalProps,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import {
  MissingPostQuery,
  UserContactInfoQuery,
  UserContactInfoQueryVariables,
} from 'generated/graphql';
import gql from 'graphql-tag';
import React from 'react';
import { LoadingComponent } from '../../common/loading/LoadingSpinner';
import GenericModal from '../CustomModal';

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
  const query = gql`
          query GetUserInfo($userId: Int!) {
            user(id: $userId) {
              id
              displayName
              ${missingPost?.showEmail ? 'email' : ''}
              ${missingPost?.showPhoneNumber ? 'phone' : ''}
            }
          }
        `;
  const { data, loading } = useQuery<
    UserContactInfoQuery,
    UserContactInfoQueryVariables
  >(query, { variables: { userId: missingPost!.user.id } });

  const textColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <VStack
            w='100%'
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            py={3}
          >
            <Heading size='md'> Contact Information</Heading>
            <Text textAlign={'left'} fontWeight={'medium'} textStyle={'p2'}>
              If you got any information about this missing/found pet, please
              contact the post author using one of the following methods.
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
              alignItems='flex-start'
              spacing={4}
              divider={<Divider w='90%' />}
            >
              {missingPost?.showPhoneNumber && data.user.phone && (
                <VStack alignItems={'flex-start'}>
                  <Heading fontWeight={'medium'} size='xs' opacity={0.5}>
                    Phone Number
                  </Heading>
                  <Text
                    as='a'
                    href={`tel:${data.user.phone}`}
                    textStyle={'p1'}
                    color={textColor}
                  >
                    📞 {data.user?.phone}
                  </Text>
                </VStack>
              )}
              {missingPost?.showEmail && (
                <VStack w='100%' alignItems='flex-start'>
                  <Heading fontWeight={'medium'} size='xs' opacity={0.5}>
                    Email Address
                  </Heading>
                  <Text
                    as='a'
                    href={`mailto:${data.user?.email}?subject= Paaws - Missing/Found Pet Report`}
                    textStyle={'p1'}
                    color={textColor}
                  >
                    📬 {data.user?.email}
                  </Text>
                </VStack>
              )}
            </VStack>
          ) : null}
        </VStack>
      }
      footer={<div />}
      modalProps={{ size: 'lg' } as ModalProps}
    />
  );
};
export default ContactInfoModal;
