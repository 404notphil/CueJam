import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../auth/AuthProvider';
import {globalStyles} from './theme/styles';

export function HomeScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {token, setToken} = useAuth();

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>HomeScreen</Text>
      <Text style={globalStyles.fieldHeader}>Token:</Text>
      <Text style={globalStyles.smallText}>{token}</Text>
      <TouchableOpacity
        onPress={() => {
          setToken(null);
          navigation.navigate('Landing');
        }}
        style={globalStyles.button}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}