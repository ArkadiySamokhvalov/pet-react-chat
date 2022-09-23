import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [authError, setAuthError] = useState();
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthError();
      try {
        setSubmitting(true);
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: routes.homePagePath() } };
        navigate(from);
      } catch (err) {
        toast.error(t('toast.network'));

        if (err.response?.status === 401) {
          inputRef.current.select();
          setAuthError(t('errors.401'));
        }
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: object({
      username: string().required(t('login.required')),
      password: string().required(t('login.required')),
    }),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Control
          size="lg"
          name="username"
          type="username"
          placeholder={t('login.username')}
          autoComplete="on"
          required="required"
          onChange={handleChange}
          value={values.username}
          isValid={touched.username && !errors.username && !authError}
          isInvalid={(touched.username && errors.username) || authError}
          ref={inputRef}
        />
        <Form.Control.Feedback type="invalid">
          {authError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 position-relative" controlId="formPassword">
        <Form.Control
          size="lg"
          name="password"
          type={passwordShown ? 'text' : 'password'}
          placeholder={t('login.password')}
          autoComplete="on"
          required="required"
          onChange={handleChange}
          value={values.password}
          isValid={touched.password && !errors.password && !authError}
          isInvalid={touched.password && errors.password}
        />
        <Button
          variant="link"
          className="border-0 shadow-none btn-show"
          onClick={() => setPasswordShown(!passwordShown)}
        >
          <span className="visually-hidden">{t('login.showPassword')}</span>
          <span className={ passwordShown ? 'icon-eye' : 'icon-eye-blocked'} />
        </Button>
        <Form.Control.Feedback type="invalid">
          {touched.password && errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="outline-primary"
        className="w-100 btn-lg"
        type="submit"
        disabled={isSubmitting}
      >
        {t('login.submit')}
      </Button>
    </Form>
  );
};

export default LoginForm;
