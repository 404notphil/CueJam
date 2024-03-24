import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from '../auth/AuthProvider';
import {globalStyles} from './theme/styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';

export function HomeScreen(): React.JSX.Element {
  const {token, setToken} = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>HomeScreen</Text>
      <Text style={globalStyles.fieldHeader}>Token:</Text>
      <Text style={globalStyles.smallText}>{token}</Text>
      <TouchableOpacity
        onPress={() => {
          setToken(null);
        }}
        style={globalStyles.button}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ConfigureDrill');
        }}
        style={globalStyles.button}>
        <Text>Configure drill</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Drill');
        }}
        style={globalStyles.button}>
        <Text>Drill</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SavedDrills');
        }}
        style={globalStyles.button}>
        <Text>Saved Drills</Text>
      </TouchableOpacity>
    </View>
  );
}