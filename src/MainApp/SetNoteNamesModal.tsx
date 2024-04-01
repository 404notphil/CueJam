import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {View} from 'react-native';
import {AllNoteNames, NoteName} from '../store/reducers/ConfigureDrillTypes';
import {Chip} from 'react-native-paper';
import {globalStyles} from '../ui/theme/styles';

interface SetNoteNamesModalProps {
  modalIsVisible: boolean;
  noteNames: NoteName[];
  onSetNoteNames: (noteNames: NoteName[]) => void;
  onDismiss: () => void;
}

export const SetNoteNamesModal: React.FC<SetNoteNamesModalProps> = props => {
  const [currentDisplayedNoteNames, setCurrentDisplayedNoteNames] = useState(
    AllNoteNames.reduce((accumulator, noteName) => {
      accumulator[noteName] = true; // Or false, depending on your default state
      return accumulator;
    }, {} as Record<NoteName, boolean>),
  );

  const toggleNoteName = (noteName: NoteName) => {
    setCurrentDisplayedNoteNames(prevState => ({
      ...prevState,
      [noteName]: !prevState[noteName],
    }));
  };

  const stateAsArray = () => {
    return Object.entries(currentDisplayedNoteNames)
      .filter(item => {
        item[1];
      })
      .map(item => item[0] as NoteName);
  };

  return (
    <AppModal
      {...props}
      innerModalStyles={{top: '10%', padding: 16}}
      dismissingShouldFinish={true}
      onFinish={() => props.onSetNoteNames(stateAsArray())}>
      <View>
        {Object.entries(currentDisplayedNoteNames).map((noteName, index) => (
          <Chip
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
    </AppModal>
  );
};
