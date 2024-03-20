import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  modalOuter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modalInner: {
    position: 'absolute',
    top: '25%',
    margin: 32,
    padding: 16,
    backgroundColor: '#4B6496',
    borderColor: 'white',
    borderWidth: 0.3,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  screenContainer: {
    padding: 24,
    flex: 1,
    backgroundColor: '#4B6496',
  },
  title: {
    marginTop: 8,
    fontSize: 40,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  fieldHeader: {
    marginTop: 16,
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  textInputArea: {
    height: 40,
    marginTop: 8,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
  },
  loginButtonStyle: {
    marginTop: 20,
  },
  validationErrorText: {
    color: '#FF1100',
    // Add other text styles as needed
    fontFamily: 'arciform',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5FA9FF',
    padding: 16,
    marginVertical: 32,
    borderRadius: 5, // Optional: if you want rounded corners
  },
  modalErrorText: {
    color: '#FF1100',
    textAlign: 'center',
    // Add other text styles as needed
    fontFamily: 'arciform',
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // Add other text styles as needed
    fontFamily: 'arciform',
    fontSize: 16,
  },
  smallText: {
    marginTop: 16,
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
    fontFamily: 'arciform',
  },
});
