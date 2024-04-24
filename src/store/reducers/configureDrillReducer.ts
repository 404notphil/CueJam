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
  isSaved: boolean;
}

const initialState: ConfigureDrillState = {
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
  isSaved: false,
};

export const configureDrillSlice = createSlice({
  name: 'featureFlags',
  initialState: initialState,
  reducers: {
    setDrillName: (state, action: PayloadAction<string>) => {
      state.drillName = action.payload;
    },
    setTempo: (state, action: PayloadAction<number>) => {
      state.tempo = action.payload;
    },
    setBeatsPerChord: (state, action: PayloadAction<number>) => {
      state.beatsPerPrompt = action.payload;
    },
    setNoteNames: (state, action: PayloadAction<NoteName[]>) => {
      state.noteNames = action.payload;
    },
    setPromptOrder: (state, action: PayloadAction<PromptOrder>) => {
      state.promptOrder = action.payload;
    },
    setTonalContext: (state, action: PayloadAction<TonalContext>) => {
      state.tonalContext = action.payload;
    },
    setChordQualities: (state, action: PayloadAction<ChordQuality[]>) => {
      state.chordQualities = action.payload;
    },
    setScales: (state, action: PayloadAction<Scale[]>) => {
      state.scales = action.payload;
    },
    setModes: (state, action: PayloadAction<Mode[]>) => {
      state.modes = action.payload;
    },
    setKeys: (state, action: PayloadAction<Key[]>) => {
      state.keys = action.payload;
    },
    writeDrillSuccess: (state, action: PayloadAction<ConfigureDrillState>) => {
      if (action.payload === state) state.isSaved = true;
    },
    loadDrillSuccess: (state, action: PayloadAction<ConfigureDrillState>) => {
      Object.assign(state, action.payload);
    },
    loadDrillFailure: (state, action: PayloadAction<string>) => {
      state = initialState;
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
} = configureDrillSlice.actions;
