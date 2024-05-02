import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppNavigation} from '../ui/App';
import {ConfigureDrillState} from '../store/reducers/configureDrillReducer';
import {Themes} from '../ui/theme/Theme';
import PlayIcon from '../assets/PlayIcon';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';

interface PlayDrillConfigurationButtonProps {
  configurationState: ConfigureDrillState;
}

export const PlayDrillConfigurationButton: React.FC<
  PlayDrillConfigurationButtonProps
> = props => {
  const navigation = useAppNavigation();
  const state = props.configurationState;
  const animatedOpacity = useSharedValue(1);
  useEffect(() => {
    animatedOpacity.value = withRepeat(
      withTiming(0.5, {duration: 1000, easing: Easing.linear}),
      -1, // Repeat infinitely
      true, // Reverse the animation on every iteration
    );
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [props]);

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  return (
    <Animated.View style={animatedOpacityStyle}>
      <TouchableOpacity
        style={[
          {
            marginBottom: 16,
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: Themes.dark.actionText,
            borderRadius: 5,
            padding: 16,
          },
        ]}
        onPress={() => {
          navigation.navigate('Drill');
        }}>
        <PlayIcon size={state.playButtonText === 'play' ? 50 : 35} />
        <View style={{height: 16}} />
        <Text
          style={[
            state.playButtonText === 'play'
              ? styles.largePlayButtonText
              : styles.smallPlayButtonText,
            {width: 100},
          ]}>
          {state.playButtonText}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  largePlayButtonText: {
    color: '#CCFF00',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  smallPlayButtonText: {
    color: '#CCFF00',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
});
