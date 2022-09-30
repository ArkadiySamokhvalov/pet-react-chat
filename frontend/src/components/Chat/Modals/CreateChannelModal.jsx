import React from 'react';
import { useTranslation } from 'react-i18next';

import { createChannelRequest } from '../../../slices/channelsSlice.js';
import ModalBase from '../../Layouts/Modal.jsx';
import ModalForm from '../Forms/ModalForm.jsx';

const CreateChannelModal = () => {
  const { t } = useTranslation();
  const title = t('modals.createTitle');
  const btnVariant = 'success';

  const handleCreateChannel = (channelName) => createChannelRequest({ name: channelName });

  const initialValues = {
    name: '',
  };

  return (
    <ModalBase title={title}>
      <ModalForm
        initialValues={initialValues}
        action={handleCreateChannel}
        btnVariant={btnVariant}
      />
    </ModalBase>
  );
};

export default CreateChannelModal;
