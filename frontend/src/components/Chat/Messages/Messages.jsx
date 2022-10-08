import React from 'react';
import { useSelector } from 'react-redux';

import MessagesChannelHeader from './MessagesChannelHeader.jsx';
import MessagesList from './MessagesList.jsx';
import MessagesForm from '../Forms/MessagesForm.jsx';

const Messages = () => {
  const { entities: channels, currentChannelId } = useSelector((state) => state.channels);
  const { entities: messages } = useSelector((state) => state.messages);
  const currentChannelMessages = Object.values(messages)
    .filter((message) => message.channelId === currentChannelId);
  const messageCount = currentChannelMessages.length;
  const currentChannel = channels[currentChannelId];

  return (
    <div className="d-flex flex-column h-100">
      <MessagesChannelHeader channel={currentChannel} count={messageCount} />
      <MessagesList messages={currentChannelMessages} />
      <div className="mt-auto">
        <MessagesForm/>
      </div>
    </div>
  );
};

export default Messages;
