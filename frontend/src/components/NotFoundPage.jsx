import React from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import notFoundImg from '../assets/img/notFound.jpg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Row className="justify-content-between align-content-center">
      <Col xs="12" md="6" className="mb-3 mb-md-0">
        <img src={notFoundImg} className="img-fluid d-block mx-auto" alt="" />
      </Col>
      <Col xs="12" md="6" className="error-template d-flex flex-column justify-content-center">
        <h1 className="mb-4 text-center">{t('notFound.title')}</h1>
        <div className="error-details mb-3 text-center">
          {t('notFound.text')}
        </div>
        <div className="error-actions">
          <a href="/" className="btn btn-outline-primary btn-lg w-100">
          {t('notFound.link')}
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default NotFoundPage;
