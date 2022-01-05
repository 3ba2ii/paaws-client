import { CloseIcon } from '@chakra-ui/icons';
import { Box, List, ListItem } from '@chakra-ui/layout';
import {
  CloseButton,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FileRejection } from 'react-dropzone';
import s from 'styles/custom-dropzone.module.css';
import Image from 'next/image';

const PreviewComponent: React.FC<{
  values: [File];
  thumbnailIdx: number;
  handleThumbnailChange?: (idx: number) => void;
  handleChange: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}> = ({ values, thumbnailIdx, handleThumbnailChange, handleChange }) => {
  const clearAll = () => {
    handleChange([], []);
  };
  const deleteImage = (idx: number) => {
    const newImages = values.filter((_, index) => index !== idx);
    handleChange(newImages, []);
  };

  return (
    <List
      as='ul'
      className={s.preview_container}
      bg={useColorModeValue('#fafafa', 'gray.700')}
    >
      <Tooltip label='Clear'>
        <CloseButton
          pos='absolute'
          top='50%'
          transform='translateY(-50%)'
          right='10px'
          color='whiteAlpha.500'
          onClick={clearAll}
        />
      </Tooltip>
      {values.map((file: File, idx: number) => {
        const isThumbnail = idx === thumbnailIdx;
        const src = URL.createObjectURL(file) || null;
        return (
          <ListItem
            key={idx}
            className={`${s.preview_item} ${isThumbnail ? s.selected : ''}`}
            onClick={() => {
              handleThumbnailChange && handleThumbnailChange(idx);
            }}
            pos='relative'
          >
            <Tooltip
              hidden={!isThumbnail}
              label='This image will be used as a thumbnail'
              placement='top'
              hasArrow
              defaultIsOpen={isThumbnail}
            >
              {src ? (
                <Box>
                  <Image
                    src={src}
                    width={'100%'}
                    height={'100%'}
                    alt='Preview'
                  />
                </Box>
              ) : null}
            </Tooltip>
            <IconButton
              aria-label='Remove Media'
              pos='absolute'
              top='1px'
              right='1px'
              color='red.400'
              size='xs'
              fontSize={'8px'}
              variant='ghost'
              icon={<CloseIcon />}
              onClick={() => deleteImage(idx)}
              tabIndex={2}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default React.memo(PreviewComponent);
