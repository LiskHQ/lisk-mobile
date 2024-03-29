import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_TOKENS_METADATA_QUERY } from 'utilities/api/queries';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import liskAPIClient from 'utilities/api/LiskAPIClient';

/**
 * Fetch list of blockchain applications tokens off-chain metadata.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (tokens), loading state, error state, and more.
 */
export function useTokenMetaQuery(tokenID, { config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/blockchain/apps/meta/tokens`,
    method: 'GET',
    event: 'get.blockchain.apps.meta.tokens',
    ...customConfig,
    params: {
      limit: LIMIT,
      tokenID,
      ...customConfig.params,
    },
  };

  const keys = useQueryKeys([GET_TOKENS_METADATA_QUERY, tokenID]);

  return useCustomQuery({ config, options, keys, client: liskAPIClient });
}
