import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from './rootReducer';

type Flag = 'DummyFlag1' | 'DummyFlag2' | 'DummyFlag3';

export type FeatureFlagState = Record<Flag, boolean | undefined>;

const initialFeatureFlagState: FeatureFlagState = {
  DummyFlag1: undefined,
  DummyFlag2: undefined,
  DummyFlag3: undefined,
};

type UpdateFeatureFlagAction = {flag: Flag; isEnabled: boolean};

export const featureFlagSlice = createSlice({
  name: 'featureFlags',
  initialState: initialFeatureFlagState,
  reducers: {
    updateFeatureFlag: (
      state,
      action: PayloadAction<UpdateFeatureFlagAction>,
    ) => {
      state[action.payload.flag] = action.payload.isEnabled;
    },
  },
});

export default featureFlagSlice.reducer;

export const selectFeatureFlags: (
  state: RootState,
) => FeatureFlagState = state => state.featureFlags;

export const {updateFeatureFlag} = featureFlagSlice.actions;
