import {StyleSheet} from 'react-native';
import {Themes} from './Theme';
import {ThemeProvider} from '@react-navigation/native';

export const shadowStyleSheet = StyleSheet.create({
  shadowStyle: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    // Important for Android
    elevation: 8,
  },
});

export const globalStyles = StyleSheet.create({
  shadowStyle: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    // Important for Android
    elevation: 8,
  },
  modalOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.dark.scrimColor,
    flex: 1,
  },
  modalInner: {
    margin: 16,
    padding: 16,
    backgroundColor: Themes.dark.background,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    ...shadowStyleSheet.shadowStyle,
  },
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 24,
    flex: 1,
    backgroundColor: Themes.dark.background,
  },
  screenContainerScrollable: {
    paddingVertical: 24,
    flex: 1,
    backgroundColor: Themes.dark.background,
  },
  title: {
    marginTop: 8,
    fontSize: 40,
    color: Themes.dark.lightText,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  fieldHeader: {
    marginTop: 16,
    fontSize: 25,
    color: Themes.dark.lightText,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  mediumText: {
    fontSize: 20,
    color: Themes.dark.lightText,
    fontFamily: 'arciform',
  },
  textInputArea: {
    height: 40,
    marginTop: 8,
    color: Themes.dark.lightText,
    borderColor: 'gray',
    borderWidth: 1,
  },
  loginButtonStyle: {
    marginTop: 20,
  },
  validationErrorText: {
    color: Themes.dark.errorRed,
    fontFamily: 'arciform',
    fontSize: 16,
  },
  button: {
    backgroundColor: Themes.dark.buttonSurface,
    padding: 16,
    borderRadius: 5,
  },
  chipStyle: {
    height: 40,
    width: 70,
    margin: 10,
    backgroundColor: Themes.dark.buttonSurface,
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 20,
    justifyContent: 'center',
  },
  selectedChipStyle: {
    height: 40,
    width: 70,
    margin: 10,
    backgroundColor: Themes.dark.buttonSurface,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
  },
  modalErrorText: {
    color: Themes.dark.errorYellowText,
    textAlign: 'center',
    fontFamily: 'arciform',
    fontSize: 16,
  },
  underline: {textDecorationLine: 'underline'},
  actionButtonText: {
    color: Themes.dark.actionText,
    fontFamily: 'arciform',
    fontSize: 20,
  },
  infoText: {
    color: Themes.dark.infoText,
    fontFamily: 'arciform',
    fontSize: 16,
  },
  buttonText: {
    color: Themes.dark.lightText,
    textAlign: 'center',
    fontFamily: 'arciform',
    fontSize: 20,
  },
  smallText: {
    marginTop: 16,
    fontSize: 16,
    color: Themes.dark.lightText,
    fontWeight: '400',
    fontFamily: 'arciform',
  },
  listItemBackground: {
    backgroundColor: '#242C3B',
    ...shadowStyleSheet.shadowStyle,
  },
});