import {useEffect, useState} from 'react';
import {
  AllPromptLayerOptions,
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

interface SetPromptLayerModalProps {
  modalIsVisible: boolean;
  promptLayer?: PromptLayerOption;
  onSetPromptLayer: (promptLayer: PromptLayerOption) => void;
  onDismiss: () => void;
}

export const SetPromptLayerModal: React.FC<
  SetPromptLayerModalProps
> = props => {
  const [currentSelectedOption, setCurrentSelectedOption] =
    useState<PromptLayerOption>();

  const [listOfOptions, setListOfOptions] = useState(AllPromptLayerOptions);

  useEffect(() => {
    if (currentSelectedOption) {
      setListOfOptions([currentSelectedOption]);
    } else {
      setListOfOptions(AllPromptLayerOptions);
    }
  }, [currentSelectedOption]);

  return (
    <DrillConfigurationModal
      {...props}
      title={'add to prompt'}
      onDismiss={() => {
        if (currentSelectedOption) {
          props.onSetPromptLayer(currentSelectedOption);
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
                setCurrentSelectedOption(isSelected ? option.item : undefined);
              }}
              isSelected={option.item === currentSelectedOption}
            />
            <Text style={globalStyles.buttonText}>
              {option.item.itemDisplayName}
            </Text>
          </View>
        )}
      />

      {currentSelectedOption && (
        <View>
          <View style={{height: 0.1, backgroundColor: Themes.dark.lightText}} />
          <Text style={globalStyles.infoText}>Options will go here</Text>
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
  useEffect(() => {
    console.log('12345 selected? ' + props.isSelected);
  }, [props.isSelected]);

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
