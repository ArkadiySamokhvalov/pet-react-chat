import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { useAuth } from '../hooks/index.js';
import { fetchChatData } from '../slices/channelsSlice.js';
import Channels from './Channels/Channels.jsx';
import Messages from './Messages/Messages.jsx';
import log from '../log.js';

const Home = () => {
  const auth = useAuth();
  const { getAuthHeader } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchChatData(getAuthHeader)).unwrap();
    };

    fetchData();
  }, [dispatch]);

  return (
    <Row>
      <Col xs="12" md="4" className="mb-sm-3 mb-md-0">
        <Channels />
      </Col>

      <Col xs="12" md="8" className="ps-0">
        <Messages />
      </Col>
    </Row>
  );
};

export default log(Home);
