import React, {useEffect, useState} from 'react';
import {useAuth} from '../auth/AuthProvider';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {globalStyles} from './theme/styles';
import {ScreenName, useAppNavigation} from './App';

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

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLargeText(props.screenName === 'Home');
  }, [props.screenName]);

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
  const navigation = useAppNavigation();
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
