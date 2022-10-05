import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks/index.js';
import { fetchChatData } from '../slices/channelsSlice.js';
import Channels from './Channels/Channels.jsx';
import Messages from './Messages/Messages.jsx';

const Home = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { getAuthHeader } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchChatData(getAuthHeader)).unwrap();
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error(t('toast.authorization'));
        } else {
          toast.error(t('toast.network'));
        }
      }
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

export default Home;