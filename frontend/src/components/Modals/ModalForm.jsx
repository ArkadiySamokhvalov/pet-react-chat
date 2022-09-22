import React, { useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useModal } from '../../hooks/index.js';

const ModalForm = ({ formik, btnVariant }) => {
  const handleCloseModal = useModal();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <Form
      noValidate
      className="modal-form"
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter name"
          autoComplete="on"
          required="required"
          className="w-100"
          isValid={touched.name && !errors.name}
          isInvalid={touched.name && errors.name}
          onChange={handleChange}
          value={values.name}
          ref={ref}
          onFocus={() => ref.current.select()}
        />

        <Form.Control.Feedback type="invalid" className="mt-3">
          {touched.name && errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex align-itms-center justify-content-end mt-3">
        <Button
          variant="secondary"
          className="border-0 me-3"
          onClick={() => handleCloseModal()}
        >
          Cancel
        </Button>

        <Button
          variant={btnVariant}
          className="border-0"
          type="submit"
          disabled={isSubmitting}
        >
          Send
        </Button>
      </div>
    </Form>
  );
};

export default ModalForm;
