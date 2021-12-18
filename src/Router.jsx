/**
 * Router React Component which will guide users to correct page based on the
 *   requested URL. Used HashRouter for easier deployment on GitHub Pages.
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import NotSupported from './pages/NotSupported/NotSupported';
import '../styles/global.css';

/**
 * Check for browser's functionality and return whether browser supports the
 *   page or not
 *
 * @return {boolean} Whether the user's browser supports the site or not
 */
const checkBrowser = () => {
  // Check for CSS.supports function
  if (!CSS.supports) {
    return false;
  }

  // Check for CSS animation
  if (!CSS.supports('transform: rotate(360deg)')) {
    return false;
  }

  // Check for CSS Grid
  if (
    !CSS.supports('display: grid') ||
    !CSS.supports(
      'grid-template-columns: repeat(auto-fill, minmax(280px, 500px))'
    ) ||
    !CSS.supports('column-gap: 1.25em') ||
    !CSS.supports('row-gap: 2.5em')
  ) {
    return false;
  }

  // Check for CSS Flex
  if (
    !CSS.supports('display: flex') ||
    !CSS.supports('justify-content: center')
  ) {
    return false;
  }

  // Supported browser
  return true;
};

/**
 * React functional component for Router
 *
 * @return {React.ReactElement} A ReactElement referring Router which needs to
 *   guide users to the correct screen.
 */
const Router = () => {
  // State
  const [browserSupport, setBrowserSupport] = React.useState(false);

  // Check for browser functionality
  React.useEffect(() => {
    setBrowserSupport(checkBrowser());
  }, []);

  return (
    <React.StrictMode>
      {browserSupport ? (
        <HashRouter>
          <Routes>
            <Route path="/movie/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </HashRouter>
      ) : (
        <NotSupported />
      )}
    </React.StrictMode>
  );
};

export default Router;
