import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { useModal } from '../../hooks/index.js';
import { removeChannelRequest } from '../../slices/channelsSlice.js';
import ModalBase from './ModalBase.jsx';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const handleCloseModal = useModal();
  const { channel } = useSelector((state) => state.modals);
  const { id } = channel;
  const title = 'Remove channel';
  const btnVariant = 'danger';

  const handleRemoveChannel = () => {
    dispatch(removeChannelRequest({ id }));
    handleCloseModal();
  };

  return (
    <ModalBase title={title}>
      <p>Are you sure?</p>
      <div className="d-flex align-itms-center justify-end">
        <Button
          variant="secondary"
          className="btn-group-vertical border-0 me-3"
        >
          <span onClick={() => handleCloseModal()}>Cancel</span>
        </Button>
        <Button
          variant={btnVariant}
          className="btn-group-vertical border-0"
          type="submit"
          onClick={handleRemoveChannel}
        >
          <span>Delete</span>
        </Button>
      </div>
    </ModalBase>
  );
};

export default RemoveChannelModal;
