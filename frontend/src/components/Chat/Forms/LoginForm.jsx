import React from 'react';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';

import routes from '../../../routes.js';
import {
  FormAuth, FormUsernameGroup, FormSubmitButton, FormPassGroup,
} from '../../Layouts/Form.jsx';

const LoginForm = () => {
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
  };

  const schema = object({
    username: string().required(t('form.required')),
    password: string().required(t('form.required')),
  });

  return (
    <FormAuth initialValues={initialValues} schema={schema} path={routes.loginPath()} error={401}>
      <FormUsernameGroup/>
      <FormPassGroup name="password" />
      <FormSubmitButton classes="w-100 btn-lg">
        {t('login.submit')}
      </FormSubmitButton>
    </FormAuth>
  );
};

export default LoginForm;
