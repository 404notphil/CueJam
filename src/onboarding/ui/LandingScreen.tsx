import React, {useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {globalStyles} from '../../ui/theme/styles';
import {useAuth} from '../../auth/AuthProvider';
import {useAppNavigation} from '../../ui/App';
import auth from '@react-native-firebase/auth';
import {v4 as uuidv4} from 'uuid';

export function LandingScreen(): React.JSX.Element {
  const navigation = useAppNavigation();

  // Legacy auth
  const {setToken} = useAuth();

  // Firebase auth
  const user = auth().currentUser;

  const onLoginPressedd = () => {
    // navigation.navigate('Login');
    auth()
      .createUserWithEmailAndPassword(
        uuidv4() + '@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('12345 + User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('12345 + That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('12345 + That email address is invalid!');
        }

        console.error('12345 +' + error);
      });
  };
  const onSignupPressed = () => {
    navigation.navigate('Signup');
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(idToken => setToken(idToken));
      } else {
        setToken(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Welcome</Text>
      <TouchableOpacity
        onPress={onLoginPressedd}
        style={[globalStyles.button, {marginVertical: 32}]}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSignupPressed}
        style={[globalStyles.button, {marginVertical: 32}]}>
        <Text style={globalStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setToken('temp');
        }}
        style={[globalStyles.button, {marginVertical: 32}]}>
        <Text style={globalStyles.buttonText}>Enter as guest</Text>
      </TouchableOpacity>
    </View>
  );
}
