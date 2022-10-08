import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const Main = ({ children }) => (
  <main className="container-xxl h-100 px-0 mt-3 p-sm-3">
    <Row className="h-100 justify-content-center align-items-center">
      <Col>
        <Card>
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </main>
);

export default Main;
