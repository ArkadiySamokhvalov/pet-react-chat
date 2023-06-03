import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import routes from '../../routes.js';
import { Main } from '../Layouts/Main.jsx';
import Page from '../Layouts/Page.jsx';
import SignupForm from '../Chat/Forms/SignupForm.jsx';
import registrationImg from '../../assets/img/registration.jpg';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Main>
      <Page img={registrationImg}>
        <h1 className="mb-4 text-center">{t('signup.registration')}</h1>

        <SignupForm />

        <div className="text-center mt-3">
          <span className="d-inline-block me-1">{t('signup.alreadyRegistered')}</span>
          <Link to={routes.loginPagePath()}>{t('login.submit')}</Link>
        </div>
      </Page>
    </Main>
  );
};

export default Signup;
