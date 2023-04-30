/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { LogBox, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { useNavigation } from '@react-navigation/native';

import SwitchButton from 'components/shared/toolBox/switchButton';
import { useTheme } from 'contexts/ThemeContext';
import { validatePassphrase } from 'modules/Auth/utils';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { settingsRetrieved, settingsUpdated } from 'modules/Settings/store/actions';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H2 } from 'components/shared/toolBox/typography';
import HeaderLogo from 'components/shared/HeaderLogo/HeaderLogo';
import PassphraseSvg from 'assets/svgs/PassphraseSvg';
import UploadSvg from 'assets/svgs/UploadSvg';
import CreateAccount from '../CreateAccount';
import AuthTypeItem from '../AuthType';

import getStyles from './styles';
import { selectEncryptedFile } from '../../utils/documentPicker';
import { getPassphraseFromKeyChain } from '../../utils/passphrase';
import Version2Migration from '../Version2Migration';

// there is a warning in RNOS module. remove this then that warning is fixed
LogBox.ignoreAllLogs();

export default function AuthMethod({ route }) {
  const navigation = useNavigation();

  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [v2Passphrase, setV2Passphrase] = useState('');

  const { accounts } = useAccounts();

  const toggleUseDerivationPath = () => {
    dispatch(settingsUpdated({ useDerivationPath: !settings.useDerivationPath }));
  };

  const { styles } = useTheme({
    styles: getStyles(),
  });

  const setBiometricSensorType = async () => {
    try {
      const sensorType = await FingerprintScanner.isSensorAvailable();
      dispatch(settingsUpdated({ sensorType }));
    } catch (error) {
      dispatch(settingsUpdated({ sensorType: null }));
    }
  };

  useEffect(() => {
    if (settings.showedIntro) {
      setBiometricSensorType();
      dispatch(settingsRetrieved());

      if (accounts.length && !route.params?.authRequired) {
        navigation.navigate('AccountsManagerScreen');
      }
    } else {
      navigation.push('Intro');
    }
  }, [accounts.length, settings.showedIntro]);

  const checkVersion2Migration = async () => {
    const { password: passphrase } = await getPassphraseFromKeyChain();
    const validity = validatePassphrase(passphrase);
    if (!validity.length && !accounts.length) {
      setV2Passphrase(passphrase);
    }
  };

  useEffect(() => {
    if (settings.showedIntro) {
      checkVersion2Migration();
    }
  }, [settings.showedIntro]);

  const selectEncryptedJSON = async () => {
    try {
      const encryptedData = await selectEncryptedFile();
      /**
       * TODO: Confirm valid file and show necessary error if any
       */
      navigation.navigate('DecryptPassphrase', {
        title: 'auth.setup.decryptPassphrase',
        encryptedData,
        successRoute: 'AccountsManagerScreen',
      });
    } catch (error) {
      // TODO: Handle error message
    }
  };

  const handleCreateAccountClick = () => navigation.navigate('Register');

  const handleGoBackClick = () => navigation.navigate('AccountsManagerScreen');

  const showBackButton = accounts.length > 0;

  return v2Passphrase ? (
    <Version2Migration passphrase={v2Passphrase} />
  ) : (
    <SafeAreaView style={[styles.container, styles.theme.container]} testID="auth-method-screen">
      {showBackButton && <HeaderBackButton onPress={handleGoBackClick} />}

      <View style={[styles.body]}>
        <HeaderLogo style={{ container: { marginTop: 40 } }} />

        <H2 style={[styles.title, styles.theme.title]} testID="add-account-title">
          {i18next.t('auth.setup.addAccountTitle')}
        </H2>

        <AuthTypeItem
          illustration={<PassphraseSvg />}
          label={i18next.t('auth.setup.secretPhrase')}
          onPress={() => navigation.navigate('SecretRecoveryPhrase')}
          testID="secret-phrase"
        />

        <AuthTypeItem
          illustration={<UploadSvg />}
          label={i18next.t('auth.setup.restoreFromFile')}
          onPress={selectEncryptedJSON}
          testID="restore-from-file"
        />

        <TouchableOpacity
          style={styles.row}
          testID="derivation-switch"
          onPress={toggleUseDerivationPath}
        >
          <SwitchButton value={settings.useDerivationPath} onChange={toggleUseDerivationPath} />
          <Text style={[styles.derivationPath, styles.theme.derivationPath]}>
            {i18next.t('settings.menu.enableDerivationPath')}
          </Text>
        </TouchableOpacity>
      </View>

      <CreateAccount onPress={handleCreateAccountClick} style={{ container: styles.footer }} />
    </SafeAreaView>
  );
}
