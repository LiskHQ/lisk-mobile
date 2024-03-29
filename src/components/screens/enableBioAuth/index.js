import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks/useModal';
import { themes, colors } from 'constants/styleGuide';
import { B, Small } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import Icon from 'components/shared/toolBox/icon';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import i18next from 'i18next';
import getStyles from './styles';

const EnableBioAuth = ({ onSubmit, nextStep, enableSkip = false, skip }) => {
  const { styles, theme } = useTheme({ styles: getStyles() });
  const modal = useModal();
  const { sensorType } = useSelector((state) => state.settings);

  const confirm = () => {
    if (onSubmit) {
      onSubmit();
      modal.close();
    }
    if (nextStep) {
      nextStep({});
    }
  };

  return (
    <View>
      <B style={[styles.header, styles.theme.rowTitle]}>
        {i18next.t('settings.biometrics.enableTitle', { sensorType })}
      </B>

      <View style={styles.row}>
        <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
          <Icon
            name="secure"
            color={
              theme === themes.light ? colors.light.ultramarineBlue : colors.dark.ultramarineBlue
            }
            size={30}
          />
        </View>
        <View style={styles.textWrapper}>
          <B style={[styles.rowTitle, styles.theme.rowTitle]}>
            {i18next.t('settings.biometrics.title1')}
          </B>
          <Small style={[styles.description, styles.theme.description]}>
            {i18next.t(`settings.biometrics.description1`)}
          </Small>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
          <Icon
            name="settings-bg"
            color={
              theme === themes.light ? colors.light.ultramarineBlue : colors.dark.ultramarineBlue
            }
            size={30}
          />
        </View>
        <View style={styles.textWrapper}>
          <B style={[styles.rowTitle, styles.theme.rowTitle]}>
            {i18next.t('settings.biometrics.title2')}
          </B>
          <Small style={[styles.description, styles.theme.description]}>
            {i18next.t(`settings.biometrics.description2`, { sensorType })}
          </Small>
        </View>
      </View>

      <View style={styles.footer}>
        {enableSkip && (
          <Button onClick={skip} style={styles.secondaryButton}>
            {i18next.t('settings.biometrics.cancelButton')}
          </Button>
        )}

        <PrimaryButton onPress={confirm} style={enableSkip ? styles.semiFlex : styles.flex}>
          {i18next.t('settings.biometrics.submitButton', { sensorType })}
        </PrimaryButton>
      </View>
    </View>
  );
};

export default EnableBioAuth;
