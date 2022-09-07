import React from 'react';
import { Row, Col } from 'react-bootstrap';

import LoginForm from './LoginForm.jsx';
import registrationImg from '../assets/img/registration.jpg';

const Login = () => (
  <Row className="justify-content-between align-content-center">
    <Col xs="12" md="6" className="mb-3 mb-md-0">
      <img src={registrationImg} className="img-fluid d-block mx-auto" alt="" />
    </Col>
    <Col xs="12" md="6" className="d-flex flex-column justify-content-center">
      <h1 className="mb-4 text-center">Authorization</h1>
      <LoginForm />
    </Col>
  </Row>
);

export default Login;
