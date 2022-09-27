import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormContext } from '../../contexts/index.js';
import { createMessage } from '../../slices/messagesSlice.js';
import { FormBase, FormSubmitButton, FormTextGroup } from './FormBlocks.jsx';

const MessagesForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const schema = object({
    message: string().required(t('form.required')),
  });

  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      dispatch(createMessage(values.message.trim())).unwrap();
    } catch (err) {
      toast.error(t('error.sendMessage'));
    } finally {
      resetForm({ values: '' });
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmitForm,
    validationSchema: schema,
  });

  return (
    <FormContext.Provider value={{ formik }}>
      <FormBase>
        <Form.Group className="d-flex py-1 border rounded-2">
          <FormTextGroup name="message" classes="w-100 border-0 ps-3" feedback={false} />

          <FormSubmitButton
            btnVariant="link"
            classes="btn-group-vertical border-0 text-decoration-none"
          >
            <span className="visually-hidden">{t('messages.submit')}</span>
            <span className="icon-arrow-right" />
          </FormSubmitButton>
        </Form.Group>
      </FormBase>
    </FormContext.Provider>
  );
};

export default MessagesForm;
