import { SearchIcon } from '@chakra-ui/icons';
import { Box, HStack } from '@chakra-ui/layout';
import { Button, IconButton, Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { GoPlus, GoSettings } from 'react-icons/go';
const variants = {
  closed: {
    opacity: 0,
    x: '98%',
    y: '-100%',
  },
  open: {
    opacity: 1,
    x: '0',
    y: '-100%',
  },
};

export const PostsOptions: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <HStack
      justify='flex-end'
      w='100%'
      position='relative'
      wrap={['wrap', 'unset']}
      sx={{
        rowGap: '1rem',
      }}
    >
      <Box
        position='relative'
        w='100%'
        display='flex'
        align='flex-start'
        justify='flex-start'
        overflow='hidden'
      >
        <IconButton
          aria-label='Search Icon'
          icon={<SearchIcon />}
          colorScheme='gray'
          ml='auto'
          onClick={toggleShowOptions}
          zIndex={2}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: '90%',
            height: '100%',
            top: '100%',
          }}
          animate={showOptions ? 'open' : 'closed'}
          variants={variants as any}
        >
          <Input
            w='100%'
            shadow='base'
            variant='filled'
            placeholder='Search for post title, pet type or just description'
            zIndex={1}
          />
        </motion.div>
      </Box>

      <Button
        aria-label='Report Missing Pet'
        colorScheme='gray'
        leftIcon={<GoSettings />}
        minW='92px'
      >
        Filters
      </Button>
      <Button
        leftIcon={<GoPlus />}
        aria-label='Report Missing Pet'
        colorScheme='teal'
        minW='128px'
      >
        New Post
      </Button>
    </HStack>
  );
};
