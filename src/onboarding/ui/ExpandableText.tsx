import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {globalStyles} from '../../ui/theme/styles';

interface ExpandableTextProps {
  error: string | undefined;
  isCurrent: boolean;
}

export const ExpandableText = ({error, isCurrent}: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(isCurrent);
  const animationHeight = useRef(new Animated.Value(isCurrent ? 0 : 1));

  useEffect(() => {
    setExpanded(isCurrent);
  }, [isCurrent]);

  useEffect(() => {
    Animated.timing(animationHeight.current, {
      toValue: expanded ? 1 : 0, // 1 when expanded, 0 when collapsed
      duration: 300, // Animation duration in milliseconds
      useNativeDriver: false, // Height animation does not support native driver
    }).start();
  }, [expanded]);

  const maxHeight = animationHeight.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20], // or use pixels like '0%', '20%'
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.expandableView, {height: maxHeight}]}>
        <Text style={globalStyles.validationErrorText}>{error}</Text>
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
    // Adjust other styles as needed
  },
});
