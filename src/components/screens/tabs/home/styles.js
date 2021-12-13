import { themes, colors } from '../../../../constants/styleGuide';
import { deviceHeight } from '../../../../utilities/device';

export default () => ({
  common: {
    flex: {
      flex: 1
    },
    homeContainer: {
      paddingTop: 20
    },
    fixedBg: {
      position: 'absolute',
      flex: 1,
      zIndex: -1,
      top: deviceHeight() / 1.5,
      right: 0,
      left: 0,
      bottom: 0
    },
    scrollView: {
      top: 0
    },
    loadingContainer: {
      flex: 1,
      paddingVertical: 150
    },
    scrollViewContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    }
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white
    },
    fixedBg: {
      backgroundColor: colors.light.white
    },
    loadingContainer: {
      backgroundColor: colors.light.white
    },
    homeContainer: {
      backgroundColor: colors.light.ultramarineBlue
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg
    },
    fixedBg: {
      backgroundColor: colors.dark.mainBg
    },
    loadingContainer: {
      backgroundColor: colors.dark.mainBg
    },
    homeContainer: {
      backgroundColor: colors.dark.inkBlue
    }
  }
});
