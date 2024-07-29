import React, {useState} from 'react';
import {NumberSelectorView} from './NumberSelectorView';
import {DefaultAppModal} from './DefaultAppModal';

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
      {...props}
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
        minNumber={40}
        maxNumber={400}
      />
    </DefaultAppModal>
  );
  DefaultAppModal;
};
