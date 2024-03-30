import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import React, {useState} from 'react';
import {globalStyles} from '../ui/theme/styles';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import { selectConfigureDrill, setDrillName } from '../store/reducers/configureDrillReducer';

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


  const options = [
    {
      title: 'Drill name',
      buttonText: 'Action 1',
      onPress: () => console.log('Item 1 pressed'),
    },
    {
      title: 'tempo',
      buttonText: 'Action 2',
      onPress: () => console.log('Item 2 pressed'),
    },
    {
      title: 'beats per chord',
      buttonText: 'Action 3',
      onPress: () => console.log('Item 3 pressed'),
    },
    {
      title: 'note names',
      buttonText: 'Action 3',
      onPress: () => console.log('Item 3 pressed'),
    },
    {
      title: 'prompt algorithm',
      buttonText: 'Action 3',
      onPress: () => console.log('Item 3 pressed'),
    },
    {
      title: 'tonal context',
      buttonText: 'Action 3',
      onPress: () => console.log('Item 3 pressed'),
    },
    {
      title: 'chord qualities',
      buttonText: 'Action 3',
      onPress: () => console.log('Item 3 pressed'),
    },
  ];

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList
        data={options}
        renderItem={({item}) => (
          <View
            key={item.title}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 16,
              marginVertical: 20,
            }}>
            <Text style={[globalStyles.mediumText, {flex: 2, marginEnd: 16}]}>
              {item.title}
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
              onPress={() => item.onPress}>
              <Text style={globalStyles.buttonText}>Press Me</Text>
              <Image
                style={{paddingHorizontal: 16, height: 10, width: 10}}
                source={require('../assets/edit_icon.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
}
