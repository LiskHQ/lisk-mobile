import { useMemo, useRef } from 'react';

import { APIClient } from 'utilities/api/APIClient';
import { useAccountTokensQuery } from 'modules/Accounts/api/useAccountTokensQuery';
import { mockTokensMeta } from 'modules/SendToken/__fixtures__';
import { useSupportedTokensQuery } from './useSupportedTokensQuery';

/**
 * Fetch list of supported tokens for a given account and blockchain application.
 * Executes the API call once the hook is mounted.
 * @param {Object} application - Blockchain application to fetch the supported tokens from.
 * @returns - The query state of the API call. Includes the data
 * (supported tokens), loading state, error state, and more.
 */
export function useApplicationSupportedTokensQuery(application) {
  const apiClient = useRef(new APIClient());

  if (application?.serviceURLs?.length) {
    apiClient.current.create(application.serviceURLs[0]);
  }

  const {
    data: { data: accountTokensData = [] } = {},
    isLoading: isAccountTokensLoading,
    isError: isAccountTokensError,
    error: errorOnAccountTokens,
  } = useAccountTokensQuery();

  const {
    data: { data: { supportedTokens: supportedTokensData = [] } = {} } = {},
    isLoading: isSupportedTokensLoading,
    isError: isSupportedTokensError,
    error: errorOnSupportedTokens,
  } = useSupportedTokensQuery({ client: apiClient.current });

  const data = useMemo(() => {
    const isSupportAllToken = supportedTokensData.length === 0;

    const tokensOnChainData = isSupportAllToken
      ? accountTokensData
      : accountTokensData.filter(
          (token) =>
            supportedTokensData.find((supportedToken) => supportedToken.symbol === token.symbol)
              .length
        );

    const tokens = tokensOnChainData.map((tokenOnChainData) => {
      // TODO: Query for each token the GET /meta/tokens endpoint when service solves tokenID inconsistency
      // between GET /tokens and GET /meta/tokens responses.
      const tokenMetaData =
        mockTokensMeta.find((tokenMeta) => tokenMeta.tokenID === tokenOnChainData.tokenID) || {};

      return { ...tokenOnChainData, ...tokenMetaData };
    });

    return tokens;
  }, [accountTokensData, supportedTokensData]);

  return {
    data,
    isSupportedTokensLoading,
    isAccountTokensLoading,
    isError: isSupportedTokensError || isAccountTokensError,
    isLoading: isAccountTokensLoading || isSupportedTokensLoading,
    errorOnSupportedTokens,
    errorOnAccountTokens,
  };
}