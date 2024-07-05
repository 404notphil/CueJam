import {
  BufferedChordQualityLayer,
  BufferedModeLayer,
  BufferedNoteNameLayer,
  BufferedScaleLayer,
} from '../../MainApp/PromptLayer';
import {PromptLayerOption} from './ConfigureDrillTypes';
import configureDrillReducer, {
  advanceToNextPrompt,
  initialState,
  setPromptLayers,
} from './configureDrillReducer';

describe('configureDrillReducer', () => {
  it('should have two Prompt Layers in it after adding two', () => {
    const startState = initialState;
    const action = setPromptLayers;
    expect(
      configureDrillReducer(
        startState,
        action([new BufferedNoteNameLayer(), new BufferedChordQualityLayer()]),
      ).promptLayers.length,
    ).toEqual(2);
  });

  it('should have three Prompt Layers in it after adding three, with a duplicate', () => {
    const startState = initialState;
    const action = setPromptLayers;
    expect(
      configureDrillReducer(
        startState,
        action([
          new BufferedNoteNameLayer(),
          new BufferedChordQualityLayer(),
          new BufferedNoteNameLayer(),
        ]),
      ).promptLayers.length,
    ).toEqual(3);
  });

  it('random should complete set of notes', () => {
    let result;
    let results = [];
    const startingState = {
      ...initialState,
      promptLayers: [new BufferedNoteNameLayer('random')],
    };
    const amountOfItems = startingState.promptLayers[0].childrenChosen.length;
    for (let i = 0; i < amountOfItems; i++) {
      result = configureDrillReducer(startingState, advanceToNextPrompt());
      results.push(result?.promptLayers[0].currentPrompt);
    }

    expect(new Set(results).size).toEqual(amountOfItems);
  });

  it('random should complete set of scales', () => {
    let result;
    let results = [];
    const startingState = {
      ...initialState,
      promptLayers: [new BufferedScaleLayer()],
    };
    const amountOfItems = startingState.promptLayers[0].childrenChosen.length;
    for (let i = 0; i < amountOfItems; i++) {
      result = configureDrillReducer(startingState, advanceToNextPrompt());
      results.push(result?.promptLayers[0].currentPrompt);
    }

    expect(new Set(results).size).toEqual(amountOfItems);
  });

  it('random should complete set of chord qualities', () => {
    let result;
    let results = [];
    const startingState = {
      ...initialState,
      promptLayers: [new BufferedChordQualityLayer()],
    };
    const amountOfItems = startingState.promptLayers[0].childrenChosen.length;
    for (let i = 0; i < amountOfItems; i++) {
      result = configureDrillReducer(startingState, advanceToNextPrompt());
      results.push(result?.promptLayers[0].currentPrompt);
    }

    expect(new Set(results).size).toEqual(amountOfItems);
  });

  it('random should complete set of modes', () => {
    let result;
    let results = [];
    const startingState = {
      ...initialState,
      promptLayers: [new BufferedModeLayer()],
    };
    const amountOfItems = startingState.promptLayers[0].childrenChosen.length;
    for (let i = 0; i < amountOfItems; i++) {
      result = configureDrillReducer(startingState, advanceToNextPrompt());
      results.push(result?.promptLayers[0].currentPrompt);
    }

    expect(new Set(results).size).toEqual(amountOfItems);
  });
});
