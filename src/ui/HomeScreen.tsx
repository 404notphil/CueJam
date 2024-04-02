import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {useAuth} from '../auth/AuthProvider';
import {globalStyles} from './theme/styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {Image} from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';

export function HomeScreen(): React.JSX.Element {
  const {token, setToken} = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const animatedOpacity = useSharedValue(0);
  const animatedFlex = useSharedValue(0);
  useEffect(() => {
    animatedOpacity.value = 0;
    animatedFlex.value = 0;
    animatedOpacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
    animatedFlex.value = withTiming(1, {
      duration: 400,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, []);
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      flex: animatedFlex.value,
    };
  });

  return (
    <Animated.View style={[globalStyles.screenContainer, animatedOpacityStyle]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ConfigureDrill');
        }}
        style={styles.largeButton}>
        <Text style={[globalStyles.fieldHeader, styles.fieldHeader]}>
          New drill
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
        <Text style={globalStyles.fieldHeader}>Saved Drills</Text>

        <Image
          style={styles.largeButtonIcon}
          source={require('../assets/saved_drills_icon_large.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
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
