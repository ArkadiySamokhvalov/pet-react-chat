import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import { filterBadWords } from '../../utils/index.js';
import MessagesForm from './MessagesForm.jsx';
import log from '../../log.js';

const Messages = () => {
  const { t } = useTranslation();
  const { entities: channels, currentChannelId } = useSelector((state) => state.channels);
  const { entities: messages } = useSelector((state) => state.messages);
  const currentChannel = channels[currentChannelId];
  const currentChannelMessages = Object.values(messages)
    .filter((message) => message.channelId === currentChannelId);
  const messageCount = currentChannelMessages.length;
  const inputMessageRef = useRef();
  const socket = useSocket();
  const dispatch = useDispatch();
  const messageList = useRef();

  const scrollToBottom = () => {
    const { scrollHeight } = messageList.current;
    messageList.current.scrollTop = scrollHeight;
  };

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
      setTimeout(scrollToBottom, 300);
    });

    setTimeout(scrollToBottom, 300);

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light p-3 shadow-sm small">
        <p className="m-0">
          <b>
            <span className="me-1">#</span>
            {currentChannel && filterBadWords(currentChannel.name)}
           </b>
        </p>
        <span className="text-muted">{t('messages.count', { count: messageCount })}</span>
      </div>

      <div
        id="messagesBox"
        className="chat-messages overflow-auto px-3 my-3"
        ref={messageList}
      >
        {currentChannelMessages.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            <span className="me-1">
              <b>{message.author}</b>:
            </span>
            <span>{filterBadWords(message.text)}</span>
          </div>
        ))
        }
      </div>

      <div className="mt-auto">
       <MessagesForm ref={inputMessageRef}/>
      </div>
    </div>
  );
};

export default log(Messages);
