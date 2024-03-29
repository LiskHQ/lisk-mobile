/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import i18next from 'i18next';
import SwitchButton from 'components/shared/toolBox/switchButton';
import { settingsUpdated } from 'modules/Settings/store/actions';

import { useTheme } from 'contexts/ThemeContext';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import HeaderBackButton from 'components/navigation/headerBackButton';
import EnableBioAuth from 'components/screens/enableBioAuth';
import Input from 'components/shared/toolBox/input';
import { P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { Controller } from 'react-hook-form';
import { useModal } from 'hooks/useModal';
import { selectSettings } from 'store/selectors';

import { usePasswordSetupForm } from '../../hooks/usePasswordSetupForm';

import getStyles from './styles';

export default function PasswordSetupForm({
  sharedData: data,
  hideNav,
  move,
  currentIndex,
  length,
  title,
  description,
  isRegister,
}) {
  useScreenshotPrevent();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { useDerivationPath } = useSelector(selectSettings);

  const recoveryPhrase = route.params?.recoveryPhrase || data.recoveryPhrase;

  const { derivationPath } = route.params ?? {};
  const { styles } = useTheme({ styles: getStyles() });

  const { sensorType } = useSelector((state) => state.settings);

  useEffect(() => {
    const setBiometricSensorType = async () => {
      try {
        const deviceSensorType = await FingerprintScanner.isSensorAvailable();
        dispatch(settingsUpdated({ sensorType: deviceSensorType }));
      } catch (error) {
        dispatch(settingsUpdated({ sensorType: null }));
      }
    };

    setBiometricSensorType();
  }, [dispatch]);

  const [
    {
      handleSubmit,
      accountNameField,
      isAgreedField,
      isBiometricsEnabled,
      formState,
      control,
      trigger,
    },
    { encryptedAccount, isLoading, isSuccess },
  ] = usePasswordSetupForm(recoveryPhrase, derivationPath, isRegister || useDerivationPath);

  const biometricsModal = useModal();

  const encryptAccount = () => {
    const isError = Object.keys(formState.errors).length;
    const hasTouchedField = Object.keys(formState.touchedFields).length;
    if (hasTouchedField && !isError) {
      if (sensorType) {
        biometricsModal.open(
          <EnableBioAuth
            onSubmit={() => {
              isBiometricsEnabled.onChange(true);
              handleSubmit();
            }}
            skip={() => {
              handleSubmit();
              biometricsModal.close();
            }}
            enableSkip
          />
        );
      } else {
        handleSubmit();
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate({
        name: 'PasswordSetupSuccess',
        params: {
          encryptedAccount,
          onContinue: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            }),
        },
      });
    }
  }, [navigation, isSuccess, encryptedAccount]);

  useEffect(() => {
    // We need to re-trigger this as useForm don't re-validate after this change
    // Cause validation method is set to onBlur, but the component isn't an input
    trigger('isAgreed');
  }, [isAgreedField.value]);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      {hideNav ? (
        <HeaderBackButton
          title="auth.register.title"
          onPress={() => move({ moves: -1, data })}
          withProgressBar
          currentIndex={currentIndex}
          length={length}
        />
      ) : (
        <HeaderBackButton title="auth.setup.passwordSetupTitle" onPress={navigation.goBack} />
      )}

      <KeyboardAwareScrollView style={styles.container} testID="password-setup-form">
        {title}

        {description || (
          <P style={[styles.description, styles.theme.description]}>
            {i18next.t('auth.setup.passwordSetupDescription')}
          </P>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              testID="enter-password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label={i18next.t('auth.form.passwordLabel')}
              secureTextEntry
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              error={
                formState.errors?.password?.message &&
                i18next.t(formState.errors?.password?.message)
              }
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              testID="confirm-password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label={i18next.t('auth.form.confirmPasswordLabel')}
              secureTextEntry
              innerStyles={{
                containerStyle: styles.inputContainer,
                input: styles.input,
              }}
              error={
                formState.errors?.confirmPassword?.message &&
                i18next.t(formState.errors?.confirmPassword?.message)
              }
            />
          )}
        />

        <Input
          testID="account-name"
          value={accountNameField.value}
          onChange={accountNameField.onChange}
          label={i18next.t('auth.form.accountNameLabel')}
          innerStyles={{
            containerStyle: styles.inputContainer,
            input: styles.input,
          }}
        />
      </KeyboardAwareScrollView>

      <View style={[styles.footer]}>
        <View style={styles.actionContainer}>
          <View style={styles.switch} testID="agree-switch">
            <SwitchButton
              value={isAgreedField.value}
              onChange={(value) => isAgreedField.onChange(value)}
            />
          </View>

          <P style={[styles.actionText, styles.theme.description]}>
            {i18next.t('auth.form.termsAgreementText')}
          </P>
        </View>

        <PrimaryButton
          onPress={encryptAccount}
          disabled={!isAgreedField.value || isLoading || !formState.isValid}
          testID="save-account"
          isLoading={isLoading}
        >
          {i18next.t('auth.setup.buttons.saveAccountButton')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
