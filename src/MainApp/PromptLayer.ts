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
  LayerTypeId,
  Mode,
  ModesPromptLayerOption,
  NoteName,
  NoteNamePromptLayerOption,
  PromptLayerOption,
  PromptOrder,
  Scale,
  ScalesPromptLayerOption,
  getCircleOf5ths,
  getNoteNameAtFifthAbove,
  getNoteNameAtFifthBelow,
} from '../store/reducers/ConfigureDrillTypes';
import uuid from 'react-native-uuid';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export abstract class PromptLayer<T extends LayerChildItem> {
  optionType: PromptLayerOption;
  // childrenChosen should have the order given to it by the client.
  childrenChosen: Array<T>;
  promptCue: Array<T> = [];
  promptOrder: PromptOrder;
  currentPrompt: T | undefined;
  nextPrompt: T | undefined;
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
    this.getNextPromptPairFromCue();

  }

  protected refillPromptCue(): void {
    if (this.promptOrder === 'random') {
      this.promptCue = shuffleArray([...this.childrenChosen]); // Ensure a copy is shuffled, not the original array.
    } else {
      this.promptCue = this.childrenChosen; // Simply use given order for the children chosen
    }
  }

  getNextPromptPairFromCue(): {first: T; second: T} {
    if (this.nextPrompt === undefined) {
      this.refillPromptCue();
      this.currentPrompt = this.promptCue.shift()!;
      this.nextPrompt = this.promptCue.shift()!;

      return {first: this.currentPrompt, second: this.nextPrompt};
    } 

    if (this.promptCue.length === 0) {
      this.refillPromptCue();
    }
    
    this.currentPrompt = this.nextPrompt;

    this.nextPrompt = this.promptCue.shift()!;

    return {first: this.currentPrompt, second: this.nextPrompt};
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

  static rehydrateLayer(layer: any): PromptLayer<any> {
    let rehydratedLayer: PromptLayer<any>;
    const id = layer.optionType.id as LayerTypeId
    switch (id) {
      case 'NOTE_NAME':
        rehydratedLayer = Object.assign(new BufferedNoteNameLayer(), layer);
        break;
      case 'CHORD_QUALITY':
        rehydratedLayer = Object.assign(new BufferedChordQualityLayer(), layer);
        break;
      case 'KEYS':
        rehydratedLayer = Object.assign(new BufferedKeyLayer(), layer);
        break;
      case 'SCALES':
        rehydratedLayer = Object.assign(new BufferedScaleLayer(), layer);
        break;
      case 'MODES':
        rehydratedLayer = Object.assign(new BufferedModeLayer(), layer);
        break;
      default:
        throw new Error('Unknown layer option type');
    }
    return rehydratedLayer;
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

  refillPromptCue(): void {
    if (this.promptOrder === 'random') {
      this.promptCue = shuffleArray([...this.childrenChosen]); // Ensure a copy is shuffled, not the original array.
    } else if (this.promptOrder === 'descending5ths') {
      this.promptCue = getCircleOf5ths(this.childrenChosen[0], false);
    } else {
      this.promptCue = this.childrenChosen; // Simply use given order for the children chosen
    }
  }
}

export class BufferedChordQualityLayer extends PromptLayer<ChordQuality> {
  constructor(childrenChosen: Array<ChordQuality> = AllChordQualities) {
    super(ChordQualitiesPromptLayerOption, childrenChosen, 'random');
  }
}

export class BufferedScaleLayer extends PromptLayer<Scale> {
  constructor(childrenChosen: Array<Scale> = AllScales) {
    super(ScalesPromptLayerOption, childrenChosen, 'random');
  }
}

export class BufferedModeLayer extends PromptLayer<Mode> {
  constructor(childrenChosen: Array<Mode> = AllModes) {
    super(ModesPromptLayerOption, childrenChosen, 'random');
  }
}

export class BufferedKeyLayer extends PromptLayer<Key> {
  constructor(childrenChosen: Array<Key> = AllKeys) {
    super(KeysPromptLayerOption, childrenChosen, 'random');
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
