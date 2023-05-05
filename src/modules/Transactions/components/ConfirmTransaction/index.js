import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import {
  bioMetricAuthentication,
  getAccountPasswordFromKeyChain,
} from 'modules/Auth/utils/passphrase';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import Input from 'components/shared/toolBox/input';
import { stringShortener } from 'utilities/helpers';

import getConfirmTransactionStyles from './styles';

export default function ConfirmTransaction({
  userPassword,
  onUserPasswordChange,
  isLoading,
  isValidationError,
  onSubmit,
  submitButtonTitle,
}) {
  const [currentAccount] = useCurrentAccount();
  const { sensorType, biometricsEnabled } = useSelector((state) => state.settings);

  const { styles } = useTheme({
    styles: getConfirmTransactionStyles(),
  });

  const submitDisabled = isLoading || !userPassword || isValidationError;

  const fetchAccountPassword = async () => {
    const accountPassword = await getAccountPasswordFromKeyChain(currentAccount.metadata?.address);
    return accountPassword;
  };

  const fetchAccountPasswordFromBiometrics = async () => {
    if (sensorType && biometricsEnabled) {
      const accountPassword = await fetchAccountPassword();
      if (accountPassword) {
        bioMetricAuthentication({
          successCallback: () => {
            onUserPasswordChange(accountPassword);
            onSubmit?.();
          },
        });
      }
    }
  };

  useEffect(() => {
    if (sensorType && biometricsEnabled) {
      fetchAccountPasswordFromBiometrics();
    }
  }, [sensorType]);

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]} testID="transaction-confirmation-screen">
      <View style={[styles.contentContainer, styles.theme.contentContainer]}>
        <Text style={[styles.title, styles.theme.title]}>
          {i18next.t('sendToken.confirmAndSign.title')}
        </Text>

        <Text style={[styles.instructionsText, styles.theme.instructionsText]}>
          {i18next.t('sendToken.confirmAndSign.description')}
        </Text>

        <Avatar address={currentAccount.metadata?.address} size={56} />

        <Text style={[styles.accountNameText, styles.theme.accountNameText]}>
          {currentAccount.metadata?.name}
        </Text>

        <Text style={[styles.accountAddressText, styles.theme.accountAddressText]}>
          {stringShortener(currentAccount.metadata?.address, 5, 5)}
        </Text>

        <Input
          value={userPassword}
          onChange={onUserPasswordChange}
          innerStyles={{
            containerStyle: {
              paddingTop: 0,
              paddingRight: 0,
              paddingLeft: 0,
              marginBottom: 24,
            },
            inputLabel: {
              marginBottom: 8,
            },
            input: {
              padding: 16,
            },
          }}
          placeholder={i18next.t('sendToken.confirmAndSign.passwordInputPlaceholder')}
          secureTextEntry
          testID="decrypt-password-input"
        />
      </View>

      <View>
        {isValidationError && (
          <Text style={[styles.errorText]}>{i18next.t('sendToken.errors.generalMessage')}</Text>
        )}

        <PrimaryButton
          noTheme
          onClick={onSubmit}
          disabled={submitDisabled}
          testID="confirm-send-token-button"
        >
          {isLoading
            ? i18next.t('sendToken.confirmAndSign.loadingText')
            : submitButtonTitle || i18next.t('sendToken.confirmAndSign.sendTokenSubmitButtonText')}
        </PrimaryButton>
      </View>
    </View>
  );
}
