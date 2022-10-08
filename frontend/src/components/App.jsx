import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAuth } from '../hooks/index.js';
import { WindowWidthContext } from '../contexts/index.js';
import routes from '../routes.js';

import Header from './Layouts/Header.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import Modals from './Chat/Modals/Modals.jsx';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SignupPage />} />
          <Route path={routes.homePagePath()} element={<PrivateOutlet />}>
            <Route path="" element={<HomePage />} />
          </Route>
        </Routes>

        <Modals />

        <ToastContainer />
      </BrowserRouter>
    </WindowWidthContext.Provider>
  );
};

export default App;
