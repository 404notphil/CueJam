import React, {useEffect, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DragIcon from '../assets/DragIcon';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {DownIcon, UpIcon} from '../assets/UpIcon';

export function PromptLayerList(): React.JSX.Element {
  type PromptLayer = {
    key: string;
    label: string;
    isExplanatory: boolean;
  };
  const [data, setData] = useState([
    {key: '1', label: 'one', isExplanatory: false},
    {key: '2', label: 'two', isExplanatory: false},
    {key: '3', label: 'three', isExplanatory: false},
  ]);

  const renderItem = (props: PromptLayer) => {
    return (
      <View>
        <Text style={globalStyles.smallText}>...show me a</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              backgroundColor: '#242C3B',
              height: 100,
              borderRadius: 5,
              marginVertical: 15,
            },
          ]}>
          <View style={{flex: 6}}>
            <Text style={styles.actionButtonText}>{props.label}</Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', marginHorizontal: 15}}>
            <TouchableOpacity
              onPress={() => {
                const newArray = [...data];
                const oldIndex = data.indexOf(props);
                const [element] = newArray.splice(oldIndex, 1);
                newArray.splice(oldIndex ? oldIndex - 1 : 0, 0, element);
                setData(newArray);
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <UpIcon
                size={25}
                strokeColor={Themes.dark.actionText}
                style={{
                  margin: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                height: 0.1,
                opacity: 0.5,
                backgroundColor: Themes.dark.actionText,
              }}
            />

            <TouchableOpacity
              onPress={() => {
                const newArray = [...data];
                const oldIndex = data.indexOf(props);
                const arraySize = data.length;
                const [element] = newArray.splice(oldIndex, 1);
                newArray.splice(
                  oldIndex === arraySize ? oldIndex : oldIndex + 1,
                  0,
                  element,
                );
                setData(newArray);
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <DownIcon
                size={25}
                strokeColor={Themes.dark.actionText}
                style={{
                  margin: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={item => renderItem(item.item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonText: {
    color: Themes.dark.actionText,
  },
});
