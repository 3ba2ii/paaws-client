import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const ImageWithFallback: React.FC<{ props: ImageProps; fallbackSrc: string }> =
  ({ props, fallbackSrc }) => {
    const { src, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
      <Image
        {...rest}
        layout='responsive'
        src={imgSrc}
        alt='Loading Image'
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
      />
    );
  };

export default ImageWithFallback;
