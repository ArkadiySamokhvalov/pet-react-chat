import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

const Header = () => {
  const auth = useAuth();
  const { user, logOut } = auth;

  return (
    <header className="header container-fluid">
      <Navbar expand="lg" className="d-flex justify-content-between container-xxl">
        <Navbar.Brand href={routes.homePagePath()}>React Chat</Navbar.Brand>
        {user
          && <Button
            variant="outline-primary"
            onClick={logOut}
          >
            Log out
          </Button>
        }
      </Navbar>
    </header>
  );
};

export default Header;
