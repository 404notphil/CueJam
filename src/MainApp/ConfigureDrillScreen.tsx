import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import React from 'react';
import {globalStyles} from '../ui/theme/styles';
import {Image} from 'react-native';

export function ConfigureDrillScreen(): React.JSX.Element {
  const data = [
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
        data={data}
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
