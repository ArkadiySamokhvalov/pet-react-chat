import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useWindowWidth } from '../../../hooks/index.js';
import { filterBadWords } from '../../../utils/index.js';

const renderChannelsList = (
  t,
  channels,
  setButtonColorVariant,
  showModal,
  changeCurrentChannel,
) => {
  const unremovable = [];
  const removable = [];

  Object.values(channels).forEach((channel) => {
    const channelItem = (
      <li className="nav-item w-100" key={channel.id}>
        <Dropdown as={ButtonGroup} className="w-100">
          <Button
            variant={setButtonColorVariant(channel.id)}
            className="w-100 text-start text-truncate text-decoration-none shadow-none rounded-0 ps-2"
            onClick={() => changeCurrentChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {filterBadWords(channel.name)}
          </Button>

          {channel.removable && <React.Fragment>
            <Dropdown.Toggle drop="up" split variant={setButtonColorVariant(channel.id)} id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => showModal('remove', channel)}>
                {t('channels.removeChannel')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => showModal('rename', channel)}>
                {t('channels.renameChannel')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </React.Fragment>
          }
        </Dropdown>
      </li>
    );

    if (channel.removable) {
      removable.push(channelItem);
    } else {
      unremovable.push(channelItem);
    }
  });

  return {
    unremovable,
    removable,
  };
};

const ChannelsList = ({ showModal, changeCurrentChannel }) => {
  const { t } = useTranslation();
  const { entities: channels, currentChannelId } = useSelector((state) => state.channels);
  const setButtonColorVariant = (id) => ((currentChannelId === id) ? 'secondary' : 'link');
  const windowWidth = useWindowWidth();
  const breakpoint = 575.98;

  const channelList = renderChannelsList(
    t,
    channels,
    setButtonColorVariant,
    showModal,
    changeCurrentChannel,
  );

  return windowWidth < breakpoint
    ? (
      <React.Fragment>
        <ul className="custom-scrollbar nav nav-pills flex-column flex-nowrap overflow-auto">
          {channelList.unremovable.map((item) => (item))}
        </ul>
        <Dropdown>
          <Dropdown.Toggle
            drop="down"
            id="dropdownChannels"
            className="w-100 text-truncate text-decoration-none shadow-none rounded-0 ps-2"
            variant="primary"
          >
            {t('channels.allChannels')}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100 channels-dropdown custom-scrollbar overflow-auto">
            <ul id="channelsBox" className="nav nav-pills flex-column flex-nowrap">
              {channelList.removable.length > 0
                ? channelList.removable.map((item) => (item))
                : <p className="text-center my-3">{t('channels.empty')}</p>
              }
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    )
    : (
      <ul id="channelsBox" className="custom-scrollbar nav nav-pills flex-column flex-nowrap overflow-auto">
        {channelList.unremovable.map((item) => (item))}
        {channelList.removable.map((item) => (item))}
      </ul>
    );
};

export default ChannelsList;
