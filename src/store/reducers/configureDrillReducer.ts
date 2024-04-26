import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  AllChordQualities,
  AllKeys,
  AllModes,
  AllNoteNames,
  AllScales,
  ChordQuality,
  Key,
  Mode,
  NoteName,
  PromptOrder,
  Scale,
  TonalContext,
} from './ConfigureDrillTypes';

export interface ConfigureDrillState {
  configuration: {
    drillId?: number;
    drillName: string;
    tempo: number;
    beatsPerPrompt: number;
    noteNames: NoteName[];
    promptOrder: PromptOrder;
    tonalContext: TonalContext;
    chordQualities: ChordQuality[];
    scales: Scale[];
    modes: Mode[];
    keys: Key[];
  };
  isSaved: boolean;
}

const initialState: ConfigureDrillState = {
  configuration: {
    drillName: '',
    tempo: 150,
    beatsPerPrompt: 4,
    noteNames: AllNoteNames,
    promptOrder: 'random',
    tonalContext: 'chord quality',
    chordQualities: AllChordQualities,
    scales: AllScales,
    modes: AllModes,
    keys: AllKeys,
  },
  isSaved: false,
};

export const configureDrillSlice = createSlice({
  name: 'featureFlags',
  initialState: initialState,
  reducers: {
    setDrillName: (state, action: PayloadAction<string>) => {
      state.configuration.drillName = action.payload;
    },
    setTempo: (state, action: PayloadAction<number>) => {
      state.configuration.tempo = action.payload;
    },
    setBeatsPerChord: (state, action: PayloadAction<number>) => {
      state.configuration.beatsPerPrompt = action.payload;
    },
    setNoteNames: (state, action: PayloadAction<NoteName[]>) => {
      state.configuration.noteNames = action.payload;
    },
    setPromptOrder: (state, action: PayloadAction<PromptOrder>) => {
      state.configuration.promptOrder = action.payload;
    },
    setTonalContext: (state, action: PayloadAction<TonalContext>) => {
      state.configuration.tonalContext = action.payload;
    },
    setChordQualities: (state, action: PayloadAction<ChordQuality[]>) => {
      state.configuration.chordQualities = action.payload;
    },
    setScales: (state, action: PayloadAction<Scale[]>) => {
      state.configuration.scales = action.payload;
    },
    setModes: (state, action: PayloadAction<Mode[]>) => {
      state.configuration.modes = action.payload;
    },
    setKeys: (state, action: PayloadAction<Key[]>) => {
      state.configuration.keys = action.payload;
    },
    writeDrillSuccess: (state, action: PayloadAction<ConfigureDrillState>) => {
      if (action.payload.configuration.drillId === state.configuration.drillId)
        Object.assign(state, {...action.payload, isSaved: true});
    },
    loadDrillSuccess: (state, action: PayloadAction<ConfigureDrillState>) => {
      Object.assign(state, {...initialState, ...action.payload});
    },
    loadDrillFailure: (state, action: PayloadAction<string>) => {
      state = initialState;
    },
    clearDrill: state => {
      Object.assign(state, {...initialState, drillId: undefined});
    },
    onDrillEdit: state => {
      state.isSaved = false;
    },
  },
});

export default configureDrillSlice.reducer;

export const selectConfigureDrill: (
  state: RootState,
) => ConfigureDrillState = state => state.drillConfiguration;

export const {
  setDrillName,
  setTempo,
  setBeatsPerChord,
  setNoteNames,
  setPromptOrder,
  setTonalContext,
  setChordQualities,
  setScales,
  setModes,
  setKeys,
  writeDrillSuccess,
  loadDrillSuccess,
  loadDrillFailure,
  clearDrill,
  onDrillEdit,
} = configureDrillSlice.actions;
