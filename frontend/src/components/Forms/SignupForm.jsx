import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

YupPassword(yup);

const SignupForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [authError, setAuthError] = useState([]);
  const [passwordShown, setPasswordShown] = useState(null);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthError();
      try {
        const response = await axios.post(routes.signupPath(), values);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: routes.homePagePath() } };
        navigate(from);
      } catch (err) {
        if (err.response?.status === 409) {
          inputRef.current.select();
          setAuthError(t('errors.409'));
        }
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: yup.object({
      username: yup.string().required(t('login.required'))
        .min(3, t('signup.usernameConstraints'))
        .max(20, t('signup.usernameConstraints')),
      password: yup.string().required(t('login.required'))
        .min(6, t('signup.passMin'))
        .minLowercase(1, t('signup.passMinLowercase'))
        .minUppercase(1, t('signup.passMinUppercase'))
        .minNumbers(1, t('signup.passMinNumbers'))
        .minSymbols(1, t('signup.passMinSymbols')),
      confirmPassword: yup.string().required(t('signup.required'))
        .oneOf([yup.ref('password'), null], t('signup.mustMutch')),
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
          className=""
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

      <Form.Group className="mb-3 position-relative" controlId="formPassword">
        <Form.Control
          size="lg"
          name="confirmPassword"
          type={confirmPasswordShown ? 'text' : 'password'}
          placeholder={t('signup.confirmPassword')}
          autoComplete="on"
          required="required"
          onChange={handleChange}
          value={values.confirmPassword}
          isValid={touched.confirmPassword && !errors.confirmPassword && !authError}
          isInvalid={touched.confirmPassword && errors.confirmPassword}
        />
        <Button
          variant="link"
          className="border-0 shadow-none btn-show"
          onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}
        >
          <span className="visually-hidden">{t('signup.showConfirmPassword')}</span>
          <span className={ confirmPasswordShown ? 'icon-eye' : 'icon-eye-blocked'} />
        </Button>
        <Form.Control.Feedback type="invalid">
          {touched.confirmPassword && errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="outline-primary"
        className="w-100 btn-lg"
        type="submit"
        disabled={isSubmitting}
      >
        {t('signup.submit')}
      </Button>
    </Form>
  );
};

export default SignupForm;
