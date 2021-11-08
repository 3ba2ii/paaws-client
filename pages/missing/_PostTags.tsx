import { Tag } from '@chakra-ui/react';
import { MissingPostTags } from 'generated/graphql';
import React from 'react';

const getColorProps = (tag: MissingPostTags) => {
  switch (tag) {
    case 'Missing':
      return { colorScheme: 'red' };
    case 'Found':
      return { colorScheme: 'blue' };
    case 'Urgent':
      return { colorScheme: 'red' };
    default:
      return '';
  }
};
export const PostTags: React.FC<{ tags: MissingPostTags[] }> = ({ tags }) => {
  return (
    <>
      {tags?.map((tag) => (
        <Tag
          key={tag}
          borderRadius='3'
          boxShadow='sm'
          fontSize='12px'
          fontWeight='semibold'
          size='sm'
          {...getColorProps(tag)}
        >
          {tag}
        </Tag>
      ))}
    </>
  );
};
