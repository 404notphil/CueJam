import {
  AllChordQualities,
  AllModes,
  AllNoteNames,
  AllScales,
  ChordQualitiesPromptLayerOption,
  ChordQuality,
  LayerType,
  Mode,
  NoteName,
  NoteNamePromptLayerOption,
  PromptLayerOption,
  PromptOrder,
  Scale,
  ScalesPromptLayerOption,
  getNoteNameAtFifthAbove,
  getNoteNameAtFifthBelow,
} from '../store/reducers/ConfigureDrillTypes';

export abstract class PromptLayer<T extends LayerType> {
  optionType: PromptLayerOption;
  childrenChosen: Array<T>;
  promptCue: Array<T> = [];
  promptOrder: PromptOrder;
  currentPrompt: T;
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
      console.log("12345 if (this.promptOrder === 'random'");
      return this.getNextPromptFromCue();
    } else if (this.promptOrder === 'ascending5ths') {
      console.log('12345 previous note = ' + this.currentPrompt);
      console.log("12345 if (this.promptOrder === 'ascending 5ths'");
      const note = getNoteNameAtFifthAbove(this.currentPrompt);
      console.log('12345 new note = ' + note);
      this.currentPrompt = note; // Update the current note in cue to the new value
      return note;
    } else if (this.promptOrder === 'descending5ths') {
      console.log("12345 if (this.promptOrder === 'descending5ths 5ths'");
      const note = getNoteNameAtFifthBelow(this.currentPrompt);
      this.currentPrompt = note; // Update the current note in cue to the new value
      return note;
    }
    console.log("12345 if (this.promptOrder === 'other'");

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
    super(ScalesPromptLayerOption, childrenChosen, 'random');
  }
  advanceToNextPrompt(): Mode {
    return this.getNextPromptFromCue()!;
  }
}

function getRandomPrompt(layer: PromptLayer<any>): string {
  return layer.childrenChosen[
    Math.floor(Math.random() * layer.childrenChosen.length)
  ];
}

function shuffleArray(array: any[]): any[] {
  console.log('12345 shuffled');
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
