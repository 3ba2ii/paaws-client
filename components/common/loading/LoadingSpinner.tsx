import { CircularProgress, CircularProgressProps } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const LoadingComponent: React.FC<{
  progressProps?: CircularProgressProps;
}> = ({ progressProps }): JSX.Element | null => {
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
    <CircularProgress
      size='20px'
      isIndeterminate
      color='gray.700'
      aria-label='Loading'
      {...progressProps}
    />
  ) : null;
};
