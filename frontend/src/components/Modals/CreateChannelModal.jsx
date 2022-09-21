import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import { useModal } from '../../hooks/index.js';
import { createChannelRequest } from '../../slices/channelsSlice.js';
import { getChannelsNames } from '../../utils/index.js';
import ModalBase from './ModalBase.jsx';
import ModalForm from './ModalForm.jsx';

const CreateChannelModal = () => {
  const dispatch = useDispatch();
  const handleCloseModal = useModal();
  const title = 'Create channel';
  const btnVariant = 'success';

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        dispatch(createChannelRequest({ name: values.name }));
        handleCloseModal();
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: object({
      name: string().required().notOneOf(getChannelsNames()),
    }),
  });

  return (
    <ModalBase title={title}>
      <ModalForm formik={formik} btnVariant={btnVariant}/>
    </ModalBase>
  );
};

export default CreateChannelModal;
