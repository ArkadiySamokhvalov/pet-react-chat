import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useForm, useModal } from '../../hooks/index.js';
import { capitalizeFirstLetter } from '../../utils/index.js';

export const FormUsernameGroup = () => {
  const { formik, authError } = useForm();
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
  const { formik, authError } = useForm();
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
        isInvalid={touched[name] && errors[name]}
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
  const { formik } = useForm();
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
  const { formik } = useForm();
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

export const FormBase = ({ children }) => {
  const { formik } = useForm();

  const {
    handleSubmit,
  } = formik;

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {children}
    </Form>
  );
};
