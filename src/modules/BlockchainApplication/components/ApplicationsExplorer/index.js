/* eslint-disable max-statements */
import React, { useState, useContext, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import Stepper from 'components/shared/Stepper';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useModal } from 'contexts/useModal';
import { useTheme } from 'contexts/ThemeContext';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import { IconButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import Tabs from 'components/shared/Tabs';
import StatsSvg from 'assets/svgs/StatsSvg';
import { colors, themes } from 'constants/styleGuide';
import Fab from 'components/shared/Fab';
import QRCodeSvg from 'assets/svgs/QRCodeSvg';
import CopySvg from 'assets/svgs/CopySvg';
import { useApplicationsExplorer } from '../../hooks/useApplicationsExplorer';
import ApplicationList from '../ApplicationList/ApplicationList';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import ApplicationsStats from '../ApplicationsStats/ApplicationsStats';
import ExternalApplicationList from '../ExternalApplicationList';

import getApplicationsExplorerStyles from './styles';
import BridgeApplication from '../BridgeApplication';
import InitiateConnection from '../InitiateConnection';
import ApproveConnection from '../ApproveConnection';
import WalletConnectContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';

const actions = [
  {
    key: 'paste',
    text: 'Paste URI',
    icon: <CopySvg variant="outline" color={colors.light.white} />,
  },
  { key: 'scan', text: 'Scan QR Code', icon: <QRCodeSvg /> },
];

/**
 *
 * Renders a component that enable users to search, list and
 * view blockchain applications.
 */
export default function ApplicationsExplorer() {
  const { showModal, closeModal } = useModal();

  const navigation = useNavigation();
  const { events } = useContext(WalletConnectContext);
  const [activeTab, setActiveTab] = useState('internalApplications');
  const tabBarHeight = useBottomTabBarHeight();

  const applications = useApplicationsExplorer();

  const { theme, styles } = useTheme({
    styles: getApplicationsExplorerStyles(),
  });

  const onCancelConnection = () => closeModal();

  const showApplicationStats = () =>
    showModal(
      <ApplicationsStats
        styles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        }}
      />
    );

  const connectionEvent = useMemo(() => {
    if (events.length && events[events.length - 1].name === EVENTS.SESSION_PROPOSAL) {
      return events[events.length - 1];
    }

    return undefined;
  }, [events]);

  const renderConnectionSteps = () => (
    <Stepper>
      <BridgeApplication />
      <InitiateConnection event={connectionEvent} onFinish={onCancelConnection} />
      <ApproveConnection event={connectionEvent} onFinish={onCancelConnection} />
    </Stepper>
  );

  const showNewConnectionModal = () => showModal(renderConnectionSteps());

  const onFabItemPress = (item) => {
    if (item.key === 'paste') {
      showNewConnectionModal();
    }
  };

  return (
    <>
      <NavigationSafeAreaView>
        <HeaderBackButton
          title={i18next.t('application.explore.title')}
          noIcon
          rightIconComponent={() => (
            <IconButton
              onClick={showApplicationStats}
              icon={<StatsSvg height={20} />}
              title={i18next.t('application.explore.statsButtonText')}
              titleStyle={{
                marginLeft: 8,
                color: theme === themes.dark ? colors.dark.mountainMist : colors.light.zodiacBlue,
              }}
              style={styles.statsButton}
            />
          )}
          titleStyle={[styles.header]}
        />

        <View style={[styles.body, styles.flex]}>
          <Tabs value={activeTab} onClick={setActiveTab}>
            <Tabs.Tab value="internalApplications">
              {i18next.t('application.explore.applicationList.title')}
            </Tabs.Tab>
            <Tabs.Tab value="externalApplications">
              {i18next.t('application.explore.externalApplicationList.title')}
            </Tabs.Tab>
          </Tabs>
          <Tabs.Panel index="internalApplications" value={activeTab}>
            <ApplicationList
              applications={applications}
              Component={ApplicationRow}
              onItemPress={(item) =>
                navigation.navigate('ApplicationDetails', {
                  chainID: item.chainID,
                  variant: 'explore',
                })
              }
              showCaret
              variant="explore"
            />
          </Tabs.Panel>

          <Tabs.Panel index="externalApplications" value={activeTab}>
            <ExternalApplicationList />
          </Tabs.Panel>
        </View>
      </NavigationSafeAreaView>

      {activeTab === 'externalApplications' && (
        <Fab actions={actions} bottom={tabBarHeight} onPressItem={onFabItemPress} />
      )}
    </>
  );
}
