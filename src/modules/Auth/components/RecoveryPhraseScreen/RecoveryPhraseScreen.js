import React, { useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import Scanner from 'components/shared/Scanner/Scanner';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';
import RecoveryPhraseForm from '../RecoveryPhraseForm/RecoveryPhraseForm';

import getStyles from './RecoveryPhraseScreen.styles';

export default function RecoveryPhraseScreen() {
  useScreenshotPrevent();
  const navigation = useNavigation();

  const scannerRef = useRef();

  const { styles } = useTheme({ styles: getStyles() });

  const handleFormSubmission = (recoveryPhrase, derivationPath) =>
    navigation.navigate('PasswordSetupForm', { recoveryPhrase, derivationPath });

  const handleQRCodeRead = (value) => handleFormSubmission(value);

  const handleScanQrCode = () => scannerRef.current.toggleCamera();

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton title="auth.setup.addAccountTitle" onPress={navigation.goBack} />

      <Scanner
        ref={scannerRef}
        navigation={navigation}
        readFromCameraRoll={false}
        onQRCodeRead={handleQRCodeRead}
        permissionDialogTitle={i18next.t('Permission to use camera')}
        permissionDialogMessage={i18next.t('Lisk needs to connect to your camera')}
      />

      <ScrollView contentContainerStyle={styles.container} testID="secret-recovery-screen">
        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.setup.addAccountDescription')}
        </P>

        <RecoveryPhraseForm onSubmit={handleFormSubmission} onScanQrCode={handleScanQrCode} />
      </ScrollView>
    </SafeAreaView>
  );
}
