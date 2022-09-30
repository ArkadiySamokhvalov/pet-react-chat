import React from 'react';
import { useTranslation } from 'react-i18next';

import Page from '../Layouts/Page.jsx';
import notFoundImg from '../../assets/img/notFound.jpg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Page img={notFoundImg}>
      <h1 className="mb-4 text-center">{t('notFound.title')}</h1>

      <div className="error-details mb-3 text-center">
        {t('notFound.text')}
      </div>

      <div className="error-actions">
        <a href="/" className="btn btn-outline-primary btn-lg w-100">
          {t('notFound.link')}
        </a>
      </div>
    </Page>
  );
};

export default NotFoundPage;
