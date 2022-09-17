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

const LoginForm = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        setSubmitting(true);
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: routes.homePagePath() } };
        navigate(from);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        }
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
      // .min(8)
      // .minLowercase(1)
      // .minUppercase(1)
      // .minNumbers(1)
      // .minSymbols(1),
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
          isValid={touched.username && !errors.username && !authFailed}
          isInvalid={(touched.username && errors.username) || authFailed}
          ref={inputRef}
        />
        <Form.Control.Feedback type="invalid">
          Invalid username or password
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          size="lg"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="on"
          required="required"
          onChange={handleChange}
          value={values.password}
          isValid={touched.password && !errors.password && !authFailed}
          isInvalid={touched.password && errors.password}
        />
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
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
