import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../../routes.js';
import Page from '../Layouts/Page.jsx';
import LoginForm from '../Chat/Forms/LoginForm.jsx';
import registrationImg from '../../assets/img/registration.jpg';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Page img={registrationImg}>
      <h1 className="mb-4 text-center">{t('login.authorization')}</h1>

      <LoginForm />

      <div className="text-center mt-3">
        <span className="d-inline-block me-1">{t('login.notAccount')}</span>
        <a href={routes.signupPagePath()}>{t('signup.registration')}</a>
      </div>
    </Page>
  );
};

export default Login;
