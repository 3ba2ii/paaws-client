import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export const MapLoadingComponent: React.FC = () => (
  <Box
    display={'block'}
    position={'absolute'}
    top='50%'
    left='50%'
    transform={'translate(-50%, -50%)'}
    textAlign='center'
  >
    <motion.span
      style={ballStyle}
      transition={bounceTransition}
      animate={{
        y: ['0%', '-100%'],
      }}
    >
      🌍
    </motion.span>
    <Text>Loading Google Maps for you...</Text>
  </Box>
);
const bounceTransition = {
  y: {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeOut',
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: 'easeOut',
    repeatDelay: 0.8,
  },
};
const ballStyle = {
  display: 'block',
  background: 'transparent',
  fontSize: '2.5rem',
};
