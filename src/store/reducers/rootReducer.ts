import {combineReducers} from 'redux';
import {CounterState, counterReducer} from './counterReducer';
import featureFlagReducer, {FeatureFlagState} from './featureFlagsSlice';
import configureDrillReducer, {
  ConfigureDrillState,
} from './configureDrillReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  drillConfiguration: configureDrillReducer,
  featureFlags: featureFlagReducer,
});

export default rootReducer;