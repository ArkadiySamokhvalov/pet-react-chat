import React, { useRef, useEffect } from 'react';
import { filterBadWords } from '../../utils/index.js';

const MessagesList = ({ messages }) => {
  const messagesList = useRef();

  const scrollToBottom = () => {
    const { scrollHeight } = messagesList.current;
    messagesList.current.scrollTop = scrollHeight;
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 300);
  });

  return (
    <div
      id="messagesBox"
      className="chat-messages overflow-auto px-3 my-3"
      ref={messagesList}
    >
      {messages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <span className="me-1">
            <b>{message.author}</b>:
          </span>
          <span>{filterBadWords(message.text)}</span>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
