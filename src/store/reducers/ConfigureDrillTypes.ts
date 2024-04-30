
const PromptOrderDefinitions = [
  'random',
  'descending5ths',
  'ascending5ths',
] as const;

export type PromptOrder = (typeof PromptOrderDefinitions)[number];
export const AllPromptOrders = [...PromptOrderDefinitions] as PromptOrder[];

const NoteNameDefinitions = [
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
] as const;

export type NoteName = (typeof NoteNameDefinitions)[number];
export const AllNoteNames = [...NoteNameDefinitions] as NoteName[];

const IntervalDefinitions = [
  'minor second',
  'major second',
  'minor third',
  'major third',
  'perfect fourth',
  'tritone',
  'perfect fifth',
  'minor sixth',
  'major sixth',
  'minor seventh',
  'major seventh',
] as const;

export type Interval = (typeof IntervalDefinitions)[number]
export const AllIntervals = [...IntervalDefinitions] as Interval[]

function getNoteNameAtInterval(originalNoteName: NoteName, interval: Interval, isUpwards: boolean = true): NoteName {
  const intervalDistance = AllIntervals.indexOf(interval) + 1;
  const oldNoteAsNumber = AllNoteNames.indexOf(originalNoteName);
  const newNoteAsNumber = isUpwards
    ? oldNoteAsNumber + intervalDistance
    : oldNoteAsNumber - intervalDistance;
  const newNoteAsArrayIndex = newNoteAsNumber + 12;
  const pitchClass = newNoteAsArrayIndex % 12;
  return AllNoteNames[pitchClass]
}

export function getNoteNameAtFifthBelow(originalNoteName: NoteName): NoteName {
  return getNoteNameAtInterval(originalNoteName, 'perfect fifth', false)
}

export function getNoteNameAtFifthAbove(originalNoteName: NoteName): NoteName {
  return getNoteNameAtInterval(originalNoteName, 'perfect fifth')
}

export function getRandomNoteName(noteNameFilter: NoteName[] = AllNoteNames): NoteName {
  return noteNameFilter[Math.floor(Math.random() * noteNameFilter.length)]
}

const ChordQualityDefinitions = [
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
  'half diminished 7th',
  'dominant 7th sus 4',
] as const;

export type ChordQuality = (typeof ChordQualityDefinitions)[number];
export const AllChordQualities = [...ChordQualityDefinitions] as ChordQuality[];

export function getRandomChordQuality(chordQualities: ChordQuality[]): ChordQuality {
  return chordQualities[Math.floor(Math.random() * chordQualities.length)]
}

const TonalContextsDefinitions = [
  'chord quality',
  'key',
  'scale',
  'mode',
  'none',
] as const;

export type TonalContext = (typeof TonalContextsDefinitions)[number];
export const AllTonalContexts = [...TonalContextsDefinitions] as TonalContext[];

const ScaleDefinitions = [
  'major',
  'natural minor',
  'harmonic minor',
  'melodic minor',
  'major pentatonic',
  'minor pentatonic',
  'blues',
  'bebop',
  'whole tone',
  'chromatic',
  'altered',
];

export type Scale = (typeof ScaleDefinitions)[number];
export const AllScales = [...ScaleDefinitions] as Scale[];

export function getRandomScale(scales: Scale[]): Scale {
  return scales[Math.floor(Math.random() * scales.length)];
}

export type Key = 'major' | 'minor';
export const AllKeys: Key[] = ['major', 'minor'];

export function getRandomKey(keys: Key[]): Key {
  return keys[Math.floor(Math.random() * keys.length)];
}

const ModeDefinitions = [
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
];

export type Mode = (typeof ModeDefinitions)[number];
export const AllModes = [...ModeDefinitions] as Mode[];

export function getRandomMode(modes: Mode[]): Mode {
  return modes[Math.floor(Math.random() * modes.length)];
}