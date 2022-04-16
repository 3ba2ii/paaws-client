import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { Carousel, CarouselProps } from 'react-responsive-carousel';
import { fallbackSrc } from 'utils/constants';
import ImageWithFallback from './ImageWithFallback';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

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
  console.log(`🚀 ~ file: CustomCarousel.tsx ~ line 16 ~ images`, images);
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
