import React, {SetStateAction, useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface SetTempoModalProps {
  modalIsVisible: boolean;
  tempo: number;
  onSetTempo: (tempo: number) => void;
  onClose: () => void;
}

export const SetTempoModal: React.FC<SetTempoModalProps> = props => {
  const [currentDisplayedTempo, setCurrentDisplayedTempo] = useState(
    props.tempo,
  );

  const incrementButtonArgs = {
    setCurrentDisplayedTempo: (newTempo: number) =>
      setCurrentDisplayedTempo(newTempo),
    previousTempo: currentDisplayedTempo,
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalIsVisible}
      onRequestClose={() => {
        props.onClose();
        props.onSetTempo(currentDisplayedTempo);
      }}>
      <View style={globalStyles.modalOuter}>
        <View style={[globalStyles.modalInner, {top: '10%', padding: 16}]}>
          <View>
            {/* Title */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 16,
              }}>
              <Text style={[globalStyles.fieldHeader, {marginTop: 0, flex: 1}]}>
                Tempo
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.onClose();
                  props.onSetTempo(currentDisplayedTempo);
                }}>
                <Image
                  style={{height: 20, width: 20, margin: 20}}
                  source={require('../assets/check_mark.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={1}
                icon={'../assets/triple_up_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={5}
                icon={'../assets/double_up_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={10}
                icon={'../assets/single_up_arrow.png'}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <TempoViewerComponent
                tempo={currentDisplayedTempo}
                setTempo={(tempo: number) => setCurrentDisplayedTempo(tempo)}
              />
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

            <View style={{flexDirection: 'row'}}>
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={-1}
                icon={'../assets/single_down_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={-5}
                icon={'../assets/double_down_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={-10}
                icon={'../assets/triple_down_arrow.png'}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface IncrementButtonProps {
  setCurrentDisplayedTempo: (newTempo: number) => void;
  bpmDistance: number;
  previousTempo: number;
  icon: string;
}

const IncrementButton: React.FC<IncrementButtonProps> = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.setCurrentDisplayedTempo(props.previousTempo + props.bpmDistance)
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
        {props.bpmDistance < 0
          ? props.bpmDistance
          : '+' + props.bpmDistance.toString()}
      </Text>

      {/* <Image
                    style={{height: 30, width: 30}}
                    source={require(item.arrowIcon)}
                    resizeMode="contain"
                  /> */}
    </TouchableOpacity>
  );
};

interface TempoViewerProps {
  tempo: number;
  setTempo: (tempo: number) => void;
}

const TempoViewerComponent: React.FC<TempoViewerProps> = props => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = 0; // Reset opacity to 0
    opacity.value = withSpring(1); // Animate opacity to 1
  }, [props.tempo]);

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
        {props.tempo.toString()}
      </Text>
    </Animated.View>
  );
};
