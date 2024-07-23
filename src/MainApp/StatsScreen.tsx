import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {Image} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReactNode, useEffect, useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {useAppNavigation} from '../ui/App';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {TextInput} from 'react-native-paper';
import {TimeValues, calculateTimes} from '../util/TimeUtils';
import {loadSessionDataForTimeRange} from '../services/AppDatabase';

type StatsDisplayData = {
  dummyData: string;
};

export function StatsScreen(): React.JSX.Element {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const animatedFlex = useSharedValue(0);
  const [startTimes, setStartTimes] = useState<TimeValues | null>(null);
  const [statsDisplayData, setStatsDisplayData] =
    useState<StatsDisplayData | null>(null);

  useEffect(() => {
    setStartTimes(calculateTimes());
  }, []);

  useEffect(() => {
    animatedFlex.value = 0;
    animatedFlex.value = withTiming(1, {
      duration: 400,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, []);

  const [selectedTimespanOption, setSelectedTimespanOption] =
    useState<TimespanOption>('TODAY');

  useEffect(() => {
    switch (selectedTimespanOption) {
      case 'ALL_TIME':
        dispatch(loadSessionDataForTimeRange());
        break;
      default:
        break;
    }
  }, [selectedTimespanOption]);

  return (
    <Animated.View style={[globalStyles.screenContainer]}>
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

interface ClickableGroupProps {
  children: ReactNode;
  onSelected: () => void;
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

  const [itemIsClickable, setItemIsClickable] = useState(true);
  useEffect(() => {
    setItemIsClickable(!isSelected);
  }, [isSelected]);

  const ClickableGroup: React.FC<ClickableGroupProps> = ({
    children,
    onSelected,
  }) => {
    if (itemIsClickable) {
      return (
        <TouchableOpacity
          style={[styles.optionPadding]}
          onPress={() => props.onTimespanOptionSelected(props.thisOption)}>
          {children}
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={[
          globalStyles.button,
          styles.optionButtonSelected,
          styles.optionPadding,
        ]}>
        {children}
      </View>
    );
  };

  const [customTimespanConfig, setCustomTimespanConfig] = useState({
    x: 7,
    unit: 'days',
  });

  return (
    <View>
      <ClickableGroup
        onSelected={() => props.onTimespanOptionSelected(props.thisOption)}>
        <Animated.Text style={[styles.smallText, animatedFontSizeStyle]}>
          {props.text}
        </Animated.Text>
        {props.thisOption === 'CUSTOM' && isSelected && (
          <View style={{flexDirection: 'row', gap: 30}}>
            <TextInput
              style={[
                styles.textInputArea,
                globalStyles.mediumText,
                {paddingHorizontal: 16},
              ]}
              multiline={false}
              onChangeText={newText => {}}
              placeholder="7"
            />

            <Picker
              {...{
                selected: customTimespanConfig.unit,
                onSelected: newUnitValue =>
                  setCustomTimespanConfig({
                    x: customTimespanConfig.x,
                    unit: newUnitValue,
                  }),
              }}
            />
          </View>
        )}
      </ClickableGroup>
    </View>
  );
};

interface PickerProps {
  selected: string;
  onSelected: (newValue: string) => void;
}

const Picker: React.FC<PickerProps> = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={[globalStyles.mediumText]}>{props.selected}</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={value => props.onSelected(value)}
        value={{label: props.selected, value: props.selected}}
        items={[
          {label: 'days', value: 'days'},
          {label: 'weeks', value: 'weeks'},
          {label: 'months', value: 'months'},
        ]}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: Themes.dark.background,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginStart: 40,
    padding: 24,
    borderWidth: 0.5,
    borderRadius: 30,
    color: Themes.dark.background,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
    backgroundColor: Themes.dark.buttonSurface,
  },
  dropdownStyle: {
    backgroundColor: 'black',
  },
  dropdownContainerStyle: {
    backgroundColor: 'black',
  },
  dropdownPlaceholderStyle: {
    color: '#999',
  },
  dropdownLabelStyle: {
    color: '#999',
  },
  dropdownSelectedItemLabelStyle: {
    color: '#999',
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
