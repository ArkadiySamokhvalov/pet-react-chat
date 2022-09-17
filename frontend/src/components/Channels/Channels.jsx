import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

import Icon from '../helpers/Icon.jsx';
import log from '../../log.js';

const Channels = () => {
  const { entities, currentChannelId } = useSelector((state) => state.channels);

  const setButtonColorVariant = (id) => ((currentChannelId === id) ? 'secondary' : 'link');

  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-between mb-2 ps-2">
        <span>Сhannels</span>
        <Button variant="outline-primary" size="sm">
          <span className="visually-hidden">Add channel</span>
          <Icon id={'plus'} />
        </Button>
      </div>
      <ul id="channelsBox" className="nav nav-pills flex-column">
        {Object.values(entities).map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                variant={setButtonColorVariant(channel.id)}
                className="w-100 text-start text-truncate text-decoration-none  shadow-none rounded-0 ps-2"
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              {channel.removable
              && <React.Fragment>
                  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Remove</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Rename</Dropdown.Item>
                  </Dropdown.Menu>
                </React.Fragment>
              }
              </Dropdown>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default log(Channels);
