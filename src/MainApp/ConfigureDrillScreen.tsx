import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../ui/theme/styles';
import {Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  selectConfigureDrill,
  setBeatsPerChord,
  setChordQualities,
  setDrillName,
  setNoteNames,
  setPromptAlgorithm,
  setTempo,
  setTonalContext,
} from '../store/reducers/configureDrillReducer';
import {SetTempoModal} from './SetTempoModal';
import {SetBeatsPerChordModal} from './SetBeatsPerChordModal';
import {SetNoteNamesModal} from './SetNoteNamesModal';
import {
  ChordQuality,
  NoteName,
  PromptAlgorithm,
  TonalContext,
} from '../store/reducers/ConfigureDrillTypes';
import {SetPromptAlgorithmModal} from './SetPromptAlgorithmModal';
import {TonalContextModal} from './TonalContextModal';
import {SetChordQualitiesModal} from './ChordQualitiesModal';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SettingProps {
  title: string;
  buttonText: string;
  onPress: () => void;
}

export function ConfigureDrillScreen(): React.JSX.Element {
  const [tonalContextDialogVisible, setTonalContextDialogVisible] =
    useState(false);
  const [tempoDialogVisible, setTempoDialogVisible] = useState(false);
  const [chordQualitiesDialogVisible, setChordQualitiesDialogVisible] =
    useState(false);
  const [beatsPerChordDialogVisible, setBeatsPerChordDialogVisible] =
    useState(false);
  const [noteNamesDialogVisible, setNoteNamesDialogVisible] = useState(false);
  const [promptAlgorithmDialogVisible, setPromptAlgorithmDialogVisible] =
    useState(false);

  const drill = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  const [drillIsSaved, setDrillIsSaved] = useState(true);

  const handleSaveDrill = () => {
    setDrillIsSaved(true);
    /* todo */
  };

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    if (drillIsSaved) {
      animatedHeight.value = 0;
      animatedOpacity.value = 0;
      animatedHeight.value = withSpring(120);
      animatedOpacity.value = withSpring(1);
    } else {
      animatedHeight.value = 120;
      animatedOpacity.value = 1;
      animatedHeight.value = withSpring(0);
      animatedOpacity.value = withSpring(0);
    }
  }, [drillIsSaved]);

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      opacity: animatedOpacity.value,
    };
  });

  return (
    <ScrollView style={globalStyles.screenContainer}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[globalStyles.textInputArea, {flex: 1, marginEnd: 16}]}
          onChangeText={newText => dispatch(setDrillName(newText))}
          placeholder="Type drill name here">
          {drill.drillName}
        </TextInput>
        <TouchableOpacity
          style={[globalStyles.button, {marginBottom: 8, width: 100}]}
          onPress={() => handleSaveDrill()}>
          <Text
            style={[
              globalStyles.buttonText,
              drillIsSaved ? {color: 'grey'} : {color: 'white'},
            ]}>
            {drillIsSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Animated.View style={animatedHeightStyle}>
          <Animated.View style={animatedOpacityStyle}>
            {drillIsSaved && (
              <TouchableOpacity
                style={[globalStyles.button, {marginBottom: 8}]}
                onPress={() => handleSaveDrill()}>
                <Text style={globalStyles.buttonText}>Play</Text>
              </TouchableOpacity>
            )}
            {drillIsSaved && (
              <TouchableOpacity
                style={[globalStyles.button, {marginBottom: 8}]}
                onPress={() => handleSaveDrill()}>
                <Text style={globalStyles.buttonText}>Close</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </Animated.View>
      </View>
      <SettingRow
        {...{
          title: 'tempo',
          buttonText: drill.tempo + ' bpm',
          onPress: () => {
            setTempoDialogVisible(true);
            setDrillIsSaved(false);
          },
        }}
      />

      <SettingRow
        {...{
          title: 'beats per chord',
          buttonText: drill.beatsPerChord.toString(),
          onPress: () => setBeatsPerChordDialogVisible(true),
        }}
      />

      <SettingRow
        {...{
          title: 'note names',
          buttonText: drill.noteNames.length.toString(),
          onPress: () => setNoteNamesDialogVisible(true),
        }}
      />

      <SettingRow
        {...{
          title: 'prompt algorithm',
          buttonText: drill.promptAlgorithm,
          onPress: () => setPromptAlgorithmDialogVisible(true),
        }}
      />

      <SettingRow
        {...{
          title: 'tonal context',
          buttonText: drill.tonalContext,
          onPress: () => setTonalContextDialogVisible(true),
        }}
      />

      <SettingRow
        {...{
          title: 'chord qualities',
          buttonText: drill.chordQualities.length.toString(),
          onPress: () => setChordQualitiesDialogVisible(true),
        }}
      />

      <SetTempoModal
        modalIsVisible={tempoDialogVisible}
        tempo={drill.tempo}
        onSetTempo={(tempo: number) => dispatch(setTempo(tempo))}
        onDismiss={() => setTempoDialogVisible(false)}
      />

      <SetBeatsPerChordModal
        modalIsVisible={beatsPerChordDialogVisible}
        beatsPerChord={drill.beatsPerChord}
        onSetBeatsPerChord={(beatsPerChord: number) =>
          dispatch(setBeatsPerChord(beatsPerChord))
        }
        onDismiss={() => setBeatsPerChordDialogVisible(false)}
      />

      <SetNoteNamesModal
        modalIsVisible={noteNamesDialogVisible}
        noteNames={drill.noteNames}
        onSetNoteNames={(noteNames: NoteName[]) =>
          dispatch(setNoteNames(noteNames))
        }
        onDismiss={() => setNoteNamesDialogVisible(false)}
      />

      <SetPromptAlgorithmModal
        modalIsVisible={promptAlgorithmDialogVisible}
        promptAlgorithm={drill.promptAlgorithm}
        onSetPromptAlgorithm={(promptAlgorithm: PromptAlgorithm) =>
          dispatch(setPromptAlgorithm(promptAlgorithm))
        }
        onDismiss={() => setPromptAlgorithmDialogVisible(false)}
      />

      <TonalContextModal
        modalIsVisible={tonalContextDialogVisible}
        tonalContext={drill.tonalContext}
        onSetTonalContext={(tonalContext: TonalContext) =>
          dispatch(setTonalContext(tonalContext))
        }
        onDismiss={() => setTonalContextDialogVisible(false)}
      />

      <SetChordQualitiesModal
        modalIsVisible={chordQualitiesDialogVisible}
        chordQualities={drill.chordQualities}
        onSetChordQualities={(chordQualities: ChordQuality[]) =>
          dispatch(setChordQualities(chordQualities))
        }
        onDismiss={() => setChordQualitiesDialogVisible(false)}
      />
    </ScrollView>
  );
}

// const ShortcutButton: React.FC<AppHeaderProps> = props => {
const SettingRow: React.FC<SettingProps> = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      }}>
      <View style={{flex: 2, flexDirection: 'row'}}>
        <Text style={globalStyles.mediumText}>{props.title}</Text>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            height: 1,
            alignSelf: 'center',
            margin: 16,
          }}
        />
      </View>
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
        ]}
        onPress={() => props.onPress()}>
        <Text style={[globalStyles.buttonText]}>{props.buttonText}</Text>
        <Image
          style={{height: 10, width: 10, marginStart: 10}}
          source={require('../assets/edit_icon.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
