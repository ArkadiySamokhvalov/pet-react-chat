import React from 'react';
import { useDispatch } from 'react-redux';

import { actions as channelActions } from '../../../slices/channelsSlice.js';
import { openModal } from '../../../slices/modalsSlice.js';
import ChannelsList from './ChannelsList.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';

const Channels = () => {
  const dispatch = useDispatch();

  const handleShowModal = (type, channel = null) => {
    dispatch(openModal({ type, channel }));
  };

  const handleChangeCurrentChannel = (id) => {
    dispatch(channelActions.changeCurrentChannel(id));
  };

  return (
    <React.Fragment>
      <ChannelsHeader showModal={handleShowModal} />
      <ChannelsList
        showModal={handleShowModal}
        changeCurrentChannel={handleChangeCurrentChannel}
      />
    </React.Fragment>
  );
};

export default Channels;
