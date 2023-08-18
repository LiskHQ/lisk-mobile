/* eslint-disable max-statements */
import React from 'react';

import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { useTransactionsEventsManager } from 'modules/Transactions/hooks/useTransactionsEventsManager';
import { useBootstrapCurrentApplication } from 'modules/BlockchainApplication/hooks/useBootstrapCurrentApplication';
import ErrorScreen from 'components/screens/ErrorFallbackScreen';
import LoadingScreen from 'components/screens/LoadingFallbackScreen/LoadingFallbackScreen';
import useWalletConnectEventsManager from '../libs/wcm/hooks/useConnectionEventsManager';
import { useBootstrapApplications } from './modules/BlockchainApplication/hooks/useBootstrapApplications';

/**
 * Bootstrap the app by calling all previous business logic to load the required data.
 * @param {React.ReactNode} children - Components tree to provide the loaded data.
 */
export default function BootstrapApp({ children }) {
  const [currentApplication] = useCurrentApplication();

  const isLoading = currentApplication.status === 'loading';
  const isError = currentApplication.status === 'error';
  const error = currentApplication.error;

  // Bootstrap API client with current application.
  const retryBootstrapCurrentApplication = useBootstrapCurrentApplication();

  // Bootstrap applications
  useBootstrapApplications();

  // Bootstrap WS connections for handling queries updates based on transactions events.
  useTransactionsEventsManager();

  // Bootstrap WC.
  useWalletConnectEventsManager();

  const handleRetry = () => retryBootstrapCurrentApplication();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen onRetry={handleRetry} error={error} />;
  }

  return children;
}
