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
  ConfigureDrillState,
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
import {SetBeatsPerPromptModal} from './SetBeatsPerChordModal';
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
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

interface SettingProps {
  title: string;
  buttonText: string;
  enabled: boolean;
  onPress: () => void;
}

export function ConfigureDrillScreen(): React.JSX.Element {
  const [tonalContextDialogVisible, setTonalContextDialogVisible] =
    useState(false);
  const [tempoDialogVisible, setTempoDialogVisible] = useState(false);
  const [chordQualitiesDialogVisible, setChordQualitiesDialogVisible] =
    useState(false);
  const [beatsPerChordDialogVisible, setBeatsPerPromptDialogVisible] =
    useState(false);
  const [noteNamesDialogVisible, setNoteNamesDialogVisible] = useState(false);
  const [promptAlgorithmDialogVisible, setPromptAlgorithmDialogVisible] =
    useState(false);

  const drill = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const [drillIsSaved, setDrillIsSaved] = useState(false);

  let lastSavedDrill: ConfigureDrillState | undefined = undefined;

  const handleSaveDrill = () => {
    lastSavedDrill = drill;
    /* todo: save drill*/
    setDrillIsSaved(true);
  };

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    setDrillIsSaved(drill === lastSavedDrill);
  }, [drill]);

  useEffect(() => {
    if (drillIsSaved) {
      animatedHeight.value = 0;
      animatedOpacity.value = 0;
      animatedHeight.value = withTiming(120);
      animatedOpacity.value = withTiming(1);
    } else {
      animatedHeight.value = 120;
      animatedOpacity.value = 1;
      animatedHeight.value = withTiming(0);
      animatedOpacity.value = withTiming(0);
    }
  }, [drillIsSaved]);

  useEffect(() => {
    if (drill.noteNames.length !== 12) {
      dispatch(setPromptAlgorithm('random'));
    }
  }, [drill.noteNames.length]);

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
                onPress={() => {
                  navigation.navigate('Drill');
                }}>
                <Text style={globalStyles.buttonText}>Play</Text>
              </TouchableOpacity>
            )}
            {drillIsSaved && (
              <TouchableOpacity
                style={[globalStyles.button, {marginBottom: 8}]}
                onPress={() => {
                  navigation.goBack();
                }}>
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
          enabled: true,
          onPress: () => {
            setTempoDialogVisible(true);
          },
        }}
      />

      <SettingRow
        {...{
          title: 'beats per prompt',
          buttonText: drill.beatsPerPrompt.toString(),
          enabled: true,
          onPress: () => setBeatsPerPromptDialogVisible(true),
        }}
      />

      <SettingRow
        {...{
          title: 'note names',
          buttonText: drill.noteNames.length.toString(),
          enabled: true,
          onPress: () => setNoteNamesDialogVisible(true),
        }}
      />

      <SettingRow
        {...{
          title: 'prompt algorithm',
          buttonText: drill.promptAlgorithm,
          enabled: drill.noteNames.length === 12,
          onPress: () => {
            if (drill.noteNames.length === 12)
              setPromptAlgorithmDialogVisible(true);
          },
        }}
      />

      <SettingRow
        {...{
          title: 'tonal context',
          buttonText: drill.tonalContext,
          enabled: true,
          onPress: () => setTonalContextDialogVisible(true),
        }}
      />

      {drill.tonalContext === 'chord quality' && (
        <SettingRow
          {...{
            title: 'chord qualities',
            buttonText: drill.chordQualities.length.toString(),
            enabled: true,
            onPress: () => setChordQualitiesDialogVisible(true),
          }}
        />
      )}

      <SetTempoModal
        modalIsVisible={tempoDialogVisible}
        tempo={drill.tempo}
        onSetTempo={(tempo: number) => dispatch(setTempo(tempo))}
        onDismiss={() => setTempoDialogVisible(false)}
      />

      <SetBeatsPerPromptModal
        modalIsVisible={beatsPerChordDialogVisible}
        beatsPerPrompt={drill.beatsPerPrompt}
        onSetBeatsPerPrompt={(beatsPerChord: number) =>
          dispatch(setBeatsPerChord(beatsPerChord))
        }
        onDismiss={() => setBeatsPerPromptDialogVisible(false)}
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
          props.enabled ? {opacity: 1} : {opacity: 0.5},
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
