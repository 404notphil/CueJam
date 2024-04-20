import React, {useState} from 'react';
import {
  AllTonalContexts,
  TonalContext,
} from '../store/reducers/ConfigureDrillTypes';
import {Text, View} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import {RadioButton} from 'react-native-paper';
import {DrillConfigurationModal} from './DrillConfigurationModal';

interface SetTonalContextModalProps {
  modalIsVisible: boolean;
  tonalContext: TonalContext;
  onSetTonalContext: (tonalContext: TonalContext) => void;
  onDismiss: () => void;
}

export const SetTonalContextModal: React.FC<
  SetTonalContextModalProps
> = props => {
  const [currentDisplayedTonalContext, setCurrentDisplayedTonalContext] =
    useState(props.tonalContext);

  return (
    <DrillConfigurationModal
      {...props}
      title={'tonal context'}
      onDismiss={() => {
        props.onSetTonalContext(currentDisplayedTonalContext);
        props.onDismiss();
      }}>
      <RadioButton.Group
        onValueChange={value =>
          setCurrentDisplayedTonalContext(value as TonalContext)
        }
        value={currentDisplayedTonalContext}>
        <View>
          {AllTonalContexts.map(item => (
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
