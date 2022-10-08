import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/index.js';
import { fetchChatData } from '../../slices/channelsSlice.js';
import { MainChat } from '../Layouts/Main.jsx';
import Channels from '../Chat/Channels/Channels.jsx';
import Messages from '../Chat/Messages/Messages.jsx';

const Home = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { getAuthHeader } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchChatData(getAuthHeader));
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error(t('errors.401'));
        } else {
          toast.error(t('errors.network'));
        }
      }
    };

    fetchData();
  }, [dispatch, t]);

  return (
    <MainChat>
      <Row className="h-100">
        <Col xs="12" sm="4" lg="3" className="channels p-0">
          <Channels />
        </Col>

        <Col className="messages p-0 ps-sm-3">
          <Messages />
        </Col>
      </Row>
    </MainChat>
  );
};

export default Home;
