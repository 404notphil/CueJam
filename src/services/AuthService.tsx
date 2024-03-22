import {useAuth} from '../auth/AuthProvider';
import {baseUrl} from './Common';

type LoginResult =
  | 'Success'
  | 'InvalidCredentials'
  | 'UserNotFound'
  | 'ErrorDuringLogin';

type SignupResult = 'Success' | 'ErrorDuringSignup';

const loginUser = async (
  username: string,
  password: string,
  setToken: (token: string) => void,
): Promise<LoginResult> => {
  try {
    const response = await fetch(baseUrl + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.status >= 200 && response.status <= 299) {
      setToken(data.token);
      return 'Success';
    } else {
      return 'InvalidCredentials';
    }
  } catch (error) {
    return 'ErrorDuringLogin';
  }
};

const signUpUser = async (
  email: string,
  username: string,
  password: string,
  setToken: (token: string) => void,
): Promise<SignupResult> => {
  try {
    const signupResponse = await fetch(baseUrl + '/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    const signupData = await signupResponse.json();

    // Update state with the login response
    if (signupResponse.status >= 200 && signupResponse.status <= 299) {
      // Continue to log the user in
      const loginResponse = await fetch(baseUrl + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Replace username and password with actual values we want to send
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const loginData = await loginResponse.json();
      if (loginResponse.status >= 200 && loginResponse.status <= 299) {
        setToken(loginData.token);
        return 'Success';
      } else {
        return 'ErrorDuringSignup';
      }
    } else {
      return 'ErrorDuringSignup';
    }
  } catch (error) {
    console.error('Error during login:', error);
    return 'ErrorDuringSignup';
  }
};

export {loginUser, signUpUser};
