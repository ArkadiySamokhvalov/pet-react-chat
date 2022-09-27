import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useSocket } from '../../hooks/index.js';
import { actions as channelActions } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalsSlice.js';
import ChannelsList from './ChannelsList.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();

  const handleShowModal = (type, channel = null) => {
    dispatch(openModal({ type, channel }));
  };

  const handleChangeCurrentChannel = (id) => {
    dispatch(channelActions.changeCurrentChannel(id));
  };

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(channelActions.addChannel(payload));
      toast.success(t('toast.createChannel'));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelActions.removeChannel(payload));
      toast.success(t('toast.removeChannel'));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelActions.renameChannel(payload));
      toast.success(t('toast.renameChannel'));
    });

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, []);

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
