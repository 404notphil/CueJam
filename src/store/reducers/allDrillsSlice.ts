// src/features/drills/drillsSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ConfigureDrillState, DrillConfiguration} from './configureDrillReducer';
import {RootState} from '../store';

export interface Drill {
  drillId: number;
  name: string;
  configuration: DrillConfiguration;
}

export interface DrillsState {
  drills: Drill[];
  loading: boolean;
  error: string | null;
}

const initialState: DrillsState = {
  drills: [],
  loading: false,
  error: null,
};

const drillsSlice = createSlice({
  name: 'drills',
  initialState,
  reducers: {
    loadStart(state) {
      state.loading = true;
      state.error = null;
    },
    loadSuccess(state, action: PayloadAction<Drill[]>) {
      state.drills = action.payload;
      state.loading = false;
    },
    loadFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteDrillSuccess: (state, action: PayloadAction<ConfigureDrillState>) => {
      Object.assign(state, action.payload);
    },
    deleteDrillFailure: (state, action: PayloadAction<string>) => {
      state = initialState;
    },
  },
});

export const {
  loadStart,
  loadSuccess,
  loadFailure,
  deleteDrillSuccess,
  deleteDrillFailure,
} = drillsSlice.actions;

export default drillsSlice.reducer;

export const selectAllDrills: (state: RootState) => DrillsState = state =>
  state.allDrillsReducer;
