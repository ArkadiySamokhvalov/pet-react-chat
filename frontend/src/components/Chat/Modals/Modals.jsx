import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalContext } from '../../../contexts/index.js';
import { closeModal } from '../../../slices/modalsSlice.js';
import CreateChannelModal from './CreateChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const Modals = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.modals);

  const mapping = {
    create: CreateChannelModal,
    rename: RenameChannelModal,
    remove: RemoveChannelModal,
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const Modal = mapping[type];

  return Modal && (
    <ModalContext.Provider value={ handleCloseModal }>
      <Modal />
    </ModalContext.Provider>
  );
};

export default Modals;
