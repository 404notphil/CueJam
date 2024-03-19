import React, {useEffect, useReducer, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SignupActions} from '../../reducers/SignupUiState';
import {RootStackParamList} from '../../../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../auth/AuthProvider';
import {signUpUser} from '../../../services/AuthService';
import {globalStyles} from '../../../ui/theme/styles';
import {signupReducer} from '../../reducers/SignupReducer';
import {initialSignupUiState} from '../../reducers/SignupUiState';
import {SignupScreenModal} from './SignupScreenModal';
import {EmailFieldAndErrors} from './EmailFieldAndErrors';
import {UsernameFieldAndErrors} from './UsernameFieldAndErrors';
import {PasswordFieldAndErrors} from './PasswordFieldAndErrors';
import {SignupButton} from './SignupButton';

export function SignupScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [uiState, dispatch] = useReducer(signupReducer, initialSignupUiState);

  const {setToken} = useAuth();

  const onSignupPressed = async () => {
    const result = await signUpUser(
      uiState.emailText,
      uiState.usernameText,
      uiState.passwordText,
      setToken,
    );
    switch (result) {
      case 'ErrorDuringSignup': {
        dispatch(SignupActions.serverOrCredentialError());
      }
      case 'Success': {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      {uiState.modalState &&
        uiState.modalState.modalMessage &&
        SignupScreenModal(
          uiState.modalState,
          uiState.modalState.modalTitle,
          uiState.modalState.modalMessage,
          dispatch,
        )}

      {/* Header */}
      <Text style={globalStyles.title}>Signup</Text>

      {EmailFieldAndErrors(dispatch, uiState)}

      {UsernameFieldAndErrors(dispatch, uiState)}

      {PasswordFieldAndErrors(dispatch, uiState)}

      {SignupButton(dispatch, uiState, onSignupPressed)}
    </View>
  );
}

export const signupStyles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
});
