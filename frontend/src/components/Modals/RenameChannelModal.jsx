import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { renameChannelRequest } from '../../slices/channelsSlice.js';
import ModalBase from './ModalBase.jsx';
import ModalForm from '../Forms/ModalForm.jsx';

const RenameChannelModal = () => {
  const { channel } = useSelector((state) => state.modals);
  const { id, name } = channel;
  const { t } = useTranslation();
  const title = t('modals.renameTitle');
  const btnVariant = 'primary';

  const handleRenameChannel = (channelName) => renameChannelRequest({ id, name: channelName });

  const initialState = {
    name,
  };

  return (
    <ModalBase title={title}>
      <ModalForm
        btnVariant={btnVariant}
        action={handleRenameChannel}
        initialState={initialState}
      />
    </ModalBase>
  );
};

export default RenameChannelModal;
