import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {globalStyles} from '../../ui/theme/styles';

interface ExpandableTextProps {
  error: string | undefined;
  isCurrent: boolean;
  style?: StyleProp<ViewStyle>; // Optional style prop for external styling
}

export const ExpandableText = ({
  error,
  isCurrent,
  style,
}: ExpandableTextProps) => {
  const animationHeight = useRef(new Animated.Value(isCurrent ? 0 : 1));

  useEffect(() => {
    Animated.timing(animationHeight.current, {
      toValue: isCurrent ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // Height animation does not support native driver
    }).start();
  }, [isCurrent]);

  const maxHeight = animationHeight.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.expandableView, {height: maxHeight}]}>
        <Text style={[globalStyles.validationErrorText, style]}>
          {isCurrent ? error : ''}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  expandableView: {
    width: '100%',
    justifyContent: 'center',
  },
});
