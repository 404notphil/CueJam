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
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 0.3,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  screenContainer: {
    padding: 24,
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    marginTop: 8,
    fontSize: 40,
    fontWeight: '600',
  },
  fieldHeader: {
    marginTop: 16,
    fontSize: 25,
    fontWeight: '600',
  },
  textInputArea: {
    height: 40,
    marginTop: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textInputText: {
    fontSize: 14,
    fontWeight: '200',
  },
  validationError: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonStyle: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#999999',
    padding: 16,
    marginVertical: 32,
    borderRadius: 5, // Optional: if you want rounded corners
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    // Add other text styles as needed
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // Add other text styles as needed
  },
  smallText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '400',
  },
});
