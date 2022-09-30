import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Page = ({ img, children }) => (
  <Row className="justify-content-between align-content-center">
    <Col xs="12" md="6" className="mb-3 mb-md-0">
      <img src={img} className="img-fluid d-block mx-auto" alt="" />
    </Col>

    <Col xs="12" md="6" className="d-flex flex-column justify-content-center">
      {children}
    </Col>
  </Row>
);

export default Page;
