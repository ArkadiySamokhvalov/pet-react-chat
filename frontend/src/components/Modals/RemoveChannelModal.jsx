import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useModal } from '../../hooks/index.js';
import { removeChannelRequest } from '../../slices/channelsSlice.js';
import ModalBase from './ModalBase.jsx';
import { ModalCancelButton, ModalButtonsGroup } from '../Forms/FormBlocks.jsx';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const handleCloseModal = useModal();
  const { t } = useTranslation();
  const { channel } = useSelector((state) => state.modals);
  const { id } = channel;
  const title = t('modals.removeTitle');
  const btnVariant = 'danger';

  const handleRemoveChannel = () => {
    dispatch(removeChannelRequest({ id }));
    handleCloseModal();
  };

  return (
    <ModalBase title={title}>
      <p>{t('modals.warning')}</p>
      <ModalButtonsGroup>
        <ModalCancelButton/>
        <Button
            variant={btnVariant}
            className="btn-group-vertical border-0"
            onClick={handleRemoveChannel}
          >
            {t('modals.delete')}
        </Button>
      </ModalButtonsGroup>
    </ModalBase>
  );
};

export default RemoveChannelModal;
