import {View} from 'react-native';

import React, {FC, useCallback, useEffect, useState} from 'react';
import {globalStyles} from '../ui/theme/styles';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  addPromptLayer,
  onDrillEdit,
  replacePromptLayer,
  selectConfigureDrill,
  setBeatsPerChord as setBeatsPerPrompt,
  setPromptOrder,
  setTempo,
} from '../store/reducers/configureDrillReducer';
import {LayerChildItem} from '../store/reducers/ConfigureDrillTypes';

import {useSharedValue, withTiming} from 'react-native-reanimated';
import {
  checkForSimilarDrills,
  loadSessionDataForTimeRange,
} from '../services/AppDatabase';
import {PromptLayerList} from './PromptLayerList';
import {PromptLayer} from './PromptLayer';
import {SetPromptLayerModal} from './PromptLayerModal';
import {useFocusEffect} from '@react-navigation/native';
import {SetTempoModal} from './SetTempoModal';
import {SetBeatsPerPromptModal} from './SetBeatsPerPromptModal';

export function ConfigureDrillScreen(): React.JSX.Element {
  const state = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  const drill = state.configuration;

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  const [promptLayerTypeModalToShow, setPromptLayerTypeModalToShow] = useState<
    PromptLayer<LayerChildItem> | null | undefined
  >(undefined);

  const [promptLayerChildrenModalToShow, setPromptLayerChildrenModalToShow] =
    useState<PromptLayer<LayerChildItem>>();

  const [
    shouldShowSetBeatsPerPromptModal,
    setShouldShowSetBeatsPerPromptModal,
  ] = useState(false);

  const [shouldShowSetTempoModal, setShouldShowSetTempoModal] = useState(false);

  useEffect(() => {
    dispatch(onDrillEdit(state));
    dispatch(checkForSimilarDrills(drill));
  }, [drill]);

  useFocusEffect(
    useCallback(() => {
      drill.drillId &&
        dispatch(
          loadSessionDataForTimeRange({
            drillId: drill.drillId,
            timeRangeStart: 0,
            timeRangeEnd: Number.MAX_SAFE_INTEGER,
          }),
        );

      return () => {
        console.log('ScreenA is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    if (state.isSaved) {
      animatedHeight.value = 0;
      animatedOpacity.value = 0;
      animatedHeight.value = withTiming(120);
      animatedOpacity.value = withTiming(1);
    } else {
      animatedHeight.value = 120;
      animatedOpacity.value = 1;
      animatedHeight.value = withTiming(0);
      animatedOpacity.value = withTiming(0);
    }
  }, [state.isSaved]);

  useEffect(() => {
    if (drill.noteNames.length !== 12) {
      dispatch(setPromptOrder('random'));
    }
  }, [drill.noteNames.length]);

  return (
    <View style={globalStyles.screenContainer}>
      {/* Please be aware that content displays above the PromptLayerList, by means of a header in that list.  */}
      <PromptLayerList
        state={state}
        onPressPromptLayerType={layer => setPromptLayerTypeModalToShow(layer)}
        onPressPromptLayerChildren={layer =>
          setPromptLayerChildrenModalToShow(layer)
        }
        onPressAddNewLayer={() =>
          // setting this to null (instead of undefined) means we want to see the modal, but with no layer specified yet
          setPromptLayerTypeModalToShow(null)
        }
        onPressToEditBeatsPerPrompt={() =>
          setShouldShowSetBeatsPerPromptModal(true)
        }
        onPressToEditTempo={() => setShouldShowSetTempoModal(true)}
      />

      {promptLayerTypeModalToShow !== undefined && (
        <SetPromptLayerModal
          modalIsVisible={promptLayerTypeModalToShow !== undefined}
          promptLayer={promptLayerTypeModalToShow}
          onSetPromptLayer={promptLayer => {
            promptLayerTypeModalToShow
              ? dispatch(
                  replacePromptLayer({
                    newLayer: promptLayer,
                    oldLayer: promptLayerTypeModalToShow,
                  }),
                )
              : dispatch(addPromptLayer(promptLayer));
          }}
          onDismiss={() => {
            setPromptLayerTypeModalToShow(undefined);
          }}
        />
      )}

      {shouldShowSetTempoModal && (
        <SetTempoModal
          modalIsVisible={shouldShowSetTempoModal}
          tempo={120}
          onSetTempo={tempo => {
            dispatch(setTempo(tempo));
          }}
          onDismiss={() => {
            setShouldShowSetTempoModal(false);
          }}
        />
      )}

      {shouldShowSetBeatsPerPromptModal && (
        <SetBeatsPerPromptModal
          modalIsVisible={shouldShowSetBeatsPerPromptModal}
          beatsPerPrompt={4}
          onSetBeatsPerPrompt={beats => {
            dispatch(setBeatsPerPrompt(beats));
          }}
          onDismiss={() => {
            setShouldShowSetBeatsPerPromptModal(false);
          }}
        />
      )}
    </View>
  );
}
