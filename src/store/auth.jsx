import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const storeTokenInLs = (serverToken, username) => {
    setToken(serverToken);
    setUsername(username);
    localStorage.setItem('token', serverToken);
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
  };

  const authorizationToken = token ? `Bearer ${token}` : null;

  return (
    <AuthContext.Provider
      value={{ storeTokenInLs, logoutUser, isLoggedIn, authorizationToken, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContextValue;
};
