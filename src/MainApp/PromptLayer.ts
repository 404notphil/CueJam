import {
  AllChordQualities,
  AllModes,
  AllNoteNames,
  AllScales,
  ChordQuality,
  LayerTypeIntersection,
  Mode,
  NoteName,
  PromptLayerOption,
  PromptOrder,
  Scale,
  getNoteNameAtFifthAbove,
  getNoteNameAtFifthBelow,
} from '../store/reducers/ConfigureDrillTypes';

export interface PromptLayer<T extends LayerTypeIntersection> {
  optionType: PromptLayerOption;
  childrenChosen: Array<T>;
  promptOrder: PromptOrder;
  advanceToNextPrompt(order: PromptOrder): T;
}

abstract class BufferedLayerBase<T extends LayerTypeIntersection>
  implements PromptLayer<T>
{
  optionType: PromptLayerOption;
  childrenChosen: Array<T>;
  promptCue: Array<T> = [];
  promptOrder: PromptOrder;
  randomizeFunction: () => T;

  constructor(
    optionType: PromptLayerOption,
    childrenChosen: Array<T>,
    promptOrder: PromptOrder,
    randomizeFunction?: () => T,
  ) {
    this.optionType = optionType;
    this.childrenChosen = childrenChosen;
    this.promptOrder = promptOrder;
    randomizeFunction
      ? (this.randomizeFunction = randomizeFunction)
      : (this.randomizeFunction = this.defaultRandomizeFunction);
  }

  abstract advanceToNextPrompt(order: PromptOrder): T;

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
    return this.promptCue.shift()!;
  }

  protected defaultRandomizeFunction() {
    return this.childrenChosen[
      Math.floor(Math.random() * (this.childrenChosen.length - 1))
    ];
  }
}

export class BufferedNoteNameLayer extends BufferedLayerBase<NoteName> {
  constructor(
    promptOrder: PromptOrder = 'random',
    randomizeFunction?: () => NoteName,
    childrenChosen: Array<NoteName> = AllNoteNames,
  ) {
    super(
      PromptLayerOption.NoteNameOption,
      childrenChosen,
      promptOrder,
      randomizeFunction,
    );
  }

  advanceToNextPrompt(order: PromptOrder): NoteName {
    this.getNextPromptFromCue();

    // Process according to the order
    if (order === 'random') {
      return this.getNextPromptFromCue();
    } else if (order === 'ascending5ths') {
      const note = getNoteNameAtFifthAbove(this.promptCue[0]);
      this.promptCue[0] = note; // Update the current note in cue to the new value
      return note;
    } else if (order === 'descending5ths') {
      const note = getNoteNameAtFifthBelow(this.promptCue[0]);
      this.promptCue[0] = note; // Update the current note in cue to the new value
      return note;
    }

    // Fallback for any unsupported order types
    throw new Error('Unsupported order type');
  }
}

export class BufferedChordQualityLayer extends BufferedLayerBase<ChordQuality> {
  constructor(childrenChosen: Array<ChordQuality> = AllChordQualities) {
    super(PromptLayerOption.ChordQualitiesOption, childrenChosen, 'random');
  }
  advanceToNextPrompt(order: PromptOrder): ChordQuality {
    return this.getNextPromptFromCue()!;
  }
}

export class BufferedScaleLayer extends BufferedLayerBase<Scale> {
  constructor(childrenChosen: Array<Scale> = AllScales) {
    super(PromptLayerOption.ScalesOption, childrenChosen, 'random');
  }

  advanceToNextPrompt(order: PromptOrder): Scale {
    return this.getNextPromptFromCue()!;
  }
}

export class BufferedModeLayer extends BufferedLayerBase<Mode> {
  constructor(childrenChosen: Array<Mode> = AllModes) {
    super(PromptLayerOption.ScalesOption, childrenChosen, 'random');
  }
  advanceToNextPrompt(order: PromptOrder): Mode {
    return this.getNextPromptFromCue()!;
  }
}

function getRandomPrompt(layer: PromptLayer<any>): string {
  return layer.childrenChosen[
    Math.floor(Math.random() * layer.childrenChosen.length)
  ];
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
