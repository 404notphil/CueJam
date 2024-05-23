import {
  AllChordQualities,
  AllKeys,
  AllModes,
  AllNoteNames,
  AllScales,
  ChordQualitiesPromptLayerOption,
  ChordQuality,
  Key,
  KeysPromptLayerOption,
  LayerChildItem,
  Mode,
  ModesPromptLayerOption,
  NoteName,
  NoteNamePromptLayerOption,
  PromptLayerOption,
  PromptOrder,
  Scale,
  ScalesPromptLayerOption,
  getNoteNameAtFifthAbove,
  getNoteNameAtFifthBelow,
} from '../store/reducers/ConfigureDrillTypes';
import uuid from 'react-native-uuid';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export abstract class PromptLayer<T extends LayerChildItem> {
  optionType: PromptLayerOption;
  childrenChosen: Array<T>;
  promptCue: Array<T> = [];
  promptOrder: PromptOrder;
  currentPrompt: T;
  randomizeFunction: () => T;
  uniqueId: string | Uint8Array;

  constructor(
    optionType: PromptLayerOption,
    childrenChosen: Array<T>,
    promptOrder: PromptOrder,
    randomizeFunction?: () => T,
  ) {
    this.uniqueId = uuidv4();
    this.optionType = optionType;
    this.childrenChosen = childrenChosen;
    this.promptOrder = promptOrder;
    randomizeFunction
      ? (this.randomizeFunction = randomizeFunction)
      : (this.randomizeFunction = this.defaultRandomizeFunction);
    this.currentPrompt = this.randomizeFunction();
  }

  abstract advanceToNextPrompt(): T;

  protected refillPromptCue(): void {
    if (this.promptCue.length === 0) {
      if (this.promptOrder === 'random') {
        this.promptCue = shuffleArray([...this.childrenChosen]); // Ensure a copy is shuffled, not the original array.
      } else {
        this.promptCue.push(this.randomizeFunction()); // Add only one element for non-random orders.
      }
    }
  }

  protected getNextPromptFromCue(): T {
    if (this.promptCue.length === 0) {
      this.refillPromptCue();
    }
    this.currentPrompt = this.promptCue.shift()!;
    return this.currentPrompt;
  }

  protected defaultRandomizeFunction() {
    return this.childrenChosen[
      Math.floor(Math.random() * (this.childrenChosen.length - 1))
    ];
  }

  static fromOptionType(type: PromptLayerOption): PromptLayer<LayerChildItem> {
    switch (type) {
      case NoteNamePromptLayerOption: {
        return new BufferedNoteNameLayer();
      }
      case ChordQualitiesPromptLayerOption: {
        return new BufferedChordQualityLayer();
      }
      case KeysPromptLayerOption: {
        return new BufferedKeyLayer();
      }
      case ScalesPromptLayerOption: {
        return new BufferedScaleLayer();
      }
      case ModesPromptLayerOption: {
        return new BufferedModeLayer();
      }
    }
    throw Error('type did not match any known types');
  }
}

export class BufferedNoteNameLayer extends PromptLayer<NoteName> {
  constructor(
    promptOrder: PromptOrder = 'random',
    randomizeFunction?: () => NoteName,
    childrenChosen: Array<NoteName> = AllNoteNames,
  ) {
    super(
      NoteNamePromptLayerOption,
      childrenChosen,
      promptOrder,
      randomizeFunction,
    );
  }

  advanceToNextPrompt(): NoteName {
    // Process according to the order
    if (this.promptOrder === 'random') {
      return this.getNextPromptFromCue();
    } else if (this.promptOrder === 'ascending5ths') {
      const note = getNoteNameAtFifthAbove(this.currentPrompt);
      this.currentPrompt = note; // Update the current note in cue to the new value
      return note;
    } else if (this.promptOrder === 'descending5ths') {
      const note = getNoteNameAtFifthBelow(this.currentPrompt);
      this.currentPrompt = note; // Update the current note in cue to the new value
      return note;
    }

    // Fallback for any unsupported order types
    throw new Error('Unsupported order type');
  }
}

export class BufferedChordQualityLayer extends PromptLayer<ChordQuality> {
  constructor(childrenChosen: Array<ChordQuality> = AllChordQualities) {
    super(ChordQualitiesPromptLayerOption, childrenChosen, 'random');
  }
  advanceToNextPrompt(): ChordQuality {
    return this.getNextPromptFromCue()!;
  }
}

export class BufferedScaleLayer extends PromptLayer<Scale> {
  constructor(childrenChosen: Array<Scale> = AllScales) {
    super(ScalesPromptLayerOption, childrenChosen, 'random');
  }

  advanceToNextPrompt(): Scale {
    return this.getNextPromptFromCue()!;
  }
}

export class BufferedModeLayer extends PromptLayer<Mode> {
  constructor(childrenChosen: Array<Mode> = AllModes) {
    super(ModesPromptLayerOption, childrenChosen, 'random');
  }
  advanceToNextPrompt(): Mode {
    return this.getNextPromptFromCue()!;
  }
}

export class BufferedKeyLayer extends PromptLayer<Key> {
  constructor(childrenChosen: Array<Key> = AllKeys) {
    super(KeysPromptLayerOption, childrenChosen, 'random');
  }
  advanceToNextPrompt(): Key {
    return this.getNextPromptFromCue()!;
  }
}

function shuffleArray(array: any[]): any[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
