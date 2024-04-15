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
        innerModalStyles={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
        dismissingShouldFinish={true}
        onFinish={() => props.onDismiss()}>
        <View
          style={{
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 16,
          }}>
          <Text
            style={[
              globalStyles.fieldHeader,
              {
                alignSelf: 'flex-start',
                marginTop: 0,
              },
            ]}>
            {props.title}
          </Text>

          <TouchableOpacity
            onPress={() => {
              props.onDismiss();
            }}>
            <Image
              style={{
                alignSelf: 'flex-end',
                height: 20,
                width: 20,
              }}
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
