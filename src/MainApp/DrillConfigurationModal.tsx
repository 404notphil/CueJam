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
    <AppModal
      {...props}
      dismissingShouldFinish={true}
      onFinish={() => props.onDismiss()}>
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 16,
          marginHorizontal: 16,
        }}>
        <Text
          style={[
            globalStyles.fieldHeader,
            {
              marginTop: 0,
              marginEnd: 10,
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
              marginStart: 10,
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
  );
};
