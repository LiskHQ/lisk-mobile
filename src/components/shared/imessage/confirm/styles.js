import { StyleSheet } from 'react-native';
import { boxes, colors, fonts } from '../../../../constants/styleGuide';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light.white,
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    margin: boxes.boxPadding,
  },
  row: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: colors.light.mystic,
  },
  icon: {
    marginTop: 25,
  },
  rowContent: {
    paddingLeft: 13,
  },
  title: {
    marginBottom: 20,
  },
  amount: {
    paddingBottom: 15,
  },
  address: {
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 0,
  },
  button: {
    borderRadius: 2,
    marginBottom: 10,
    marginTop: 15,
  },
  buttonBusy: {
    opacity: 0.75,
  },
  label: {
    marginTop: 14,
    marginBottom: 2,
    fontFamily: fonts.family.context,
    fontSize: fonts.size.input,
    fontWeight: '400',
    color: colors.light.slateGray,
  },
  text: {
    flexWrap: 'wrap',
    paddingRight: 30,
    color: colors.light.black,
  },
  addressContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: boxes.boxPadding,
    paddingBottom: boxes.boxPadding,
  },
  avatar: {
    paddingBottom: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0,
  },
  error: {
    fontFamily: fonts.family.context,
    fontSize: fonts.size.input,
    color: colors.light.slateGray,
  },
  errorIcon: {
    marginRight: 6,
    color: colors.light.burntSieanna,
  },
  visible: {
    opacity: 1,
  },
  description: {
    color: colors.light.slateGray,
    fontFamily: fonts.family.contextSemiBold,
    marginTop: 15,
    lineHeight: 23,
    maxWidth: '80%',
  },
  rejectButton: {
    minWidth: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.light.slateGray,
    color: colors.light.slateGray,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 0,
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
  },
  confirmContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: -3 * boxes.boxPadding,
    marginBottom: 0,
    justifyContent: 'space-around',
  },
  confirmMessage: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.light.slateGray,
  },
});
