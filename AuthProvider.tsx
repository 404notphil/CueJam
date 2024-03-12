import React, {createContext, useContext, useState, ReactNode} from 'react';

// Define the shape of the context
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
