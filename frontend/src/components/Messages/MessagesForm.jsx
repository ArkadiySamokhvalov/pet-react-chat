import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import { createMessage } from '../../slices/messagesSlice.js';

// eslint-disable-next-line react/display-name
const MessagesForm = React.forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        dispatch(createMessage(values.message.trim())).unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        resetForm({ values: '' });
        setSubmitting(false);
      }
    },
    validationSchema: object({
      message: string().required(),
    }),
  });
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
      onSubmit={handleSubmit}
    >
      <Form.Group className="d-flex py-1 border rounded-2">
        <Form.Control
          name="message"
          type="text"
          placeholder="Enter your message"
          aria-label="New message"
          autoComplete="on"
          required="required"
          className="border-0 ps-3"
          onChange={handleChange}
          value={values.message}
          isValid={touched.message && !errors.message}
          isInvalid={touched.message && errors.message}
          ref={ref}
        />

        <Button
          variant="link"
          className="btn-group-vertical border-0 text-decoration-none"
          type="submit"
          disabled={isSubmitting}
        >
          <span className="visually-hidden">Submit</span>
          <span className="icon-arrow-right" />
        </Button>
      </Form.Group>
    </Form>
  );
});

export default MessagesForm;
