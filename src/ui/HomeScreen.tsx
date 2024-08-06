import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from './theme/styles';
import {Image} from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {useAppNavigation} from './App';
import {useAppDispatch} from '../store/hooks';
import {clearDrill} from '../store/reducers/configureDrillReducer';

export function HomeScreen(): React.JSX.Element {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={[globalStyles.screenContainer]}>
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />
      <TouchableOpacity
        onPress={() => {
          dispatch(clearDrill());
          navigation.navigate('ConfigureDrill');
        }}
        style={styles.largeButton}>
        <Text style={[globalStyles.fieldHeader, styles.fieldHeader]}>
          new drill
        </Text>
        <Image
          style={styles.largeButtonIcon}
          source={require('../assets/create_drill_icon_large.png')}
          resizeMode="contain" // Add this line
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SavedDrills');
        }}
        style={styles.largeButton}>
        <Text style={globalStyles.fieldHeader}>saved drills</Text>

        <Image
          style={styles.largeButtonIcon}
          source={require('../assets/saved_drills_icon_large.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Stats');
        }}
        style={styles.largeButton}>
        <Text style={globalStyles.fieldHeader}>stats</Text>

        <Image
          style={styles.largeButtonIcon}
          source={require('../assets/stats_icon_large.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
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
  largeButton: {
    ...globalStyles.button,
    flex: 1,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  largeButtonIcon: {height: 100, width: 130, flex: 1},
});
