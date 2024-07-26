import React, {useEffect, useState} from 'react';
import {
  AllPromptOrders,
  PromptOrder,
} from '../store/reducers/ConfigureDrillTypes';
import {Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {DefaultAppModal} from './DrillConfigurationModal';

interface SetPromptOrderModalProps {
  modalIsVisible: boolean;
  promptOrder: PromptOrder;
  onSetPromptOrder: (promptOrder: PromptOrder) => void;
  onDismiss: () => void;
}

export const SetPromptOrderModal: React.FC<
  SetPromptOrderModalProps
> = props => {
  const [currentDisplayedPromptOrder, setCurrentDisplayedPromptOrder] =
    useState(props.promptOrder);

  useEffect(() => {
    setCurrentDisplayedPromptOrder(props.promptOrder);
  }, [props.promptOrder]);

  return (
    <DefaultAppModal
      {...props}
      title={'prompt order'}
      onDismiss={() => {
        props.onSetPromptOrder(currentDisplayedPromptOrder);
        props.onDismiss();
      }}>
      <RadioButton.Group
        onValueChange={value =>
          setCurrentDisplayedPromptOrder(value as PromptOrder)
        }
        value={currentDisplayedPromptOrder}>
        <View>
          {AllPromptOrders.map(item => (
            <View key={item}>
              <Text>{item}</Text>
              <RadioButton value={item} />
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </DefaultAppModal>
  );
};
