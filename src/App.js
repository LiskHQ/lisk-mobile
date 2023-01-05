import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApplicationsProvider } from 'modules/BlockchainApplication/context/ApplicationsContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import Router from 'navigation';
import Alert from 'components/shared/alert';
import StatusBar from 'components/shared/StatusBar';
import reactQueryClient from 'utilities/api/reactQueryClient';
import store, { persistedStore } from 'store/index';
import AppBootstrapper from './AppBootstrapper';
import i18n from '../locales';
import WalletConnectProvider from '../libs/wcm/context/connectionProvider';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={reactQueryClient}>
        <WalletConnectProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
              <ApplicationsProvider>
                <ThemeProvider>
                  <AppBootstrapper>
                    <StatusBar />
                    <Router />
                    <Alert />
                  </AppBootstrapper>
                </ThemeProvider>
              </ApplicationsProvider>
            </PersistGate>
          </ReduxProvider>
        </WalletConnectProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
