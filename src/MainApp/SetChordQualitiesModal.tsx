import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  AllChordQualities,
  ChordQuality,
} from '../store/reducers/ConfigureDrillTypes';
import {Chip} from 'react-native-paper';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {DrillConfigurationModal} from './DrillConfigurationModal';

interface SetChordQualitiesModalProps {
  modalIsVisible: boolean;
  chordQualities: ChordQuality[];
  onSetChordQualities: (chordQualities: ChordQuality[]) => void;
  onDismiss: () => void;
}

const AllChordQualitiesEnabled = AllChordQualities.reduce(
  (accumulator, noteName) => {
    accumulator[noteName] = true;
    return accumulator;
  },
  {} as Record<ChordQuality, boolean>,
);

const NoChordQualitiesEnabled = AllChordQualities.reduce(
  (accumulator, noteName) => {
    accumulator[noteName] = false;
    return accumulator;
  },
  {} as Record<ChordQuality, boolean>,
);

export const SetChordQualitiesModal: React.FC<
  SetChordQualitiesModalProps
> = props => {
  const [currentDisplayedChordQualities, setCurrentDisplayedChordQualities] =
    useState(
      AllChordQualities.reduce((accumulator, noteName) => {
        accumulator[noteName] = props.chordQualities.includes(noteName);
        return accumulator;
      }, {} as Record<ChordQuality, boolean>),
    );

  const toggleChordQuality = (noteName: ChordQuality) => {
    setCurrentDisplayedChordQualities(prevState => ({
      ...prevState,
      [noteName]: !prevState[noteName],
    }));
  };

  const stateAsChordQualityArray = () => {
    const result = Object.entries(currentDisplayedChordQualities)
      .filter(item => {
        return item[1];
      })
      .map(item => item[0] as ChordQuality);
    return result;
  };

  return (
    <DrillConfigurationModal
      {...props}
      title="chord qualities"
      onDismiss={() => {
        props.onSetChordQualities(stateAsChordQualityArray());
        props.onDismiss();
      }}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          <View>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedChordQualities(AllChordQualitiesEnabled);
              }}
              style={[
                globalStyles.button,
                {marginHorizontal: 5, marginVertical: 6, padding: 10},
              ]}>
              <Text style={[globalStyles.buttonText, {fontSize: 16}]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedChordQualities(NoChordQualitiesEnabled);
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
          {Object.entries(currentDisplayedChordQualities).map(
            (noteName, index) => (
              <Chip
                key={index}
                style={
                  noteName[1]
                    ? localStyles.selectedChipStyle
                    : localStyles.chipStyle
                }
                onPress={() => toggleChordQuality(noteName[0] as ChordQuality)}>
                {noteName}
              </Chip>
            ),
          )}
        </View>
      </View>
    </DrillConfigurationModal>
  );
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
