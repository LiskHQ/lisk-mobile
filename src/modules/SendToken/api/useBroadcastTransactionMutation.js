import { useMutation } from '@tanstack/react-query';

import {
  METHOD,
  LIMIT as limit,
  API_VERSION,
  // API_METHOD,
} from 'utilities/api/constants';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';

import { broadcastTransactionMockHandler } from '../mocks/handlers';

export default function useSendTransactionMutation(options = {}) {
  const [currentBlockchainApplication] = useCurrentBlockchainApplication();

  function handleBroadcastTransaction(variables) {
    const config = {
      baseUrl: currentBlockchainApplication?.apis[0][METHOD]
        ?? currentBlockchainApplication?.apis[0].rest,
      path: `/api/${API_VERSION}/transactions/`,
      method: 'POST',
      params: { limit, ...variables },
    };

    // TODO: Implement real API call when update to service v3 API is done.
    // return API_METHOD[METHOD]({
    //   path,
    //   config,
    // });
    console.log({ config });

    return broadcastTransactionMockHandler;
  }

  const mutation = useMutation(handleBroadcastTransaction, {
    onSuccess: (data) => {
      // TODO: Apply txs cache update when query is cached by react-query.
      // queryClient.setQueryData(['transactions', { id: data.transactionID }], data)

      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
    ...options
  });

  return mutation;
}
