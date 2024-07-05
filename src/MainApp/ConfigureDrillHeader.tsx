import {
  ConfigureDrillState,
  setDrillName,
} from '../store/reducers/configureDrillReducer';
import {globalStyles} from '../ui/theme/styles';
import AlertIcon from '../assets/AlertIcon';
import {Themes} from '../ui/theme/Theme';
import {useAppDispatch} from '../store/hooks';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ExpandableText} from '../onboarding/ui/ExpandableText';
import {PlayDrillConfigurationButton} from './PlayDrillConfigurationButton';
import {ExpandableCompositeActionButton} from './PromptLayerList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EditIcon from '../assets/EditIcon';

export interface ConfigureDrillHeaderProps {
  state: ConfigureDrillState;
}

export const ConfigureDrillHeader: React.FC<
  ConfigureDrillHeaderProps
> = props => {
  const drill = props.state.configuration;
  const dispatch = useAppDispatch();

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {/* Drill title */}
        <View style={{alignItems: 'center', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}} />
            {props.state.titleError && (
              <AlertIcon
                size={30}
                strokeColor={Themes.dark.errorRed}
                style={{alignSelf: 'center', marginEnd: 16}}
              />
            )}
            <TextInput
              style={[styles.textInputArea, {paddingHorizontal: 16}]}
              multiline={true}
              onChangeText={newText => dispatch(setDrillName(newText))}
              placeholder="(drill name)">
              {drill.drillName}
            </TextInput>
            <View style={{flex: 1}} />
          </View>
          <ExpandableText
            error={props.state.titleError ?? ''}
            isCurrent={typeof props.state.titleError === 'string'}
            style={{alignSelf: 'center'}}
          />
        </View>
      </View>

      <View style={{height: 16}} />

      <ExpandableCompositeActionButton {...props.state} />

      <Text style={[globalStyles.title, {fontSize: 30, marginTop: 40}]}>
        design your prompt
      </Text>

      <View
        style={{
          marginVertical: 25,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.promptConfigurationSentence}>every</Text>
        <TouchableOpacity style={styles.promptConfigurationSentenceButton}>
          <Text style={[globalStyles.actionButtonText]}>
            {props.state.configuration.beatsPerPrompt}
          </Text>
          <EditIcon
            size={15}
            strokeColor={Themes.dark.actionText}
            style={{marginStart: 16}}
          />
        </TouchableOpacity>
        <Text style={[styles.promptConfigurationSentence, {marginStart: 16}]}>
          beats
        </Text>
        <Text style={[styles.promptConfigurationSentence, {marginStart: 16}]}>
          at
        </Text>
        <TouchableOpacity style={styles.promptConfigurationSentenceButton}>
          <Text style={globalStyles.actionButtonText}>
            {props.state.configuration.tempo}
          </Text>
          <EditIcon
            size={15}
            strokeColor={Themes.dark.actionText}
            style={{marginStart: 16}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promptConfigurationSentence: {
    ...globalStyles.mediumText,
    marginTop: 0,
  },
  promptConfigurationSentenceButton: {
    ...globalStyles.button,
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 10,
    marginStart: 16,
  },
  actionButtonText: {
    color: Themes.dark.actionText,
  },
  underline: {textDecorationLine: 'underline'},
  actionButtonDisabledText: {
    color: Themes.dark.disabledActionText,
  },
  largePlayButtonText: {
    color: Themes.dark.actionText,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  smallPlayButtonText: {
    color: Themes.dark.actionText,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
  textInputArea: {
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'arciform',
    borderColor: 'gray',
    borderWidth: 0, // Set general border width to 0
    borderBottomWidth: 1, // Apply border only to the bottom
    color: Themes.dark.actionText,
  },
});
