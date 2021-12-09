import { Box } from '@chakra-ui/react';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { fallbackSrc } from 'utils/constants';
import ImageWithFallback from './ImageWithFallback';

interface CustomCarouselProps {
  images: string[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
  return (
    <Carousel
      showArrows
      showThumbs
      className='carousel-container'
      renderThumbs={(children) =>
        children.map((child) => (
          <Box
            css={{
              '& > *': {
                borderRadius: '0',
                border: '0 !important',
                padding: '0 ',
                margin: '0 ',
                width: '80px',
                height: 'fit-content',
              },
            }}
          >
            {child}
          </Box>
        ))
      }
    >
      {images.map((url, index) => (
        <Box
          borderRadius={'6px'}
          boxShadow={'md'}
          overflow={'hidden'}
          id={url + index}
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
