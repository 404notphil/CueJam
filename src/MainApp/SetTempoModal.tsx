import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {NumberSelectorView} from './NumberSelectorView';
import {DrillConfigurationModal} from './DrillConfigurationModal';

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
    <DrillConfigurationModal
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
      />
    </DrillConfigurationModal>
  );
};
