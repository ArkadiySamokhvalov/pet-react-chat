import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormContext } from '../../contexts/index.js';
import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';
import { changeLocation } from '../../utils/index.js';
import {
  FormBase, FormUsernameGroup, FormPassGroup, FormSubmitButton,
} from './FormBlocks.jsx';

YupPassword(yup);

const schema = (t) => yup.object({
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

const SignupForm = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmitForm = async (values, { setSubmitting }) => {
    try {
      setAuthError();
      const { data } = await axios.post(routes.signupPath(), values);
      auth.logIn(data);
      changeLocation(location, navigate, routes);
    } catch (err) {
      if (err.response?.status === 409) {
        setAuthError(t('errors.409'));
      } else {
        toast.error(t('toast.network'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleSubmitForm,
    validationSchema: schema(t),
  });

  return (
    <FormContext.Provider value={{ formik, authError }}>
      <FormBase>
        <FormUsernameGroup/>
        <FormPassGroup name="password" />
        <FormPassGroup name="confirmPassword" />
        <FormSubmitButton classes="w-100 btn-lg">
          {t('signup.submit')}
        </FormSubmitButton>
      </FormBase>
    </FormContext.Provider>
  );
};

export default SignupForm;
