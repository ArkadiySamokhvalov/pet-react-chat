import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormContext } from '../../contexts/index.js';
import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';
import {
  FormBase, FormUsernameGroup, FormSubmitButton, FormPassGroup,
} from './FormBlocks.jsx';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState();

  const schema = object({
    username: string().required(t('form.required')),
    password: string().required(t('form.required')),
  });

  const handleSubmitForm = async (values, { setSubmitting }) => {
    try {
      setAuthError();
      setSubmitting(true);
      const response = await axios.post(routes.loginPath(), values);
      auth.logIn(response.data);
      const { from } = location.state || { from: { pathname: routes.homePagePath() } };
      navigate(from);
    } catch (err) {
      if (err.response?.status === 401) {
        setAuthError(t('errors.401'));
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
    },
    onSubmit: handleSubmitForm,
    validationSchema: schema,
  });

  return (
    <FormContext.Provider value={{ formik, authError }}>
      <FormBase>
        <FormUsernameGroup/>
        <FormPassGroup name="password" />
        <FormSubmitButton classes="w-100 btn-lg">
          {t('login.submit')}
        </FormSubmitButton>
      </FormBase>
    </FormContext.Provider>
  );
};

export default LoginForm;
