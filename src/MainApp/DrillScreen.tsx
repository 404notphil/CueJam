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
import {Divider} from 'react-native-paper';
import {useEffect} from 'react';

export function DrillScreen(): React.JSX.Element {
  const drill = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();

  const {MetronomeModule} = NativeModules;
  // MetronomeModule.setTempo(100);
  // MetronomeModule.stop();
  // MetronomeModule.start();
  // MetronomeModule.loadSoundIntoByteArray();
  MetronomeModule.triggerEvent();
  const exampleEventEmitter = new NativeEventEmitter(MetronomeModule);
  const subscription = exampleEventEmitter.addListener('EventName', data => {
    console.log('Event received', data);
  });

  useEffect(() => {
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Themes.dark.background,
      }}>
      <View style={{flex: 3}}>
        <Text
          style={[
            globalStyles.smallText,
            {marginHorizontal: 30, marginVertical: 10},
          ]}>
          {drill.drillName}
        </Text>

        <Divider style={{backgroundColor: 'white', marginHorizontal: 30}} />
        <Text style={localStyles.promptText}>Gb</Text>
        <Text style={localStyles.promptSubtitleText}>Maj7</Text>
      </View>

      <View style={{flex: 3}}>
        <Divider style={{backgroundColor: 'white', marginHorizontal: 30}} />
        <Text style={[localStyles.promptText, {color: 'grey'}]}>C</Text>
        <Text style={[localStyles.promptSubtitleText, {color: 'grey'}]}>
          m7B5
        </Text>
      </View>

      <View>
        <Divider style={{backgroundColor: 'white', marginHorizontal: 30}} />
        <View
          style={{
            height: 200,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={{alignSelf: 'center', margin: 20}}>
            <Image
              style={{
                height: 70,
                width: 70,
              }}
              source={require('../assets/play_button.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[localStyles.metronomeText, {alignSelf: 'center'}]}>
            1 - 4
          </Text>
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
    marginTop: 70,
  },
  promptSubtitleText: {
    ...globalStyles.title,
    fontSize: 50,
    textAlign: 'center',
  },
  metronomeText: {
    ...globalStyles.title,
    fontSize: 60,
    color: Themes.dark.errorYellowText,
    marginTop: 0,
  },
});
