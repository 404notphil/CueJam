import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AllScales, Scale} from '../store/reducers/ConfigureDrillTypes';
import {Chip} from 'react-native-paper';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {DefaultAppModal} from './DrillConfigurationModal';

interface SetScalesModalProps {
  modalIsVisible: boolean;
  scales: Scale[];
  onSetScales: (scales: Scale[]) => void;
  onDismiss: () => void;
}

const AllScalesEnabled = AllScales.reduce((accumulator, noteName) => {
  accumulator[noteName] = true;
  return accumulator;
}, {} as Record<Scale, boolean>);

const NoScalesEnabled = AllScales.reduce((accumulator, noteName) => {
  accumulator[noteName] = false;
  return accumulator;
}, {} as Record<Scale, boolean>);

export const SetScalesModal: React.FC<SetScalesModalProps> = props => {
  const [currentDisplayedScales, setCurrentDisplayedScales] = useState(
    AllScales.reduce((accumulator, noteName) => {
      accumulator[noteName] = props.scales.includes(noteName);
      return accumulator;
    }, {} as Record<Scale, boolean>),
  );

  const toggleScale = (noteName: Scale) => {
    setCurrentDisplayedScales(prevState => ({
      ...prevState,
      [noteName]: !prevState[noteName],
    }));
  };

  const stateAsScaleArray = () => {
    const result = Object.entries(currentDisplayedScales)
      .filter(item => {
        return item[1];
      })
      .map(item => item[0] as Scale);
    return result;
  };

  return (
    <DefaultAppModal
      {...props}
      title="scales"
      onDismiss={() => {
        props.onSetScales(stateAsScaleArray());
        props.onDismiss();
      }}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          <View>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedScales(AllScalesEnabled);
              }}
              style={[
                globalStyles.button,
                {marginHorizontal: 5, marginVertical: 6, padding: 10},
              ]}>
              <Text style={[globalStyles.buttonText, {fontSize: 16}]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedScales(NoScalesEnabled);
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
          {Object.entries(currentDisplayedScales).map((noteName, index) => (
            <Chip
              key={index}
              style={
                noteName[1]
                  ? localStyles.selectedChipStyle
                  : localStyles.chipStyle
              }
              onPress={() => toggleScale(noteName[0] as Scale)}>
              {noteName}
            </Chip>
          ))}
        </View>
      </View>
    </DefaultAppModal>
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
