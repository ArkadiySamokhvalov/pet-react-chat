import React from 'react';
import { useTranslation } from 'react-i18next';

import { filterBadWords } from '../../utils/index.js';

const MessagesChannelHeader = ({ channel, count }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light p-3 shadow-sm small">
      <p className="m-0">
        <b>
          <span className="me-1">#</span>
          {channel && filterBadWords(channel.name)}
        </b>
      </p>
      <span className="text-muted">{t('messages.count', { count })}</span>
    </div>
  );
};

export default MessagesChannelHeader;
