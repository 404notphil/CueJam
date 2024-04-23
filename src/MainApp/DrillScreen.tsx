import {
  Image,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectConfigureDrill} from '../store/reducers/configureDrillReducer';
import {globalStyles} from '../ui/theme/styles';
import {useEffect, useState} from 'react';
import {
  NoteName,
  getNoteNameAtFifthAbove,
  getNoteNameAtFifthBelow,
  getRandomChordQuality,
  getRandomKey,
  getRandomMode,
  getRandomNoteName,
  getRandomScale,
} from '../store/reducers/ConfigureDrillTypes';
import {useOrientation} from '../util/useOrientation';
import {LogBox} from 'react-native';

export function DrillScreen(): React.JSX.Element {
  const drill = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  const getRandomTonalContextValue = () => {
    switch (drill.tonalContext) {
      case 'chord quality':
        return getRandomChordQuality();
      case 'key':
        return getRandomKey();
      case 'mode':
        return getRandomMode();
      case 'scale':
        return getRandomScale();
      default:
        return null;
    }
  };
  const [currentTonalContextValue, setCurrentTonalContextValue] = useState<
    string | null
  >(getRandomTonalContextValue());
  const [nextTonalContextValue, setNextTonalContextValue] = useState<
    string | null
  >(getRandomTonalContextValue());

  const [isPlaying, setIsPlaying] = useState(false);
  const pauseButton = require('../assets/pause_button.png');
  const playButton = require('../assets/play_button.png');
  const imageSource = isPlaying ? pauseButton : playButton;
  const [currentBeat, setCurrentBeat] = useState(0);

  const computeNextNoteName = (noteName: NoteName) => {
    switch (drill.promptOrder) {
      case 'random':
        return getRandomNoteName(drill.noteNames);
      case 'descending5ths':
        return getNoteNameAtFifthBelow(noteName);
      case 'ascending5ths':
        return getNoteNameAtFifthAbove(noteName);
    }
  };
  const [currentNote, setCurrentNote] = useState(
    getRandomNoteName(drill.noteNames),
  );
  const [nextNote, setNextNote] = useState(computeNextNoteName(currentNote));

  const {MetronomeModule} = NativeModules;
  const clickEventEmitter = new NativeEventEmitter(MetronomeModule);

  useEffect(() => {
    LogBox.ignoreLogs(['new NativeEventEmitter']);

    MetronomeModule.initializeMetronomeService();
    MetronomeModule.setTempo(drill.tempo);
    MetronomeModule.setBeatsPerPrompt(drill.beatsPerPrompt);

    const subscription = clickEventEmitter.addListener('ClickEvent', data => {
      const beatData = JSON.parse(data);
      const beat = (beatData.currentBeat % drill.beatsPerPrompt) + 1;
      setCurrentBeat(beat);
    });
    return () => {
      subscription.remove();
      MetronomeModule.stop();
      MetronomeModule.cleanup();
      MetronomeModule.unbindService();
    };
  }, []);

  useEffect(() => {
    if (currentBeat === 1) {
      setCurrentNote(nextNote);
      setNextNote(computeNextNoteName(nextNote));
      setCurrentTonalContextValue(nextTonalContextValue);
      setNextTonalContextValue(getRandomTonalContextValue());
    }
  }, [currentBeat]);

  const orientation = useOrientation();
  const divider = (orientationArg: 'PORTRAIT' | 'LANDSCAPE') => (
    <View
      style={
        orientationArg === 'PORTRAIT'
          ? {
              backgroundColor: 'grey',
              height: 0.3,
              marginHorizontal: 30,
              marginVertical: 10,
            }
          : {
              backgroundColor: 'grey',
              width: 1,
              marginVertical: 30,
              marginHorizontal: 10,
            }
      }
    />
  );

  return (
    // Whole screen
    <View
      style={{
        flex: 1,
        flexDirection: orientation === 'PORTRAIT' ? 'column' : 'row',
        backgroundColor: Themes.dark.background,
      }}>
      {/* Title and prompts */}
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
        }}>
        <Text
          style={[
            globalStyles.smallText,
            {marginHorizontal: 30, marginVertical: 10},
          ]}>
          {drill.drillName}
        </Text>

        {divider('PORTRAIT')}

        {/* Prompts */}
        <View
          style={{
            flexDirection: orientation === 'PORTRAIT' ? 'column' : 'row',
            flex: 1,
          }}>
          {/* Current prompt view*/}
          <View
            style={{
              flexDirection: 'column',
              flex: 3,
            }}>
            {/* Current value */}
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={localStyles.promptText}>{currentNote}</Text>
              <Text style={localStyles.promptSubtitleText}>
                {currentTonalContextValue}
              </Text>
            </View>
          </View>

          {divider(orientation)}

          {/* Next prompt view*/}
          <View
            style={{
              flexDirection: 'column',
              flex: 3,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={[localStyles.promptText, {color: 'grey'}]}>
                {nextNote}
              </Text>
              <Text style={[localStyles.promptSubtitleText, {color: 'grey'}]}>
                {nextTonalContextValue}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Controls area */}
      <View
        style={{
          flexDirection: orientation === 'PORTRAIT' ? 'column' : 'row',
          flex: 1,
        }}>
        {divider(orientation)}
        <View
          style={[
            orientation === 'PORTRAIT'
              ? {
                  height: 200,
                  flexDirection: 'row',
                }
              : {
                  width: 200,
                  flexDirection: 'column',
                },
            {
              justifyContent: 'space-around',
              alignContent: 'center',
              padding: 16,
            },
          ]}>
          <Text
            style={[
              localStyles.metronomeText,
              {width: 40, alignSelf: 'center'},
            ]}>
            {currentBeat}
          </Text>
          <Text style={[localStyles.metronomeText, {alignSelf: 'center'}]}>
            {' - '}
          </Text>
          <Text
            style={[
              localStyles.metronomeText,
              {width: 40, alignSelf: 'center'},
            ]}>
            {drill.beatsPerPrompt}
          </Text>
          <View style={{height: 100, width: 50}} />
          <TouchableOpacity
            onPress={() => {
              if (isPlaying) {
                MetronomeModule.stop();
                setCurrentBeat(1);
              } else {
                MetronomeModule.start();
              }
              setIsPlaying(!isPlaying);
            }}
            style={{alignSelf: 'center', margin: 20}}>
            <Image
              style={{
                height: 70,
                width: 70,
              }}
              source={imageSource}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  promptText: {
    ...globalStyles.title,
    fontSize: 80,
    textAlign: 'center',
  },
  promptSubtitleText: {
    ...globalStyles.title,
    fontSize: 35,
    textAlign: 'center',
  },
  metronomeText: {
    ...globalStyles.title,
    textAlign: 'center',
    fontSize: 60,
    color: Themes.dark.errorYellowText,
    marginTop: 0,
  },
});
