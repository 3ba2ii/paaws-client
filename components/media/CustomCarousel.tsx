import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Carousel, CarouselProps } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { fallbackSrc } from 'utils/constants';
import ImageWithFallback from './ImageWithFallback';

interface ICarouselArrows {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  label: 'next' | 'previous';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CarouselArrows: React.FC<ICarouselArrows> = ({
  icon,
  label,
  onClick,
}: ICarouselArrows) => {
  return (
    <IconButton
      variant={'outline'}
      aria-label={label}
      icon={icon}
      onClick={onClick}
      borderRadius={'full'}
      pos='absolute'
      top='50%'
      left={label === 'previous' ? '16px' : 'unset'}
      right={label === 'next' ? '16px' : 'unset'}
      colorScheme='blackAlpha'
      size='sm'
      bg='whiteAlpha.600'
      border='none'
      boxShadow={'md'}
      zIndex={1}
      _hover={{ filter: 'brightness(80%)' }}
    />
  );
};
interface CustomCarouselProps {
  images: string[];
  renderThumbs?: boolean;
  boxProps?: BoxProps;
  carouselProps?: CarouselProps;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  images,
  boxProps,
  carouselProps,
}) => {
  return (
    <Carousel
      showArrows
      showThumbs
      className='carousel-container'
      renderThumbs={(children) =>
        children.map((child, index) => (
          <Box
            key={index}
            css={{
              '& > *': {
                borderRadius: '0',
                border: '0 !important',
                padding: '0 ',
                margin: '0 ',
                width: '70px',
                height: 'fit-content',
              },
            }}
          >
            {child}
          </Box>
        ))
      }
      renderArrowNext={(onClick, hasNext, label) =>
        hasNext && (
          <CarouselArrows
            icon={<BiChevronRight size='24px' />}
            label={'next'}
            onClick={onClick}
          />
        )
      }
      renderArrowPrev={(onClick, hasPrev, label) =>
        hasPrev && (
          <CarouselArrows
            icon={<BiChevronLeft size='24px' />}
            label={'previous'}
            onClick={onClick}
          />
        )
      }
      {...carouselProps}
    >
      {images.map((url, index) => (
        <Box
          w='100%'
          borderRadius={'6px'}
          boxShadow={'md'}
          overflow={'hidden'}
          key={url + index}
          {...boxProps}
        >
          <ImageWithFallback
            props={{
              src: url,
              width: '100px',
              height: '100%',
              objectFit: 'cover',
            }}
            fallbackSrc={fallbackSrc}
          />
        </Box>
      ))}
    </Carousel>
  );
};
export default CustomCarousel;
