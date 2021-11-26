import { Box, Container, Flex, useColorMode } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Footer from './Footer';
import NavBar from './NavBar';

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  includeFooter?: boolean;
}
//Container will be the main container of each page in the app

export const Layout = ({
  children,
  className,
  title = 'Paaws',
  includeFooter = true,
}: ContainerProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: '#F8F8FA4D;', dark: 'gray.800' };

  const color = { light: 'gray.700', dark: 'white' };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Flex
        className={styles.container + ` ${className}`}
        px={['3%', '3%', '3%', '3%', '180px']}
        direction='column'
        alignItems='center'
        justifyContent='flex-start'
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        w='100%'
        h='100%'
      >
        <Box
          px='inherit'
          bg='inherit'
          zIndex={50}
          w='100%'
          position={'fixed'}
          h='84px'
          top='0'
          boxShadow={'sm'}
        >
          <NavBar />
        </Box>
        <Box className={styles.main} mt={'6rem'} w='100%' maxW='1500px'>
          {children}
        </Box>
        {includeFooter && <Footer />}
      </Flex>
    </>
  );
};
