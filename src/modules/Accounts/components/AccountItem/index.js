import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import Avatar from 'components/shared/avatar';
import { P } from 'components/shared/toolBox/typography';
import Swipeable from 'components/shared/Swipeable';
import Icon from 'components/shared/toolBox/icon';
import { stringShortener } from 'utilities/helpers';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import RefreshSvg from 'assets/svgs/RefreshSvg';
import { colors } from 'constants/styleGuide';
import { useModal } from 'hooks/useModal';

import getAccountItemStyles from './styles';

export default function AccountItem({
  account,
  onPress,
  onEditPress,
  onDeletePress,
  testID,
  active,
  navigation,
}) {
  const { styles, theme } = useTheme({ styles: getAccountItemStyles() });
  const modal = useModal();
  const { name: username, address } = account.metadata;

  return (
    <Swipeable
      leftActions={[
        {
          title: 'Backup',
          color: colors.dark.blueGray,
          icon: () => <RefreshSvg />,
          testID: 'backup-account',
          onPress: () => {
            navigation.navigate('BackupRecoveryPhrase', { account });
            modal.close();
          },
        },
      ]}
      rightActions={[
        {
          title: 'Edit',
          color: colors.dark.blueGray,
          icon: () => <Icon name="edit-bookmark" size={20} color={colors[theme].white} />,
          testID: 'edit-account',
          onPress: onEditPress,
        },
        {
          title: 'Delete',
          color: colors.dark.furyRed,
          icon: () => <Icon name="delete-bookmark" size={20} color={colors[theme].white} />,
          testID: 'delete-account',
          onPress: onDeletePress,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.container, styles.theme.container]}
        onPress={onPress}
        testID={testID}
      >
        <Avatar address={address} size={45} style={styles.avatar} />

        <View style={styles.content}>
          {!!username && <P style={[styles.username, styles.theme.username]}>{username}</P>}

          <P style={[styles.address, styles.theme.address]}>{stringShortener(address, 6, 6)}</P>
        </View>

        <View>{active && <CircleCheckedSvg variant="fill" />}</View>
      </TouchableOpacity>
    </Swipeable>
  );
}
