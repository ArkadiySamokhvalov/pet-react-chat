import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import routes from '../../routes.js';
import { Main } from '../Layouts/Main.jsx';
import Page from '../Layouts/Page.jsx';
import LoginForm from '../Chat/Forms/LoginForm.jsx';
import registrationImg from '../../assets/img/registration.jpg';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Main>
      <Page img={registrationImg}>
        <h1 className="mb-4 text-center">{t('login.authorization')}</h1>

        <LoginForm />

        <div className="text-center mt-3">
          <span className="d-inline-block me-1">{t('login.notAccount')}</span>
          <Link to={routes.signupPagePath()}>{t('signup.registration')}</Link>
        </div>
      </Page>
    </Main>
  );
};

export default Login;
