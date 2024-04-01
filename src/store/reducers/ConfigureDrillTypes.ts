
export type PromptAlgorithm =
  | 'random'
  | 'chromatic'
  | 'descending5ths'
  | 'ascending5ths'
  | 'tonerow';

export const AllPromptAlgorithms: PromptAlgorithm[] = [
  'random',
  'chromatic',
  'descending5ths',
  'ascending5ths',
  'tonerow',
];

export type NoteName =
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

export const AllNoteNames: NoteName[] = [
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

export type ChordQuality =
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

export const AllChordQualities: ChordQuality[] = [
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

export type TonalContext = 'chord quality' | 'key' | 'scale' | 'mode' | 'none';

export const AllTonalContexts: TonalContext[] = ['chord quality' ,'key' ,'scale' ,'mode' ,'none'];