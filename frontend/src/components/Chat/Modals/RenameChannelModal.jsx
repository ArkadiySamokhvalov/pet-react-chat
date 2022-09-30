import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { renameChannelRequest } from '../../../slices/channelsSlice.js';
import ModalBase from '../../Layouts/Modal.jsx';
import ModalForm from '../Forms/ModalForm.jsx';

const RenameChannelModal = () => {
  const { channel } = useSelector((state) => state.modals);
  const { id, name } = channel;
  const { t } = useTranslation();
  const title = t('modals.renameTitle');
  const btnVariant = 'primary';

  const initialValues = {
    name,
  };

  const handleRenameChannel = (channelName) => renameChannelRequest({ id, name: channelName });

  return (
    <ModalBase title={title}>
      <ModalForm
        title={title}
        initialValues={initialValues}
        action={handleRenameChannel}
        btnVariant={btnVariant}
      />
    </ModalBase>
  );
};

export default RenameChannelModal;
