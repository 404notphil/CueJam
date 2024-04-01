import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {NumberSelectorView} from './NumberSelectorView';

interface SetTempoModalProps {
  modalIsVisible: boolean;
  tempo: number;
  onSetTempo: (tempo: number) => void;
  onDismiss: () => void;
}

export const SetTempoModal: React.FC<SetTempoModalProps> = props => {
  const [currentDisplayedTempo, setCurrentDisplayedTempo] = useState(
    props.tempo,
  );

  return (
    <AppModal
      {...props}
      innerModalStyles={{top: '10%', padding: 16}}
      dismissingShouldFinish={true}
      onFinish={() => props.onSetTempo(currentDisplayedTempo)}>
      <NumberSelectorView
        selectedNumberInViewer={currentDisplayedTempo}
        onSelectNumberInViewer={setCurrentDisplayedTempo}
        onCommitSelectedNumber={() => {
          props.onSetTempo(currentDisplayedTempo);
          props.onDismiss();
        }}
      />
    </AppModal>
  );
};
