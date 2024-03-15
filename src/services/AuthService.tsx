// services/authService.js
import {useAuth} from '../auth/AuthProvider';

type LoginResult =
  | 'Success'
  | 'InvalidCredentials'
  | 'UserNotFound'
  | 'ErrorDuringLogin';

const loginUser = async (
  username: string,
  password: string,
  setToken: (token: string) => void, // Add setToken as a parameter
): Promise<LoginResult> => {
  try {
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
      return 'InvalidCredentials';
    }
  } catch (error) {
    return 'ErrorDuringLogin';
  }
};

export {loginUser};
