import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useSocket } from '../../hooks/index.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import MessagesChannelHeader from './MessagesChannelHeader.jsx';
import MessagesList from './MessagesList.jsx';
import MessagesForm from '../Forms/MessagesForm.jsx';

const Messages = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { entities: channels, currentChannelId } = useSelector((state) => state.channels);
  const { entities: messages } = useSelector((state) => state.messages);
  const currentChannelMessages = Object.values(messages)
    .filter((message) => message.channelId === currentChannelId);
  const messageCount = currentChannelMessages.length;
  const currentChannel = channels[currentChannelId];

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <MessagesChannelHeader channel={currentChannel} count={messageCount} />
      <MessagesList messages={currentChannelMessages} />
      <MessagesForm/>
    </div>
  );
};

export default Messages;
