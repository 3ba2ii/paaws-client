import { CloseIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/layout';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Tooltip,
} from '@chakra-ui/react';
import { DateFilters, LocationFilters } from 'generated/graphql';
import React from 'react';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';

export const ActiveTagsComponent: React.FC<{
  type: 'date' | 'location';
  filters: [DateFilters | LocationFilters];
  handleDeleteFilter: (type: 'date' | 'location') => void;
}> = ({ type, filters, handleDeleteFilter }) => {
  return (
    <HStack>
      {filters.map((filter) => (
        <Tag colorScheme={'gray'} boxShadow={'base'} key={filter}>
          <TagLeftIcon
            boxSize={'10px'}
            as={type === 'date' ? FiClock : FiMapPin}
          />
          <TagLabel>{capitalizeTheFirstLetterOfEachWord(filter)}</TagLabel>
          <Tooltip label='Delete' placement='top'>
            <TagRightIcon
              boxSize={'8px'}
              as={CloseIcon}
              cursor={'pointer'}
              onClick={() => handleDeleteFilter(type)}
            />
          </Tooltip>
        </Tag>
      ))}
    </HStack>
  );
};
