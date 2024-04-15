import {ReactNode} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../ui/theme/styles';
import {AppModal} from '../ui/AppModal';

interface DrillConfigurationModalProps {
  children: ReactNode;
  modalIsVisible: boolean;
  title: string;
  onDismiss: () => void;
}

export const DrillConfigurationModal: React.FC<
  DrillConfigurationModalProps
> = props => {
  return (
    <View>
      <AppModal
        {...props}
        innerModalStyles={{top: '10%', padding: 16}}
        dismissingShouldFinish={true}
        onFinish={() => props.onDismiss()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 16,
          }}>
          <Text style={[globalStyles.fieldHeader, {marginTop: 0, flex: 1}]}>
            {props.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.onDismiss();
            }}>
            <Image
              style={{height: 20, width: 20, margin: 20}}
              source={require('../assets/check_mark.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>{props.children}</View>
      </AppModal>
    </View>
  );
};
