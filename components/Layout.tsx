import { Box, Flex, useColorMode } from '@chakra-ui/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Footer from './Footer';
import NavBar from './NavBar';

interface containerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}
//Container will be the main container of each page in the app

const sizes = {
  sm: '300px',
  md: '600px',
  lg: '1048px',
  xl: '1440px',
  'full-width': '100%',
};
export const Layout = ({
  children,
  className,
  title = 'Paaws',
}: containerProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: 'white', dark: 'gray.900' };

  const color = { light: 'gray.700', dark: 'white' };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Flex
        className={styles.container + ` ${className}`}
        px={['5%', '8%', 120]}
        direction='column'
        alignItems='center'
        justifyContent='flex-start'
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        height='100%'
      >
        <NavBar />
        <Box className={styles.main}>{children}</Box>
        <Footer />
      </Flex>
    </>
  );
};
