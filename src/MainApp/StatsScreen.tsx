import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
} from 'react-native';
import {Image} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {useAppNavigation} from '../ui/App';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {TextInput} from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import {
  TimeValues,
  calculateTimes,
  formatDurationInMillis,
} from '../util/TimeUtils';
import {loadSessionDataForTimeRange} from '../services/AppDatabase';
import {
  DrillStat,
  DrillStats,
  selectConfigureDrill,
} from '../store/reducers/configureDrillReducer';
import {ScrollView} from 'react-native-gesture-handler';

export function StatsScreen(): React.JSX.Element {
  const navigation = useAppNavigation();
  const state = useAppSelector(selectConfigureDrill);
  const dispatch = useAppDispatch();
  const [useTestData, setUseTestData] = useState(false);

  const toggleTestData = () => {
    const useTest = useTestData;
    setUseTestData(!useTest);
  };

  const [selectedTimespanOption, setSelectedTimespanOption] =
    useState<TimespanOption>('TODAY');

  useEffect(() => {
    const {
      currentMoment,
      beginningOfToday,
      beginningOfMonth,
      beginningOfWeek,
      beginningOfYear,
      sevenDaysAgo,
      thirtyDaysAgo,
    } = calculateTimes();
    switch (selectedTimespanOption) {
      case 'TODAY':
        dispatch(
          loadSessionDataForTimeRange({timeRangeStart: beginningOfToday}),
        );
        break;
      case 'THIS_WEEK':
        dispatch(
          loadSessionDataForTimeRange({timeRangeStart: beginningOfWeek}),
        );
        break;
      case 'THIS_MONTH':
        dispatch(
          loadSessionDataForTimeRange({timeRangeStart: beginningOfMonth}),
        );
        break;
      case 'THIS_YEAR':
        dispatch(
          loadSessionDataForTimeRange({timeRangeStart: beginningOfYear}),
        );
        break;
      case 'LAST_7_DAYS':
        dispatch(loadSessionDataForTimeRange({timeRangeStart: sevenDaysAgo}));
        break;
      case 'LAST_30_DAYS':
        dispatch(loadSessionDataForTimeRange({timeRangeStart: thirtyDaysAgo}));
        break;
      case 'ALL_TIME':
        dispatch(loadSessionDataForTimeRange());
        break;
      default:
        dispatch(loadSessionDataForTimeRange());
        break;
    }
  }, [selectedTimespanOption]);

  const [stats, setStats] = useState(state.stats);

  useEffect(() => {
    if (useTestData) {
      setSelectedTimespanOption('ALL_TIME');
      const perDrill = [
        {drillName: 'rhythm changes at fast tempo', totalTime: 211222379},
        {drillName: 'rhythm changes at slow tempo', totalTime: 231222379},
        {drillName: 'drop 2 voicings', totalTime: 221122379},
        {drillName: 'all the things you are', totalTime: 23445439},
        {drillName: 'drop 3 voicings', totalTime: 22445439},
        {drillName: 'shearing voicings', totalTime: 27745439},
        {drillName: 'block chords mixolydian', totalTime: 25445439},
        {drillName: 'block chords -7b5', totalTime: 24475439},
        {drillName: 'block chords melodic minor', totalTime: 24475439},
        {drillName: 'block chords harmonic minor', totalTime: 22447439},
        {drillName: 'block chords dorian', totalTime: 26445439},
        {drillName: 'pentatonic scales', totalTime: 21445439},
        {drillName: 'pentatonic voicings', totalTime: 2299379},
        {drillName: 'double stops slow with pedal', totalTime: 2365379},
        {drillName: 'double stops fast, 2 hands', totalTime: 2365379},
        {drillName: 'diatonic fixed shape stepwise', totalTime: 8265379},
        {drillName: 'block chords ionian', totalTime: 273379},
      ].sort((a, b) => b.totalTime - a.totalTime);
      const total = perDrill.reduce((acc, current) => {
        return acc + current.totalTime;
      }, 0);
      setStats({
        totalAllDrills: total,
        perDrill: perDrill,
      });
    } else {
      setStats(state.stats);
    }
  }, [selectedTimespanOption, useTestData, state.stats]);

  return (
    <View style={globalStyles.screenContainerScrollable}>
      <TouchableOpacity
        style={[globalStyles.button]}
        onPress={() => toggleTestData()}>
        <Text
          style={
            useTestData ? globalStyles.actionButtonText : globalStyles.infoText
          }>
          {useTestData
            ? 'Using test data (tap to change)'
            : 'Using real data (tap to change)'}
        </Text>
      </TouchableOpacity>

      {/* Timespan options */}
      <TimespanOptions
        selectedTimespanOption={selectedTimespanOption}
        setSelectedTimespanOption={setSelectedTimespanOption}
      />

      <MainContent {...stats} />

      {/* Empty state */}
      {stats.totalAllDrills === 0 && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={globalStyles.title}>no stats yet!</Text>
        </View>
      )}
    </View>
  );
}

const MainContent: React.FC<DrillStats> = props => {
  const renderItem = ({item}: {item: DrillStat}) => <EachDrill {...item} />;

  const keyExtractor = (item: DrillStat) => uuidv4();

  return (
    <View style={{flex: 1}}>
      {/* Total time display */}
      {props.totalAllDrills !== 0 && (
        <View style={{flex: 1}}>
          <TotalTimeDisplay
            drillName={'all drills'}
            totalTime={props.totalAllDrills ?? 0}
          />
          <FlatList
            scrollEnabled={true}
            data={props.perDrill}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={{paddingHorizontal: 24}}
          />
        </View>
      )}
    </View>
  );
};

interface TimeSpanOptionsProps {
  selectedTimespanOption: TimespanOption;
  setSelectedTimespanOption: Dispatch<SetStateAction<TimespanOption>>;
}

const TimespanOptions: React.FC<TimeSpanOptionsProps> = props => (
  <View style={{paddingHorizontal: 24}}>
    <Text style={[globalStyles.fieldHeader, {marginBottom: 10}]}>
      Show me stats from
    </Text>
    {/* "today", "this week", "this month", "this year" */}
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TimespanOptionButton
        text={'today'}
        thisOption="TODAY"
        currentOptionSelected={props.selectedTimespanOption}
        onTimespanOptionSelected={props.setSelectedTimespanOption}
      />
      <TimespanOptionButton
        text={'this week'}
        thisOption="THIS_WEEK"
        currentOptionSelected={props.selectedTimespanOption}
        onTimespanOptionSelected={props.setSelectedTimespanOption}
      />
      <TimespanOptionButton
        text={'this month'}
        thisOption="THIS_MONTH"
        currentOptionSelected={props.selectedTimespanOption}
        onTimespanOptionSelected={props.setSelectedTimespanOption}
      />
      <TimespanOptionButton
        text={'this year'}
        thisOption="THIS_YEAR"
        currentOptionSelected={props.selectedTimespanOption}
        onTimespanOptionSelected={props.setSelectedTimespanOption}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TimespanOptionButton
        text={'last 7 days'}
        thisOption="LAST_7_DAYS"
        currentOptionSelected={props.selectedTimespanOption}
        onTimespanOptionSelected={props.setSelectedTimespanOption}
      />
      <TimespanOptionButton
        text={'last 30 days'}
        thisOption="LAST_30_DAYS"
        currentOptionSelected={props.selectedTimespanOption}
        onTimespanOptionSelected={props.setSelectedTimespanOption}
      />
      <TimespanOptionButton
        text={'all time'}
        thisOption="ALL_TIME"
        currentOptionSelected={props.selectedTimespanOption}
        onTimespanOptionSelected={props.setSelectedTimespanOption}
      />
    </View>

    <TimespanOptionButton
      text={'custom time span'}
      thisOption="CUSTOM"
      currentOptionSelected={props.selectedTimespanOption}
      onTimespanOptionSelected={props.setSelectedTimespanOption}
    />
  </View>
);

const TotalTimeDisplay: React.FC<DrillStat> = props => (
  <View
    style={{
      marginTop: 50,
      marginBottom: 30,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    }}>
    <Text style={[globalStyles.infoText, {fontSize: 25}]}>all drills</Text>
    <View
      style={{
        height: 1,
        width: 50,
        flex: 1,
        backgroundColor: Themes.dark.infoText,
      }}
    />
    <Text style={[globalStyles.actionButtonText, {fontSize: 25}]}>
      {formatDurationInMillis(props.totalTime)}
    </Text>
  </View>
);

const EachDrill: React.FC<DrillStat> = props => (
  <View
    style={{
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <Text
      style={[globalStyles.infoText, {fontSize: 20, flexShrink: 1}]}
      numberOfLines={1}
      ellipsizeMode="tail">
      {props.drillName}
    </Text>
    <View
      style={{
        height: 1,
        flex: 1,
        marginHorizontal: 10, // Use margin instead of gap
        backgroundColor: Themes.dark.infoText,
      }}
    />
    <Text
      style={[globalStyles.actionButtonText, {fontSize: 20}]}
      numberOfLines={1}>
      {formatDurationInMillis(props.totalTime)}
    </Text>
  </View>
);

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

  const [itemIsClickable, setItemIsClickable] = useState(true);
  useEffect(() => {
    setItemIsClickable(!isSelected);
  }, [isSelected]);

  const [customTimespanConfig, setCustomTimespanConfig] = useState({
    x: 7,
    unit: 'days',
  });

  return (
    <View>
      <ClickableGroup
        onSelected={() => props.onTimespanOptionSelected(props.thisOption)}
        itemIsClickable={itemIsClickable}>
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
              keyboardType="numeric"
              multiline={true}
              onChangeText={newText => {
                setCustomTimespanConfig({
                  ...customTimespanConfig,
                  x: parseInt(newText.replace(/[^0-9]/g, '')),
                });
              }}
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

interface ClickableGroupProps {
  children: ReactNode;
  itemIsClickable: boolean;
  onSelected: () => void;
}

const ClickableGroup: React.FC<ClickableGroupProps> = ({
  children,
  itemIsClickable,
  onSelected,
}) => {
  if (itemIsClickable) {
    console.log('12345 item IS clickable');
    return (
      <TouchableOpacity style={[styles.optionPadding]} onPress={onSelected}>
        {children}
      </TouchableOpacity>
    );
  }

  console.log('12345 item is not clickable');

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
