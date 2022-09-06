import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Row, Col, Card,
} from 'react-bootstrap';
import NotFoundPage from './NotFoundPage.jsx';
import Login from './Login.jsx';

const App = () => (
  <React.Fragment>
    <main className="container-fluid h-100">
      <Row className="justify-content-center align-items-md-center h-100">
        <Col xs="12" md="10" lg="8" xxl="6">
          <Card className="card-shadow-sm">
            <Card.Body
              className="card-body p-5">
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  </React.Fragment>
);

const Home = () => (<h1>Home</h1>);

export default App;
