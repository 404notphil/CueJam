interface ConfigureDrillState {
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
  promptAlgorithm:
    | 'random'
    | 'chromatic'
    | 'descending5ths'
    | 'ascending5ths'
    | 'tonerow';
  tonalContext: 'chord quality' | 'key' | 'scale' | 'mode' | 'none';
  chordQualities: ChordQuality[];
}

type NoteName =
  | 'A'
  | 'Bb'
  | 'B'
  | 'C'
  | 'C#'
  | 'D'
  | 'Eb'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#';
const AllNoteNames: NoteName[] = [
  'A',
  'Bb',
  'B',
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'G#',
];

type ChordQuality =
  | 'major triad'
  | 'minor triad'
  | 'diminished triad'
  | 'augmented triad'
  | 'sus 2 triad'
  | 'sus 4 triad'
  | 'dominant 7th'
  | 'major 7th'
  | 'minor 7th'
  | 'minor major 7th'
  | 'augmented 7th'
  | 'augmented major 7th'
  | 'full diminished 7th'
  | 'half full diminished 7th'
  | 'dominant 7th sus 4';

const AllChordQualities: ChordQuality[] = [
  'major triad',
  'minor triad',
  'diminished triad',
  'augmented triad',
  'sus 2 triad',
  'sus 4 triad',
  'dominant 7th',
  'major 7th',
  'minor 7th',
  'minor major 7th',
  'augmented 7th',
  'augmented major 7th',
  'full diminished 7th',
  'half full diminished 7th',
  'dominant 7th sus 4',
];

const SET_DRILL_NAME = 'SET_DRILL_NAME';
const SET_TEMPO = 'SET_TEMPO';
const SET_BEATS_PER_CHORD = 'SET_BEATS_PER_CHORD';
const SET_NOTE_NAMES = 'SET_NOTE_NAMES';
const SET_PROMPT_ALGORITHM = 'SET_PROMPT_ALGORITHM';
const SET_TONAL_CONTEXT = 'SET_TONAL_CONTEXT';
const SET_CHORD_QUALITIES = 'SET_CHORD_QUALITIES';

const initialState: ConfigureDrillState = {
  drillName: '',
  tempo: 100,
  beatsPerChord: 4,
  noteNames: AllNoteNames,
  promptAlgorithm: 'random',
  tonalContext: 'chord quality',
  chordQualities: AllChordQualities,
};

// export const setDrillName = () => ({type: SET_DRILL_NAME});
type SetDrillNameAction = {
  type: 'SET_DRILL_NAME';
};
type SetTempoAction = {
  type: 'SET_TEMPO';
};
type SetBeatsPerChord = {
  type: 'SET_BEATS_PER_CHORD';
};
type SetNoteNames = {
  type: 'SET_NOTE_NAMES';
};
type SetPromptAglorithm = {
  type: 'SET_PROMPT_ALGORITHM';
};
type SetTonalContext = {
  type: 'SET_TONAL_CONTEXT';
};
type SetChordQualities = {
  type: 'SET_CHORD_QUALITIES';
};

type ConfigureDrillAction =
  | SetDrillNameAction
  | SetTempoAction
  | SetBeatsPerChord
  | SetNoteNames
  | SetPromptAglorithm
  | SetTonalContext
  | SetChordQualities;

function configureDrillReducer(
  action: ConfigureDrillAction,
): ConfigureDrillState {
  switch (action.type) {
    case 'SET_DRILL_NAME': {
      return initialState; // TODO fix
    }
    case 'SET_TEMPO': {
      return initialState; // TODO fix
    }
    case 'SET_BEATS_PER_CHORD': {
      return initialState; // TODO fix
    }
    case 'SET_NOTE_NAMES': {
      return initialState; // TODO fix
    }
    case 'SET_PROMPT_ALGORITHM': {
      return initialState; // TODO fix
    }
    case 'SET_TONAL_CONTEXT': {
      return initialState; // TODO fix
    }
    case 'SET_CHORD_QUALITIES': {
      return initialState; // TODO fix
    }
  }
}
