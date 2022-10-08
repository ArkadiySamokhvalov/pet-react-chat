import React, { useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

const Header = () => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const { user, logOut } = auth;
  const currentLanguage = localStorage.getItem('language') === 'En' ? 'Ru' : 'En';
  const [language, setLanguage] = useState(currentLanguage);

  const handleChangeLanguage = () => {
    const nextLanguage = language === 'En' ? 'Ru' : 'En';
    localStorage.setItem('language', language);
    i18n.changeLanguage(language.toLowerCase());
    setLanguage(nextLanguage);
  };

  return (
    <header className="header container-fluid">
      <Navbar expand="lg" className="d-flex justify-content-between container-lg px-0">
        <Navbar.Brand href={routes.homePagePath()} className="m-0">React Chat</Navbar.Brand>
        <div>
          <Button
            variant="primary"
            onClick={handleChangeLanguage}
          >
              {t('local')}
          </Button>
          {user
            && <Button
              variant="outline-primary"
              className="ms-3"
              onClick={logOut}
            >
              {t('logout')}
            </Button>
          }
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
