import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {View, Text} from 'react-native';
import {AllNoteNames, NoteName} from '../store/reducers/ConfigureDrillTypes';
import {Chip} from 'react-native-paper';
import {globalStyles} from '../ui/theme/styles';
import {DrillConfigurationModal} from './DrillConfigurationModal';

interface SetNoteNamesModalProps {
  modalIsVisible: boolean;
  noteNames: NoteName[];
  onSetNoteNames: (noteNames: NoteName[]) => void;
  onDismiss: () => void;
}

export const SetNoteNamesModal: React.FC<SetNoteNamesModalProps> = props => {
  const [currentDisplayedNoteNames, setCurrentDisplayedNoteNames] = useState(
    AllNoteNames.reduce((accumulator, noteName) => {
      accumulator[noteName] = props.noteNames.includes(noteName);
      return accumulator;
    }, {} as Record<NoteName, boolean>),
  );

  const toggleNoteName = (noteName: NoteName) => {
    setCurrentDisplayedNoteNames(prevState => ({
      ...prevState,
      [noteName]: !prevState[noteName],
    }));
  };

  const stateAsNoteNameArray = () => {
    const result = Object.entries(currentDisplayedNoteNames)
      .filter(item => {
        return item[1];
      })
      .map(item => item[0] as NoteName);
    console.log('12345 result = ' + result.length);
    return result;
  };

  return (
    <DrillConfigurationModal
      {...props}
      title={'note names'}
      onDismiss={() => {
        props.onSetNoteNames(stateAsNoteNameArray());
        props.onDismiss();
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {Object.entries(currentDisplayedNoteNames).map((noteName, index) => (
            <Chip
              key={index}
              style={
                noteName[1]
                  ? globalStyles.selectedChipStyle
                  : globalStyles.chipStyle
              }
              // icon="information"
              onPress={() => toggleNoteName(noteName[0] as NoteName)}>
              {noteName}
            </Chip>
          ))}
        </View>
      </View>
    </DrillConfigurationModal>
  );
};
