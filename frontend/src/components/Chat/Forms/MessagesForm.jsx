import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { createMessage } from '../../../slices/messagesSlice.js';
import { generateEmoji } from '../../../utils/index.js';

const MessagesForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const inputRef = useRef();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const initialValues = {
    message: '',
  };

  const schema = object({
    message: string().required(t('form.required')),
  });

  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      console.log(values.message);
      dispatch(createMessage(values.message));
    } catch (err) {
      toast.error(t('error.sendMessage'));
      rollbar.error(t('error.sendMessage'), err);
    } finally {
      resetForm({ values: '' });
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema: schema,
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (chosenEmoji) {
      setFieldValue('message', `${inputRef.current.value}${generateEmoji(chosenEmoji)}`);
    }
  }, [chosenEmoji]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="d-flex py-1 border rounded-2">
        <Form.Control
          name='message'
          type="text"
          placeholder={t('form.message')}
          autoComplete="on"
          required="required"
          className="w-100 border-0 ps-3"
          isValid={touched.message && !errors.message}
          isInvalid={touched.message && errors.message}
          onChange={handleChange}
          value={values.message}
          ref={inputRef}
          onFocus={() => inputRef.current.select()}
        />

        <Dropdown>
          <Dropdown.Toggle
            drop="up"
            id="dropdownEmoji"
            className="btn-group-vertical border-0 text-decoration-none h-100"
            variant="link">
            <span className="icon-smile"/>
          </Dropdown.Toggle>

          <Dropdown.Menu className="p-0">
            <Picker
              // locale={language}
              data={data}
              onEmojiSelect={setChosenEmoji}
              theme="light"
            />
          </Dropdown.Menu>
        </Dropdown>

        <Button
          variant="link"
          className="btn-group-vertical border-0 text-decoration-none"
          type="submit"
          disabled={isSubmitting}
        >
          <span className="visually-hidden">{t('messages.submit')}</span>
          <span className="icon-arrow-right" />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessagesForm;
