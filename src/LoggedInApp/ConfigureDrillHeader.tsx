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
import {PlayDrillConfigurationButton} from '../MainApp/PlayDrillConfigurationButton';
import {ExpandableCompositeActionButton} from '../MainApp/PromptLayerList';

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
          <Text style={globalStyles.fieldHeader}>Title</Text>
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

        {/* Play button */}
        <PlayDrillConfigurationButton {...{configurationState: props.state}} />
      </View>

      <View style={{height: 16}} />

      <ExpandableCompositeActionButton {...props.state} />

      <Text style={[globalStyles.title, {fontSize: 30, marginTop: 40}]}>
        design your prompt
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
        <AlertIcon size={20} strokeColor={Themes.dark.infoText} />
        <Text
          style={[
            globalStyles.buttonText,
            styles.underline,
            {marginStart: 15, color: Themes.dark.infoText},
          ]}>
          See preview
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'arciform',
    borderColor: 'gray',
    borderWidth: 0, // Set general border width to 0
    borderBottomWidth: 1, // Apply border only to the bottom
    color: Themes.dark.actionText,
  },
});
