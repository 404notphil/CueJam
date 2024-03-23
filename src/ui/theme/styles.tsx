import {StyleSheet} from 'react-native';
import {Themes} from './Theme';
import {ThemeProvider} from '@react-navigation/native';

export const globalStyles = StyleSheet.create({
  modalOuter: {
    backgroundColor: Themes.dark.scrimColor,
    flex: 1,
  },
  modalInner: {
    position: 'absolute',
    top: '25%',
    margin: 32,
    padding: 16,
    backgroundColor: Themes.dark.background,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  screenContainer: {
    padding: 24,
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
    color: Themes.dark.errorYellowText,
    fontFamily: 'arciform',
    fontSize: 16,
  },
  button: {
    backgroundColor: Themes.dark.buttonSurface,
    padding: 16,
    marginVertical: 32,
    borderRadius: 5,
  },
  modalErrorText: {
    color: Themes.dark.errorYellowText,
    textAlign: 'center',
    fontFamily: 'arciform',
    fontSize: 16,
  },
  buttonText: {
    color: Themes.dark.lightText,
    textAlign: 'center',
    fontFamily: 'arciform',
    fontSize: 16,
  },
  smallText: {
    marginTop: 16,
    fontSize: 16,
    color: Themes.dark.lightText,
    fontWeight: '400',
    fontFamily: 'arciform',
  },
});