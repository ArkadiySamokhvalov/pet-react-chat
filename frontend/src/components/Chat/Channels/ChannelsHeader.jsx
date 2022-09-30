import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelsHeader = ({ showModal }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center justify-content-between mb-2 ps-2">
    <span>{t('channels.channels')}</span>

    <Button
      variant="link"
      size="sm"
      className="border-0 text-decoration-none"
      onClick={() => showModal('create')}
    >
      <span className="visually-hidden">{t('channels.addChannel')}</span>
      <span className="icon-plus" />
    </Button>
  </div>
  );
};

export default ChannelsHeader;
