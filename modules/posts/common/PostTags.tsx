import { Tag, TagProps } from '@chakra-ui/react';
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
export const PostTags: React.FC<{
  tags: MissingPostTags[];
  tagProps?: TagProps;
}> = ({ tags, tagProps }) => {
  return (
    <>
      {tags?.map((tag) => (
        <Tag
          key={tag}
          whiteSpace={'nowrap'}
          {...getColorProps(tag)}
          {...tagProps}
        >
          {tag}
        </Tag>
      ))}
    </>
  );
};
