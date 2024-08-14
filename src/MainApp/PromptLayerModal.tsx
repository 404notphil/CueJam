import {useEffect, useState} from 'react';
import {
  AllPromptLayerOptions,
  LayerChildItem,
} from '../store/reducers/ConfigureDrillTypes';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import {DefaultAppModal} from './DefaultAppModal';
import {Themes} from '../ui/theme/Theme';
import React from 'react';
import CloseIcon from '../assets/CloseIcon';
import {PromptLayer} from './PromptLayer';
import CheckIcon from '../assets/CheckIIcon';
import DragIcon from '../assets/DragIcon';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useAppDispatch} from '../store/hooks';

interface SetPromptLayerModalProps {
  modalIsVisible: boolean;
  promptLayer: PromptLayer<LayerChildItem> | null;
  onSetPromptLayer: (promptLayer: PromptLayer<LayerChildItem>) => void;
  onDismiss: () => void;
}

type SelectableChildItem = {isSelected: boolean; value: LayerChildItem};

export const SetPromptLayerModal: React.FC<
  SetPromptLayerModalProps
> = props => {
  const dispatch = useAppDispatch();
  const [currentConfiguredPromptLayer, setCurrentConfiguredPromptLayer] =
    useState<PromptLayer<LayerChildItem> | null>(props.promptLayer);
  const [dragIsActive, setDragIsActive] = useState(false);

  const childItemsBasedOnSelection = (values: LayerChildItem[]) => {
    const all = currentConfiguredPromptLayer?.sortedFullSetOfChildren;
    return all
      ? all.map(item => {
          return {isSelected: values?.includes(item), value: item};
        })
      : [];
  };

  const [listOfOptions, setListOfOptions] = useState(AllPromptLayerOptions);
  const [currentlyDisplayedChildItems, setCurrentlyDisplayedChildItems] =
    useState<SelectableChildItem[]>(
      childItemsBasedOnSelection(props.promptLayer?.childrenChosen ?? []),
    );

  useEffect(() => {
    const selectedChildren = currentlyDisplayedChildItems
      .filter(item => item.isSelected)
      .map(item => item.value);
    const sortedChildren = currentlyDisplayedChildItems.map(item => item.value);
    currentConfiguredPromptLayer?.overwriteSelectedChildren(selectedChildren);
    currentConfiguredPromptLayer?.replaceSortOrder(sortedChildren);
  }, [currentlyDisplayedChildItems]);

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
        childItemsBasedOnSelection(currentConfiguredPromptLayer.childrenChosen),
      );
    } else {
      setListOfOptions(AllPromptLayerOptions);
      setCurrentlyDisplayedChildItems([]);
    }
  }, [currentConfiguredPromptLayer]);

  const renderItem = (
    {item, drag, isActive}: RenderItemParams<SelectableChildItem>,
    index: number,
  ) => {
    return (
      <ScaleDecorator>
        <PromptLayerChildItemListItem
          name={item.value}
          isSelected={item.isSelected}
          onClick={(name: string) => toggleIsSelectedStateOfItem(name)}
          onPressIn={() => {
            setDragIsActive(true);
            drag();
          }}
          onPressOut={() => setDragIsActive(false)}
          isActive={isActive}
          dragIsActive={dragIsActive}
        />
      </ScaleDecorator>
    );
  };

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
        <DraggableFlatList
          data={currentlyDisplayedChildItems}
          keyExtractor={option => option.value}
          // scrollEnabled={true}
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
          renderItem={item =>
            renderItem(item, currentlyDisplayedChildItems.indexOf(item.item))
          }
          onDragEnd={({data}) => {
            setDragIsActive(false);
            setCurrentlyDisplayedChildItems(data);
          }}
        />
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
  onPressIn: () => void;
  onPressOut: () => void;
  isActive: boolean;
  dragIsActive: boolean;
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
      <TouchableOpacity
        onPressIn={() => props.onPressIn()}
        onPressOut={() => props.onPressOut()}
        disabled={props.isActive && !props.dragIsActive}>
        <DragIcon style={{marginEnd: 16}} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
