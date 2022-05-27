import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import styles from 'styles/Home.module.css';
import Footer from './Footer';
import NavBar from '../navbar/Navbar';

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  includeFooter?: boolean;
  includeNavbar?: boolean;
  layoutProps?: FlexProps;
  childrenProps?: BoxProps;
}
//Container will be the main container of each page in the app

export const Layout = ({
  children,
  className,
  title = 'Paaws',
  layoutProps,
  childrenProps,
  includeFooter = true,
  includeNavbar = true,
}: ContainerProps) => {
  const { colorMode } = useColorMode();

  const navbarBgColor = useColorModeValue('white', 'inherit');

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
        px={['3%', '3%', '3%', '3%', '150px']}
        direction='column'
        alignItems='center'
        justifyContent='flex-start'
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        w='100%'
        h='100%'
        {...layoutProps}
      >
        {includeNavbar && (
          <Box
            px='inherit'
            bg={navbarBgColor}
            zIndex={50}
            w='100%'
            h='84px'
            position={'fixed'}
            top='0'
            boxShadow={'sm'}
          >
            <NavBar />
          </Box>
        )}
        <Box
          className={styles.main}
          mt={'6rem'}
          w='100%'
          maxW='1500px'
          {...childrenProps}
        >
          {children}
        </Box>
        {includeFooter && (
          <Box w='100%'>
            <Footer />
          </Box>
        )}
      </Flex>
    </>
  );
};
