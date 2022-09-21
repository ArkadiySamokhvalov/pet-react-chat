import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, CloseButton } from 'react-bootstrap';

import { useModal } from '../../hooks/index.js';

const ModalBase = ({ title, children }) => {
  const { status } = useSelector((state) => state.channels);
  const { show } = useSelector((state) => state.modals);
  const handleCloseModal = useModal();

  return (
    <Modal show={show} onHide={() => status === 'fulfilled' || handleCloseModal()} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <CloseButton
          onClick={() => handleCloseModal()}
          disabled={status === 'fulfilled'}
        />
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalBase;
