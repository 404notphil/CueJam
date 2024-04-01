import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {NumberSelectorView} from './NumberSelectorView';
import {
  AllTonalContexts,
  TonalContext,
} from '../store/reducers/ConfigureDrillTypes';
import {Text, View} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import {RadioButton} from 'react-native-paper';

interface SetTonalContextModalProps {
  modalIsVisible: boolean;
  tonalContext: TonalContext;
  onSetTonalContext: (tonalContext: TonalContext) => void;
  onDismiss: () => void;
}

export const TonalContextModal: React.FC<SetTonalContextModalProps> = props => {
  const [currentDisplayedTonalContext, setCurrentDisplayedTonalContext] =
    useState(props.tonalContext);

  return (
    <AppModal
      {...props}
      innerModalStyles={{top: '20%', padding: 20}}
      dismissingShouldFinish={true}
      onFinish={() => props.onSetTonalContext(currentDisplayedTonalContext)}>
      <Text style={[globalStyles.fieldHeader, {marginVertical: 30}]}>
        tonal context
      </Text>
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
    </AppModal>
  );
};
