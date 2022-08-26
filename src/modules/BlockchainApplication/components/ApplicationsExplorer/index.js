import React, { useState } from 'react';
import ModalBox from 'react-native-modalbox';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { colors, themes } from 'constants/styleGuide';
import Icon from 'components/shared/toolBox/icon';
import { IconButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';
import StatsSvg from 'assets/svgs/StatsSvg';
import BlockchainApplicationsStats from '../ApplicationsStats';
import { useBlockchainApplicationExplorer } from '../../hooks/useBlockchainApplicationExplorer';

import getBlockchainApplicationsExplorerStyles from './styles';
import ApplicationList from '../ApplicationList';
import BlockchainApplicationRow from '../ApplicationRow';
import NavigationSafeAreaView from '../../../../components/navigation/NavigationSafeAreaView';

/**
 *
 * Renders a component that enable users to search, list and
 * view blockchain applications.
 */
function BlockchainApplicationsExplorer({ t, navigation }) {
  const [showStatsModal, setShowStatsModal] = useState(false);

  const { applications } = useBlockchainApplicationExplorer();

  const { theme, styles } = useTheme({
    styles: getBlockchainApplicationsExplorerStyles(),
  });

  const renderData = () => {
    if (applications.isLoading) {
      return (
        <P style={[styles.message, styles.theme.message]}>
          {t('application.explore.applicationList.loadingText')}
        </P>
      );
    }

    if (applications.isError) {
      return (
        <P style={[styles.message, styles.theme.message]}>
          {t('application.explore.applicationList.errorText')}
        </P>
      );
    }

    if (applications.data?.length === 0) {
      return (
        <P style={[styles.message, styles.theme.message]}>
          {t('application.explore.applicationList.emptyText')}
        </P>
      );
    }
    return (
      <ApplicationList
        applications={applications}
        Component={BlockchainApplicationRow}
        onItemPress={(item) =>
          navigation.navigate('ApplicationDetail', {
            chainID: item.chainID,
            variant: 'explore',
          })
        }
        showCaret
        variant="explore"
        navigation={navigation}
      />
    );
  };

  return (
    <NavigationSafeAreaView>
      <HeaderBackButton
        title={t('application.explore.title')}
        noIcon
        rightIconComponent={() => (
          <IconButton
            onClick={() => setShowStatsModal(true)}
            icon={<StatsSvg height={20} />}
            title={t('application.explore.statsButtonText')}
            titleStyle={{
              marginLeft: 8,
              color: theme === themes.dark ? colors.dark.mountainMist : colors.light.zodiacBlue,
            }}
            style={styles.statsButton}
          />
        )}
      />

      {renderData()}

      <ModalBox
        position="bottom"
        style={styles.statsModal}
        isOpen={showStatsModal}
        onClosed={() => setShowStatsModal(false)}
      >
        <Icon
          onPress={() => setShowStatsModal(false)}
          name="cross"
          color={theme === themes.light ? colors.light.black : colors.dark.white}
          style={styles.statsModalCloseButton}
          size={24}
        />

        <BlockchainApplicationsStats
          totalSupply={10000}
          staked={500000}
          stats={{ registered: 100, active: 50, terminated: 80 }}
          styles={{
            container: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            },
          }}
        />
      </ModalBox>
    </NavigationSafeAreaView>
  );
}

export default translate()(BlockchainApplicationsExplorer);
