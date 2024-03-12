import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from './AuthProvider';

export function HomeScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {token, setToken} = useAuth();

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>HomeScreen</Text>
      <Text style={styles.fieldHeader}>Token:</Text>
      <Text style={styles.smallText}>{token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  smallText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '400',
  },
});
