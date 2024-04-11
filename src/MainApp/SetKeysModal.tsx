import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AllKeys, Key} from '../store/reducers/ConfigureDrillTypes';
import {Chip} from 'react-native-paper';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';

interface SetKeysModalProps {
  modalIsVisible: boolean;
  keys: Key[];
  onSetKeys: (keys: Key[]) => void;
  onDismiss: () => void;
}

const AllKeysEnabled = AllKeys.reduce((accumulator, noteName) => {
  accumulator[noteName] = true;
  return accumulator;
}, {} as Record<Key, boolean>);

const NoKeysEnabled = AllKeys.reduce((accumulator, noteName) => {
  accumulator[noteName] = false;
  return accumulator;
}, {} as Record<Key, boolean>);

export const SetKeysModal: React.FC<SetKeysModalProps> = props => {
  const [currentDisplayedKeys, setCurrentDisplayedKeys] = useState(
    AllKeys.reduce((accumulator, noteName) => {
      accumulator[noteName] = props.keys.includes(noteName);
      return accumulator;
    }, {} as Record<Key, boolean>),
  );

  const toggleKey = (noteName: Key) => {
    setCurrentDisplayedKeys(prevState => ({
      ...prevState,
      [noteName]: !prevState[noteName],
    }));
  };

  const stateAsKeyArray = () => {
    const result = Object.entries(currentDisplayedKeys)
      .filter(item => {
        return item[1];
      })
      .map(item => item[0] as Key);
    return result;
  };

  return (
    <AppModal
      {...props}
      innerModalStyles={{top: '5%', padding: 16, marginHorizontal: 20}}
      dismissingShouldFinish={true}
      onFinish={() => props.onSetKeys(stateAsKeyArray())}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[globalStyles.fieldHeader, {marginBottom: 20}]}>
            keys
          </Text>
          <View style={{flex: 1}} />
          <View>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedKeys(AllKeysEnabled);
              }}
              style={[
                globalStyles.button,
                {marginHorizontal: 5, marginVertical: 6, padding: 10},
              ]}>
              <Text style={[globalStyles.buttonText, {fontSize: 16}]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentDisplayedKeys(NoKeysEnabled);
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
          {Object.entries(currentDisplayedKeys).map((noteName, index) => (
            <Chip
              key={index}
              style={
                noteName[1]
                  ? localStyles.selectedChipStyle
                  : localStyles.chipStyle
              }
              onPress={() => toggleKey(noteName[0] as Key)}>
              {noteName}
            </Chip>
          ))}
        </View>
      </View>
    </AppModal>
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
