import React from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useTranslation } from 'react-i18next';

import routes from '../../../routes.js';
import {
  FormAuth, FormUsernameGroup, FormPassGroup, FormSubmitButton,
} from '../../Layouts/Form.jsx';

YupPassword(yup);

const SignupForm = () => {
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const schema = yup.object({
    username: yup.string().required(t('form.required'))
      .min(3, t('form.usernameConstraints'))
      .max(20, t('form.usernameConstraints')),
    password: yup.string().required(t('form.required'))
      .min(6, t('form.passMin'))
      .minLowercase(1, t('form.passMinLowercase'))
      .minUppercase(1, t('form.passMinUppercase'))
      .minNumbers(1, t('form.passMinNumbers'))
      .minSymbols(1, t('form.passMinSymbols')),
    confirmPassword: yup.string().required(t('form.required'))
      .oneOf([yup.ref('password'), null], t('form.mustMutch')),
  });

  return (
    <FormAuth initialValues={initialValues} schema={schema} path={routes.signupPath()} error={409}>
      <FormUsernameGroup/>
      <FormPassGroup name="password" />
      <FormPassGroup name="confirmPassword" />
      <FormSubmitButton classes="w-100 btn-lg">
        {t('signup.submit')}
      </FormSubmitButton>
    </FormAuth>
  );
};

export default SignupForm;
