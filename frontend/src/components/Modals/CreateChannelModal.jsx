import React from 'react';
import { useTranslation } from 'react-i18next';

import { createChannelRequest } from '../../slices/channelsSlice.js';
import ModalBase from './ModalBase.jsx';
import ModalForm from '../Forms/ModalForm.jsx';

const CreateChannelModal = () => {
  const { t } = useTranslation();
  const title = t('modals.createTitle');
  const btnVariant = 'success';

  const handleCreateChannel = (channelName) => createChannelRequest({ name: channelName });

  const initialState = {
    name: '',
  };

  return (
    <ModalBase title={title}>
      <ModalForm
        btnVariant={btnVariant}
        action={handleCreateChannel}
        initialState={initialState}
      />
    </ModalBase>
  );
};

export default CreateChannelModal;
