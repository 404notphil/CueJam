import {
  GestureResponderEvent,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {globalStyles} from './theme/styles';

interface AppModalProps {
  modalIsVisible: boolean;
  dismissingShouldFinish: boolean;
  onDismiss: () => void;
  onFinish: () => void;
  children: React.ReactNode;
}

export const AppModal: React.FC<AppModalProps> = props => {
  const preventDismiss = (event: GestureResponderEvent) => {
    event.stopPropagation();
    return true;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalIsVisible}
      onRequestClose={() => {
        props.onDismiss();
        props.onFinish();
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.onDismiss();
          if (props.dismissingShouldFinish) props.onFinish();
        }}>
        <View style={globalStyles.modalOuter}>
          <View
            style={[
              globalStyles.modalInner,
            ]}
            onStartShouldSetResponder={preventDismiss}>
            {props.children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
