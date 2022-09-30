import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useModal } from '../../../hooks/index.js';
import { getChannelsNames } from '../../../utils/index.js';
import {
  FormBase, FormTextGroup, FormSubmitButton, ModalCancelButton, ModalButtonsGroup,
} from '../../Layouts/Form.jsx';

const ModalForm = ({ initialValues, action, btnVariant }) => {
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
      dispatch(action(values.name.trim()));
      handleCloseModal();
    } catch (err) {
      toast.error(t('toast.network'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={schema}
    >
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
  );
};

export default ModalForm;
