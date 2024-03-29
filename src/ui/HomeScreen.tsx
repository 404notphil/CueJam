import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {useAuth} from '../auth/AuthProvider';
import {globalStyles} from './theme/styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {Image} from 'react-native';
import AnimatedExample from './TestAnimation';

export function HomeScreen(): React.JSX.Element {
  const {token, setToken} = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={globalStyles.screenContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ConfigureDrill');
        }}
        style={[
          globalStyles.button,
          {
            marginVertical: 32,
            alignItems: 'center',
            justifyContent: 'flex-end',
          },
        ]}>
        <Text style={[globalStyles.fieldHeader, styles.fieldHeader]}>
          New drill
        </Text>
        <Image
          style={{height: 100, width: 130}}
          source={require('../assets/create_drill_icon_large.png')}
          resizeMode="contain" // Add this line
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SavedDrills');
        }}
        style={[
          globalStyles.button,
          {
            marginVertical: 32,
            alignItems: 'center',
            justifyContent: 'flex-end',
          },
        ]}>
        <Text style={globalStyles.fieldHeader}>Saved Drills</Text>

        <Image
          style={{height: 100, width: 130}}
          source={require('../assets/saved_drills_icon_large.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <AnimatedExample />
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
