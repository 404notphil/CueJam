import {
  AllNoteNames,
  getCircleOf5ths,
  getNoteNameAtFifthAbove,
  getNoteNameAtFifthBelow,
} from './ConfigureDrillTypes';

test('perfect fifth below is computed properly', () => {
  expect(getNoteNameAtFifthBelow('A')).toBe('D');
  expect(getNoteNameAtFifthBelow('Bb')).toBe('Eb');
  expect(getNoteNameAtFifthBelow('B')).toBe('E');
  expect(getNoteNameAtFifthBelow('C')).toBe('F');
  expect(getNoteNameAtFifthBelow('C#')).toBe('F#');
  expect(getNoteNameAtFifthBelow('D')).toBe('G');
  expect(getNoteNameAtFifthBelow('Eb')).toBe('G#');
  expect(getNoteNameAtFifthBelow('E')).toBe('A');
  expect(getNoteNameAtFifthBelow('F')).toBe('Bb');
  expect(getNoteNameAtFifthBelow('F#')).toBe('B');
  expect(getNoteNameAtFifthBelow('G')).toBe('C');
  expect(getNoteNameAtFifthBelow('G#')).toBe('C#');
});

test('perfect fifth above is computed properly', () => {
  expect(getNoteNameAtFifthAbove('A')).toBe('E');
  expect(getNoteNameAtFifthAbove('Bb')).toBe('F');
  expect(getNoteNameAtFifthAbove('B')).toBe('F#');
  expect(getNoteNameAtFifthAbove('C')).toBe('G');
  expect(getNoteNameAtFifthAbove('C#')).toBe('G#');
  expect(getNoteNameAtFifthAbove('D')).toBe('A');
  expect(getNoteNameAtFifthAbove('Eb')).toBe('Bb');
  expect(getNoteNameAtFifthAbove('E')).toBe('B');
  expect(getNoteNameAtFifthAbove('F')).toBe('C');
  expect(getNoteNameAtFifthAbove('F#')).toBe('C#');
  expect(getNoteNameAtFifthAbove('G')).toBe('D');
  expect(getNoteNameAtFifthAbove('G#')).toBe('Eb');
});

describe('circle of fifths computations', () => {
  test('ascending circle of fifths starting from A', () => {
    const expectedAscending5ths = [
      'E',
      'B',
      'F#',
      'C#',
      'G#',
      'Eb',
      'Bb',
      'F',
      'C',
      'G',
      'D',
      'A',
    ];
    const circleOfAscending5ths = getCircleOf5ths('A');
    expectedAscending5ths.forEach((note, index) => {
      expect(circleOfAscending5ths[index]).toBe(note);
    });
  });

  test('descending circle of fifths starting from A', () => {
    const expectedDescending5ths = [
      'D',
      'G',
      'C',
      'F',
      'Bb',
      'Eb',
      'G#',
      'C#',
      'F#',
      'B',
      'E',
      'A',
    ];
    const circleOfAscending5ths = getCircleOf5ths('A', false);
    expectedDescending5ths.forEach((note, index) => {
      expect(circleOfAscending5ths[index]).toBe(note);
    });
  });
});