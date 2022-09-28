/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import DataRenderer from 'components/shared/DataRenderer';
import { PrimaryButton } from 'components/shared/toolBox/button';

import getSendTokenSelectApplicationsStepStyles from './styles';
import {
  SendTokenRecipientAccountField,
  SendTokenRecipientApplicationField,
  SendTokenSenderApplicationField,
} from './components';

export default function SendTokenSelectApplicationsStep({ nextStep, form }) {
  const { applicationsMetadata } = useBlockchainApplicationExplorer();

  const { field: senderApplicationChainIDField } = useController({
    name: 'senderApplicationChainID',
    control: form.control,
  });

  const { field: recipientApplicationChainIDField } = useController({
    name: 'recipientApplicationChainID',
    control: form.control,
  });

  const { field: addressField } = useController({
    name: 'recipientAccountAddress',
    control: form.control,
  });

  const { field: addressFormatField } = useController({
    name: 'recipientAccountAddressFormat',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const disableNextStepButton =
    !form.watch('senderApplicationChainID') ||
    !form.watch('recipientApplicationChainID') ||
    !form.watch('recipientAccountAddress');

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <DataRenderer
          data={applicationsMetadata?.data}
          isLoading={applicationsMetadata.isLoading}
          error={applicationsMetadata.error}
          renderData={(data) => (
            <>
              <SendTokenSenderApplicationField
                value={senderApplicationChainIDField.value}
                onChange={senderApplicationChainIDField.onChange}
                errorMessage={form.formState.errors.senderApplicationChainID?.message}
                applications={data}
                style={{ toggle: { container: { marginBottom: 16 } } }}
              />

              <SendTokenRecipientApplicationField
                value={recipientApplicationChainIDField.value}
                onChange={recipientApplicationChainIDField.onChange}
                errorMessage={form.formState.errors.recipientApplicationChainID?.message}
                applications={data}
                style={{ toggle: { container: { marginBottom: 16 } } }}
              />

              <SendTokenRecipientAccountField
                value={addressField.value}
                onChange={addressField.onChange}
                errorMessage={form.formState.errors.recipientAccountAddress?.message}
                addressFormat={addressFormatField.value}
                onAddressFormatChange={addressFormatField.onChange}
              />

              <PrimaryButton
                onClick={nextStep}
                disabled={disableNextStepButton}
                title={i18next.t('sendToken.applicationsSelect.nextStepButtonText')}
                noTheme
              />
            </>
          )}

          // TODO: Add ResultScreen error when component is available
          // from merging https://github.com/LiskHQ/lisk-mobile/pull/1500
        />
      </View>
    </View>
  );
}
