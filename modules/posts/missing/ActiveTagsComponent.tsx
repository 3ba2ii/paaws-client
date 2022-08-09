import { CloseIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/layout';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Tooltip,
} from '@chakra-ui/react';
import { SortingOrder } from 'generated/graphql';
import React from 'react';
import { IconType } from 'react-icons';
import {
  FiArrowDown,
  FiArrowUp,
  FiClock,
  FiFilter,
  FiMapPin,
} from 'react-icons/fi';
import { FiltersTypes, FiltersTypeString } from 'types';
import { capitalizeFirstLetterOfEachWord } from 'utils/helpers/capitalizeString';

export const ActiveTagsComponent: React.FC<{
  type: FiltersTypeString;
  filters: [FiltersTypes];
  handleDeleteFilter: (type: FiltersTypeString) => void;
}> = ({ type, filters, handleDeleteFilter }) => {
  const TagIcon: React.FC = () => {
    let icon: IconType;
    switch (type) {
      case 'date':
        icon = FiClock;
        break;
      case 'location':
        icon = FiMapPin;
        break;
      case 'order':
        icon = filters[0] === SortingOrder.Ascending ? FiArrowUp : FiArrowDown;
        break;
      default:
        icon = FiFilter;
    }

    return <TagLeftIcon width={'12px'} as={icon} alignSelf={'center'} px={0} />;
  };
  return (
    <HStack>
      {filters.map((filter) => (
        <Tag colorScheme={'gray'} boxShadow={'base'} key={filter}>
          <TagIcon />
          <TagLabel>{capitalizeFirstLetterOfEachWord(filter)}</TagLabel>
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
