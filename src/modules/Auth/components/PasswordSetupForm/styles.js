import { colors, themes, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    title: {
      fontFamily: fonts.family.context,
      marginTop: 16,
    },
    description: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      marginTop: 16,
      marginBottom: 16,
    },
    formContainer: {
      paddingTop: 8,
    },
    inputContainer: {
      paddingLeft: 0,
      paddingRight: 0,
      marginTop: 16,
    },
    input: {
      fontFamily: fonts.family.context,
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    switch: {
      paddingRight: 8,
    },
    actionText: {
      flex: 1,
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      color: colors.light.blueGray,
    },
    footer: {
      padding: boxes.boxPadding,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white,
    },
    description: {
      color: colors.light.smoothGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black,
    },
    description: {
      color: colors.dark.mountainMist,
    },
  },
});
