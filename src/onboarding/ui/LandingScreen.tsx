import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {globalStyles} from '../../ui/theme/styles';

export function LandingScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onLoginPressedd = () => {
    navigation.navigate('Login');
  };
  const onSignupPressed = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Welcome</Text>
      <TouchableOpacity onPress={onLoginPressedd} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSignupPressed} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
