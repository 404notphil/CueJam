import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {NumberSelectorView} from './NumberSelectorView';
import {
  AllPromptAlgorithms,
  PromptAlgorithm,
} from '../store/reducers/ConfigureDrillTypes';
import {Text, View} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import {RadioButton} from 'react-native-paper';

interface setPromptAlgorithmModalProps {
  modalIsVisible: boolean;
  promptAlgorithm: PromptAlgorithm;
  onSetPromptAlgorithm: (promptAlgorithm: PromptAlgorithm) => void;
  onDismiss: () => void;
}

export const SetPromptAlgorithmModal: React.FC<
  setPromptAlgorithmModalProps
> = props => {
  const [currentDisplayedPromptAlgorithm, setCurrentDisplayedPromptAlgorithm] =
    useState(props.promptAlgorithm);

  return (
    <AppModal
      {...props}
      innerModalStyles={{top: '20%', padding: 20}}
      dismissingShouldFinish={true}
      onFinish={() =>
        props.onSetPromptAlgorithm(currentDisplayedPromptAlgorithm)
      }>
      <Text style={[globalStyles.fieldHeader, {marginVertical: 30}]}>
        prompt algorithm
      </Text>
      <RadioButton.Group
        onValueChange={value =>
          setCurrentDisplayedPromptAlgorithm(value as PromptAlgorithm)
        }
        value={currentDisplayedPromptAlgorithm}>
        <View>
          {AllPromptAlgorithms.map(item => (
            <View>
              <Text>{item}</Text>
              <RadioButton value={item} />
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </AppModal>
  );
};
