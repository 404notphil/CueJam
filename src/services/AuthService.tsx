// services/authService.js
import {useAuth} from '../AuthProvider';

type LoginResult =
  | 'Success'
  | 'InvalidCredentials'
  | 'UserNotFound'
  | 'ErrorDuringLogin';

const loginUser = async (
  username: string,
  password: string,
): Promise<LoginResult> => {
  try {
    const {setToken} = useAuth();

    const response = await fetch('http://192.168.0.32:8080/user/login', {
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
      // return error
      return 'InvalidCredentials';
      // TODO further handle error types for UserNotFound
    }
  } catch (error) {
    console.error('Error during login:', error);
    return 'ErrorDuringLogin';
    // return error
  }
};

export {loginUser};
