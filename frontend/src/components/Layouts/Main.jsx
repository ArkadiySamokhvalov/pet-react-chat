import React from 'react';
import { Card } from 'react-bootstrap';

const Main = ({ children }) => (
  <main className="my-4 overflow-hidden rounded shadow container-fluid d-flex h-100 align-items-center">
    <Card className="container-lg">
      <Card.Body className="h-100">
        {children}
      </Card.Body>
    </Card>
  </main>
);

const MainChat = ({ children }) => (
  <main className="py-4 px-3 container-fluid">
    <Card className="container-lg h-100">
      <Card.Body className="h-100">
        {children}
      </Card.Body>
    </Card>
  </main>
);

export { Main, MainChat };
