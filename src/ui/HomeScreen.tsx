import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../auth/AuthProvider';

export function HomeScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {token, setToken} = useAuth();

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>HomeScreen</Text>
      <Text style={styles.fieldHeader}>Token:</Text>
      <Text style={styles.smallText}>{token}</Text>
      <TouchableOpacity
        onPress={() => {
          setToken(null);
          navigation.navigate('Landing');
        }}
        style={styles.button}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#999999',
    padding: 16,
    marginVertical: 32,
    borderRadius: 5, // Optional: if you want rounded corners
  },
});
