import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../ui/theme/styles';
import {Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  selectConfigureDrill,
  setBeatsPerChord,
  setDrillName,
  setNoteNames,
  setTempo,
} from '../store/reducers/configureDrillReducer';
import {SetTempoModal} from './SetTempoModal';
import {SetBeatsPerChordModal} from './SetBeatsPerChordModal';
import {SetNoteNamesModal} from './SetNoteNamesModal';
import {NoteName} from '../store/reducers/ConfigureDrillTypes';

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

  const handleSaveDrill = () => {
    /* todo */
  };

  return (
    <View style={globalStyles.screenContainer}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[globalStyles.textInputArea, {flex: 1, marginEnd: 16}]}
          onChangeText={newText => dispatch(setDrillName(newText))}
          placeholder="Type drill name here">
          {drill.drillName}
        </TextInput>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => handleSaveDrill()}>
          <Text style={globalStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <SettingRow
        {...{
          title: 'tempo',
          buttonText: drill.tempo + ' bpm',
          onPress: () => setTempoDialogVisible(true),
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
    </View>
  );
}

// const ShortcutButton: React.FC<AppHeaderProps> = props => {
const SettingRow: React.FC<SettingProps> = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
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
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
        onPress={() => props.onPress()}>
        <Text style={globalStyles.buttonText}>{props.buttonText}</Text>
        <Image
          style={{paddingHorizontal: 16, height: 10, width: 10}}
          source={require('../assets/edit_icon.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
