import { Image, ImageProps, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import navbarStyles from 'styles/navbar.module.css';

interface LogoProps {
  imageProps?: ImageProps;
}
const Logo: React.FC<LogoProps> = ({ imageProps }) => {
  const logo = useColorModeValue('light', 'dark');

  return (
    <Link passHref href='/'>
      <Image
        tabIndex={0}
        role='img'
        className={navbarStyles['logo-container']}
        cursor='pointer'
        src={`/images/logo-${logo}.svg`}
        alt='paaws'
        maxW='90px'
        {...imageProps}
      />
    </Link>
  );
};
export default Logo;
