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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import {RadioButton} from 'react-native-paper';
import {DrillConfigurationModal} from './DrillConfigurationModal';
import {Themes} from '../ui/theme/Theme';
import React from 'react';
import CloseIcon from '../assets/CloseIcon';
import {PromptLayer} from './PromptLayer';

interface SetPromptLayerModalProps {
  modalIsVisible: boolean;
  promptLayer?: PromptLayer<LayerChildItem>;
  onSetPromptLayer: (promptLayer: PromptLayer<LayerChildItem>) => void;
  onDismiss: () => void;
}

export const SetPromptLayerModal: React.FC<
  SetPromptLayerModalProps
> = props => {
  const [currentConfiguredPromptLayer, setCurrentConfiguredPromptLayer] =
    useState<PromptLayer<LayerChildItem> | undefined>(props.promptLayer);

  const [listOfOptions, setListOfOptions] = useState(AllPromptLayerOptions);
  const [currentlyDisplayedChildItems, setCurrentlyDisplayedChildItems] =
    useState<LayerChildItem[]>(AllNoteNames);

  useEffect(() => {
    if (currentConfiguredPromptLayer) {
      setListOfOptions([currentConfiguredPromptLayer.optionType]);
      setCurrentlyDisplayedChildItems(
        currentConfiguredPromptLayer.optionType.children,
      );
    } else {
      setListOfOptions(AllPromptLayerOptions);
    }
  }, [currentConfiguredPromptLayer]);

  return (
    <DrillConfigurationModal
      {...props}
      title={'add to prompt'}
      onDismiss={() => {
        if (currentConfiguredPromptLayer) {
          props.onSetPromptLayer(currentConfiguredPromptLayer);
          props.onDismiss();
        }
      }}>
      <FlatList
        style={{flexGrow: 0}}
        data={listOfOptions}
        keyExtractor={option => option.itemDisplayName}
        renderItem={option => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioIcon
              onOptionPress={isSelected => {
                if (isSelected) {
                  if (
                    props.promptLayer &&
                    props.promptLayer.optionType === option.item
                  )
                    setCurrentConfiguredPromptLayer(props.promptLayer);
                  else {
                    setCurrentConfiguredPromptLayer(
                      PromptLayer.fromOptionType(option.item),
                    );
                  }
                }
              }}
              isSelected={
                option.item === currentConfiguredPromptLayer?.optionType
              }
            />
            <Text style={globalStyles.buttonText}>
              {option.item.itemDisplayName}
            </Text>
          </View>
        )}
      />

      {currentConfiguredPromptLayer && (
        <View>
          <View
            style={{
              height: 1,
              opacity: 0.2,
              backgroundColor: Themes.dark.lightText,
            }}
          />

          <FlatList
            style={{flexGrow: 0}}
            data={currentlyDisplayedChildItems}
            keyExtractor={option => option}
            renderItem={option => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={globalStyles.buttonText}>{option.item}</Text>
              </View>
            )}
          />
        </View>
      )}
    </DrillConfigurationModal>
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
});
