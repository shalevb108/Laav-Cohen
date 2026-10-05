import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls back to the top of the page on every route change, so switching tabs
// in the navbar (or any navigation) always starts from the top.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
