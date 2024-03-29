import React from 'react';
import i18next from 'i18next';

import { colors } from 'constants/styleGuide';
import PinSvg from 'assets/svgs/PinSvg';
import DeleteSvg from 'assets/svgs/DeleteSvg';

import { usePinApplications } from '../../hooks/usePinApplications';

export function useApplicationRowActions({
  application,
  variant,
  toggleDeleteDefaultApplicationModal,
  deleteApplication,
}) {
  const { checkPin, togglePin } = usePinApplications();

  const isPinned = checkPin(application.chainID);

  let leftActions;
  let rightActions;

  switch (variant) {
    case 'explore':
      leftActions = [
        {
          title: isPinned
            ? i18next.t('application.explore.applicationList.unpinText')
            : i18next.t('application.explore.applicationList.pinText'),
          color: isPinned ? colors.light.furyRed : colors.light.ufoGreen,
          icon: () => (
            <PinSvg variant={!isPinned ? 'outline' : 'closed'} color={colors.light.white} />
          ),
          onPress: () => togglePin(application.chainID),
        },
      ];
      break;

    case 'manage':
      rightActions = [
        {
          title: i18next.t('application.explore.applicationList.deleteText'),
          color: colors.light.furyRed,
          icon: () => <DeleteSvg color={colors.light.white} />,
          onPress: () => {
            if (application.isDefault) {
              toggleDeleteDefaultApplicationModal(true);
            } else {
              deleteApplication(application);
            }
          },
        },
      ];

      break;

    default:
      break;
  }

  return { leftActions, rightActions };
}
