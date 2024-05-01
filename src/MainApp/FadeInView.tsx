import React, {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

interface FadeInViewProps {
  duration?: number; // Duration of the fade-in effect in milliseconds
  style?: StyleProp<ViewStyle>; // Optional styling for the fade-in view container
  children: React.ReactNode; // The content to be faded in
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  duration = 500,
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to full opacity
      duration,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={[style, {opacity: fadeAnim}]}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
