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

import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import HomePage from './HomePage.jsx';

import { AuthContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  return (
    <AuthContext.Provider value={{
      logIn, user,
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
    <main className="container-fluid h-100">
      <Row className="justify-content-center align-items-md-center h-100">
        <Col xs="12" md="10" lg="8" xxl="6">
          <Card className="card-shadow-sm">
            <Card.Body className="card-body p-5">
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
  </AuthProvider>
);

export default App;
