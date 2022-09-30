import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { createMessage } from '../../../slices/messagesSlice.js';
import { FormBase, FormSubmitButton, FormTextGroup } from '../../Layouts/Form.jsx';

const MessagesForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues = {
    message: '',
  };

  const schema = object({
    message: string().required(t('form.required')),
  });

  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      dispatch(createMessage(values.message.trim()));
    } catch (err) {
      toast.error(t('error.sendMessage'));
    } finally {
      resetForm({ values: '' });
      setSubmitting(false);
    }
  };

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={schema}
    >
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
  );
};

export default MessagesForm;
