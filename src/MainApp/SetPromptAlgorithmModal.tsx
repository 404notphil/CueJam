import React, {useEffect, useState} from 'react';
import {
  AllPromptAlgorithms,
  PromptAlgorithm,
} from '../store/reducers/ConfigureDrillTypes';
import {Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {DrillConfigurationModal} from './DrillConfigurationModal';

interface SetPromptAlgorithmModalProps {
  modalIsVisible: boolean;
  promptAlgorithm: PromptAlgorithm;
  onSetPromptAlgorithm: (promptAlgorithm: PromptAlgorithm) => void;
  onDismiss: () => void;
}

export const SetPromptAlgorithmModal: React.FC<
  SetPromptAlgorithmModalProps
> = props => {
  const [currentDisplayedPromptAlgorithm, setCurrentDisplayedPromptAlgorithm] =
    useState(props.promptAlgorithm);

  useEffect(() => {
    setCurrentDisplayedPromptAlgorithm(props.promptAlgorithm);
  }, [props.promptAlgorithm]);

  return (
    <DrillConfigurationModal
      {...props}
      title={'prompt algorithm'}
      onDismiss={() => {
        props.onSetPromptAlgorithm(currentDisplayedPromptAlgorithm);
        props.onDismiss();
      }}>
      <RadioButton.Group
        onValueChange={value =>
          setCurrentDisplayedPromptAlgorithm(value as PromptAlgorithm)
        }
        value={currentDisplayedPromptAlgorithm}>
        <View>
          {AllPromptAlgorithms.map(item => (
            <View key={item}>
              <Text>{item}</Text>
              <RadioButton value={item} />
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </DrillConfigurationModal>
  );
};
