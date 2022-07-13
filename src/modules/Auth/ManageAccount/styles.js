import { colors, themes, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: boxes.boxPadding,
    },
    body: {
      paddingTop: boxes.boxPadding
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
    },
    bottom: {
      padding: boxes.boxPadding,
      marginBottom: boxes.boxPadding,
    },
    button: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    icon: {
      width: 30
    },
    outline: {
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
      borderRadius: 5,
      minHeight: 50,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white
    },
    remove: {
      color: colors.light.zodiacBlue,
    }
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black
    },
    remove: {
      color: colors.light.white,
    }
  },
});