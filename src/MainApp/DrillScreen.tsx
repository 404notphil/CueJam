import {
  Image,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Animated as RawAnimated,
} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  advanceToNextPrompt,
  selectConfigureDrill,
} from '../store/reducers/configureDrillReducer';
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
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  addSessionToDB,
  loadSessionDataForTimeRange,
} from '../services/AppDatabase';

export function DrillScreen(): React.JSX.Element {
  const state = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  const drill = state.configuration;

  const [isPlaying, setIsPlaying] = useState(false);
  const pauseButton = require('../assets/pause_button.png');
  const playButton = require('../assets/play_button.png');
  const imageSource = isPlaying ? pauseButton : playButton;
  const [currentBeat, setCurrentBeat] = useState(1);
  const [totalBeatsElapsed, setTotalBeatsElapsed] = useState(0);
  const [totalPromptsElapsed, setTotalPromptsElapsed] = useState(0);

  // old prompt layers
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

  const getRandomTonalContextValue = () => {
    switch (drill.tonalContext) {
      case 'chord quality':
        return getRandomChordQuality(drill.chordQualities);
      case 'key':
        return getRandomKey(drill.keys);
      case 'mode':
        return getRandomMode(drill.modes);
      case 'scale':
        return getRandomScale(drill.scales);
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
  // end old prompt layers

  const {MetronomeModule} = NativeModules;
  const clickEventEmitter = new NativeEventEmitter(MetronomeModule);

  const [shouldShowNextPromptText, setShouldShowNextPromptText] =
    useState(false);

  const animatedFlex = useSharedValue(0);
  const handleAnimationComplete = () => {
    setShouldShowNextPromptText(true);
  };
  const [fadeAnim] = useState(new RawAnimated.Value(0));

  const animatedStyleForPreviousPrompt = useAnimatedStyle(() => {
    return {
      flex: 3 - animatedFlex.value,
    };
  });

  const animatedStyleForNextPrompt = useAnimatedStyle(() => {
    return {
      flex: animatedFlex.value,
    };
  });

  const orientation = useOrientation();

  const [playbackStartTime, setPlaybackStartTime] = useState(0);
  const [promptsSinceStartedPlayback, setPromptsSinceStartedPlayback] =
    useState(0);

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

  const addCurrentSessionToDb = () => {
    drill.drillId &&
      dispatch(
        addSessionToDB({
          drillId: drill.drillId,
          timeStarted: Date.now(),
          totalSessionTimeMillis: Date.now() - playbackStartTime,
          promptCount: promptsSinceStartedPlayback,
          millisecondsPerPrompt:
            (1000 / (drill.tempo / 60)) * drill.beatsPerPrompt,
          beatsPerPrompt: drill.beatsPerPrompt,
          tempo: drill.tempo,
        }),
      );

    setPromptsSinceStartedPlayback(0);
  };

  useEffect(() => {
    LogBox.ignoreLogs(['new NativeEventEmitter']);

    MetronomeModule.initializeMetronomeService();
    MetronomeModule.setTempo(drill.tempo);
    MetronomeModule.setBeatsPerPrompt(drill.beatsPerPrompt);

    const subscription = clickEventEmitter.addListener('ClickEvent', data => {
      setTotalBeatsElapsed(totalBeatsElapsed + 1);
      const beatData = JSON.parse(data);
      const beat = (beatData.currentBeat % drill.beatsPerPrompt) + 1;
      setCurrentBeat(beat);
      if (beat === 1) {
        console.log(
          '12345 promptsSinceStartedPlayback a -> ' +
            promptsSinceStartedPlayback,
        );
        setPromptsSinceStartedPlayback(prevValue => prevValue + 1);
        console.log('12345 math -> ' + (promptsSinceStartedPlayback + 1));
        console.log(
          '12345 promptsSinceStartedPlayback b -> ' +
            promptsSinceStartedPlayback,
        );
      }
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
      setTotalPromptsElapsed(totalPromptsElapsed + 1);
      setCurrentNote(nextNote);
      setNextNote(computeNextNoteName(nextNote));
      setCurrentTonalContextValue(nextTonalContextValue);
      setNextTonalContextValue(getRandomTonalContextValue());

      dispatch(advanceToNextPrompt());
    }
  }, [currentBeat]);

  useEffect(() => {
    animatedFlex.value = 0;
    fadeAnim.setValue(0);
    setShouldShowNextPromptText(false);
    animatedFlex.value = withTiming(3, {duration: 400}, () => {
      runOnJS(handleAnimationComplete)();
    });
  }, [totalPromptsElapsed]);

  useEffect(() => {
    if (shouldShowNextPromptText) {
      // On token change, animate the opacity
      RawAnimated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    }
  }, [shouldShowNextPromptText]);

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
          {/* Previous prompt view (only used during animation, and shows as an empty view)*/}
          <Animated.View
            style={[
              animatedStyleForPreviousPrompt,
              {
                flexDirection: 'column',
              },
            ]}>
            {/* Previous value */}
            <View style={{flex: 1, justifyContent: 'center'}}></View>
          </Animated.View>

          {/* Current prompt view*/}
          <View
            style={{
              flexDirection: 'column',
              flex: 3,
            }}>
            {/* Current value */}

            {drill.promptLayers.map(item => (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={localStyles.promptText}>
                  {item.currentPrompt}
                </Text>
              </View>
            ))}
          </View>

          {divider(orientation)}

          {/* Next prompt view*/}
          {shouldShowNextPromptText ? (
            <View
              style={{
                flexDirection: 'column',
                flex: 3,
              }}>
              {/* Current value */}

              {drill.promptLayers.map(item => (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={localStyles.promptText}>
                    {item.nextPrompt}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Animated.View
              style={[
                animatedStyleForNextPrompt,
                {
                  flexDirection: 'column',
                },
              ]}>
              {/* Previous value */}
              <View style={{flex: 1, justifyContent: 'center'}}></View>
            </Animated.View>
          )}
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
                addCurrentSessionToDb();
                setCurrentBeat(1);
              } else {
                setPlaybackStartTime(Date.now());
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
