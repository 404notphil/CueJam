import {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../ui/theme/styles';

interface NumberSelectorViewProps {
  selectedNumberInViewer: number;
  onSelectNumberInViewer: (numberToSelectInViewer: number) => void;
  onCommitSelectedNumber: (selectedNumber: number) => void;
  maxNumber: number;
  minNumber: number;
  increments: number[];
}

export const NumberSelectorView: React.FC<NumberSelectorViewProps> = props => {
  const incrementButtonArgs = {
    setCurrentDisplayedNumber: (newNumber: number) => {
      props.onSelectNumberInViewer(
        Math.max(props.minNumber, Math.min(props.maxNumber, newNumber)),
      );
    },
    previousNumber: props.selectedNumberInViewer,
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <NumberViewerComponent numberToView={props.selectedNumberInViewer} />
        <Text
          style={[
            globalStyles.fieldHeader,
            {
              color: 'yellow',
              textAlign: 'center',
            },
          ]}>
          bpm
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        {props.increments.map(increment => (
          <IncrementButton
            {...incrementButtonArgs}
            increment={increment}
            icon={'../assets/triple_up_arrow.png'}
          />
        ))}
      </View>

      <View style={{flexDirection: 'row'}}>
        {props.increments.map(increment => (
          <IncrementButton
            {...incrementButtonArgs}
            increment={increment * -1}
            icon={'../assets/triple_up_arrow.png'}
          />
        ))}
      </View>
    </View>
  );
};

interface IncrementButtonProps {
  setCurrentDisplayedNumber: (newTempo: number) => void;
  increment: number;
  previousNumber: number;
  icon: string;
}

const IncrementButton: React.FC<IncrementButtonProps> = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.setCurrentDisplayedNumber(props.previousNumber + props.increment)
      }
      style={[
        globalStyles.button,
        {
          padding: 8,
          width: 60,
          height: 60,
          flexDirection: 'row',
          margin: 6,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Text style={[globalStyles.fieldHeader, {marginTop: 0}]}>
        {props.increment < 0
          ? props.increment
          : '+' + props.increment.toString()}
      </Text>

      {/* <Image
                      style={{height: 30, width: 30}}
                      source={require(item.arrowIcon)}
                      resizeMode="contain"
                    /> */}
    </TouchableOpacity>
  );
};

interface NumberViewerProps {
  numberToView: number;
}

export const NumberViewerComponent: React.FC<NumberViewerProps> = props => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = 0; // Reset opacity to 0
    opacity.value = withSpring(1); // Animate opacity to 1
  }, [props.numberToView]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <Text
        style={[
          globalStyles.title,
          {
            fontSize: 80,
            textAlign: 'center',
          },
        ]}>
        {props.numberToView.toString()}
      </Text>
    </Animated.View>
  );
};
