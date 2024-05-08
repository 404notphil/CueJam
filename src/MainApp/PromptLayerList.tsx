import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DraggableFlatList, {
  NestableScrollContainer,
  OpacityDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import DragIcon from '../assets/DragIcon';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';

export function PromptLayerList(): React.JSX.Element {
  type Item = {
    key: string;
    label: string;
    isExplanatory: boolean;
  };
  const [data, setData] = useState([
    {key: '1', label: 'one', isExplanatory: false},
    {key: '2', label: 'two', isExplanatory: false},
    {key: '3', label: 'three', isExplanatory: false},
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const animationConfig = {
    stiffness: 1500,
    damping: 100,
    overshootClamping: true,
  };
  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => {
    return (
      <OpacityDecorator>
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
              <Text style={styles.actionButtonText}>{item.label}</Text>
            </View>
            <TouchableOpacity
              onPressIn={() => {
                setIsDragging(true);
                drag();
              }}
              disabled={isActive}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <DragIcon
                height={26}
                width={13}
                style={{
                  margin: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </OpacityDecorator>
    );
  };

  return (
    <View>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => {
          setData(data);
          setIsDragging(false);
        }}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        animationConfig={animationConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonText: {
    color: Themes.dark.actionText,
  },
});
