/* eslint-disable max-statements */
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'contexts/ThemeContext';

import Stepper from 'components/shared/Stepper';
import { H4, P } from 'components/shared/toolBox/typography';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import RecoveryPhraseQuiz from '../RecoveryPhraseQuiz/RecoveryPhraseQuiz';
import RegisterSafeKeeping from './RegisterSafeKeeping';
import PasswordSetupForm from '../PasswordSetupForm';
import { generateRecoveryPhrase } from '../../utils';

import getRegisterStyles from './Register.styles';
import RecoveryPhraseStrengthSelect from './RecoveryPhraseStrengthSelect/RecoveryPhraseStrengthSelect';
import { RECOVERY_PHRASE_STRENGTHS_PER_WORD } from '../../constants/recoveryPhrase.constants';

export default function Register() {
  const route = useRoute();

  const [recoveryPhrase, setRecoveryPhrase] = useState();

  const [recoveryPhraseStrength, setRecoveryPhraseStrength] = useState(
    RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words']
  );

  const { styles } = useTheme({
    styles: getRegisterStyles(),
  });

  const handleBackButtonAndroidPress = useCallback(() => {
    const action = route.params?.action ?? false;

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  }, [route.params?.action]);

  const handleRecoveryPhraseStrengthChange = (selectedStrength) => {
    if (selectedStrength !== recoveryPhraseStrength) {
      setRecoveryPhraseStrength(selectedStrength);

      const newRecoveryPhrase = generateRecoveryPhrase(selectedStrength);

      setRecoveryPhrase(newRecoveryPhrase);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonAndroidPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonAndroidPress);
  }, [handleBackButtonAndroidPress]);

  useEffect(() => {
    if (route.params?.recoveryPhrase) {
      setRecoveryPhrase(route.params?.recoveryPhrase);
    } else {
      const defaultRecoveryPhrase = generateRecoveryPhrase(
        RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words']
      );

      setRecoveryPhrase(defaultRecoveryPhrase);
    }
  }, [route.params?.recoveryPhrase, setRecoveryPhrase]);

  useScreenshotPrevent();

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <Stepper customProgressLength={4}>
        <RecoveryPhraseStrengthSelect
          value={recoveryPhraseStrength}
          handleChange={handleRecoveryPhraseStrengthChange}
        />

        <RegisterSafeKeeping showHeader recoveryPhrase={recoveryPhrase} />

        <RecoveryPhraseQuiz showHeader />

        <PasswordSetupForm
          hideNav
          title={<H4 style={[styles.title, styles.theme.title]}>Set up your account password</H4>}
          description={
            <P style={[styles.description, styles.theme.description]}>
              This password will be used for decrypting your account every time you initiate any
              transaction from your wallet, and also during backup or removal of an account from the
              wallet.
            </P>
          }
        />
      </Stepper>
    </SafeAreaView>
  );
}
