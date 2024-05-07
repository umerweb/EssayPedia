import { useEffect } from 'react';

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return null; // This component doesn't render anything
};

export default ScrollToTopOnMount;
