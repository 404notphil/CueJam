import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {globalStyles} from '../ui/theme/styles';
import {Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  ConfigureDrillState,
  drillNameEmptyError,
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
  PromptLayerOption,
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
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {SetModesModal} from './SetModesModal';
import {SetKeysModal} from './SetKeysModal';
import {ExpandableText} from '../onboarding/ui/ExpandableText';
import {
  checkForSimilarDrills,
  deleteDrillById,
  loadDrillById,
  saveAndLoadCopy,
  saveDrill,
} from '../services/AppDatabase';
import {useAppNavigation} from '../ui/App';
import PlayIcon from '../assets/PlayIcon';
import SaveIcon from '../assets/SaveIcon';
import DeleteIcon from '../assets/DeleteIcon';
import AlertIcon from '../assets/AlertIcon';
import {Themes} from '../ui/theme/Theme';
import CopyIcon from '../assets/CopyIcon';
import AnimatedDivider from './AnimatedDivider';
import {PlayDrillConfigurationButton} from './PlayDrillConfigurationButton';
import {PromptLayerList} from './PromptLayerList';
import {SetPromptLayerModal} from './PromptLayerModal';

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
  const [promptLayerDialogVisible, setPromptLayerDialogVisible] =
    useState(true);

  const state = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  const drill = state.configuration;

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    dispatch(onDrillEdit(state));
    dispatch(checkForSimilarDrills(drill));
  }, [drill]);

  useEffect(() => {
    if (state.isSaved) {
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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={globalStyles.screenContainer}>
      <View style={{flexDirection: 'row'}}>
        {/* Drill title */}
        <View style={{alignItems: 'center', flex: 1}}>
          <Text style={globalStyles.fieldHeader}>Title</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}} />
            {state.titleError && (
              <AlertIcon
                size={30}
                strokeColor={Themes.dark.errorRed}
                style={{alignSelf: 'center', marginEnd: 16}}
              />
            )}
            <TextInput
              style={[styles.textInputArea, {paddingHorizontal: 16}]}
              multiline={true}
              onChangeText={newText => dispatch(setDrillName(newText))}
              placeholder="(drill name)">
              {drill.drillName}
            </TextInput>
            <View style={{flex: 1}} />
          </View>
          <ExpandableText
            error={state.titleError ?? ''}
            isCurrent={typeof state.titleError === 'string'}
            style={{alignSelf: 'center'}}
          />
        </View>

        {/* Play button */}
        <PlayDrillConfigurationButton {...{configurationState: state}} />
      </View>

      <View style={{height: 16}} />

      <ExpandableCompositeActionButton {...state} />

      <Text style={[globalStyles.title, {fontSize: 30, marginTop: 40}]}>
        design your prompt
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
        <AlertIcon size={20} strokeColor={Themes.dark.infoText} />
        <Text
          style={[
            globalStyles.buttonText,
            styles.underline,
            {marginStart: 15, color: Themes.dark.infoText},
          ]}>
          See preview
        </Text>
      </View>

      <PromptLayerList />

      <SetPromptLayerModal
        modalIsVisible={promptLayerDialogVisible}
        promptLayer={PromptLayerOption.NoteNameOption}
        onSetPromptLayer={promptLayer => {}}
        onDismiss={() => setPromptLayerDialogVisible(false)}
      />

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

const ExpandableCompositeActionButton: React.FC<
  ConfigureDrillState
> = props => {
  const [saveButtonVisible, setSaveButtonVisible] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState('');
  const [deleteDrillButtonVisible, setDeleteDrillButtonVisible] =
    useState(false);
  const [copyDrillButtonVisible, setCopyDrillButtonVisible] = useState(false);
  const [foundSimilarDrillButtonVisible, setFoundSimilarDrillButtonVisible] =
    useState(false);
  useEffect(() => {
    setSaveButtonVisible(props.saveDrillButtonState.visible);
    props.saveDrillButtonState.text &&
      setSaveButtonText(props.saveDrillButtonState.text);
    setDeleteDrillButtonVisible(props.deleteDrillButtonVisible);
    setCopyDrillButtonVisible(props.copyDrillButtonVisible);
    setFoundSimilarDrillButtonVisible(props.foundSimilarDrillButtonVisible);
  }, [
    props.saveDrillButtonState,
    props.hasBeenSavedOnceOrMore,
    props.deleteDrillButtonVisible,
    props.copyDrillButtonVisible,
    props.foundSimilarDrillButtonVisible,
  ]);

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const animatedOpactiy = useSharedValue(0);

  useEffect(() => {
    animatedOpactiy.value = 0;
    animatedOpactiy.value = withSequence(withTiming(0.01), withTiming(1));
  }, [
    props.copyDrillButtonVisible,
    props.deleteDrillButtonVisible,
    props.foundSimilarDrillButtonVisible,
    props.saveDrillButtonState,
  ]);

  return (
    <View
      style={[
        globalStyles.button,
        {paddingHorizontal: 30, paddingVertical: 0},
      ]}>
      <ExpandingActionButton
        {...{
          visible: saveButtonVisible,
          enabled: props.saveDrillButtonState.enabled ?? true,
          text: saveButtonText,
          onPress: () => {
            if (props.configuration.drillName.length === 0) {
              dispatch(drillNameEmptyError());
            } else {
              dispatch(saveDrill());
              Keyboard.dismiss();
            }
          },
          icon: (
            <SaveIcon
              size={20}
              strokeColor={
                props.saveDrillButtonState.enabled
                  ? Themes.dark.actionText
                  : Themes.dark.disabledActionText
              }
            />
          ),
        }}
      />

      <AnimatedDivider
        isVisible={saveButtonVisible && copyDrillButtonVisible}
      />

      <ExpandingActionButton
        {...{
          visible: copyDrillButtonVisible,
          enabled: true,
          text: 'save copy of drill',
          onPress: () => {
            dispatch(saveAndLoadCopy());
            navigation.navigate('ConfigureDrill');
            Keyboard.dismiss();
          },
          icon: <CopyIcon size={20} strokeColor={Themes.dark.actionText} />,
        }}
      />

      <AnimatedDivider isVisible={copyDrillButtonVisible} />

      <ExpandingActionButton
        {...{
          visible: deleteDrillButtonVisible,
          enabled: true,
          text: 'delete drill',
          onPress: () => {
            if (props.configuration.drillId) {
              dispatch(deleteDrillById(props.configuration.drillId));
              navigation.navigate('Home');
              Keyboard.dismiss();
            }
          },
          icon: (
            <DeleteIcon
              width={20}
              height={22}
              strokeColor={Themes.dark.actionText}
            />
          ),
        }}
      />

      <AnimatedDivider isVisible={foundSimilarDrillButtonVisible} />

      <ExpandingActionButton
        {...{
          visible: props.foundSimilarDrillButtonVisible,
          enabled: true,
          text: 'found 1 similar drill',
          textColor: Themes.dark.infoText,
          onPress: () => {
            // openFoundSimilarDrillDialog
            Keyboard.dismiss();
          },
          icon: <AlertIcon size={20} strokeColor={Themes.dark.infoText} />,
        }}
      />
    </View>
  );
};

interface ActionButtonProps {
  visible: boolean;
  enabled: boolean;
  text: string;
  textColor?: string;
  onPress: () => void;
  icon: React.ReactNode;
}

const ExpandingActionButton: React.FC<ActionButtonProps> = props => {
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  useEffect(() => {
    if (props.visible) {
      animatedHeight.value = 0;
      animatedHeight.value = withTiming(60);
    } else {
      animatedHeight.value = 60;
      animatedHeight.value = withTiming(0);
    }
    animatedOpacity.value = 0;
    animatedOpacity.value = withSequence(withTiming(0.01), withTiming(1));
  }, [props.visible]);

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}
        onPress={props.onPress}>
        <Animated.View
          style={[
            animatedHeightStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <Animated.View style={[animatedOpacityStyle]}>
            {props.visible && (
              <View style={{flexDirection: 'row'}}>
                {props.icon}
                <View style={{width: 16}} />

                <Text
                  style={[
                    globalStyles.buttonText,
                    // text color
                    props.textColor
                      ? {color: props.textColor}
                      : props.enabled
                      ? styles.actionButtonText
                      : styles.actionButtonDisabledText,
                  ]}>
                  {props.text}
                </Text>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonText: {
    color: Themes.dark.actionText,
  },
  underline: {textDecorationLine: 'underline'},
  actionButtonDisabledText: {
    color: Themes.dark.disabledActionText,
  },
  largePlayButtonText: {
    color: Themes.dark.actionText,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  smallPlayButtonText: {
    color: Themes.dark.actionText,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  textInputArea: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'arciform',
    borderColor: 'gray',
    borderWidth: 0, // Set general border width to 0
    borderBottomWidth: 1, // Apply border only to the bottom
    color: Themes.dark.actionText,
  },
});