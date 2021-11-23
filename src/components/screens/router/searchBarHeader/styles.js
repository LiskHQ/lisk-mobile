import { fonts } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    navContainer: {
      height: 50
    },
    title: {
      fontFamily: fonts.family.heading,
      fontSize: 24,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    miconButtonain: {
      padding: 10,
      backgroundColor: 'green'
    },
    searchIcon: {
      position: 'absolute',
      zIndex: 1,
      left: 30,
      bottom: 16,
    },
    input: {
      flexWrap: 'wrap',
      paddingLeft: 35,
      marginTop: -20
    },
  }
});
