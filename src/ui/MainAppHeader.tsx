import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../auth/AuthProvider';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {globalStyles} from './theme/styles';
import {ScreenName} from './App';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AppHeaderProps {
  screenName: ScreenName;
}

export function MainAppHeader(props: AppHeaderProps) {
  return (
    <View
      style={{
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        paddingRight: 5,
      }}>
      <AppHeaderTitle screenName={props.screenName} />

      {/* Spacer */}
      <View style={{flex: 1}} />

      <ShortcutButton {...props} />
    </View>
  );
}

interface AppHeaderTitleProps {
  screenName: ScreenName;
}

const AppHeaderTitle: React.FC<AppHeaderTitleProps> = props => {
  let screenTitle: 'Configure Drill' | 'NotePrompter' | 'Saved Drills';
  const [fontSizeAnimation] = useState(
    new Animated.Value(props.screenName === 'Home' ? 1 : 0),
  ); // 0 is the initial value

  const [largeText, setLargeText] = useState(true);

  switch (props.screenName) {
    case 'ConfigureDrill': {
      screenTitle = 'Configure Drill';
      break;
    }
    case 'SavedDrills': {
      screenTitle = 'Saved Drills';
      break;
    }
    default: {
      screenTitle = 'NotePrompter';
      break;
    }
  }

  console.log('12345' + props.screenName);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLargeText(props.screenName === 'Home');
  }, [props.screenName]);

  useEffect(() => {
    console.log(
      '12345 Component did mount or props/screenName did change' +
        props.screenName,
    );
    return () => {
      console.log(
        '12345 Component will unmount or before props/screenName will change again' +
          props.screenName,
      );
    };
  }, [props.screenName]); // Dependency array

  console.log('12345 Component rendering or re-rendering' + props.screenName);

  return (
    <View style={{}}>
      {largeText ? (
        <Text style={[globalStyles.title, {fontSize: 50, margin: 16}]}>
          {screenTitle}
        </Text>
      ) : (
        <Text style={[globalStyles.title, {fontSize: 30, margin: 16}]}>
          {screenTitle}
        </Text>
      )}
      {largeText && (
        <Text style={[globalStyles.smallText, {marginTop: 0, paddingLeft: 60}]}>
          by tunepruner
        </Text>
      )}
    </View>
  );
};

const ShortcutButton: React.FC<AppHeaderProps> = props => {
  const navigation = useNavigation();
  const {token, setToken} = useAuth();
  return (
    <TouchableOpacity
      onPress={() => {
        props.screenName === 'Home'
          ? setToken(null)
          : navigation.navigate('Home');
      }}
      style={[
        globalStyles.button,
        {
          alignItems: 'center',
          padding: 10,
          marginVertical: 16,
          marginHorizontal: 16,
        },
      ]}>
      {props.screenName === 'Home' ? (
        token == 'temp' ? (
          <Text style={globalStyles.buttonText}>Login</Text>
        ) : (
          <Text style={globalStyles.buttonText}>Logout</Text>
        )
      ) : (
        <Image
          style={{height: 20, width: 20}}
          source={require('../assets/home_icon.png')}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};
