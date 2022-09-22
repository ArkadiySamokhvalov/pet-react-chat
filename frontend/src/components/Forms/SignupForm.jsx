import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';

import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

YupPassword(yup);

const SignupForm = () => {
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
          setAuthError(err.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: yup.object({
      username: yup.string().required()
        .min(3)
        .max(20),
      password: yup.string().required()
        .min(6)
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
      confirmPassword: yup.string().required()
        .oneOf([yup.ref('password'), null]),
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
          placeholder="Username"
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
          placeholder="Password"
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
          <span className="visually-hidden">Show Password</span>
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
          placeholder="Password confirmation"
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
          <span className="visually-hidden">Show Password Confirmation</span>
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
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
