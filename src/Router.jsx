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

/**
 * React functional component for Router
 *
 * @return {React.ReactElement} A ReactElement referring Router which needs to
 *   guide users to the correct screen.
 */
const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
