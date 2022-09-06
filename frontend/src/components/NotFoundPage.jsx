import React from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import notFoundImg from '../assets/img/notFound.jpg';

const NotFoundPage = () => (
  <Row className="justify-content-between align-content-center">
    <Col xs="12" md="6" className="mb-3 mb-md-0">
      <img src={notFoundImg} className="img-fluid d-block mx-auto" alt="" />
    </Col>
    <Col xs="12" md="6" className="error-template d-flex flex-column justify-content-center">
      <h1 className="mb-4 text-center">No results found</h1>
      <div className="error-details mb-3 text-center">
        Sorry, an error has occured, Requested page not found!
      </div>
      <div className="error-actions">
        <a href="/" className="btn btn-outline-primary btn-lg w-100">
          Back to home
        </a>
      </div>
    </Col>
  </Row>
);

export default NotFoundPage;
