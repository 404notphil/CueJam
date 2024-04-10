
const PromptAlgorithmDefinitions = [
  'random',
  'chromatic',
  'descending5ths',
  'ascending5ths',
  'tonerow',
] as const;

export type PromptAlgorithm = (typeof PromptAlgorithmDefinitions)[number];
export const AllPromptAlgorithms = [
  ...PromptAlgorithmDefinitions,
] as PromptAlgorithm[];

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
  const intervalDistance = AllIntervals.indexOf(interval) + 1
  const oldNoteAsNumber = AllNoteNames.indexOf(originalNoteName)
  const newNoteAsNumber = isUpwards ? (oldNoteAsNumber + intervalDistance) : oldNoteAsNumber - intervalDistance
  if (newNoteAsNumber < 0) throw Error('Requested interval reachest below the lowest allowed note!')
  const pitchClass  = newNoteAsNumber % 12
  return AllNoteNames[pitchClass]
}

export function getNoteNameAtFifthBelow(originalNoteName: NoteName): NoteName {
  return getNoteNameAtInterval(originalNoteName, 'perfect fifth', false)
}

export function getNoteNameAtFifthAbove(originalNoteName: NoteName): NoteName {
  return getNoteNameAtInterval(originalNoteName, 'perfect fifth')
}

export function getRandomNoteName(): NoteName {
  return AllNoteNames[Math.floor(Math.random() * AllNoteNames.length)]
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
  'half full diminished 7th',
  'dominant 7th sus 4',
] as const;

export type ChordQuality = (typeof ChordQualityDefinitions)[number];
export const AllChordQualities = [...ChordQualityDefinitions] as ChordQuality[];

const TonalContextsDefinitions = [
  'chord quality',
  'key',
  'scale',
  'mode',
  'none',
] as const;

export type TonalContext = (typeof TonalContextsDefinitions)[number];
export const AllTonalContexts = [...TonalContextsDefinitions] as TonalContext[];