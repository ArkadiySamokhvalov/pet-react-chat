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

import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import HomePage from './HomePage.jsx';
import Modals from './Modals/Modals.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider value={{
      logIn, getAuthHeader, user,
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

const socket = socketio.connect('http://localhost:3000');

const App = () => (
  <AuthProvider>
    <SocketContext.Provider value={socket}>
      <main className="container-fluid p-0">
        <Row className="justify-content-center">
          <Col xs="12" md="12" xxl="10" className="p-0 p-md-3">
            <Card className="card-shadow-sm mt-4 mt-md-0">
              <Card.Body className="card-body p-lg-3">
                <BrowserRouter>
                  <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path={routes.loginPagePath()} element={<LoginPage />} />
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
