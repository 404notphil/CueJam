import {combineReducers} from 'redux';
import {CounterState, counterReducer} from './counterReducer';
import featureFlagReducer, {FeatureFlagState} from './featureFlagsSlice';
import configureDrillReducer, {
  ConfigureDrillState,
} from './configureDrillReducer';
import allDrillsReducer, {DrillsState} from './allDrillsSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  drillConfigurationState: configureDrillReducer,
  featureFlags: featureFlagReducer,
  allDrillsReducer: allDrillsReducer,
});

export default rootReducer;