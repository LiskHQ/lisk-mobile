import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import apiClient from 'utilities/api/APIClient';

/**
 * Fetch market prices for available token.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} client - Custom API client for the query.
 * @returns - The query state of the API call. Includes the data
 * (prices), loading state, error state, and more.
 */

export function usePriceTickerQuery({ config: customConfig = {}, client = apiClient } = {}) {
  const config = {
    url: `${API_URL}/market/prices`,
    method: 'get',
    event: 'get.prices',
    ...customConfig,
  };

  const keys = useQueryKeys([GET_ACCOUNT_TOKENS_QUERY]);

  return useCustomQuery({ config, keys, client });
}
