import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {globalStyles} from './theme/styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AnimatedExample = () => {
  const [largeText, setLargeText] = useState(true);

  const toggleTextSize = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLargeText(!largeText);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {largeText ? (
        <Text style={{fontSize: 24}}>Large Text</Text>
      ) : (
        <Text style={{fontSize: 14}}>Small Text</Text>
      )}
      <TouchableOpacity style={globalStyles.button} onPress={toggleTextSize}>
        <Text>Toggle Text Size</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedExample;
