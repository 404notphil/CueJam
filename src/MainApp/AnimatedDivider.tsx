import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

type AnimatedDividerProps = {
  isVisible: boolean;
};

const AnimatedDivider: React.FC<AnimatedDividerProps> = ({isVisible}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      // Apply a delay of 500 milliseconds before starting the fade-in animation
      opacity.value = withDelay(500, withTiming(0.2, {duration: 600}));
    } else {
      // Fade out immediately when the component is no longer visible
      opacity.value = withTiming(0, {duration: 600});
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return <Animated.View style={[animatedStyle, styles.divider]} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#CCFF00',
    height: 1,
  },
});

export default AnimatedDivider;
