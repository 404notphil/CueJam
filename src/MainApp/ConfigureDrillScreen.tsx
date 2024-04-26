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
  onDrillEdit,
  selectConfigureDrill,
  setBeatsPerChord,
  setChordQualities,
  setDrillName,
  setKeys,
  setModes,
  setNoteNames,
  setPromptOrder,
  setScales,
  setTempo,
  setTonalContext,
} from '../store/reducers/configureDrillReducer';
import {SetTempoModal} from './SetTempoModal';
import {SetBeatsPerPromptModal} from './SetBeatsPerPromptModal';
import {SetNoteNamesModal} from './SetNoteNamesModal';
import {
  ChordQuality,
  Key,
  Mode,
  NoteName,
  PromptOrder,
  Scale,
  TonalContext,
} from '../store/reducers/ConfigureDrillTypes';
import {SetPromptOrderModal} from './SetPromptOrderModal';
import {SetTonalContextModal} from './SetTonalContextModal';
import {SetChordQualitiesModal} from './SetChordQualitiesModal';
import {SetScalesModal} from './SetScalesModal';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SetModesModal} from './SetModesModal';
import {SetKeysModal} from './SetKeysModal';
import {ExpandableText} from '../onboarding/ui/ExpandableText';
import {saveDrill} from '../services/AppDatabase';
import {useAppNavigation} from '../ui/App';

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
  const [scalesDialogVisible, setScalesDialogVisible] = useState(false);
  const [modesDialogVisible, setModesDialogVisible] = useState(false);
  const [keysDialogVisible, setKeysDialogVisible] = useState(false);
  const [beatsPerChordDialogVisible, setBeatsPerPromptDialogVisible] =
    useState(false);
  const [noteNamesDialogVisible, setNoteNamesDialogVisible] = useState(false);
  const [promptOrderDialogVisible, setPromptOrderDialogVisible] =
    useState(false);

  const state = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();
  
  const drill = state.configuration;

  const navigation = useAppNavigation();

  let lastSavedDrill: ConfigureDrillState | undefined = undefined;

  const [error, setError] = useState<string | undefined>();

  const handleSaveDrill = () => {
    if (drill.drillName === null || drill.drillName.length === 0) {
      setError('You must choose a name!');
    } else {
      dispatch(saveDrill());
      setError(undefined);
    }
    /* todo: save drill*/
  };

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    dispatch(onDrillEdit());
  }, [drill]);

  useEffect(() => {
    if (state.isSaved) {
      lastSavedDrill = state;
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
  }, [state.isSaved]);

  useEffect(() => {
    if (drill.noteNames.length !== 12) {
      dispatch(setPromptOrder('random'));
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

  console.log('12345 drill.isSaved = ' + state.isSaved.toString());

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
              state.isSaved ? {color: 'grey'} : {color: 'white'},
            ]}>
            {state.isSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ExpandableText error={error} isCurrent={error != undefined} />

      <View>
        <Animated.View style={animatedHeightStyle}>
          <Animated.View style={animatedOpacityStyle}>
            {state.isSaved && (
              <TouchableOpacity
                style={[globalStyles.button, {marginBottom: 8}]}
                onPress={() => {
                  navigation.navigate('Drill');
                }}>
                <Text style={globalStyles.buttonText}>Play</Text>
              </TouchableOpacity>
            )}
            {state.isSaved && (
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
          title: 'prompt order',
          buttonText: drill.promptOrder,
          enabled: drill.noteNames.length === 12,
          onPress: () => {
            if (drill.noteNames.length === 12)
              setPromptOrderDialogVisible(true);
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

      {drill.tonalContext === 'scale' && (
        <SettingRow
          {...{
            title: 'scales',
            buttonText: drill.scales.length.toString(),
            enabled: true,
            onPress: () => setScalesDialogVisible(true),
          }}
        />
      )}

      {drill.tonalContext === 'mode' && (
        <SettingRow
          {...{
            title: 'modes',
            buttonText: drill.modes.length.toString(),
            enabled: true,
            onPress: () => setModesDialogVisible(true),
          }}
        />
      )}

      {drill.tonalContext === 'key' && (
        <SettingRow
          {...{
            title: 'keys',
            buttonText: drill.keys.length.toString(),
            enabled: true,
            onPress: () => setKeysDialogVisible(true),
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

      <SetPromptOrderModal
        modalIsVisible={promptOrderDialogVisible}
        promptOrder={drill.promptOrder}
        onSetPromptOrder={(promptOrder: PromptOrder) =>
          dispatch(setPromptOrder(promptOrder))
        }
        onDismiss={() => setPromptOrderDialogVisible(false)}
      />

      <SetTonalContextModal
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

      <SetScalesModal
        modalIsVisible={scalesDialogVisible}
        scales={drill.scales}
        onSetScales={(scales: Scale[]) => dispatch(setScales(scales))}
        onDismiss={() => setScalesDialogVisible(false)}
      />

      <SetModesModal
        modalIsVisible={modesDialogVisible}
        modes={drill.modes}
        onSetModes={(modes: Mode[]) => dispatch(setModes(modes))}
        onDismiss={() => setModesDialogVisible(false)}
      />

      <SetKeysModal
        modalIsVisible={keysDialogVisible}
        keys={drill.keys}
        onSetKeys={(keys: Key[]) => dispatch(setKeys(keys))}
        onDismiss={() => setKeysDialogVisible(false)}
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
