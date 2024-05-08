import {
  ChordQuality,
  PromptLayerOption,
  PromptOrder,
  Scale,
} from '../store/reducers/ConfigureDrillTypes';

interface PromptLayer<T extends PromptLayerOption> {
  optionType: T;
  getNextPrompt(order: PromptOrder): any;
}

const newLayer: PromptLayer<PromptLayerOption.NoteNameOption> = {
  optionType: 'CHORD_QUALITIES_TYPE',
  getNextPrompt(order: PromptOrder): any {
    const options = AllPromptLayerOptions.find(
      item => item.type === this.optionType,
    )!!.layerChildOptionsArray;
    return options[0];
  },
};
