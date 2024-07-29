import {useEffect, useState} from 'react';
import {
  AllNoteNames,
  AllPromptLayerOptions,
  LayerChildItem,
  PromptLayerOption,
} from '../store/reducers/ConfigureDrillTypes';
import {
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import {RadioButton} from 'react-native-paper';
import {DefaultAppModal} from './DefaultAppModal';
import {Themes} from '../ui/theme/Theme';
import React from 'react';
import CloseIcon from '../assets/CloseIcon';
import {PromptLayer} from './PromptLayer';
import CheckIcon from '../assets/CheckIIcon';
import DragIcon from '../assets/DragIcon';
import DraggableFlatList from 'react-native-draggable-flatlist';

interface SetPromptLayerModalProps {
  modalIsVisible: boolean;
  promptLayer: PromptLayer<LayerChildItem> | null;
  onSetPromptLayer: (promptLayer: PromptLayer<LayerChildItem>) => void;
  onDismiss: () => void;
}

export const SetPromptLayerModal: React.FC<
  SetPromptLayerModalProps
> = props => {
  const [currentConfiguredPromptLayer, setCurrentConfiguredPromptLayer] =
    useState<PromptLayer<LayerChildItem> | null>(props.promptLayer);

  const childItemsBaseOnSelection = (values: LayerChildItem[]) => {
    return values.map(item => {
      return {isSelected: true, value: item};
    });
  };

  const [listOfOptions, setListOfOptions] = useState(AllPromptLayerOptions);
  const [currentlyDisplayedChildItems, setCurrentlyDisplayedChildItems] =
    useState<{isSelected: boolean; value: LayerChildItem}[]>(
      childItemsBaseOnSelection(AllNoteNames),
    );

  const toggleIsSelectedStateOfItem = (name: string) => {
    setCurrentlyDisplayedChildItems(
      currentlyDisplayedChildItems.map(item => {
        if (item.value === name) {
          return {
            isSelected: !item.isSelected,
            value: item.value,
          };
        } else {
          return item;
        }
      }),
    );
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (currentConfiguredPromptLayer) {
      setListOfOptions([currentConfiguredPromptLayer.optionType]);
      setCurrentlyDisplayedChildItems(
        childItemsBaseOnSelection(
          currentConfiguredPromptLayer.optionType.children,
        ),
      );
    } else {
      setListOfOptions(AllPromptLayerOptions);
      setCurrentlyDisplayedChildItems([]);
    }
  }, [currentConfiguredPromptLayer]);

  return (
    <DefaultAppModal
      {...props}
      title={props.promptLayer ? 'edit prompt layer' : 'add to prompt'}
      onDismiss={() => {
        if (currentConfiguredPromptLayer) {
          props.onSetPromptLayer(currentConfiguredPromptLayer);
        }
        props.onDismiss();
      }}>
      <View>
        <View onStartShouldSetResponder={(): boolean => true}>
          <DraggableFlatList
            data={currentlyDisplayedChildItems}
            keyExtractor={option => option.value}
            ListHeaderComponent={
              <View>
                {listOfOptions.map((item, index) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <RadioIcon
                      onOptionPress={isSelected => {
                        if (isSelected) {
                          if (
                            props.promptLayer &&
                            props.promptLayer.optionType === item
                          )
                            setCurrentConfiguredPromptLayer(props.promptLayer);
                          else {
                            setCurrentConfiguredPromptLayer(
                              PromptLayer.fromOptionType(item),
                            );
                          }
                        } else {
                          setCurrentConfiguredPromptLayer(null);
                          setCurrentlyDisplayedChildItems([]);
                        }
                      }}
                      isSelected={
                        item === currentConfiguredPromptLayer?.optionType
                      }
                    />
                    <Text style={[globalStyles.buttonText]}>
                      {item.itemDisplayName}
                    </Text>
                  </View>
                ))}

                {currentConfiguredPromptLayer && (
                  <View
                    style={{
                      height: 1,
                      marginBottom: 16,
                      marginTop: 5,
                      opacity: 0.2,
                      backgroundColor: Themes.dark.lightText,
                    }}
                  />
                )}
              </View>
            }
            renderItem={option => (
              <PromptLayerChildItemListItem
                name={option.item.value}
                isSelected={option.item.isSelected}
                onClick={(name: string) => toggleIsSelectedStateOfItem(name)}
              />
            )}
          />
        </View>
      </View>
    </DefaultAppModal>
  );
};

interface RadioIconProps {
  onOptionPress: (isSelected: boolean) => void;
  isSelected: boolean;
}

function RadioIcon(props: RadioIconProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onOptionPress(!props.isSelected);
      }}
      style={styles.radioIcon}>
      {props.isSelected && (
        <CloseIcon size={15} strokeColor={Themes.dark.lightText} />
      )}
      {!props.isSelected && (
        <View
          style={{
            width: 17,
            height: 17,
            borderRadius: 10,
            borderWidth: 5,
            borderColor: Themes.dark.lightText,
          }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radioIcon: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  listItemSelectedBorder: {
    borderColor: '#799700',
    borderRadius: 20,
    borderWidth: 1,
  },
  listItemDeselectedBorder: {
    borderColor: '#00000000',
    borderRadius: 20,
    borderWidth: 1,
  },
});

interface ListItemProps {
  name: string;
  isSelected: boolean;
  onClick: (name: string) => void;
}

const PromptLayerChildItemListItem: React.FC<ListItemProps> = props => {
  return (
    <TouchableOpacity
      style={[
        globalStyles.listItemBackground,
        props.isSelected
          ? styles.listItemSelectedBorder
          : styles.listItemDeselectedBorder,
        {
          marginVertical: 8,
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
      onPress={() => props.onClick(props.name)}>
      <View style={{width: 30}}>
        {props.isSelected && (
          <CheckIcon strokeColor={Themes.dark.actionText} size={20} />
        )}
      </View>
      <Text
        style={[
          globalStyles.buttonText,
          !props.isSelected && {color: '#555555'},
          {marginHorizontal: 16},
        ]}>
        {props.name}
      </Text>
      <View style={{flex: 1}} />
      <DragIcon style={{marginEnd: 16}} />
    </TouchableOpacity>
  );
};
