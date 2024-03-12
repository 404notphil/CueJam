import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export function HomeScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>HomeScreen</Text>
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // Add other text styles as needed
  },
});
