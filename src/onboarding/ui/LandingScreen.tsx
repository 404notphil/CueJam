import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {globalStyles} from '../../ui/theme/styles';
import {NativeModules} from 'react-native';

export function LandingScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onLoginPressedd = () => {
    navigation.navigate('Login');
  };
  const onSignupPressed = () => {
    navigation.navigate('Signup');
  };

  const {MetronomeModule} = NativeModules;

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Welcome</Text>
      <TouchableOpacity onPress={onLoginPressedd} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSignupPressed} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          MetronomeModule.start();
        }}
        style={globalStyles.button}>
        <Text>Start metronome</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          MetronomeModule.stop();
        }}
        style={globalStyles.button}>
        <Text>Stop metronome</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          MetronomeModule.setTempo(120);
        }}
        style={globalStyles.button}>
        <Text>Set tempo</Text>
      </TouchableOpacity>
    </View>
  );
}
