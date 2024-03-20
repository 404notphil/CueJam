import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from '../auth/AuthProvider';
import {globalStyles} from './theme/styles';

export function HomeScreen(): React.JSX.Element {
  const {token, setToken} = useAuth();

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
    </View>
  );
}