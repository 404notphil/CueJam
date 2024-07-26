import React, {useState} from 'react';
import {NumberSelectorView} from './NumberSelectorView';
import {DefaultAppModal} from './DrillConfigurationModal';
DefaultAppModalDefaultAppModal;
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
    <DefaultAppModal
      DefaultAppModal
      title={'tempo'}
      onDismiss={() => {
        props.onSetTempo(currentDisplayedTempo);
        props.onDismiss();
      }}>
      <NumberSelectorView
        selectedNumberInViewer={currentDisplayedTempo}
        onSelectNumberInViewer={setCurrentDisplayedTempo}
        onCommitSelectedNumber={() => {
          props.onSetTempo(currentDisplayedTempo);
          props.onDismiss();
        }}
      />
    </DefaultAppModal>
  );
  DefaultAppModal;
};
