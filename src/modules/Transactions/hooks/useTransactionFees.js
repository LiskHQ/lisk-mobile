/* eslint-disable max-statements */
import { useEffect, useMemo } from 'react';
import * as Lisk from '@liskhq/lisk-client';

import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';
import useTransactionEstimateFeesMutation from '../api/useTransactionEstimateFeesMutation';

export function useTransactionFees({
  transaction,
  isTransactionSuccess,
  dependencies = [],
  onSuccess,
  onError,
  enabled,
}) {
  const {
    data: commandParametersSchemasData,
    isLoading: isLoadingCommandParametersSchemas,
    isErrorCommandParametersSchemas,
  } = useCommandParametersSchemasQuery({
    options: { enabled: isTransactionSuccess, onError },
  });

  const estimateFeesMutation = useTransactionEstimateFeesMutation({
    onSuccess: (res) => {
      let updates = {};

      const accountInitializationFee =
        res.meta.breakdown.fee.minimum.additionalFees?.userAccountInitializationFee ||
        res.meta.breakdown.params?.messageFee.additionalFees?.userAccountInitializationFee;

      const messageFee = res.data.transaction.params?.messageFee.amount;
      const messageFeeTokenID = res.data.transaction.params?.messageFee.tokenID;

      const minFee = res.data.transaction.fee.minimum;

      const feeTokenID = res.data.transaction.fee.tokenID;

      const dynamicFeeEstimates = res.data.transaction.fee.priority;

      if (accountInitializationFee) {
        updates = {
          extraCommandFee: accountInitializationFee,
        };
      }

      if (messageFee && messageFeeTokenID) {
        updates = {
          ...updates,
          params: {
            messageFee,
            messageFeeTokenID,
          },
        };
      }

      if (minFee) {
        updates = { ...updates, minFee };
      }

      if (feeTokenID) {
        updates = { ...updates, feeTokenID };
      }

      if (dynamicFeeEstimates) {
        updates = { ...updates, dynamicFeeEstimates };
      }

      transaction.update(updates);

      if (onSuccess) {
        onSuccess(res);
      }
    },
    onError,
  });

  const transactionSchema = commandParametersSchemasData?.data?.commands.find(
    (command) =>
      command.moduleCommand ===
      `${transaction.transaction.module}:${transaction.transaction.command}`
  )?.schema;

  const areParamsValid = useMemo(() => {
    if (!transactionSchema) {
      return false;
    }

    try {
      Lisk.validator.validator.validate(transactionSchema, transaction.transaction.params);

      return true;
    } catch {
      return false;
    }
  }, [transaction.transaction.params, transactionSchema]);

  useEffect(() => {
    if (isTransactionSuccess && areParamsValid && enabled) {
      const transactionJSON = transaction.toJSON();

      delete transactionJSON.id;
      delete transactionJSON.signatures;

      estimateFeesMutation.mutate({
        transaction: transactionJSON,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransactionSuccess, areParamsValid, enabled, ...dependencies]);

  return {
    data: estimateFeesMutation.data,
    isLoading: isLoadingCommandParametersSchemas || estimateFeesMutation.isLoading,
    isError: isErrorCommandParametersSchemas || estimateFeesMutation.isError,
  };
}
