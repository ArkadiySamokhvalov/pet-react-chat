import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './slices/index.js';

import App from './components/App.jsx';
import resources from './locales/index.js';

export default async () => {
  const i18n = i18next.createInstance();
  const currentLanguage = localStorage.getItem('language') || 'ru';

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: currentLanguage.toLowerCase(),
    });

  const vdom = (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );

  return vdom;
};
