import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import styles from '../styles/footer.module.css';

const Footer: React.FC = () => {
  return (
    <Box
      className={styles['footer-container'] + ' footer'}
      borderTopWidth='1px'
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <p className={styles['copyright']}>&copy;2021 Paaws Platform.</p>
      <ul className={styles['footer-list']}>
        <li>Terms</li>
        <li>Privacy</li>
        <li>Security</li>
        <li>Get In Touch</li>
        <li>Report a bug</li>
      </ul>
    </Box>
  );
};
export default Footer;
