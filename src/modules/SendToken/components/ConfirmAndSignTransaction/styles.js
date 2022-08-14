import { themes, colors, fonts } from 'constants/styleGuide';

export default function getConfirmAndSignTransactionStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
      },
      title: {
        fontFamily: fonts.family.heading,
        fontSize: fonts.size.h3,
        textAlign: 'center',
        marginBottom: 8
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
      instructionsText: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.base,
        textAlign: 'center',
        marginBottom: 24
      },
      accountNameText: {
        marginTop: 8,
        marginBottom: 8,
        color: colors.light.zodiacBlue,
        fontWeight: '500'
      },
      accountAddressText: {
        marginBottom: 24,
        color: colors.light.blueGray
      },
      inputContainer: {
        width: '100%',
        margin: 0
      }
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
    },
  };
}
