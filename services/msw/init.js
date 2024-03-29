/* eslint-disable import/no-extraneous-dependencies */
import { MSWServer } from './MSWServer';

if (process.env.MOCK_SERVICE_API_ENABLED) {
  require('react-native-url-polyfill/auto');

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nativeMsw = require('msw/native');

  const mswDevServer = new MSWServer('dev', nativeMsw.setupServer);

  mswDevServer.init({ onUnhandledRequest: 'bypass' });
}
