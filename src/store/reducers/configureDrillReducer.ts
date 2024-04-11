import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  AllChordQualities,
  AllModes,
  AllNoteNames,
  AllScales,
  ChordQuality,
  Mode,
  NoteName,
  PromptAlgorithm,
  Scale,
  TonalContext,
} from './ConfigureDrillTypes';

export interface ConfigureDrillState {
  drillName: string;
  tempo: number;
  beatsPerPrompt: number;
  noteNames: NoteName[];
  promptAlgorithm: PromptAlgorithm;
  tonalContext: TonalContext;
  chordQualities: ChordQuality[];
  scales: Scale[];
  modes: Mode[];
}

const initialState: ConfigureDrillState = {
  drillName: '',
  tempo: 150,
  beatsPerPrompt: 4,
  noteNames: AllNoteNames,
  promptAlgorithm: 'random',
  tonalContext: 'chord quality',
  chordQualities: AllChordQualities,
  scales: AllScales,
  modes: AllModes,
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
    setPromptAlgorithm: (state, action: PayloadAction<PromptAlgorithm>) => {
      state.promptAlgorithm = action.payload;
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
  setPromptAlgorithm,
  setTonalContext,
  setChordQualities: setChordQualities,
  setScales: setScales,
  setModes: setModes,
} = configureDrillSlice.actions;
