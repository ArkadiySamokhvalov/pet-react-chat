import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';

import { useModal } from '../../hooks/index.js';
import { renameChannelRequest } from '../../slices/channelsSlice.js';
import { getChannelsNames } from '../../utils/index.js';
import ModalBase from './ModalBase.jsx';
import ModalForm from './ModalForm.jsx';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleCloseModal = useModal();
  const { channel } = useSelector((state) => state.modals);
  const { id, name } = channel;
  const title = t('modals.renameTitle');
  const btnVariant = 'primary';

  const formik = useFormik({
    initialValues: {
      name,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        dispatch(renameChannelRequest({ id, name: values.name }));
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

export default RenameChannelModal;
