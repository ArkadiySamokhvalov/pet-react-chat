import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  Row, Col, Card,
} from 'react-bootstrap';
import socketio from 'socket.io-client';

import { AuthContext, SocketContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

import Header from './Header/Header.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import HomePage from './HomePage.jsx';
import Modals from './Modals/Modals.jsx';

const socket = socketio.connect('http://localhost:3000');

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider value={{
      logIn, logOut, getAuthHeader, user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <SocketContext.Provider value={socket}>
      <Header />

      <main className="container-xxl h-100 px-0 mt-3 p-sm-3">
        <Row className="h-100 justify-content-center align-items-center">
          <Col>
            <Card className="card-shadow-sm">
              <Card.Body className="card-body">
                <BrowserRouter>
                  <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path={routes.loginPagePath()} element={<LoginPage />} />
                    <Route path={routes.signupPagePath()} element={<SignupPage />} />
                    <Route path={routes.homePagePath()} element={<PrivateOutlet />}>
                      <Route path="" element={<HomePage />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>

      <Modals />
    </SocketContext.Provider>
  </AuthProvider>
);

export default App;
