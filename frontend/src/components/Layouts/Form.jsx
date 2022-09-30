import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../routes.js';
import { FormContext, AuthErrorContext } from '../../contexts/index.js';
import {
  useForm, useModal, useAuth, useAuthError,
} from '../../hooks/index.js';
import { capitalizeFirstLetter } from '../../utils/index.js';

export const FormBase = ({
  initialValues, onSubmit, validationSchema, children,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
  <Form noValidate onSubmit={formik.handleSubmit}>
    <FormContext.Provider value={formik}>
        {children}
    </FormContext.Provider>
  </Form>
  );
};

export const FormAuth = ({
  initialValues, schema, path, error, children,
}) => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const { from } = location.state || { from: { pathname: routes.homePagePath() } };

  const handleSubmitForm = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setAuthError(null);
      const { data } = await axios.post(path, values);
      logIn(data);
      navigate(from);
    } catch (err) {
      if (err.response?.status === error) {
        setAuthError(t(`errors.${error}`));
      } else {
        toast.error(t('errors.network'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthErrorContext.Provider value={authError}>
      <FormBase
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={schema}
      >
        {children}
      </FormBase>
    </AuthErrorContext.Provider>
  );
};

export const FormUsernameGroup = () => {
  const formik = useForm();
  const authError = useAuthError();
  const {
    values,
    errors,
    touched,
    handleChange,
  } = formik;
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Control
        size="lg"
        name="username"
        type="text"
        placeholder={t('form.username')}
        autoComplete="on"
        required="required"
        onChange={handleChange}
        value={values.username}
        isValid={touched.username && !errors.username && !authError}
        isInvalid={(touched.username && errors.username) || authError}
        ref={inputRef}
      />
      <Form.Control.Feedback type="invalid">
        {touched.username && errors.username}
        {authError}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const FormPassGroup = ({ name }) => {
  const formik = useForm();
  const authError = useAuthError();
  const {
    values,
    errors,
    touched,
    handleChange,
  } = formik;
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3 position-relative" controlId={`form${capitalizeFirstLetter(name)}`}>
      <Form.Control
        size="lg"
        name={name}
        type={show ? 'text' : 'password'}
        placeholder={t(`form.${name}`)}
        autoComplete="on"
        required="required"
        onChange={handleChange}
        value={values[name]}
        isValid={touched[name] && !errors[name] && !authError}
        isInvalid={(touched[name] && errors[name]) || authError}
      />

      <Button
        variant="link"
        className="border-0 shadow-none btn-show"
        onClick={() => setShow(!show)}
      >
        <span className="visually-hidden">
          {t(`form.show${capitalizeFirstLetter(name)}`)}
        </span>
        <span className={ show ? 'icon-eye' : 'icon-eye-blocked'} />
      </Button>

      <Form.Control.Feedback type="invalid">
        {touched[name] && errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const FormTextGroup = ({ name, classes, feedback = true }) => {
  const formik = useForm();
  const {
    values,
    errors,
    touched,
    handleChange,
  } = formik;
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      <Form.Control
        name={name}
        type="text"
        placeholder={t(`form.${name}`)}
        autoComplete="on"
        required="required"
        className={classes}
        isValid={touched[name] && !errors[name]}
        isInvalid={touched[name] && errors[name]}
        onChange={handleChange}
        value={values[name]}
        ref={inputRef}
        onFocus={() => inputRef.current.select()}
      />

      <Form.Control.Feedback type="invalid" className={feedback ? 'w-100' : 'd-none'}>
        {touched[name] && errors[name]}
      </Form.Control.Feedback>
    </React.Fragment>
  );
};

export const FormSubmitButton = ({ children, btnVariant, classes }) => {
  const formik = useForm();
  const { isSubmitting } = formik;

  return (
    <Button
    variant={btnVariant || 'outline-primary'}
    className={classes}
    type="submit"
    disabled={isSubmitting}
  >
    {children}
  </Button>
  );
};

export const ModalCancelButton = ({ btnVariant }) => {
  const handleCloseModal = useModal();
  const { t } = useTranslation();

  return (
    <Button
    variant={ btnVariant || 'secondary' }
    className="border-0 me-3"
    onClick={() => handleCloseModal()}
  >
    {t('modals.cancel')}
  </Button>
  );
};

export const ModalButtonsGroup = ({ children }) => (
  <div className="d-flex align-itms-center justify-content-end mt-3">
    {children}
  </div>
);
