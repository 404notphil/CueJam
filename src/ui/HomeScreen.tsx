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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AddDrillIcon from '../assets/AddDrillIcon';
import SavedDrillsIcon from '../assets/SavedDrillsIcon';
import StatsIcon from '../assets/StatsIcon';

export function HomeScreen(): React.JSX.Element {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[globalStyles.screenContainer, {paddingBottom: insets.bottom}]}>
      <View style={globalStyles.screenContainer}>
        <StatusBar
          barStyle="default"
          backgroundColor="transparent"
          translucent
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(clearDrill());
            navigation.navigate('ConfigureDrill');
          }}
          style={[styles.largeButton]}>
          <Text style={[globalStyles.title, {fontSize: 35, maxWidth: 100}]}>
            new drill
          </Text>
          <View />
          <AddDrillIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SavedDrills');
          }}
          style={styles.largeButton}>
          <Text style={[globalStyles.title, {fontSize: 35, maxWidth: 100}]}>
            saved drills
          </Text>

          <SavedDrillsIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Stats');
          }}
          style={styles.largeButton}>
          <Text style={[globalStyles.title, {fontSize: 35, maxWidth: 100}]}>
            stats
          </Text>

          <StatsIcon />
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  largeButtonIcon: {height: 100, width: 130, flex: 1},
});
