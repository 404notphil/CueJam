import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../ui/theme/styles';
import {Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  selectConfigureDrill,
  setDrillName,
} from '../store/reducers/configureDrillReducer';

interface SettingProps {
  title: string;
  buttonText: string;
  onPress: () => void;
}

export function ConfigureDrillScreen(): React.JSX.Element {
  const [tonalContextDialogVisible, setTonalContextDialogVisible] =
    useState(false);
  const [chordQualitiesDialogVisible, setChordQualitiesDialogVisible] =
    useState(false);
  const [beatsPerChordDialogVisible, setBeatsPerChordDialogVisible] =
    useState(false);
  const [noteNamesDialogVisible, setNoteNamesDialogVisible] = useState(false);
  const [promptAlgorithmDialogVisible, setPromptAlgorithmDialogVisible] =
    useState(false);

  const drill = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  return (
    <View style={globalStyles.screenContainer}>
      <SettingRow
        {...{
          title: 'Drill name',
          buttonText: 'Action 1',
          onPress: () => console.log('Item 1 pressed'),
        }}
      />

      <SettingRow
        {...{
          title: 'tempo',
          buttonText: 'Action 2',
          onPress: () => console.log('Item 2 pressed'),
        }}
      />

      <SettingRow
        {...{
          title: 'beats per chord',
          buttonText: 'Action 3',
          onPress: () => console.log('Item 3 pressed'),
        }}
      />

      <SettingRow
        {...{
          title: 'note names',
          buttonText: 'Action 3',
          onPress: () => console.log('Item 3 pressed'),
        }}
      />

      <SettingRow
        {...{
          title: 'prompt algorithm',
          buttonText: 'Action 3',
          onPress: () => console.log('Item 3 pressed'),
        }}
      />

      <SettingRow
        {...{
          title: 'tonal context',
          buttonText: 'Action 3',
          onPress: () => console.log('Item 3 pressed'),
        }}
      />

      <SettingRow
        {...{
          title: 'chord qualities',
          buttonText: 'Action 3',
          onPress: () => console.log('Item 3 pressed'),
        }}
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
      <Text style={[globalStyles.mediumText, {flex: 2, marginEnd: 16}]}>
        {props.title}
      </Text>
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
        onPress={() => props.onPress}>
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
