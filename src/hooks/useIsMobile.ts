import { useState, useEffect } from 'react';
import { debounce } from 'utils/debounce.util';

const checkIsMobile = () => {
  return window.innerWidth <= 768;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    handleResize();

    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return isMobile;
};
