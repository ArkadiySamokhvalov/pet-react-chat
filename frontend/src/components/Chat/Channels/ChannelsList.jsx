import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { filterBadWords } from '../../../utils/index.js';

const ChannelsList = ({ showModal, changeCurrentChannel }) => {
  const { t } = useTranslation();
  const { entities: channels, currentChannelId } = useSelector((state) => state.channels);

  const setButtonColorVariant = (id) => ((currentChannelId === id) ? 'secondary' : 'link');

  return (
    <ul id="channelsBox" className="nav nav-pills flex-column">
      {Object.values(channels).map((channel) => (
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

            {channel.removable
              && <React.Fragment>
                <Dropdown.Toggle split variant={setButtonColorVariant(channel.id)} id="dropdown-split-basic" />
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
      ))}
    </ul>
  );
};

export default ChannelsList;
