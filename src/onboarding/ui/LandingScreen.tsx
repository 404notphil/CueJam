import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {TouchableOpacity, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {globalStyles} from '../../ui/theme/styles';
import {useAuth} from '../../auth/AuthProvider';

export function LandingScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {setToken} = useAuth();

  const onLoginPressedd = () => {
    navigation.navigate('Login');
  };
  const onSignupPressed = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Welcome</Text>
      <TouchableOpacity
        onPress={onLoginPressedd}
        style={[globalStyles.button, {marginVertical: 32}]}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSignupPressed}
        style={[globalStyles.button, {marginVertical: 32}]}>
        <Text style={globalStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setToken('temp');
        }}
        style={[globalStyles.button, {marginVertical: 32}]}>
        <Text style={globalStyles.buttonText}>Enter as guest</Text>
      </TouchableOpacity>
    </View>
  );
}
