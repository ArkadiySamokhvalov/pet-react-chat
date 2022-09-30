import React from 'react';
import { useTranslation } from 'react-i18next';

import Page from '../Layouts/Page.jsx';
import SignupForm from '../Chat/Forms/SignupForm.jsx';
import registrationImg from '../../assets/img/registration.jpg';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Page img={registrationImg}>
      <h1 className="mb-4 text-center">{t('signup.registration')}</h1>
      <SignupForm />
    </Page>
  );
};

export default Signup;
