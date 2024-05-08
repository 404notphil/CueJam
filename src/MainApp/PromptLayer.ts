import {
  AllChordQualities,
  AllModes,
  AllNoteNames,
  AllPromptLayerOptions,
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

interface PromptLayer<T extends LayerTypeIntersection> {
  optionType: PromptLayerOption;
  optionFilter: Array<T>;
  getNextPrompt(order: PromptOrder): T;
}

function getRandomPrompt(layer: PromptLayer<any>): string {
  return layer.optionFilter[
    Math.floor(Math.random() * layer.optionFilter.length)
  ];
}

function getNewNoteNameLayer(
  optionFilter = AllNoteNames,
): PromptLayer<NoteName> {
  return {
    optionType: PromptLayerOption.NoteNameOption,
    optionFilter,
    getNextPrompt(order: PromptOrder, currentPrompt?: any): any {
      if (order === 'random') {
        return getRandomPrompt(this);
      } else if (order === 'ascending5ths' && currentPrompt in AllNoteNames) {
        return getNoteNameAtFifthAbove(currentPrompt);
      } else if (order === 'descending5ths' && currentPrompt in AllNoteNames) {
        return getNoteNameAtFifthBelow(currentPrompt);
      }
    },
  };
}

function getNewChordQualityLayer(
  optionFilter = AllChordQualities,
): PromptLayer<ChordQuality> {
  return {
    optionType: PromptLayerOption.ChordQualitiesOption,
    optionFilter,
    getNextPrompt(order: PromptOrder): any {
      return getRandomPrompt(this);
    },
  };
}

function getNewScalesLayer(optionFilter = AllScales): PromptLayer<Scale> {
  return {
    optionType: PromptLayerOption.ScalesOption,
    optionFilter,
    getNextPrompt(order: PromptOrder): any {
      return getRandomPrompt(this);
    },
  };
}

function getNewModesLayer(optionFilter = AllModes): PromptLayer<Mode> {
  return {
    optionType: PromptLayerOption.ModesOption,
    optionFilter,
    getNextPrompt(order: PromptOrder): any {
      return getRandomPrompt(this);
    },
  };
};

const myListToReceiveInComponent = [
    getNewNoteNameLayer(),
    getNewChordQualityLayer(),
]

myListToReceiveInComponent.forEach(item => {
    //make a component (passing in item.getNextPrompt())
    item.getNextPrompt('ascending5ths')
})