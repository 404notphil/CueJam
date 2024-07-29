import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import DragIcon from '../assets/DragIcon';
import {globalStyles} from '../ui/theme/styles';
import {Themes} from '../ui/theme/Theme';
import {DownIcon, UpIcon} from '../assets/UpIcon';
import {
  ConfigureDrillState,
  drillNameEmptyError,
  setPromptLayers,
} from '../store/reducers/configureDrillReducer';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useAppDispatch} from '../store/hooks';
import {useAppNavigation} from '../ui/App';
import {
  deleteDrillById,
  saveAndLoadCopy,
  saveDrill,
} from '../services/AppDatabase';
import SaveIcon from '../assets/SaveIcon';
import AnimatedDivider from './AnimatedDivider';
import CopyIcon from '../assets/CopyIcon';
import DeleteIcon from '../assets/DeleteIcon';
import AlertIcon from '../assets/AlertIcon';
import {ConfigureDrillHeader} from './ConfigureDrillHeader';
import {
  BufferedNoteNameLayer,
  PromptLayer,
} from './PromptLayer';
import {
  LayerChildItem,
  NoteNamePromptLayerOption,
} from '../store/reducers/ConfigureDrillTypes';
import EditIcon from '../assets/EditIcon';
import PlayIcon from '../assets/PlayIcon';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

interface PromptLayerListProps {
  state: ConfigureDrillState;
  onPressAddNewLayer: () => void;
  onPressPromptLayerType: (promptLayer: PromptLayer<LayerChildItem>) => void;
  onPressPromptLayerChildren: (
    promptLayer: PromptLayer<LayerChildItem>,
  ) => void;
  onPressToEditBeatsPerPrompt: () => void;
  onPressToEditTempo: () => void;
}

export const PromptLayerList: React.FC<PromptLayerListProps> = props => {
  const promptLayers = props.state.configuration.promptLayers;
  const dispatch = useAppDispatch();
  const [dragIsActive, setDragIsActive] = useState(false);

  function moveItemInList(
    layer: PromptLayer<LayerChildItem>,
    down: boolean = true,
  ) {
    const newArray = [...promptLayers];
    const oldIndex = promptLayers.indexOf(layer);
    const arraySize = promptLayers.length;
    const [element] = newArray.splice(oldIndex, 1);
    newArray.splice(
      oldIndex === arraySize ? oldIndex : oldIndex + (down ? 1 : -1),
      0,
      element,
    );
    dispatch(setPromptLayers(newArray));
  }

  const renderItem = (
    {item, drag, isActive}: RenderItemParams<PromptLayer<LayerChildItem>>,
    index: number,
  ) => {
    return (
      <ScaleDecorator>
        <View>
          <Text style={globalStyles.mediumText}>
            {index === 0 ? '...show me a' : 'and a'}
          </Text>
          <View
            style={[
              globalStyles.shadowStyle,
              globalStyles.listItemBackground,
              {
                flexDirection: 'row',
                borderRadius: 5,
                marginVertical: 15,
                alignItems: 'center',
              },
            ]}>
            <View style={{flex: 2}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => props.onPressPromptLayerType(item)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      globalStyles.mediumText,
                      styles.actionButtonText,
                      styles.underline,
                      {marginStart: 16},
                    ]}>
                    {item.optionType.itemDisplayName}
                  </Text>
                  <EditIcon size={12} style={{marginStart: 10}} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.layerButton, {margin: 10}]}
              onPress={() => {
                dispatch(
                  setPromptLayers(promptLayers.filter(layer => layer !== item)),
                );
              }}>
              <DeleteIcon />
            </TouchableOpacity>

            <View style={styles.sortButtonDivider} />

            <TouchableOpacity
              onPressIn={() => {
                setDragIsActive(true);
                drag();
              }}
              onPressOut={() => setDragIsActive(false)}
              disabled={isActive && !dragIsActive}
              style={styles.layerButton}>
              <DragIcon
                fillColor={Themes.dark.actionText}
                style={styles.sortButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <View>
      <DraggableFlatList
        keyboardShouldPersistTaps={true}
        data={promptLayers}
        scrollEnabled={true}
        keyExtractor={item => item.uniqueId.toString()}
        renderItem={item => renderItem(item, promptLayers.indexOf(item.item))}
        onDragEnd={({data}) => {
          setDragIsActive(false);
          dispatch(setPromptLayers(data));
        }}
        ListHeaderComponent={
          <ConfigureDrillHeader
            state={props.state}
            onPressToEditBeatsPerPrompt={props.onPressToEditBeatsPerPrompt}
            onPressToEditTempo={props.onPressToEditTempo}
          />
        }
        ListFooterComponent={
          <TouchableOpacity onPress={() => props.onPressAddNewLayer()}>
            <Text
              style={[
                globalStyles.actionButtonText,
                {fontSize: 20, marginBottom: 40, marginTop: 16},
              ]}>
              + Add more to prompt
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export const ExpandableCompositeActionButton: React.FC<
  ConfigureDrillState
> = props => {
  const [saveButtonVisible, setSaveButtonVisible] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState('');
  const [deleteDrillButtonVisible, setDeleteDrillButtonVisible] =
    useState(false);
  const [copyDrillButtonVisible, setCopyDrillButtonVisible] = useState(false);
  const [foundSimilarDrillButtonVisible, setFoundSimilarDrillButtonVisible] =
    useState(false);
  useEffect(() => {
    setSaveButtonVisible(props.saveDrillButtonState.visible);
    props.saveDrillButtonState.text &&
      setSaveButtonText(props.saveDrillButtonState.text);
    setDeleteDrillButtonVisible(props.deleteDrillButtonVisible);
    setCopyDrillButtonVisible(props.copyDrillButtonVisible);
    setFoundSimilarDrillButtonVisible(props.foundSimilarDrillButtonVisible);
  }, [
    props.saveDrillButtonState,
    props.hasBeenSavedOnceOrMore,
    props.deleteDrillButtonVisible,
    props.copyDrillButtonVisible,
    props.foundSimilarDrillButtonVisible,
  ]);

  const playButtonAnimatedOpacity = useSharedValue(1);
  useEffect(() => {
    playButtonAnimatedOpacity.value = withRepeat(
      withTiming(0.5, {duration: 1000, easing: Easing.linear}),
      -1, // Repeat infinitely
      true, // Reverse the animation on every iteration
    );
  }, []);

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: playButtonAnimatedOpacity.value,
    };
  });

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const animatedOpactiy = useSharedValue(0);

  useEffect(() => {
    animatedOpactiy.value = 0;
    animatedOpactiy.value = withSequence(withTiming(0.01), withTiming(1));
  }, [
    props.copyDrillButtonVisible,
    props.deleteDrillButtonVisible,
    props.foundSimilarDrillButtonVisible,
    props.saveDrillButtonState,
  ]);

  return (
    <View
      style={[
        globalStyles.button,
        {paddingHorizontal: 30, paddingVertical: 0},
      ]}>
      <Animated.View style={animatedOpacityStyle}>
        <ExpandingActionButton
          {...{
            visible: true,
            enabled: true,
            text: 'practice',
            onPress: () => {
              navigation.navigate('Drill');
            },
            icon: <PlayIcon size={20} fillColor={Themes.dark.actionText} />,
          }}
        />
      </Animated.View>

      <AnimatedDivider isVisible={true} />

      <ExpandingActionButton
        {...{
          visible: saveButtonVisible,
          enabled: props.saveDrillButtonState.enabled ?? true,
          text: saveButtonText,
          onPress: () => {
            if (props.configuration.drillName.length === 0) {
              dispatch(drillNameEmptyError());
            } else {
              dispatch(saveDrill());
              Keyboard.dismiss();
            }
          },
          icon: (
            <SaveIcon
              size={20}
              strokeColor={
                props.saveDrillButtonState.enabled
                  ? Themes.dark.actionText
                  : Themes.dark.disabledActionText
              }
            />
          ),
        }}
      />

      <AnimatedDivider
        isVisible={saveButtonVisible && copyDrillButtonVisible}
      />

      <ExpandingActionButton
        {...{
          visible: copyDrillButtonVisible,
          enabled: true,
          text: 'save copy of drill',
          onPress: () => {
            dispatch(saveAndLoadCopy());
            navigation.navigate('ConfigureDrill');
            Keyboard.dismiss();
          },
          icon: <CopyIcon size={20} strokeColor={Themes.dark.actionText} />,
        }}
      />

      <AnimatedDivider isVisible={copyDrillButtonVisible} />

      <ExpandingActionButton
        {...{
          visible: deleteDrillButtonVisible,
          enabled: true,
          text: 'delete drill',
          onPress: () => {
            if (props.configuration.drillId) {
              dispatch(deleteDrillById(props.configuration.drillId));
              navigation.navigate('Home');
              Keyboard.dismiss();
            }
          },
          icon: (
            <DeleteIcon
              width={20}
              height={22}
              strokeColor={Themes.dark.actionText}
            />
          ),
        }}
      />
    </View>
  );
};

interface ActionButtonProps {
  visible: boolean;
  enabled: boolean;
  text: string;
  textColor?: string;
  onPress: () => void;
  icon: React.ReactNode;
}

const ExpandingActionButton: React.FC<ActionButtonProps> = props => {
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  useEffect(() => {
    if (props.visible) {
      animatedHeight.value = 0;
      animatedHeight.value = withTiming(60);
    } else {
      animatedHeight.value = 60;
      animatedHeight.value = withTiming(0);
    }
    animatedOpacity.value = 0;
    animatedOpacity.value = withSequence(withTiming(0.01), withTiming(1));
  }, [props.visible]);

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}
        onPress={props.onPress}>
        <Animated.View
          style={[
            animatedHeightStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <Animated.View style={[animatedOpacityStyle]}>
            {props.visible && (
              <View style={{flexDirection: 'row'}}>
                {props.icon}
                <View style={{width: 16}} />

                <Text
                  style={[
                    globalStyles.buttonText,
                    // text color
                    props.textColor
                      ? {color: props.textColor}
                      : props.enabled
                      ? styles.actionButtonText
                      : styles.actionButtonDisabledText,
                  ]}>
                  {props.text}
                </Text>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  layerButton: {
    alignItems: 'center',
    width: 60,
    justifyContent: 'center',
  },
  sortButtonIcon: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortButtonDivider: {
    width: 1,
    height: 25,
    opacity: 0.2,
    backgroundColor: Themes.dark.actionText,
  },
  actionButtonText: {
    color: Themes.dark.actionText,
    marginTop: 0,
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