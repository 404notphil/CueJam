import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {useAuth} from '../auth/AuthProvider';
import {globalStyles} from './theme/styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {Image} from 'react-native';

export function HomeScreen(): React.JSX.Element {
  const {token, setToken} = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>NotePrompter</Text>
      <Text style={[globalStyles.smallText, {marginTop: 0, paddingLeft: 60}]}>
        by tunepruner
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ConfigureDrill');
        }}
        style={[
          globalStyles.button,
          {alignItems: 'center', justifyContent: 'flex-end'},
        ]}>
        <Text style={[globalStyles.fieldHeader, styles.fieldHeader]}>
          Configure drill
        </Text>
        <Image
          style={{height: 100, width: 130}}
          source={require('./create_drill_icon_large.png')}
          resizeMode="contain" // Add this line
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SavedDrills');
        }}
        style={[
          globalStyles.button,
          {alignItems: 'center', justifyContent: 'flex-end'},
        ]}>
        <Text style={globalStyles.fieldHeader}>Saved Drills</Text>

        <Image
          style={{height: 100, width: 130}}
          source={require('./saved_drills_icon_large.png')}
          resizeMode="contain" // Add this line
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldHeader: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0.5},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});