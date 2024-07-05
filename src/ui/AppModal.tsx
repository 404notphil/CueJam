import {
  GestureResponderEvent,
  LogBox,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {globalStyles} from './theme/styles';
import { useEffect } from 'react';

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

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

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
            style={[globalStyles.modalInner]}
            onStartShouldSetResponder={preventDismiss}>
            <ScrollView style={{flexGrow: 0}}>{props.children}</ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
