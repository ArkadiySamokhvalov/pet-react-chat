import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

import Header from './Layouts/Header.jsx';
import Main from './Layouts/Main.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import Modals from './Chat/Modals/Modals.jsx';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <Header />

    <Main>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path={routes.signupPagePath()} element={<SignupPage />} />
        <Route path={routes.homePagePath()} element={<PrivateOutlet />}>
          <Route path="" element={<HomePage />} />
        </Route>
      </Routes>
    </Main>

    <Modals />

    <ToastContainer />
  </BrowserRouter>
);

export default App;
