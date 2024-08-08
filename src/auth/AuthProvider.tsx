import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

// The context will contain the auth token.
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logOut: () => void;
}

// Create context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// AuthProvider Props accepts children, so that we can place 'AuthProvider' at the top of the
// component tree, wrapping the entire app.
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component. This should be placed at the top of the
// component tree, wrapping the entire app.
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [tokenInWorkingMemory, setTokenInWorkingMemory] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getTokenFromDisk();
      if (storedToken !== null) {
        setTokenInWorkingMemory(storedToken);
      }
    };

    fetchToken();
  }, []);

  // Enhance setToken to also store the token to disk
  const setToken = async (token: string | null) => {
    await storeTokenToDisk(token); // Persist token to AsyncStorage
    setTokenInWorkingMemory(token); // Update state
  };

  const logOut = async () => {
    const signOutOfFirebase = () => {
      auth()
        .signOut()
        .then(() => setToken(null))
        .then(() =>
          console.log('User signed out! of firebase and deleted local token'),
        );
    };
    signOutOfFirebase();
  };

  return (
    <AuthContext.Provider
      value={{token: tokenInWorkingMemory, setToken, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const logInTempUser = () => {
  const {setToken} = useAuth();
  setToken('temp');
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const storeTokenToDisk = async (value: string | null) => {
  try {
    if (value === null) {
      await AsyncStorage.removeItem('@storage_Key');
    } else {
      await AsyncStorage.setItem('@storage_Key', value);
    }
  } catch (e) {
    // saving error
  }
};

const getTokenFromDisk = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    return value; // Return the retrieved value
  } catch (e) {
    // error reading value
    return null; // Ensure a null is returned on error
  }
};
