import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AllModes, Mode} from '../store/reducers/ConfigureDrillTypes';
import {Chip} from 'react-native-paper';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {DefaultAppModal} from './DrillConfigurationModal';
DefaultAppModalDefaultAppModal;
interface SetModesModalProps {
  modalIsVisible: boolean;
  modes: Mode[];
  onSetModes: (modes: Mode[]) => void;
  onDismiss: () => void;
}

const AllModesEnabled = AllModes.reduce((accumulator, noteName) => {
  accumulator[noteName] = true;
  return accumulator;
}, {} as Record<Mode, boolean>);

const NoModesEnabled = AllModes.reduce((accumulator, noteName) => {
  accumulator[noteName] = false;
  return accumulator;
}, {} as Record<Mode, boolean>);

export const SetModesModal: React.FC<SetModesModalProps> = props => {
  const [currentDisplayedModes, setCurrentDisplayedModes] = useState(
    AllModes.reduce((accumulator, noteName) => {
      accumulator[noteName] = props.modes.includes(noteName);
      return accumulator;
    }, {} as Record<Mode, boolean>),
  );

  const toggleMode = (noteName: Mode) => {
    setCurrentDisplayedModes(prevState => ({
      ...prevState,
      [noteName]: !prevState[noteName],
    }));
  };

  const stateAsModeArray = () => {
    const result = Object.entries(currentDisplayedModes)
      .filter(item => {
        return item[1];
      })
      .map(item => item[0] as Mode);
    return result;
  };

  return (
    <DefaultAppModal
      DefaultAppModal
      title="modes"
      onDismiss={() => {
        props.onSetModes(stateAsModeArray());
        props.onDismiss();
      }}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          <View>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedModes(AllModesEnabled);
              }}
              style={[
                globalStyles.button,
                {marginHorizontal: 5, marginVertical: 6, padding: 10},
              ]}>
              <Text style={[globalStyles.buttonText, {fontSize: 16}]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedModes(NoModesEnabled);
              }}
              style={[
                globalStyles.button,
                {marginHorizontal: 5, marginVertical: 6, padding: 10},
              ]}>
              <Text style={[globalStyles.buttonText, {fontSize: 16}]}>
                None
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {Object.entries(currentDisplayedModes).map((noteName, index) => (
            <Chip
              key={index}
              style={
                noteName[1]
                  ? localStyles.selectedChipStyle
                  : localStyles.chipStyle
              }
              onPress={() => toggleMode(noteName[0] as Mode)}>
              {noteName}
            </Chip>
          ))}
        </View>
      </View>
    </DefaultAppModal>
  );
  DefaultAppModal;
};

const localStyles = StyleSheet.create({
  chipStyle: {
    height: 40,
    marginVertical: 10,
    marginHorizontal: 2,
    backgroundColor: Themes.dark.buttonSurface,
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 20,
    justifyContent: 'center',
  },
  selectedChipStyle: {
    height: 40,
    marginVertical: 10,
    marginHorizontal: 2,
    backgroundColor: Themes.dark.buttonSurface,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
  },
});
