import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormContext } from '../../contexts/index.js';
import { useModal } from '../../hooks/index.js';
import { getChannelsNames } from '../../utils/index.js';
import {
  FormBase, FormTextGroup, FormSubmitButton, ModalCancelButton, ModalButtonsGroup,
} from './FormBlocks.jsx';

const ModalForm = ({ btnVariant, action, initialState }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCloseModal = useModal();

  const schema = object({
    name: string()
      .required(t('form.required'))
      .notOneOf(getChannelsNames(), t('form.unique')),
  });

  const handleSubmitForm = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      dispatch(action(values.name));
      handleCloseModal();
    } catch (err) {
      toast.error(t('toast.network'));
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: handleSubmitForm,
    validationSchema: schema,
  });

  return (
    <FormContext.Provider value={{ formik }}>
      <FormBase>
        <Form.Group controlId="formName">
          <FormTextGroup name="name" classes="w-100" />
        </Form.Group>
        <ModalButtonsGroup>
          <ModalCancelButton/>
          <FormSubmitButton btnVariant={btnVariant}>
            {t('modals.submit')}
          </FormSubmitButton>
        </ModalButtonsGroup>
      </FormBase>
    </FormContext.Provider>
  );
};

export default ModalForm;
