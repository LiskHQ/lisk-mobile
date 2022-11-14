import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import useWalletConnectPairings from '../../../../../libs/wcm/hooks/usePairings';

import getStyles from './styles';

const BridgeApplication = ({ nextStep }) => {
  const [status, setStatus] = useState({});

  const [inputUri, setInputUri] = useState('');

  const { setUri } = useWalletConnectPairings();

  const { styles } = useTheme({ styles: getStyles });

  const handleSubmit = async () => {
    setStatus({ ...status, isPending: true });

    const result = await setUri(inputUri);

    setStatus(result);

    nextStep();
  };

  return (
    <View style={styles.container}>
      <H2 style={[styles.title, styles.theme.title]}>
        {i18next.t('application.explore.externalApplicationList.bridgeApplication')}
      </H2>

      <P style={[styles.description, styles.theme.description]}>
        {i18next.t('application.explore.externalApplicationList.bridgeApplicationDescription')}
      </P>

      <View style={styles.inputContainer}>
        <Input
          placeholder={i18next.t('application.explore.externalApplicationList.enterConnectionUri')}
          autoCorrect={false}
          autoFocus
          onChange={setInputUri}
          value={inputUri}
          returnKeyType="done"
        />
      </View>

      <PrimaryButton disabled={!inputUri || status.isPending} onPress={handleSubmit}>
        {status.isPending
          ? 'Loading...'
          : i18next.t('application.explore.externalApplicationList.addApplication')}
      </PrimaryButton>
    </View>
  );
};

export default BridgeApplication;
