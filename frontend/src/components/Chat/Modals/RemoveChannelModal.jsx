import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useModal } from '../../../hooks/index.js';
import { removeChannelRequest } from '../../../slices/channelsSlice.js';
import ModalBase from '../../Layouts/Modal.jsx';
import { ModalCancelButton, ModalButtonsGroup } from '../../Layouts/Form.jsx';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const handleCloseModal = useModal();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { channel } = useSelector((state) => state.modals);
  const { id } = channel;
  const title = t('modals.removeTitle');
  const btnVariant = 'danger';

  const handleRemoveChannel = () => {
    try {
      dispatch(removeChannelRequest({ id }));
    } catch (err) {
      toast.error(t('errors.network'));
      rollbar.error(t('modals.removeTitle'), err);
    } finally {
      handleCloseModal();
    }
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
