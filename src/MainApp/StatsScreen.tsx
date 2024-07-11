import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {Image} from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {clearDrill} from '../store/reducers/configureDrillReducer';
import {useAppNavigation} from '../ui/App';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {TextInput} from 'react-native-paper';

export function StatsScreen(): React.JSX.Element {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const animatedOpacity = useSharedValue(0);
  const animatedFlex = useSharedValue(0);

  useEffect(() => {
    animatedOpacity.value = 0;
    animatedFlex.value = 0;
    animatedOpacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
    animatedFlex.value = withTiming(1, {
      duration: 400,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, []);
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      flex: animatedFlex.value,
    };
  });

  const [selectedTimespanOption, setSelectedTimespanOption] =
    useState<TimespanOption>('TODAY');

  return (
    <Animated.View style={[globalStyles.screenContainer, animatedOpacityStyle]}>
      <View>
        <Text style={[globalStyles.fieldHeader, {marginBottom: 10}]}>
          Show me stats from
        </Text>
        {/* "today", "this week", "this month", "this year" */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TimespanOptionButton
            text={'today'}
            thisOption="TODAY"
            currentOptionSelected={selectedTimespanOption}
            onTimespanOptionSelected={setSelectedTimespanOption}
          />
          <TimespanOptionButton
            text={'this week'}
            thisOption="THIS_WEEK"
            currentOptionSelected={selectedTimespanOption}
            onTimespanOptionSelected={setSelectedTimespanOption}
          />
          <TimespanOptionButton
            text={'this month'}
            thisOption="THIS_MONTH"
            currentOptionSelected={selectedTimespanOption}
            onTimespanOptionSelected={setSelectedTimespanOption}
          />
          <TimespanOptionButton
            text={'this year'}
            thisOption="THIS_YEAR"
            currentOptionSelected={selectedTimespanOption}
            onTimespanOptionSelected={setSelectedTimespanOption}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TimespanOptionButton
            text={'last 7 days'}
            thisOption="LAST_7_DAYS"
            currentOptionSelected={selectedTimespanOption}
            onTimespanOptionSelected={setSelectedTimespanOption}
          />
          <TimespanOptionButton
            text={'last 30 days'}
            thisOption="LAST_30_DAYS"
            currentOptionSelected={selectedTimespanOption}
            onTimespanOptionSelected={setSelectedTimespanOption}
          />
          <TimespanOptionButton
            text={'all time'}
            thisOption="ALL_TIME"
            currentOptionSelected={selectedTimespanOption}
            onTimespanOptionSelected={setSelectedTimespanOption}
          />
        </View>

        <TimespanOptionButton
          text={'custom time span'}
          thisOption="CUSTOM"
          currentOptionSelected={selectedTimespanOption}
          onTimespanOptionSelected={setSelectedTimespanOption}
        />

        {/* Total time */}
        <View
          style={{
            marginTop: 50,
            marginBottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text style={[globalStyles.infoText, {fontSize: 25}]}>
            all drills
          </Text>
          <View
            style={{
              height: 1,
              width: 50,
              flex: 1,
              backgroundColor: Themes.dark.infoText,
            }}
          />
          <Text style={[globalStyles.infoText, {fontSize: 25}]}>
            2hrs 58min
          </Text>
        </View>
      </View>

      {/* Each item */}
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <Text style={[globalStyles.infoText, {fontSize: 20}]}>First drill</Text>
        <View
          style={{
            height: 1,
            width: 50,
            flex: 1,
            backgroundColor: Themes.dark.infoText,
          }}
        />
        <Text style={[globalStyles.infoText, {fontSize: 20}]}>36min</Text>
      </View>
    </Animated.View>
  );
}
interface TimespanOptionButtonProps {
  text: string;
  currentOptionSelected: TimespanOption;
  thisOption: TimespanOption;
  onTimespanOptionSelected: (option: TimespanOption) => void;
}

const TimespanOptionButton: React.FC<TimespanOptionButtonProps> = props => {
  const animatedFontSize = useSharedValue(16);
  const selectedFontSize = 20;
  const unselectedFontSize = 16;
  const isSelected = props.thisOption === props.currentOptionSelected;

  useEffect(() => {
    animatedFontSize.value = withTiming(
      isSelected ? selectedFontSize : unselectedFontSize,
      {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      },
    );
  }, [props.currentOptionSelected]);

  const animatedFontSizeStyle = useAnimatedStyle(() => {
    return {
      fontSize: animatedFontSize.value,
    };
  });

  return (
    <Animated.View>
      <TouchableOpacity
        style={[
          styles.optionPadding,
          isSelected ? [styles.optionButtonSelected] : {},
        ]}
        onPress={() => props.onTimespanOptionSelected(props.thisOption)}>
        <Animated.Text style={[styles.smallText, animatedFontSizeStyle]}>
          {props.text}
        </Animated.Text>
        {props.thisOption === 'CUSTOM' && (
          <View style={{flexDirection: 'row'}}>
            {props.currentOptionSelected === 'CUSTOM' && (
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={[styles.textInputArea, {paddingHorizontal: 16}]}
                  multiline={false}
                  onChangeText={newText => {}}
                  placeholder="7"></TextInput>
                <TextInput
                  style={[styles.textInputArea, {paddingHorizontal: 16}]}
                  multiline={false}
                  onChangeText={newText => {}}
                  placeholder="days"></TextInput>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  smallText: {
    fontSize: 16,
    color: Themes.dark.lightText,
    fontWeight: '400',
    fontFamily: 'arciform',
  },
  optionPadding: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  optionButtonSelected: {
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: Themes.dark.actionText,
  },
  textInputArea: {
    backgroundColor: '#00000000',
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'arciform',
    borderColor: 'gray',
    borderWidth: 0, // Set general border width to 0
    borderBottomWidth: 1, // Apply border only to the bottom
    color: Themes.dark.actionText,
  },
});

type TimespanOption =
  | 'TODAY'
  | 'THIS_WEEK'
  | 'THIS_MONTH'
  | 'THIS_YEAR'
  | 'LAST_7_DAYS'
  | 'LAST_30_DAYS'
  | 'ALL_TIME'
  | 'CUSTOM';
