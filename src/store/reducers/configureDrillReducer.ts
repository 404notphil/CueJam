import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  AllChordQualities,
  AllNoteNames,
  ChordQuality,
  NoteName,
  TonalContext,
} from './ConfigureDrillTypes';

export interface ConfigureDrillState {
  drillName: string;
  tempo: number;
  beatsPerChord:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 14
    | 15
    | 16
    | 17;
  noteNames: NoteName[];
  promptAlgorithm: PromptAlgorithm;
  tonalContext: TonalContext;
  chordQualities: ChordQuality[];
}

const initialState: ConfigureDrillState = {
  drillName: '',
  tempo: 100,
  beatsPerChord: 4,
  noteNames: AllNoteNames,
  promptAlgorithm: 'random',
  tonalContext: 'chord quality',
  chordQualities: AllChordQualities,
};

type PromptAlgorithm =
  | 'random'
  | 'chromatic'
  | 'descending5ths'
  | 'ascending5ths'
  | 'tonerow';

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
      /* todo */
    },
    setNoteNames: (state, action: PayloadAction<NoteName[]>) => {
      /* todo */
    },
    setPromptAlgorithm: (state, action: PayloadAction<PromptAlgorithm>) => {
      /* todo */
    },
    setTonalContext: (state, action: PayloadAction<TonalContext>) => {
      /* todo */
    },
    setChordQuality: (state, action: PayloadAction<ChordQuality[]>) => {
      /* todo */
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
  setChordQuality,
} = configureDrillSlice.actions;
