import React, {SetStateAction, useState} from 'react';
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
          <View /* The big row where everything lives. */
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                marginRight: 16,
              }}
              /* The column where the title, the tempo viewer, and the "bpm" sub header live.  */
            >
              {/* Title */}
              <Text style={[globalStyles.fieldHeader, {flex: 1}]}>Tempo</Text>

              <TempoViewerComponent
                tempo={currentDisplayedTempo}
                setTempo={(tempo: number) => setCurrentDisplayedTempo(tempo)}
              />

              <Text
                style={[globalStyles.fieldHeader, {flex: 1, color: 'yellow'}]}>
                bpm
              </Text>
            </View>
            <View /* The column where the 6 tempo adjustment buttons go.  */>
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={-10}
                icon={'../assets/triple_up_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={-5}
                icon={'../assets/double_up_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={-1}
                icon={'../assets/single_up_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={1}
                icon={'../assets/single_down_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={5}
                icon={'../assets/double_down_arrow.png'}
              />
              <IncrementButton
                {...incrementButtonArgs}
                bpmDistance={10}
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
          flexDirection: 'row',
          marginVertical: 6,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Text style={globalStyles.fieldHeader}>{props.bpmDistance}</Text>

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
  return (
    <Text style={[globalStyles.title, {flex: 1, height: 50, width: 50}]}>
      {props.tempo.toString()}
    </Text>
  );
};
