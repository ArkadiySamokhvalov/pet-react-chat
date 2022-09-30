import axios from 'axios';
import { io } from 'socket.io-client';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import AuthProvider from './providers/authProvider.jsx';
import routes from './routes.js';
import channelsReducer, { actions as channelActions } from './slices/channelsSlice.js';
import messagesReducer, { actions as messagesActions } from './slices/messagesSlice.js';
import modalsReducer from './slices/modalsSlice.js';

import App from './components/App.jsx';
import resources from './locales/index.js';

const socket = io();
const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        axios,
        routes,
        socket,
      },
    },
  }),
});

const i18n = i18next.createInstance();
const currentLanguage = localStorage.getItem('language') || 'ru';

const rollbarToken = process.env.ROLLBAR_ACCESS_TOKEN || null;
const rollbarConfig = {
  accessToken: rollbarToken,
  environment: 'production',
  enabled: true,
};

export default async () => {
  socket.on('newChannel', (payload) => {
    store.dispatch(channelActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelActions.renameChannel(payload));
  });
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: currentLanguage.toLowerCase(),
    });

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};
