import Image, { ImageProps } from 'next/image';
import React, { useEffect, useState } from 'react';
export const LazyCatLoadingComponent: React.FC<{
  imageProps?: ImageProps;
}> = ({ imageProps }): JSX.Element | null => {
  /*
   Code that is only supposed to run in the browser should be executed inside useEffect.
   That's required because the first render should match the initial render of the server.
   If you manipulate that result it creates a mismatch and React won't be able to hydrate the page successfully.
   When you run browser only code (like trying to access window) inside useEffect, it will happen after hydration 👍 */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Image
      src={'/illustrations/loading-lazy-cat.gif'}
      width={'800px'}
      height={'250px'}
      objectFit='contain'
      alt='Loading'
      {...imageProps}
    />
  ) : null;
};
