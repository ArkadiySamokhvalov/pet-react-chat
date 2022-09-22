import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

import { useSocket } from '../../hooks/index.js';
import { actions as channelActions } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalsSlice.js';
import log from '../../log.js';

const Channels = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { entities, currentChannelId } = useSelector((state) => state.channels);
  const setButtonColorVariant = (id) => ((currentChannelId === id) ? 'secondary' : 'link');

  const handleShowModal = (type, channel = null) => {
    dispatch(openModal({ type, channel }));
  };

  const handleChangeCurrentChannel = (id) => {
    dispatch(channelActions.changeCurrentChannel(id));
  };

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(channelActions.addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelActions.removeChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelActions.renameChannel(payload));
    });

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-between mb-2 ps-2">
        <span>Сhannels</span>

        <Button
          variant="link"
          size="sm"
          className="border-0 text-decoration-none"
          onClick={() => handleShowModal('create')}
        >
          <span className="visually-hidden">Add channel</span>
          <span className="icon-plus" />
        </Button>
      </div>

      <ul id="channelsBox" className="nav nav-pills flex-column">
        {Object.values(entities).map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                variant={setButtonColorVariant(channel.id)}
                className="w-100 text-start text-truncate text-decoration-none shadow-none rounded-0 ps-2"
                onClick={() => handleChangeCurrentChannel(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>

              {channel.removable
              && <React.Fragment>
                  <Dropdown.Toggle split variant={setButtonColorVariant(channel.id)} id="dropdown-split-basic" />
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleShowModal('remove', channel)}>
                      Remove
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowModal('rename', channel)}>
                      Rename
                    </Dropdown.Item>
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
