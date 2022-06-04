import { Box, Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import styles from 'styles/footer.module.css';

const Footer: React.FC = () => {
  return (
    <Box
      className={styles['footer-container'] + ' footer'}
      borderTopWidth='1px'
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <p className={styles['copyright']}>&copy;2021 Paaws Platform.</p>
      <ButtonGroup
        display={'flex'}
        sx={{ gap: '16px' }}
        colorScheme='blue'
        fontWeight={'normal'}
        variant='link'
        css={{ button: { fontSize: '14px' } }}
      >
        <Button>Terms</Button>
        <Button>Privacy</Button>
        <Button>Security</Button>
        <Button>Get In Touch</Button>
        <Button>Report a bug</Button>
      </ButtonGroup>
    </Box>
  );
};
export default Footer;
